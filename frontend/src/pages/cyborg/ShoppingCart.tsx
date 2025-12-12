import { useState } from 'react';
import { 
  FiTrash2, FiPackage, FiTool, FiZap, FiShoppingBag, 
  FiCheckCircle, FiX 
} from 'react-icons/fi';
import CyborgLayout from './components/CyborgLayout';
import { useCart } from '../../hooks/useCart';


interface CartItem {
  id: string | number;
  cart_item_id?: number;
  part_id: string | number;
  part_name: string;
  part_price: number;
  category: string;
  quantity: number;
  attachments: Array<{ id: number; name: string; price: number }>;
  perks: Array<{ id: number; name: string; price: number }>;
  total_price: number;
}

const ShoppingCart = () => {

  const { 
    cartItems, 
    cartCount, 
    loading: cartLoading, 
    removeFromCart, 
    updateCartItem, 
    placeOrder,
    clearCart 
  } = useCart();
  

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showRemoveConfirm, setShowRemoveConfirm] = useState<string | number | null>(null);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [isRemovingItem, setIsRemovingItem] = useState(false);

  const handleRemoveItem = async (cartItemId: string | number) => {
    setIsRemovingItem(true);
    try {
      await removeFromCart(cartItemId);
      setShowRemoveConfirm(null);
    } catch (err) {
      console.error('Failed to remove item:', err);
      alert('Failed to remove item. Please try again.');
    } finally {
      setIsRemovingItem(false);
    }
  };

  const handleUpdateQuantity = async (cartItemId: string | number, newQuantity: number) => {
    if (newQuantity < 1) {
      setShowRemoveConfirm(cartItemId);
      return;
    }
    
    try {
      await updateCartItem(cartItemId, { quantity: newQuantity });
    } catch (err) {
      console.error('Failed to update quantity:', err);
    }
  };

  const calculateCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.total_price, 0);
  };

  const calculateItemsCount = () => {
    return cartItems.reduce((count, item) => count + (item.quantity || 1), 0);
  };

  const handlePlaceOrder = async () => {
    setIsPlacingOrder(true);
    try {
      await placeOrder();
      setShowSuccessModal(true);
    } catch (err) {
      console.error('Failed to place order:', err);
      alert('Failed to place order. Please try again.');
    } finally {
      setIsPlacingOrder(false);
    }
  };

  const getCategoryGlow = (category: string) => {
    const colors = {
      'Arm': 'bg-cyan-500/30 border-cyan-400/60 text-cyan-200 shadow-[0_0_15px_rgba(6,182,212,0.6)]',
      'Leg': 'bg-purple-500/30 border-purple-400/60 text-purple-200 shadow-[0_0_15px_rgba(168,85,247,0.6)]',
      'Torso': 'bg-orange-500/30 border-orange-400/60 text-orange-200 shadow-[0_0_15px_rgba(249,115,22,0.6)]',
      'Organ': 'bg-red-500/30 border-red-400/60 text-red-200 shadow-[0_0_15px_rgba(244,63,94,0.6)]'
    };
    return colors[category as keyof typeof colors] || 'bg-slate-800/50 border-slate-700/50 text-slate-300';
  };


  if (cartLoading && cartItems.length === 0) {
    return (
      <CyborgLayout cartItemsCount={0}>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2 drop-shadow-[0_0_15px_rgba(6,182,212,0.7)]">
            SHOPPING CART
          </h1>
          <p className="text-cyan-300/70 drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]">
            Review your cybernetic upgrades before ordering
          </p>
        </div>
        
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-cyan-300 drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]">
              Loading your cart...
            </p>
          </div>
        </div>
      </CyborgLayout>
    );
  }

  return (
    <CyborgLayout cartItemsCount={cartCount}>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2 drop-shadow-[0_0_15px_rgba(6,182,212,0.7)]">
          SHOPPING CART
        </h1>
        <p className="text-cyan-300/70 drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]">
          Review your cybernetic upgrades before ordering
        </p>
      </div>

      <div className="space-y-6 mb-10">
        {cartItems.length === 0 ? (
          <div className="bg-slate-900/60 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-12 text-center">
            <FiShoppingBag className="text-6xl text-cyan-500/50 mx-auto mb-4 drop-shadow-[0_0_20px_rgba(6,182,212,0.5)]" />
            <h3 className="text-xl font-bold text-white mb-2 drop-shadow-[0_0_10px_rgba(6,182,212,0.6)]">
              Your cart is empty
            </h3>
            <p className="text-cyan-300/70 mb-6">
              Browse our catalog to add cybernetic parts
            </p>
            <a 
              href="/cyborg"
              className="inline-flex items-center gap-2 px-6 py-3 bg-linear-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 rounded-xl border border-cyan-500/30 hover:border-cyan-400/50 hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] transition-all"
            >
              <FiPackage />
              Browse Parts
            </a>
          </div>
        ) : (
          cartItems.map((item: CartItem) => (
            <div 
              key={item.id || item.cart_item_id}
              className="bg-slate-900/60 backdrop-blur-sm rounded-2xl border border-slate-700/50 overflow-hidden group hover:border-cyan-500/30 transition-all duration-300"
            >
              <div className="p-6">
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <span className={`px-4 py-1.5 rounded-full text-sm font-bold border ${getCategoryGlow(item.category)}`}>
                            {item.category}
                          </span>
                          <h3 className="text-xl font-bold text-white drop-shadow-[0_0_10px_rgba(6,182,212,0.6)]">
                            {item.part_name}
                          </h3>
                        </div>
                        <div className="text-green-400 text-2xl font-bold drop-shadow-[0_0_15px_rgba(34,197,94,0.7)]">
                          ${item.part_price.toLocaleString()}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleUpdateQuantity(item.id || item.cart_item_id!, item.quantity - 1)}
                          className="px-3 py-1 rounded-lg border border-cyan-500/30 text-cyan-300 hover:border-cyan-400/50 hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all hover:scale-110"
                        >
                          −
                        </button>
                        <div className="text-xl font-bold text-white px-4 py-1 bg-slate-800/50 rounded-lg border border-cyan-500/20 min-w-12 text-center shadow-[0_0_10px_rgba(6,182,212,0.3)]">
                          {item.quantity}
                        </div>
                        <button
                          onClick={() => handleUpdateQuantity(item.id || item.cart_item_id!, item.quantity + 1)}
                          className="px-3 py-1 rounded-lg border border-cyan-500/30 text-cyan-300 hover:border-cyan-400/50 hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all hover:scale-110"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {item.attachments.length > 0 && (
                      <div className="mb-4">
                        <div className="flex items-center gap-2 text-cyan-300 mb-2 drop-shadow-[0_0_6px_rgba(6,182,212,0.5)]">
                          <FiTool className="text-lg" />
                          <span className="font-bold">ATTACHMENTS</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {item.attachments.map((att: any) => (
                            <span 
                              key={att.id}
                              className="px-3 py-1.5 rounded-lg bg-cyan-500/20 border border-cyan-500/40 text-cyan-200 text-sm font-medium shadow-[0_0_8px_rgba(6,182,212,0.4)]"
                            >
                              {att.name} (+${att.price})
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {item.perks.length > 0 && (
                      <div>
                        <div className="flex items-center gap-2 text-purple-300 mb-2 drop-shadow-[0_0_6px_rgba(168,85,247,0.5)]">
                          <FiZap className="text-lg" />
                          <span className="font-bold">PERKS</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {item.perks.map((perk: any) => (
                            <span 
                              key={perk.id}
                              className="px-3 py-1.5 rounded-lg bg-purple-500/20 border border-purple-500/40 text-purple-200 text-sm font-medium shadow-[0_0_8px_rgba(168,85,247,0.4)]"
                            >
                              {perk.name} (+${perk.price})
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="md:w-48 space-y-4">
                    <div className="text-right">
                      <div className="text-cyan-300/70 text-sm mb-1">Item Total</div>
                      <div className="text-2xl font-bold text-green-400 drop-shadow-[0_0_15px_rgba(34,197,94,0.7)]">
                        ${item.total_price.toLocaleString()}
                      </div>
                    </div>
                    
                    <button
                      onClick={() => setShowRemoveConfirm(item.id || item.cart_item_id!)}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-red-500/10 text-red-300 rounded-lg border border-red-500/30 hover:border-red-400/50 hover:shadow-[0_0_20px_rgba(239,68,68,0.5)] transition-all group hover:scale-[1.02]"
                    >
                      <FiTrash2 className="group-hover:scale-110 transition-transform" />
                      <span className="font-medium">Remove</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {cartItems.length > 0 && (
        <div className="bg-linear-to-br from-slate-900/60 to-slate-800/40 backdrop-blur-sm rounded-2xl border border-cyan-500/30 p-8 shadow-[0_0_40px_rgba(6,182,212,0.3)]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-white mb-6 drop-shadow-[0_0_12px_rgba(6,182,212,0.7)]">
                ORDER SUMMARY
              </h3>
              
              <div className="space-y-4">
                <div className="flex justify-between text-gray-300">
                  <div>Items ({calculateItemsCount()})</div>
                  <div className="text-white font-medium">${calculateCartTotal().toLocaleString()}</div>
                </div>
                
                <div className="pt-4 border-t border-cyan-500/30">
                  <div className="flex justify-between text-lg">
                    <div className="text-cyan-300 font-semibold">TOTAL</div>
                    <div className="text-green-400 text-3xl font-bold drop-shadow-[0_0_20px_rgba(34,197,94,0.8)]">
                      ${calculateCartTotal().toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-end space-y-4">
              <button
                onClick={handlePlaceOrder}
                disabled={isPlacingOrder}
                className={`w-full px-6 py-4 bg-linear-to-r from-cyan-500/30 to-blue-500/30 text-white rounded-xl border border-cyan-500/40 hover:border-cyan-400/50 hover:shadow-[0_0_35px_rgba(6,182,212,0.8)] transition-all text-lg font-bold hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {isPlacingOrder ? 'Placing Order...' : 'PLACE ORDER'}
              </button>
              
              <a
                href="/cyborg"
                className="w-full px-6 py-3 bg-linear-to-r from-slate-800/30 to-slate-700/30 text-cyan-300 rounded-xl border border-cyan-500/30 hover:border-cyan-400/50 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all text-center hover:scale-[1.02]"
              >
                Continue Shopping
              </a>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-cyan-500/20 text-center">
            <p className="text-cyan-300/70 text-sm">
              Bring your order number to the seller's counter for payment and installation
            </p>
          </div>
        </div>
      )}

      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={() => {
            setShowSuccessModal(false);
            clearCart();
          }}></div>
          
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: `linear-gradient(0deg, transparent 50%, rgba(6, 182, 212, 0.5) 50%)`,
            backgroundSize: '4px 4px'
          }}></div>
          
          <div className="absolute inset-0 bg-linear-to-r from-green-500/5 via-transparent to-emerald-500/5 animate-pulse"></div>
          
          <div className="relative bg-linear-to-br from-slate-900/40 to-slate-800/30 backdrop-blur-xl rounded-2xl border border-green-500/30 shadow-[0_0_80px_rgba(34,197,94,0.8)] max-w-lg w-full overflow-hidden">
            <div className="h-1 bg-linear-to-r from-transparent via-green-400 to-transparent animate-pulse"></div>
            
            <div className="p-6 border-b border-green-500/20 bg-linear-to-r from-slate-900/50 to-slate-800/40">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-1 drop-shadow-[0_0_15px_rgba(34,197,94,0.8)]">ORDER CONFIRMED</h2>
                  <p className="text-green-300/70 text-sm">Your order has been placed successfully</p>
                </div>
                <button 
                  onClick={() => {
                    setShowSuccessModal(false);
                    clearCart();
                  }}
                  className="p-2 rounded-lg border border-green-500/30 hover:border-green-400/50 hover:bg-green-500/10 hover:shadow-[0_0_20px_rgba(34,197,94,0.6)] transition-all"
                >
                  <FiX className="text-green-300 drop-shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                </button>
              </div>
            </div>

            <div className="p-8 text-center">
              <div className="mb-6">
                <FiCheckCircle className="text-7xl text-green-400 mx-auto mb-4 drop-shadow-[0_0_30px_rgba(34,197,94,0.9)] animate-pulse" />
                <div className="text-cyan-300 text-lg font-bold mb-2 drop-shadow-[0_0_12px_rgba(6,182,212,0.7)]">
                  Order Number: <span className="text-white font-mono">ORD-{Date.now().toString().slice(-6)}</span>
                </div>
                <p className="text-gray-300">
                  Order total: <span className="text-green-400 font-bold">${calculateCartTotal().toLocaleString()}</span>
                </p>
              </div>
              
              <div className="bg-slate-900/40 rounded-xl p-4 mb-6 border border-cyan-500/20">
                <p className="text-cyan-300/90">
                  Please proceed to the seller's counter for payment and installation. Bring your order number with you.
                </p>
              </div>
              
              <button
                onClick={() => {
                  setShowSuccessModal(false);
                  clearCart();
                }}
                className="w-full px-6 py-4 bg-linear-to-r from-green-500/30 to-emerald-500/30 text-white rounded-xl border border-green-500/40 hover:border-green-400/50 hover:shadow-[0_0_35px_rgba(34,197,94,0.8)] transition-all text-lg font-bold hover:scale-[1.02]"
              >
                CONTINUE SHOPPING
              </button>
            </div>
            
            <div className="h-1 bg-linear-to-r from-transparent via-green-400 to-transparent animate-pulse"></div>
          </div>
        </div>
      )}

      {showRemoveConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={() => setShowRemoveConfirm(null)}></div>
          
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: `linear-gradient(0deg, transparent 50%, rgba(239, 68, 68, 0.5) 50%)`,
            backgroundSize: '4px 4px'
          }}></div>
          
          <div className="absolute inset-0 bg-linear-to-r from-red-500/5 via-transparent to-pink-500/5 animate-pulse"></div>
          
          <div className="relative bg-linear-to-br from-slate-900/40 to-slate-800/30 backdrop-blur-xl rounded-2xl border border-red-500/30 shadow-[0_0_80px_rgba(239,68,68,0.8)] max-w-md w-full overflow-hidden">
            <div className="h-1 bg-linear-to-r from-transparent via-red-400 to-transparent animate-pulse"></div>
            
            <div className="p-6 border-b border-red-500/20 bg-linear-to-r from-slate-900/50 to-slate-800/40">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-1 drop-shadow-[0_0_15px_rgba(239,68,68,0.8)]">REMOVE ITEM</h2>
                  <p className="text-red-300/70 text-sm">Confirm item removal</p>
                </div>
                <button 
                  onClick={() => setShowRemoveConfirm(null)}
                  className="p-2 rounded-lg border border-red-500/30 hover:border-red-400/50 hover:bg-red-500/10 hover:shadow-[0_0_20px_rgba(239,68,68,0.6)] transition-all"
                >
                  <FiX className="text-red-300 drop-shadow-[0_0_8px_rgba(239,68,68,0.6)]" />
                </button>
              </div>
            </div>

            <div className="p-8 text-center">
              <div className="mb-6">
                <FiTrash2 className="text-5xl text-red-400 mx-auto mb-4 drop-shadow-[0_0_20px_rgba(239,68,68,0.9)]" />
                <p className="text-gray-300 text-lg mb-2">
                  Are you sure you want to remove this item from your cart?
                </p>
                <p className="text-red-300/70">
                  This action cannot be undone.
                </p>
              </div>
              
              <div className="flex gap-4">
                <button
                  onClick={() => setShowRemoveConfirm(null)}
                  className="flex-1 px-6 py-3 bg-linear-to-r from-slate-800/30 to-slate-700/30 text-cyan-300 rounded-xl border border-cyan-500/30 hover:border-cyan-400/50 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all hover:scale-[1.02]"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleRemoveItem(showRemoveConfirm)}
                  disabled={isRemovingItem}
                  className={`flex-1 px-6 py-3 bg-linear-to-r from-red-500/30 to-pink-500/30 text-red-300 rounded-xl border border-red-500/40 hover:border-red-400/50 hover:shadow-[0_0_35px_rgba(239,68,68,0.8)] transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {isRemovingItem ? 'Removing...' : 'Remove'}
                </button>
              </div>
            </div>
            
            <div className="h-1 bg-linear-to-r from-transparent via-red-400 to-transparent animate-pulse"></div>
          </div>
        </div>
      )}
    </CyborgLayout>
  );
};

export default ShoppingCart;