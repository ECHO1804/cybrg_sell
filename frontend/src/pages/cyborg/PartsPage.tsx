import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CyborgLayout from './components/CyborgLayout';
import { FiShoppingCart, FiZap, FiStar, FiArrowLeft } from 'react-icons/fi';

// Mock data for the specific part
const partData = {
  id: 1,
  name: 'Titanium Arm Prosthetic',
  category: 'arm',
  description: 'Advanced titanium arm with neural interface. Features reinforced joints, haptic feedback sensors, and integrated power management.',
  base_price: 2500,
  quality_tier: 'premium' as const,
  rating: 4.8,
  reviews_count: 142,
  images: ['/api/placeholder/600/400'],
  specifications: {
    weight: '4.2 kg',
    compatibility: 'Neural Interface v3.0+',
    power_consumption: '45W',
    material: 'Grade 5 Titanium'
  },
  available_attachments_slot: 3,
  available_perks_slot: 2
};

// Mock attachments
const mockAttachments = [
  { id: 1, name: 'Laser Sight', type: 'weapon', price: 300, slot: 'wrist', description: 'Precision targeting laser' },
  { id: 2, name: 'Grip Enhancer', type: 'tool', price: 150, slot: 'palm', description: 'Enhanced grip strength' },
  { id: 3, name: 'Holographic Display', type: 'aesthetic', price: 200, slot: 'forearm', description: 'Projected holographic interface' },
  { id: 4, name: 'Grappling Hook', type: 'tool', price: 450, slot: 'wrist', description: 'Retractable grappling system' },
];

// Mock perks
const mockPerks = [
  { id: 1, name: 'Enhanced Durability', tier: 'advanced', price: 200, description: '+40% structural integrity' },
  { id: 2, name: 'Rapid Response', tier: 'elite', price: 350, description: '15% faster neural response time' },
  { id: 3, name: 'Energy Efficient', tier: 'basic', price: 120, description: '-25% power consumption' },
  { id: 4, name: 'Stealth Coating', tier: 'advanced', price: 280, description: 'Reduced thermal/radar signature' },
];

const PartsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedAttachments, setSelectedAttachments] = useState<number[]>([]);
  const [selectedPerks, setSelectedPerks] = useState<number[]>([]);

  // Calculate total price
  const selectedAttachmentsTotal = mockAttachments
    .filter(att => selectedAttachments.includes(att.id))
    .reduce((sum, att) => sum + att.price, 0);

  const selectedPerksTotal = mockPerks
    .filter(perk => selectedPerks.includes(perk.id))
    .reduce((sum, perk) => sum + perk.price, 0);

  const totalPrice = partData.base_price + selectedAttachmentsTotal + selectedPerksTotal;

  const toggleAttachment = (attachmentId: number) => {
    setSelectedAttachments(prev => {
      if (prev.includes(attachmentId)) {
        return prev.filter(id => id !== attachmentId);
      } else {
        // Check if we've reached slot limit
        if (prev.length >= partData.available_attachments_slot) {
          alert(`Maximum ${partData.available_attachments_slot} attachments allowed`);
          return prev;
        }
        return [...prev, attachmentId];
      }
    });
  };

  const togglePerk = (perkId: number) => {
    setSelectedPerks(prev => {
      if (prev.includes(perkId)) {
        return prev.filter(id => id !== perkId);
      } else {
        // Check if we've reached slot limit
        if (prev.length >= partData.available_perks_slot) {
          alert(`Maximum ${partData.available_perks_slot} perks allowed`);
          return prev;
        }
        return [...prev, perkId];
      }
    });
  };

  const handleAddToCart = () => {
    alert(`Added to cart!\nTotal: $${totalPrice}\nAttachments: ${selectedAttachments.length}\nPerks: ${selectedPerks.length}`);
    navigate('/cyborg/cart');
  };

  const handleBuyNow = () => {
    alert(`Proceeding to checkout!\nTotal: $${totalPrice}`);
    navigate('/cyborg/cart');
  };

  return (
    <CyborgLayout cartItemsCount={0}>
      {/* Back Button */}
      <button
        onClick={() => navigate('/cyborg/parts')}
        className="flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 mb-6 transition-colors duration-200"
      >
        <FiArrowLeft className="w-5 h-5" />
        <span>Back to Catalog</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column: Part Info */}
        <div>
          {/* Part Image */}
          <div className="bg-slate-800/50 rounded-lg border border-slate-700 p-6 mb-6">
            <div className="h-64 bg-slate-700 rounded-lg flex items-center justify-center">
              <span className="text-gray-400 text-lg">Part Image</span>
            </div>
          </div>

          {/* Specifications */}
          <div className="bg-slate-800/50 rounded-lg border border-slate-700 p-6">
            <h3 className="text-xl font-semibold text-cyan-400 mb-4">Specifications</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-gray-400 text-sm">Weight</span>
                <p className="text-white">{partData.specifications.weight}</p>
              </div>
              <div>
                <span className="text-gray-400 text-sm">Compatibility</span>
                <p className="text-white">{partData.specifications.compatibility}</p>
              </div>
              <div>
                <span className="text-gray-400 text-sm">Power Consumption</span>
                <p className="text-white">{partData.specifications.power_consumption}</p>
              </div>
              <div>
                <span className="text-gray-400 text-sm">Material</span>
                <p className="text-white">{partData.specifications.material}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Details & Customization */}
        <div>
          {/* Part Header */}
          <div className="mb-6">
            <div className="flex justify-between items-start mb-4">
              <h1 className="text-3xl font-bold text-cyan-400">{partData.name}</h1>
              <span className="px-3 py-1 bg-purple-500 rounded-full text-sm font-medium">
                {partData.quality_tier}
              </span>
            </div>
            
            <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center space-x-2">
                <FiStar className="text-yellow-400 w-5 h-5" />
                <span className="text-white">{partData.rating}</span>
                <span className="text-gray-400">({partData.reviews_count} reviews)</span>
              </div>
              <span className="text-gray-400">•</span>
              <span className="text-gray-400 capitalize">{partData.category}</span>
            </div>

            <p className="text-gray-300 mb-6">{partData.description}</p>

            <div className="text-3xl font-bold text-cyan-400 mb-6">
              ${partData.base_price}
            </div>
          </div>

          {/* Attachments Selection */}
          <div className="bg-slate-800/50 rounded-lg border border-slate-700 p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-cyan-400">Attachments</h3>
              <span className="text-sm text-gray-400">
                {selectedAttachments.length}/{partData.available_attachments_slot} selected
              </span>
            </div>
            
            <div className="space-y-3">
              {mockAttachments.map(attachment => (
                <div
                  key={attachment.id}
                  onClick={() => toggleAttachment(attachment.id)}
                  className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                    selectedAttachments.includes(attachment.id)
                      ? 'border-cyan-500 bg-cyan-500/10'
                      : 'border-slate-600 hover:border-slate-500'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium text-white">{attachment.name}</h4>
                      <p className="text-sm text-gray-400">{attachment.description}</p>
                      <div className="flex items-center space-x-4 mt-2">
                        <span className="text-xs px-2 py-1 bg-slate-700 rounded">
                          {attachment.type}
                        </span>
                        <span className="text-xs text-gray-400">Slot: {attachment.slot}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-cyan-400 font-semibold">+${attachment.price}</div>
                      {selectedAttachments.includes(attachment.id) && (
                        <div className="text-xs text-green-400">✓ Selected</div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Perks Selection */}
          <div className="bg-slate-800/50 rounded-lg border border-slate-700 p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-cyan-400">Perks</h3>
              <span className="text-sm text-gray-400">
                {selectedPerks.length}/{partData.available_perks_slot} selected
              </span>
            </div>
            
            <div className="space-y-3">
              {mockPerks.map(perk => (
                <div
                  key={perk.id}
                  onClick={() => togglePerk(perk.id)}
                  className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                    selectedPerks.includes(perk.id)
                      ? 'border-cyan-500 bg-cyan-500/10'
                      : 'border-slate-600 hover:border-slate-500'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium text-white">{perk.name}</h4>
                      <p className="text-sm text-gray-400">{perk.description}</p>
                      <div className="flex items-center space-x-4 mt-2">
                        <span className={`text-xs px-2 py-1 rounded ${
                          perk.tier === 'basic' ? 'bg-blue-500/30' :
                          perk.tier === 'advanced' ? 'bg-purple-500/30' :
                          'bg-amber-500/30'
                        }`}>
                          {perk.tier}
                        </span>
                        <FiZap className="w-4 h-4 text-yellow-400" />
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-cyan-400 font-semibold">+${perk.price}</div>
                      {selectedPerks.includes(perk.id) && (
                        <div className="text-xs text-green-400">✓ Selected</div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Price Summary & Actions */}
          <div className="bg-slate-800/50 rounded-lg border border-slate-700 p-6">
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-white mb-4">Price Summary</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">Base Price</span>
                  <span className="text-white">${partData.base_price}</span>
                </div>
                {selectedAttachments.length > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">Attachments ({selectedAttachments.length})</span>
                    <span className="text-cyan-400">+${selectedAttachmentsTotal}</span>
                  </div>
                )}
                {selectedPerks.length > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">Perks ({selectedPerks.length})</span>
                    <span className="text-cyan-400">+${selectedPerksTotal}</span>
                  </div>
                )}
                <div className="border-t border-slate-700 pt-3">
                  <div className="flex justify-between text-xl font-bold">
                    <span className="text-cyan-400">Total</span>
                    <span className="text-cyan-400">${totalPrice}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-cyan-600 hover:bg-cyan-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                <FiShoppingCart className="w-5 h-5" />
                <span>Add to Cart</span>
              </button>
              <button
                onClick={handleBuyNow}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-200"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </CyborgLayout>
  );
};

export default PartsPage;