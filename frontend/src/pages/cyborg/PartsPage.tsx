import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiShoppingCart, FiTool, FiZap, FiPackage, FiArrowLeft, FiCheck, FiDollarSign, FiX } from 'react-icons/fi';
import CyborgLayout from './components/CyborgLayout';

const PartsPage = () => {
  const { partId } = useParams<{ partId: string }>();
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);
  const [selectedAttachments, setSelectedAttachments] = useState<number[]>([]);
  const [selectedPerks, setSelectedPerks] = useState<number[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [showAddToCartModal, setShowAddToCartModal] = useState(false);

  // Mock data with slot limits
  const part = {
    id: partId || 'PRT-001',
    name: 'Quantum Arm',
    category: 'Arm',
    price: 2500,
    description: 'Advanced neural-controlled arm with precision sensors and adaptive feedback systems. Features nano-muscle fibers and quantum processors.',
    longDescription: 'This cutting-edge cybernetic arm integrates seamlessly with neural interfaces, providing unprecedented control and sensory feedback. Equipped with self-repairing nano-muscle fibers and quantum computing processors for real-time adaptation.',
    image: '/api/placeholder/600/400',
    maxAttachments: 3, 
    maxPerks: 2      
  };

  const availableAttachments = [
    { id: 1, name: 'Laser Emitter', price: 200, description: 'Integrated energy weapon' },
    { id: 2, name: 'Hydraulic Grip', price: 150, description: 'Enhanced lifting capacity' },
    { id: 3, name: 'Sensor Array', price: 300, description: '360° environmental scanning' },
    { id: 4, name: 'Shield Projector', price: 400, description: 'Energy shield deployment' },
    { id: 5, name: 'Toolkit Integration', price: 180, description: 'Multi-tool system' }
  ];

  const availablePerks = [
    { id: 1, name: 'Speed Boost', price: 100, description: '+25% movement speed' },
    { id: 2, name: 'Durability+', price: 150, description: 'Enhanced structural integrity' },
    { id: 3, name: 'Energy Efficiency', price: 120, description: '-30% power consumption' },
    { id: 4, name: 'Stealth Coating', price: 200, description: 'Reduced thermal signature' }
  ];

  const attachmentsTotal = selectedAttachments.reduce((total, attachmentId) => {
    const attachment = availableAttachments.find(a => a.id === attachmentId);
    return total + (attachment?.price || 0);
  }, 0);

  const perksTotal = selectedPerks.reduce((total, perkId) => {
    const perk = availablePerks.find(p => p.id === perkId);
    return total + (perk?.price || 0);
  }, 0);

  const subtotal = part.price * quantity;
  const total = subtotal + attachmentsTotal + perksTotal;

  const handleToggleAttachment = (attachmentId: number) => {
    if (selectedAttachments.includes(attachmentId)) {
      setSelectedAttachments(prev => prev.filter(id => id !== attachmentId));
    } else if (selectedAttachments.length < part.maxAttachments) {
      setSelectedAttachments(prev => [...prev, attachmentId]);
    }
  };

  const handleTogglePerk = (perkId: number) => {
    if (selectedPerks.includes(perkId)) {
      setSelectedPerks(prev => prev.filter(id => id !== perkId));
    } else if (selectedPerks.length < part.maxPerks) {
      setSelectedPerks(prev => [...prev, perkId]);
    }
  };

  const handleOrderNow = () => {
    const orderData = {
      partId: part.id,
      partName: part.name,
      quantity,
      attachments: selectedAttachments,
      perks: selectedPerks,
      totalPrice: total
    };
    
    console.log('Creating order:', orderData);
    setCartCount(prev => prev + quantity);
    setShowAddToCartModal(true);
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'Arm': 'from-cyan-500 to-blue-500',
      'Leg': 'from-purple-500 to-pink-500',
      'Torso': 'from-orange-500 to-red-500',
      'Organ': 'from-red-500 to-pink-500'
    };
    return colors[category as keyof typeof colors] || 'from-slate-600 to-slate-700';
  };

  return (
    <CyborgLayout cartItemsCount={cartCount}>
      <button
        onClick={() => navigate('/cyborg/parts')}
        className="flex items-center gap-2 text-cyan-300 hover:text-cyan-200 mb-6 transition-all group drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]"
      >
        <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
        <span className="font-medium">Back to Catalog</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
       
        <div className="flex flex-col">
    
          <div className="relative rounded-2xl overflow-hidden border border-cyan-500/30 bg-gradient-to-br from-slate-900/40 to-slate-800/30 backdrop-blur-sm mb-6 flex-shrink-0" style={{ height: '820px' }}>
            <div className={`absolute inset-0 bg-gradient-to-br ${getCategoryColor(part.category)} opacity-20`}></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <FiPackage className="text-white/20 text-8xl drop-shadow-[0_0_20px_rgba(6,182,212,0.5)]" />
            </div>
            <div className="absolute top-4 left-4 z-20">
              <span className="px-4 py-2 rounded-full text-sm font-medium text-white bg-slate-900/80 backdrop-blur-sm border border-cyan-500/30 drop-shadow-[0_0_12px_rgba(6,182,212,0.5)]">
                {part.category}
              </span>
            </div>
          </div>

         
          <div className="bg-slate-900/60 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6 flex-grow">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold text-white drop-shadow-[0_0_12px_rgba(6,182,212,0.7)]">
                {part.name}
              </h1>
              <div className="text-green-400 text-3xl font-bold drop-shadow-[0_0_20px_rgba(34,197,94,0.8)]">
                ${part.price.toLocaleString()}
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-base font-semibold text-cyan-300 mb-2 drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]">
                  Description
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {part.longDescription}
                </p>
              </div>

             
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-700/50">
                <div className="text-center p-3 rounded-lg bg-cyan-500/10 border border-cyan-500/30">
                  <div className="text-cyan-300 text-lg font-bold mb-1">{part.maxAttachments}</div>
                  <div className="text-cyan-200 text-sm">Attachment Slots</div>
                </div>
                <div className="text-center p-3 rounded-lg bg-purple-500/10 border border-purple-500/30">
                  <div className="text-purple-300 text-lg font-bold mb-1">{part.maxPerks}</div>
                  <div className="text-purple-200 text-sm">Perk Slots</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        
        <div className="space-y-6">
          
          <div className="bg-slate-900/60 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6">
            <h3 className="text-lg font-semibold text-cyan-300 mb-4 flex items-center gap-2 drop-shadow-[0_0_10px_rgba(6,182,212,0.6)]">
              <FiPackage />
              <span>QUANTITY</span>
            </h3>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                className="px-4 py-2 rounded-lg border border-cyan-500/30 text-cyan-300 hover:border-cyan-400/50 hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all hover:scale-110"
              >
                -
              </button>
              <div className="text-2xl font-bold text-white px-6 py-2 bg-slate-800/50 rounded-lg border border-cyan-500/20 shadow-[0_0_10px_rgba(6,182,212,0.3)]">
                {quantity}
              </div>
              <button
                onClick={() => setQuantity(prev => prev + 1)}
                className="px-4 py-2 rounded-lg border border-cyan-500/30 text-cyan-300 hover:border-cyan-400/50 hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all hover:scale-110"
              >
                +
              </button>
              <div className="ml-auto text-lg text-white">
                Subtotal: <span className="text-green-400 font-bold">${subtotal.toLocaleString()}</span>
              </div>
            </div>
          </div>

          
          <div className="bg-slate-900/60 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-cyan-300 flex items-center gap-2 drop-shadow-[0_0_10px_rgba(6,182,212,0.6)]">
                <FiTool />
                <span>ATTACHMENTS</span>
              </h3>
              <div className="flex items-center gap-2">
                <div className="text-sm text-cyan-300/70">
                  {selectedAttachments.length}/{part.maxAttachments}
                </div>
                <div className="text-sm text-green-400 font-bold">
                  ${attachmentsTotal.toLocaleString()}
                </div>
              </div>
            </div>
            <div className="space-y-3 max-h-72 overflow-y-auto pr-2">
              {availableAttachments.map(attachment => {
                const isSelected = selectedAttachments.includes(attachment.id);
                const isDisabled = !isSelected && selectedAttachments.length >= part.maxAttachments;
                
                return (
                  <button
                    key={attachment.id}
                    onClick={() => handleToggleAttachment(attachment.id)}
                    disabled={isDisabled}
                    className={`w-full text-left p-3 rounded-xl border transition-all backdrop-blur-sm flex items-center justify-between group ${
                      isSelected
                        ? 'border-cyan-400/50 bg-cyan-500/10 shadow-[0_0_20px_rgba(6,182,212,0.3)]'
                        : isDisabled
                        ? 'border-slate-700/30 bg-slate-800/30 cursor-not-allowed opacity-50'
                        : 'border-cyan-500/20 hover:border-cyan-400/40 hover:shadow-[0_0_15px_rgba(6,182,212,0.2)]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        isSelected
                          ? 'bg-cyan-500/20 border border-cyan-400/50'
                          : 'bg-slate-800/50 border border-cyan-500/10'
                      }`}>
                        {isSelected ? (
                          <FiCheck className="text-cyan-300 drop-shadow-[0_0_6px_rgba(6,182,212,0.6)]" />
                        ) : (
                          <div className="w-5 h-5 rounded border border-cyan-500/30"></div>
                        )}
                      </div>
                      <div>
                        <div className={`font-medium transition-colors ${
                          isSelected ? 'text-cyan-300' : isDisabled ? 'text-gray-500' : 'text-white group-hover:text-cyan-300'
                        }`}>
                          {attachment.name}
                        </div>
                        <div className="text-cyan-300/60 text-xs mt-0.5">
                          {attachment.description}
                        </div>
                      </div>
                    </div>
                    <div className={`font-bold text-base drop-shadow-[0_0_8px_rgba(34,197,94,0.6)] ${
                      isDisabled ? 'text-gray-500' : 'text-green-400'
                    }`}>
                      +${attachment.price}
                    </div>
                  </button>
                );
              })}
            </div>
            {selectedAttachments.length >= part.maxAttachments && (
              <div className="mt-3 text-center text-cyan-300/70 text-sm">
                Maximum {part.maxAttachments} attachments reached
              </div>
            )}
          </div>

          
          <div className="bg-slate-900/60 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-purple-300 flex items-center gap-2 drop-shadow-[0_0_10px_rgba(168,85,247,0.6)]">
                <FiZap />
                <span>PERKS</span>
              </h3>
              <div className="flex items-center gap-2">
                <div className="text-sm text-purple-300/70">
                  {selectedPerks.length}/{part.maxPerks}
                </div>
                <div className="text-sm text-green-400 font-bold">
                  ${perksTotal.toLocaleString()}
                </div>
              </div>
            </div>
            <div className="space-y-3 max-h-72 overflow-y-auto pr-2">
              {availablePerks.map(perk => {
                const isSelected = selectedPerks.includes(perk.id);
                const isDisabled = !isSelected && selectedPerks.length >= part.maxPerks;
                
                return (
                  <button
                    key={perk.id}
                    onClick={() => handleTogglePerk(perk.id)}
                    disabled={isDisabled}
                    className={`w-full text-left p-3 rounded-xl border transition-all backdrop-blur-sm flex items-center justify-between group ${
                      isSelected
                        ? 'border-purple-400/50 bg-purple-500/10 shadow-[0_0_20px_rgba(168,85,247,0.3)]'
                        : isDisabled
                        ? 'border-slate-700/30 bg-slate-800/30 cursor-not-allowed opacity-50'
                        : 'border-purple-500/20 hover:border-purple-400/40 hover:shadow-[0_0_15px_rgba(168,85,247,0.2)]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        isSelected
                          ? 'bg-purple-500/20 border border-purple-400/50'
                          : 'bg-slate-800/50 border border-purple-500/10'
                      }`}>
                        {isSelected ? (
                          <FiCheck className="text-purple-300 drop-shadow-[0_0_6px_rgba(168,85,247,0.6)]" />
                        ) : (
                          <div className="w-5 h-5 rounded border border-purple-500/30"></div>
                        )}
                      </div>
                      <div>
                        <div className={`font-medium transition-colors ${
                          isSelected ? 'text-purple-300' : isDisabled ? 'text-gray-500' : 'text-white group-hover:text-purple-300'
                        }`}>
                          {perk.name}
                        </div>
                        <div className="text-purple-300/60 text-xs mt-0.5">
                          {perk.description}
                        </div>
                      </div>
                    </div>
                    <div className={`font-bold text-base drop-shadow-[0_0_8px_rgba(34,197,94,0.6)] ${
                      isDisabled ? 'text-gray-500' : 'text-green-400'
                    }`}>
                      +${perk.price}
                    </div>
                  </button>
                );
              })}
            </div>
            {selectedPerks.length >= part.maxPerks && (
              <div className="mt-3 text-center text-purple-300/70 text-sm">
                Maximum {part.maxPerks} perks reached
              </div>
            )}
          </div>

         
          <div className="bg-gradient-to-br from-slate-900/60 to-slate-800/40 backdrop-blur-sm rounded-2xl border border-cyan-500/30 p-6 shadow-[0_0_40px_rgba(6,182,212,0.3)]">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2 drop-shadow-[0_0_12px_rgba(6,182,212,0.7)]">
              <FiDollarSign />
              <span>ORDER SUMMARY</span>
            </h3>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-300">
                <div>{part.name} × {quantity}</div>
                <div className="text-white font-medium">${subtotal.toLocaleString()}</div>
              </div>
              
              {selectedAttachments.length > 0 && (
                <div className="flex justify-between text-gray-300">
                  <div>{selectedAttachments.length} Attachment(s)</div>
                  <div className="text-white font-medium">+${attachmentsTotal.toLocaleString()}</div>
                </div>
              )}
              
              {selectedPerks.length > 0 && (
                <div className="flex justify-between text-gray-300">
                  <div>{selectedPerks.length} Perk(s)</div>
                  <div className="text-white font-medium">+${perksTotal.toLocaleString()}</div>
                </div>
              )}
              
              <div className="pt-3 border-t border-cyan-500/30">
                <div className="flex justify-between text-lg">
                  <div className="text-cyan-300 font-semibold">TOTAL</div>
                  <div className="text-green-400 text-2xl font-bold drop-shadow-[0_0_15px_rgba(34,197,94,0.8)]">
                    ${total.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={handleOrderNow}
              className="w-full px-6 py-3 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 text-white rounded-xl border border-cyan-500/40 hover:border-cyan-400/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.8)] transition-all text-base font-bold flex items-center justify-center gap-3 group hover:scale-[1.02]"
            >
              <FiShoppingCart className="group-hover:scale-110 transition-transform" />
              <span>ORDER NOW</span>
            </button>
            
            <p className="text-center text-cyan-300/70 text-xs mt-3">
              Pay at seller's counter after order confirmation
            </p>
          </div>
        </div>
      </div>

      <footer className="mt-10 pt-6 border-t border-slate-800/50">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <div className="text-white font-bold text-lg mb-1 drop-shadow-[0_0_10px_rgba(6,182,212,0.5)]">CYBORGMANIA NEURAL MARKET</div>
            <p className="text-slate-400 text-sm drop-shadow-[0_0_8px_rgba(6,182,212,0.4)]">Advanced Cybernetic Parts Details v2.1</p>
          </div>
          <div className="text-center text-slate-500 text-sm drop-shadow-[0_0_8px_rgba(6,182,212,0.3)]">
            <p>© {new Date().getFullYear()} Neural Interface Corporation</p>
          </div>
        </div>
      </footer>

    
      {showAddToCartModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={() => setShowAddToCartModal(false)}></div>
          
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: `linear-gradient(0deg, transparent 50%, rgba(6, 182, 212, 0.5) 50%)`,
            backgroundSize: '4px 4px'
          }}></div>
          
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-transparent to-blue-500/5 animate-pulse"></div>
          
          <div className="relative bg-gradient-to-br from-slate-900/40 to-slate-800/30 backdrop-blur-xl rounded-2xl border border-cyan-500/30 shadow-[0_0_80px_rgba(6,182,212,0.8)] max-w-md w-full overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse"></div>
            
            <div className="p-6 border-b border-cyan-500/20 bg-gradient-to-r from-slate-900/50 to-slate-800/40">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-1 drop-shadow-[0_0_15px_rgba(6,182,212,0.8)]">ADDED TO CART</h2>
                  <p className="text-cyan-300/70 text-sm">Item added successfully</p>
                </div>
                <button 
                  onClick={() => setShowAddToCartModal(false)}
                  className="p-2 rounded-lg border border-cyan-500/30 hover:border-cyan-400/50 hover:bg-cyan-500/10 hover:shadow-[0_0_20px_rgba(6,182,212,0.6)] transition-all"
                >
                  <FiX className="text-cyan-300 drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]" />
                </button>
              </div>
            </div>

            <div className="p-8">
              <div className="text-center mb-6">
                <FiShoppingCart className="text-5xl text-cyan-400 mx-auto mb-4 drop-shadow-[0_0_25px_rgba(6,182,212,0.9)] animate-pulse" />
                <div className="text-cyan-300 text-lg font-bold mb-2 drop-shadow-[0_0_12px_rgba(6,182,212,0.7)]">
                  {quantity} × {part.name}
                </div>
                <p className="text-gray-300 text-sm">
                  Item added to your shopping cart
                </p>
              </div>
              
              <div className="bg-slate-900/40 rounded-xl p-4 mb-6 border border-cyan-500/20">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-cyan-300/90">Quantity</span>
                    <span className="text-white font-bold">{quantity}</span>
                  </div>
                  {selectedAttachments.length > 0 && (
                    <div className="flex justify-between">
                      <span className="text-cyan-300/90">Attachments</span>
                      <span className="text-white font-bold">{selectedAttachments.length}</span>
                    </div>
                  )}
                  {selectedPerks.length > 0 && (
                    <div className="flex justify-between">
                      <span className="text-purple-300/90">Perks</span>
                      <span className="text-white font-bold">{selectedPerks.length}</span>
                    </div>
                  )}
                  <div className="pt-3 border-t border-cyan-500/30">
                    <div className="flex justify-between text-lg">
                      <span className="text-cyan-300 font-semibold">Total</span>
                      <span className="text-green-400 font-bold">${total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-4">
                <button
                  onClick={() => setShowAddToCartModal(false)}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-slate-800/30 to-slate-700/30 text-cyan-300 rounded-xl border border-cyan-500/30 hover:border-cyan-400/50 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all hover:scale-[1.02]"
                >
                  Continue Browsing
                </button>
                <button
                  onClick={() => {
                    setShowAddToCartModal(false);
                    navigate('/cyborg/cart');
                  }}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 text-white rounded-xl border border-cyan-500/40 hover:border-cyan-400/50 hover:shadow-[0_0_25px_rgba(6,182,212,0.6)] transition-all hover:scale-[1.02]"
                >
                  View Cart
                </button>
              </div>
            </div>
            
            <div className="h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse"></div>
          </div>
        </div>
      )}
    </CyborgLayout>
  );
};

export default PartsPage;