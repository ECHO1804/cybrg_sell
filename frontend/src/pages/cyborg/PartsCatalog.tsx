import { useState } from 'react';
import CyborgLayout from './components/CyborgLayout';
import { FiSearch, FiFilter } from 'react-icons/fi';

// Mock dataas
const mockParts = [
  {
    id: 1,
    name: 'Titanium Arm Prosthetic',
    category: 'arm',
    description: 'Advanced titanium arm with neural interface',
    base_price: 2500,
    quality_tier: 'premium' as const,
    rating: 4.8,
    reviews_count: 142,
    images: ['/api/placeholder/300/200'],
    available_attachments_slot: 3,
    available_perks_slot: 2
  },
  {
    id: 2,
    name: 'Enhanced Optical Eye',
    category: 'eye', 
    description: 'High-resolution optical sensor with zoom capability',
    base_price: 1200,
    quality_tier: 'standard' as const,
    rating: 4.3,
    reviews_count: 89,
    images: ['/api/placeholder/300/200'],
    available_attachments_slot: 2,
    available_perks_slot: 1
  },
  {
    id: 3,
    name: 'Carbon Fiber Leg',
    category: 'leg',
    description: 'Lightweight carbon fiber leg assembly',
    base_price: 1800,
    quality_tier: 'premium' as const,
    rating: 4.6,
    reviews_count: 67,
    images: ['/api/placeholder/300/200'],
    available_attachments_slot: 2,
    available_perks_slot: 2
  }
];

const categoryLabels = {
  arm: 'Arm',
  leg: 'Leg', 
  eye: 'Eye',
  torso: 'Torso',
  organ: 'Organ'
};

const qualityTierColors = {
  cheap: 'bg-yellow-500',
  standard: 'bg-blue-500',
  premium: 'bg-purple-500'
};

const PartsCatalog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedQuality, setSelectedQuality] = useState<string>('all');

  const categories = ['all', 'arm', 'leg', 'eye', 'torso', 'organ'];
  const qualities = ['all', 'cheap', 'standard', 'premium'];

  const filteredParts = mockParts.filter(part => {
    const matchesSearch = part.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         part.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || part.category === selectedCategory;
    const matchesQuality = selectedQuality === 'all' || part.quality_tier === selectedQuality;
    
    return matchesSearch && matchesCategory && matchesQuality;
  });

  return (
    <CyborgLayout cartItemsCount={0}>
   
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-cyan-400 mb-2">Parts Catalog</h1>
        <p className="text-gray-400">Browse and find the cyborg part you need or want to buy!</p>
      </div>

      {/* search */}
      <div className="bg-slate-800/50 rounded-lg p-6 mb-8 border border-slate-700">
        <div className="flex flex-col md:flex-row gap-4">
    
          <div className="flex-1 relative">
            <FiSearch className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search parts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-cyan-500"
            />
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-cyan-500"
          >
            <option value="all">All Categories</option>
            {categories.filter(cat => cat !== 'all').map(category => (
              <option key={category} value={category}>
                {categoryLabels[category as keyof typeof categoryLabels]}
              </option>
            ))}
          </select>

          {/* quality filter */}
          <select
            value={selectedQuality}
            onChange={(e) => setSelectedQuality(e.target.value)}
            className="px-4 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-cyan-500"
          >
            <option value="all">All Qualities</option>
            {qualities.filter(qual => qual !== 'all').map(quality => (
              <option key={quality} value={quality}>
                {quality.charAt(0).toUpperCase() + quality.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredParts.map(part => (
          <div
            key={part.id}
            className="bg-slate-800/50 rounded-lg overflow-hidden border border-slate-700 hover:border-cyan-500/50 transition-all duration-200 hover:transform hover:scale-105"
          >
            {/*Image */}
            <div className="h-48 bg-slate-700 flex items-center justify-center">
              <span className="text-gray-400">Part Image</span>
            </div>

            {/*info */}
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-semibold text-white">{part.name}</h3>
                <span className={`px-2 py-1 rounded text-xs font-medium ${qualityTierColors[part.quality_tier]}`}>
                  {part.quality_tier}
                </span>
              </div>

              <p className="text-gray-400 text-sm mb-4">{part.description}</p>

              <div className="flex justify-between items-center mb-4">
                <span className="text-2xl font-bold text-cyan-400">
                  ${part.base_price}
                </span>
                <div className="flex items-center space-x-1">
                  <span className="text-yellow-400">★</span>
                  <span className="text-white">{part.rating}</span>
                  <span className="text-gray-400">({part.reviews_count})</span>
                </div>
              </div>

              <div className="flex justify-between text-sm text-gray-400 mb-4">
                <span>Attachments: {part.available_attachments_slot}</span>
                <span>Perks: {part.available_perks_slot}</span>
              </div>

              <button className="w-full bg-cyan-600 hover:bg-cyan-700 text-white py-2 px-4 rounded-lg transition-colors duration-200 font-medium">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* if no items */}
      {filteredParts.length === 0 && (
        <div className="text-center py-12">
          <FiFilter className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl text-gray-400 mb-2">No parts found</h3>
          <p className="text-gray-500">Try adjusting your search or filters</p>
        </div>
      )}
    </CyborgLayout>
  );
};

export default PartsCatalog;

