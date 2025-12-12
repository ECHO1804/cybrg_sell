import { useState, useEffect, useCallback } from 'react';


const initialCartItems = [
  {
    id: '1',
    cart_item_id: 101,
    part_id: '5',
    part_name: 'Quantum Arm',
    part_price: 2500,
    category: 'Arm',
    quantity: 1,
    attachments: [
      { id: 10, name: 'Laser Emitter', price: 200 },
      { id: 15, name: 'Shield Projector', price: 150 }
    ],
    perks: [
      { id: 7, name: 'Speed Boost', price: 100 }
    ],
    total_price: 2950
  },
  {
    id: '2',
    cart_item_id: 102,
    part_id: '3',
    part_name: 'Titanium Leg',
    part_price: 2200,
    category: 'Leg',
    quantity: 1,
    attachments: [
      { id: 8, name: 'Hydraulic Boost', price: 300 }
    ],
    perks: [
      { id: 5, name: 'Durability+', price: 150 },
      { id: 6, name: 'Energy Efficiency', price: 120 }
    ],
    total_price: 2770
  }
];


const loadCartFromStorage = () => {
  if (typeof window === 'undefined') return initialCartItems;
  const saved = localStorage.getItem('cyborg-cart');
  return saved ? JSON.parse(saved) : initialCartItems;
};

export const useCart = () => {
  const [cartItems, setCartItems] = useState<any[]>(loadCartFromStorage());
  const [cartCount, setCartCount] = useState(0);
  const [loading, setLoading] = useState(false);

 
  const calculateCartCount = (items: any[]) => {
    return items.reduce((total, item) => total + (item.quantity || 1), 0);
  };


  useEffect(() => {
    localStorage.setItem('cyborg-cart', JSON.stringify(cartItems));
    setCartCount(calculateCartCount(cartItems));
  }, [cartItems]);

  const addToCart = useCallback(async (
    partId: string | number,
    attachments: Array<{ id: number; name: string; price: number }>,
    perks: Array<{ id: number; name: string; price: number }>
  ) => {
    setLoading(true);
    
 
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const newItem = {
      id: Date.now().toString(),
      cart_item_id: Date.now(),
      part_id: partId,
      part_name: `Part ${partId}`,
      part_price: 2500, 
      category: 'Arm', 
      quantity: 1,
      attachments,
      perks,
      total_price: 2500 + attachments.reduce((sum, a) => sum + a.price, 0) + perks.reduce((sum, p) => sum + p.price, 0)
    };
    
    setCartItems(prev => [...prev, newItem]);
    setLoading(false);
    return newItem;
  }, []);

  const removeFromCart = useCallback(async (cartItemId: string | number) => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 300));
    
    setCartItems(prev => prev.filter(item => 
      String(item.id) !== String(cartItemId) && 
      String(item.cart_item_id) !== String(cartItemId)
    ));
    
    setLoading(false);
    return true;
  }, []);

  const updateCartItem = useCallback(async (
    cartItemId: string | number, 
    payload: { quantity: number }
  ) => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 300));
    
    setCartItems(prev => prev.map(item => {
      if (String(item.id) === String(cartItemId) || String(item.cart_item_id) === String(cartItemId)) {
        const updatedItem = { ...item, ...payload };
        updatedItem.total_price = (updatedItem.part_price + 
          updatedItem.attachments.reduce((sum: number, att: any) => sum + att.price, 0) +
          updatedItem.perks.reduce((sum: number, perk: any) => sum + perk.price, 0)) * updatedItem.quantity;
        return updatedItem;
      }
      return item;
    }));
    
    setLoading(false);
    return true;
  }, []);

  const clearCart = useCallback(async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 300));
    setCartItems([]);
    setLoading(false);
    return true;
  }, []);

  const placeOrder = useCallback(async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    
    const order = {
      id: `ORD-${Date.now()}`,
      items: cartItems,
      total: cartItems.reduce((sum, item) => sum + item.total_price, 0),
      date: new Date().toISOString(),
      status: 'pending'
    };
    
   
    const existingOrders = JSON.parse(localStorage.getItem('cyborg-orders') || '[]');
    existingOrders.push(order);
    localStorage.setItem('cyborg-orders', JSON.stringify(existingOrders));
    
 
    await clearCart();
    setLoading(false);
    return order;
  }, [cartItems, clearCart]);

  return {
    cartItems,
    cartCount,
    loading,
    error: null,
    addToCart,
    removeFromCart,
    updateCartItem,
    clearCart,
    placeOrder,
    refetchCart: () => {} 
  };
};


// import { useState, useEffect, useCallback } from 'react';
// import axios from 'axios';

// export const useCart = () => {
//   const [cartItems, setCartItems] = useState<CartItem[]>([]);
//   const [cartCount, setCartCount] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const BASE_URL = 'http://localhost:3000/api';

//   const fetchCart = useCallback(async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await axios.get(`${BASE_URL}/cart`, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('authToken')}`
//         }
//       });
      
//       setCartItems(response.data);
      
//       const totalQuantity = response.data.reduce(
//         (sum: number, item: CartItem) => sum + (item.quantity || 1), 
//         0
//       );
//       setCartCount(totalQuantity);
//     } catch (err: any) {
//       setError(err.message || 'Failed to fetch cart');
//       console.error('Error fetching cart:', err);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   const removeFromCart = useCallback(async (cartItemId: string | number) => {
//     setLoading(true);
//     try {
//       await axios.delete(`${BASE_URL}/cart/${cartItemId}`, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('authToken')}`
//         }
//       });
      
//       setCartItems(prev => prev.filter(item => 
//         item.id !== cartItemId && item.cart_item_id !== cartItemId
//       ));
      
//       setCartCount(prev => Math.max(0, prev - 1));
      
//       return true;
//     } catch (err: any) {
//       console.error('Error removing from cart:', err);
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   const updateCartItem = useCallback(async (
//     cartItemId: string | number, 
//     payload: { quantity: number }
//   ) => {
//     setLoading(true);
//     try {
//       const response = await axios.put(`${BASE_URL}/cart/${cartItemId}`, payload, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('authToken')}`
//         }
//       });
      
//       setCartItems(prev => prev.map(item => 
//         (item.id === cartItemId || item.cart_item_id === cartItemId)
//           ? { ...item, ...response.data }
//           : item
//       ));
      
//       const newCartCount = cartItems.reduce(
//         (sum, item) => sum + 
//           ((item.id === cartItemId || item.cart_item_id === cartItemId) 
//             ? payload.quantity 
//             : item.quantity || 1),
//         0
//       );
//       setCartCount(newCartCount);
      
//       return response.data;
//     } catch (err: any) {
//       console.error('Error updating cart item:', err);
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   }, [cartItems]);

//   const clearCart = useCallback(async () => {
//     setLoading(true);
//     try {
//       await axios.delete(`${BASE_URL}/cart`, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('authToken')}`
//         }
//       });
      
//       setCartItems([]);
//       setCartCount(0);
      
//       return true;
//     } catch (err: any) {
//       console.error('Error clearing cart:', err);
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   const placeOrder = useCallback(async () => {
//     setLoading(true);
//     try {
//       const orderData = {
//         items: cartItems,
//         total: cartItems.reduce((sum, item) => sum + item.total_price, 0),
//         status: 'pending' as const
//       };
      
//       const response = await axios.post(`${BASE_URL}/orders`, orderData, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('authToken')}`
//         }
//       });
      
//       await clearCart();
      
//       return response.data;
//     } catch (err: any) {
//       console.error('Error placing order:', err);
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   }, [cartItems, clearCart]);

//   const addToCart = useCallback(async (
//     partId: string | number,
//     attachments: Array<{ id: number; name: string; price: number }>,
//     perks: Array<{ id: number; name: string; price: number }>
//   ) => {
//     setLoading(true);
//     try {
//       const response = await axios.post(`${BASE_URL}/cart`, {
//         partId,
//         attachments,
//         perks,
//         quantity: 1
//       }, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('authToken')}`
//         }
//       });
      
//       setCartItems(prev => [...prev, response.data]);
//       setCartCount(prev => prev + 1);
//       return response.data;
//     } catch (err: any) {
//       console.error('Error adding to cart:', err);
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchCart();
//   }, [fetchCart]);

//   const refetchCart = () => {
//     fetchCart();
//   };

//   return {
//     cartItems,
//     cartCount,
//     loading,
//     error,
//     addToCart,
//     removeFromCart,
//     updateCartItem,
//     clearCart,
//     placeOrder,
//     refetchCart
//   };
// };