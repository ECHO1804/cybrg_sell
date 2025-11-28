import { useState } from 'react';
import { Link } from 'react-router-dom';
import CyborgLayout from './components/CyborgLayout';
import { FiTrash2, FiShoppingBag } from 'react-icons/fi';

// Mock cart data
const mockCartItems = [
  {
    id: 1,
    part: {
      id: 1,
      name: 'Titanium Arm Prosthetic',
      base_price: 2500,
      quality_tier: 'premium' as const,
    },
    selected_attachments: [
      { attachment: { name: 'Laser Sight', price: 300 }, slot: 'wrist' },
      { attachment: { name: 'Grip Enhancer', price: 150 }, slot: 'palm' }
    ],
    selected_perks: [
      { perk: { name: 'Enhanced Durability', price: 200 } }
    ],
    calculated_price: 3150,
  },
  {
    id: 2,
    part: {
      id: 2,
      name: 'Enhanced Optical Eye',
      base_price: 1200,
      quality_tier: 'standard' as const,
    },
    selected_attachments: [
      { attachment: { name: 'Zoom Lens', price: 450 }, slot: 'front' }
    ],
    selected_perks: [],
    calculated_price: 1650,
  }
];

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState(mockCartItems);

  const removeFromCart = (itemId: number) => {
    setCartItems(cartItems.filter(item => item.id !== itemId));
  };

  const totalPrice = cartItems.reduce((sum, item) => sum + item.calculated_price, 0);

  if (cartItems.length === 0) {
    return (
      <CyborgLayout cartItemsCount={0}>
        <div className="text-center py-16">
          <FiShoppingBag className="w-24 h-24 text-gray-600 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-400 mb-4">Your Cart is Empty</h2>
          <p className="text-gray-500 mb-8">Browse our parts catalog to find enhancements</p>
          <Link
            to="/cyborg/parts"
            className="bg-cyan-600 hover:bg-cyan-700 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200"
          >
            Browse Parts
          </Link>
        </div>
      </CyborgLayout>
    );
  }

  return (
    <CyborgLayout cartItemsCount={cartItems.length}>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-cyan-400 mb-2">Shopping Cart</h1>
        <p className="text-gray-400">Review your selected enhancements</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="bg-slate-800/50 rounded-lg border border-slate-700 p-6"
            >
              {/* Part Header */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-white">{item.part.name}</h3>
                  <p className="text-gray-400 text-sm">{item.part.quality_tier} quality</p>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-gray-400 hover:text-rose-500 transition-colors duration-200"
                >
                  <FiTrash2 className="w-5 h-5" />
                </button>
              </div>

              {/* Attachments */}
              {item.selected_attachments.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-cyan-400 mb-2">Attachments</h4>
                  <div className="space-y-2">
                    {item.selected_attachments.map((attachment, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span className="text-gray-300">
                          {attachment.attachment.name} <span className="text-gray-500">({attachment.slot})</span>
                        </span>
                        <span className="text-cyan-400">+${attachment.attachment.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Perks */}
              {item.selected_perks.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-cyan-400 mb-2">Perks</h4>
                  <div className="space-y-2">
                    {item.selected_perks.map((perk, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span className="text-gray-300">{perk.perk.name}</span>
                        <span className="text-cyan-400">+${perk.perk.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

             

              {/* Item Total */}
              <div className="flex justify-between items-center pt-4 border-t border-slate-700">
                <span className="text-gray-400">Item Total</span>
                <span className="text-2xl font-bold text-cyan-400">
                  ${item.calculated_price}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-slate-800/50 rounded-lg border border-slate-700 p-6 sticky top-6">
            <h3 className="text-xl font-semibold text-white mb-4">Order Summary</h3>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-300">
                <span>Subtotal</span>
                <span>${totalPrice}</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Installation Fee</span>
                <span>$200</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Neural Sync Tax</span>
                <span>$150</span>
              </div>
              <div className="border-t border-slate-700 pt-3">
                <div className="flex justify-between text-lg font-semibold text-cyan-400">
                  <span>Total</span>
                  <span>${totalPrice + 350}</span>
                </div>
              </div>
            </div>


            <button className="w-full bg-cyan-600 hover:bg-cyan-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors duration-200">
              Proceed to Checkout
            </button>

            <Link
              to="/cyborg/parts"
              className="block text-center text-cyan-400 hover:text-cyan-300 mt-4 transition-colors duration-200"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </CyborgLayout>
  );
};

export default ShoppingCart;