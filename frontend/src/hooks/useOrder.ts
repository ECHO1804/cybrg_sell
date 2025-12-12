import { useState, useEffect, useCallback } from 'react';

const mockOrders = [
  { id: 'ORD-2024-001', date: '2024-01-15', total: 2950, status: 'completed', items: [{ part: 'Quantum Arm', attachments: ['Laser Emitter', 'Shield Projector'], perks: ['Speed Boost'], quantity: 1 }] },
  { id: 'ORD-2024-002', date: '2024-01-20', total: 2770, status: 'pending', items: [{ part: 'Titanium Leg', attachments: ['Hydraulic Boost'], perks: ['Durability+', 'Energy Efficiency'], quantity: 1 }] },
  { id: 'ORD-2024-003', date: '2024-01-25', total: 1850, status: 'pending', items: [{ part: 'Neural Processor', attachments: [], perks: ['Processing Boost'], quantity: 1 }] },
  { id: 'ORD-2023-045', date: '2023-12-10', total: 4200, status: 'completed', items: [{ part: 'Synthetic Heart', attachments: ['Power Regulator'], perks: ['Extended Lifespan'], quantity: 1 }] },
  { id: 'ORD-2024-004', date: '2024-02-01', total: 3200, status: 'completed', items: [{ part: 'Carbon Fiber Torso', attachments: ['Armor Plating', 'Cooling System'], perks: ['Thermal Regulation'], quantity: 1 }] },
  { id: 'ORD-2024-005', date: '2024-02-05', total: 1500, status: 'cancelled', items: [{ part: 'Holo-Vision Eye', attachments: ['Zoom Lens'], perks: [], quantity: 1 }] },
];

export const useOrders = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    

    try {
      const savedOrders = localStorage.getItem('cyborg-orders');
      if (savedOrders) {
        const parsed = JSON.parse(savedOrders);
      
        const formattedOrders = parsed.map((order: any, index: number) => ({
          id: order.id || `ORD-${Date.now()}-${index}`,
          date: order.date || new Date().toISOString().split('T')[0],
          total: order.total || 0,
          status: order.status || 'pending',
          items: order.items || []
        }));
        setOrders(formattedOrders);
      } else {
        setOrders(mockOrders);
      }
    } catch (err) {
      setOrders(mockOrders);
    }
    
    setLoading(false);
  }, []);

  const cancelOrder = useCallback(async (orderId: string | number) => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    
   
    setOrders(prev => prev.map(order => 
      String(order.id) === String(orderId) 
        ? { ...order, status: 'cancelled' }
        : order
    ));
    
    
    const savedOrders = localStorage.getItem('cyborg-orders');
    if (savedOrders) {
      const parsed = JSON.parse(savedOrders);
      const updated = parsed.map((order: any) => 
        String(order.id) === String(orderId) 
          ? { ...order, status: 'cancelled' }
          : order
      );
      localStorage.setItem('cyborg-orders', JSON.stringify(updated));
    }
    
    setLoading(false);
    return true;
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const refetch = () => {
    fetchOrders();
  };

  return { orders, loading, error, cancelOrder, refetch };
};

// import { useState, useEffect, useCallback } from 'react';
// import axios from 'axios';

// export const useOrders = () => {
//   const [orders, setOrders] = useState<any[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const BASE_URL = 'http://localhost:3000/api';

//   const fetchOrders = useCallback(async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await axios.get(`${BASE_URL}/orders`, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('authToken')}`
//         }
//       });
//       setOrders(response.data);
//     } catch (err: any) {
//       setError(err.message || 'Failed to fetch orders');
//       console.error('Error fetching orders:', err);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   const cancelOrder = useCallback(async (orderId: string | number) => {
//     setLoading(true);
//     try {
//       await axios.put(`${BASE_URL}/orders/${orderId}`, {
//         status: 'cancelled'
//       }, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('authToken')}`
//         }
//       });
      
//       setOrders(prev => prev.map(order => 
//         String(order.id) === String(orderId) 
//           ? { ...order, status: 'cancelled' }
//           : order
//       ));
      
//       return true;
//     } catch (err: any) {
//       console.error('Error cancelling order:', err);
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchOrders();
//   }, [fetchOrders]);

//   const refetch = () => {
//     fetchOrders();
//   };

//   return { orders, loading, error, cancelOrder, refetch };
// };