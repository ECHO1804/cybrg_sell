import { useState, useRef, useEffect } from 'react';
import { FiEdit, FiTrash2, FiPlus, FiSearch, FiFilter, FiX, FiTool, FiZap, FiImage, FiTag, FiDollarSign, FiInfo } from 'react-icons/fi';
import AdminLayout from './components/AdminLayout';

const ProductsList = () => {
  const [isPartsFilterOpen, setIsPartsFilterOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchParts, setSearchParts] = useState('');
  const [currentPartsPage, setCurrentPartsPage] = useState(1);
  const partsPerPage = 6;


  const [isCompatFilterOpen, setIsCompatFilterOpen] = useState(false);
  const [selectedCompatType, setSelectedCompatType] = useState('All');
  const [searchCompat, setSearchCompat] = useState('');
  const [currentCompatPage, setCurrentCompatPage] = useState(1);
  const compatPerPage = 6;

 
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [modalType, setModalType] = useState<'add-part' | 'edit-part' | 'delete-part' | 'add-compatible' | 'edit-compatible' | 'delete-compatible' | null>(null);
  const [selectedPartCategory, setSelectedPartCategory] = useState('Arm');
  const [itemType, setItemType] = useState<'attachment' | 'perk'>('attachment');

  const partsFilterRef = useRef<HTMLDivElement>(null);
  const compatFilterRef = useRef<HTMLDivElement>(null);

  const categories = ['All', 'Arm', 'Leg', 'Torso', 'Organ'];
  const compatTypes = ['All', 'Attachment', 'Perk'];

  const parts = [
    { id: 1, name: 'Quantum Arm', category: 'Arm', price: 2500, maxAttachments: 3, maxPerks: 2, description: 'Advanced neural-controlled arm' },
    { id: 2, name: 'Neural Processor', category: 'Organ', price: 1800, maxAttachments: 2, maxPerks: 3, description: 'High-speed cognitive unit' },
    { id: 3, name: 'Titanium Leg', category: 'Leg', price: 2200, maxAttachments: 4, maxPerks: 2, description: 'Durable hydraulic leg' },
    { id: 4, name: 'Holo-Vision Eye', category: 'Organ', price: 1500, maxAttachments: 3, maxPerks: 1, description: 'Enhanced AR vision' },
    { id: 5, name: 'Carbon Fiber Torso', category: 'Torso', price: 3000, maxAttachments: 5, maxPerks: 3, description: 'Lightweight armored torso' },
    { id: 6, name: 'Synthetic Heart', category: 'Organ', price: 4200, maxAttachments: 2, maxPerks: 4, description: 'Advanced life support' },
  ];

  const compatibles = [
    { id: 1, name: 'Laser Emitter', type: 'attachment' as const, price: 200, description: 'Integrated energy weapon', partCategory: 'Arm' },
    { id: 2, name: 'Hydraulic Grip', type: 'attachment' as const, price: 150, description: 'Enhanced lifting capacity', partCategory: 'Arm' },
    { id: 3, name: 'Sensor Array', type: 'attachment' as const, price: 300, description: '360° environmental scanning', partCategory: 'Organ' },
    { id: 4, name: 'Speed Boost', type: 'perk' as const, price: 100, description: '+25% movement speed', partCategory: 'Leg' },
    { id: 5, name: 'Durability+', type: 'perk' as const, price: 150, description: 'Enhanced structural integrity', partCategory: 'Torso' },
    { id: 6, name: 'Energy Efficiency', type: 'perk' as const, price: 120, description: '-30% power consumption', partCategory: 'Organ' },
    { id: 7, name: 'Shield Projector', type: 'attachment' as const, price: 400, description: 'Energy shield deployment', partCategory: 'Torso' },
    { id: 8, name: 'Stealth Coating', type: 'perk' as const, price: 200, description: 'Reduced thermal signature', partCategory: 'Arm' },
  ];


  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (partsFilterRef.current && !partsFilterRef.current.contains(e.target as Node)) {
        setIsPartsFilterOpen(false);
      }
      if (compatFilterRef.current && !compatFilterRef.current.contains(e.target as Node)) {
        setIsCompatFilterOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

 
  const filteredParts = parts.filter(part => {
    const matchesCategory = selectedCategory === 'All' || part.category === selectedCategory;
    const matchesSearch = searchParts === '' || part.name.toLowerCase().includes(searchParts.toLowerCase());
    return matchesCategory && matchesSearch;
  });

 
  const filteredCompatibles = compatibles.filter(item => {
    const matchesType = selectedCompatType === 'All' || 
      (selectedCompatType === 'Attachment' && item.type === 'attachment') ||
      (selectedCompatType === 'Perk' && item.type === 'perk');
    const matchesSearch = searchCompat === '' || item.name.toLowerCase().includes(searchCompat.toLowerCase());
    return matchesType && matchesSearch;
  });

 
  const totalPartsPages = Math.ceil(filteredParts.length / partsPerPage);
  const totalCompatPages = Math.ceil(filteredCompatibles.length / compatPerPage);
  const startPartsIndex = (currentPartsPage - 1) * partsPerPage;
  const startCompatIndex = (currentCompatPage - 1) * compatPerPage;
  const currentParts = filteredParts.slice(startPartsIndex, startPartsIndex + partsPerPage);
  const currentCompatibles = filteredCompatibles.slice(startCompatIndex, startCompatIndex + compatPerPage);

 
  const openModal = (item: any | null, type: any, itemType?: 'attachment' | 'perk') => {
    setSelectedItem(item);
    setModalType(type);
    if (itemType) setItemType(itemType);
    if (item?.partCategory) setSelectedPartCategory(item.partCategory);
  };

  const closeModal = () => {
    setModalType(null);
    setSelectedItem(null);
  };

  const handleSave = () => {
    console.log('Saved:', { item: selectedItem, type: modalType, partCategory: selectedPartCategory });
    closeModal();
  };

  const handleDelete = () => {
    console.log('Deleted:', selectedItem);
    closeModal();
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

  const getCategoryBadgeColor = (category: string) => {
    const colors = {
      'Arm': 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30',
      'Leg': 'bg-purple-500/10 text-purple-300 border-purple-500/30',
      'Torso': 'bg-orange-500/10 text-orange-300 border-orange-500/30',
      'Organ': 'bg-red-500/10 text-red-300 border-red-500/30'
    };
    return colors[category as keyof typeof colors] || 'bg-slate-500/10 text-slate-300 border-slate-500/30';
  };


  const Modal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={closeModal}></div>
      
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `linear-gradient(0deg, transparent 50%, rgba(6, 182, 212, 0.5) 50%)`,
        backgroundSize: '4px 4px'
      }}></div>
      
      <div className={`absolute inset-0 animate-pulse ${
        modalType?.includes('delete') 
          ? 'bg-linear-to-r from-red-500/5 via-transparent to-pink-500/5'
          : modalType?.includes('compatible')
          ? 'bg-linear-to-r from-purple-500/5 via-transparent to-pink-500/5'
          : 'bg-linear-to-r from-cyan-500/5 via-transparent to-blue-500/5'
      }`}></div>
      
      <div className={`relative backdrop-blur-xl rounded-2xl border shadow-[0_0_80px_rgba(6,182,212,0.8)] max-w-lg w-full overflow-hidden z-50 ${
        modalType?.includes('delete') 
          ? 'bg-linear-to-br from-slate-900/40 to-red-900/20 border-red-500/30'
          : modalType?.includes('compatible')
          ? 'bg-linear-to-br from-slate-900/40 to-purple-900/20 border-purple-500/30'
          : 'bg-linear-to-br from-slate-900/40 to-slate-800/30 border-cyan-500/30'
      }`}>
        <div className={`h-1 bg-linear-to-r from-transparent ${modalType?.includes('delete') ? 'via-red' : modalType?.includes('compatible') ? 'via-purple' : 'via-cyan'}-400 to-transparent animate-pulse`}></div>
        
        <div className="p-6 border-b border-cyan-500/20 bg-linear-to-r from-slate-900 to-slate-800">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-white mb-1 drop-shadow-[0_0_15px_rgba(6,182,212,0.8)]">
                {modalType === 'add-part' && 'ADD PART'}
                {modalType === 'edit-part' && 'EDIT PART'}
                {modalType === 'delete-part' && 'DELETE PART'}
                {modalType === 'add-compatible' && 'ADD COMPATIBLE'}
                {modalType === 'edit-compatible' && 'EDIT COMPATIBLE'}
                {modalType === 'delete-compatible' && 'DELETE COMPATIBLE'}
              </h2>
              <p className="text-cyan-300/70 text-sm">
                {modalType?.includes('delete') ? 'Confirm action' : 'Fill in details'}
              </p>
            </div>
            <button 
              onClick={closeModal}
              className="p-2 rounded-lg border border-cyan-500/30 hover:border-cyan-400/50 hover:bg-cyan-500/10 hover:shadow-[0_0_20px_rgba(6,182,212,0.6)] transition-all"
            >
              <FiX className="text-cyan-300 drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]" />
            </button>
          </div>
        </div>

        <div className="p-6 max-h-[70vh] overflow-y-auto">
          {modalType?.includes('delete') ? (
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-linear-to-r from-red-500/20 to-pink-500/20 border border-red-500/40 flex items-center justify-center shadow-[0_0_30px_rgba(239,68,68,0.4)]">
                <FiTrash2 className="text-red-400 text-3xl drop-shadow-[0_0_10px_rgba(239,68,68,0.6)]" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Confirm Deletion</h3>
              <p className="text-gray-300 mb-8 text-lg">
                Delete <span className="text-cyan-300 font-bold">{selectedItem?.name}</span>?
              </p>
              <div className="flex gap-4">
                <button 
                  onClick={closeModal}
                  className="flex-1 px-6 py-3 bg-linear-to-r from-slate-800/30 to-slate-700/30 text-cyan-300 rounded-xl border border-cyan-500/30 hover:border-cyan-400/50 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleDelete}
                  className="flex-1 px-6 py-3 bg-linear-to-r from-red-500/30 to-pink-500/30 text-red-300 rounded-xl border border-red-500/40 hover:border-red-400/50 hover:shadow-[0_0_35px_rgba(239,68,68,0.8)] transition-all"
                >
                  Delete
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex justify-center">
                <div className="relative w-32 h-32 rounded-xl bg-linear-to-br from-slate-800 to-slate-900 border border-cyan-500/30 flex items-center justify-center">
                  <FiImage className="text-cyan-400/50 text-5xl" />
                  <div className="absolute bottom-2 right-2">
                    <button className="p-1.5 bg-cyan-500/20 rounded-lg border border-cyan-500/30 hover:bg-cyan-500/30 transition-colors">
                      <FiEdit className="text-cyan-300 text-sm" />
                    </button>
                  </div>
                </div>
              </div>

              {modalType?.includes('compatible') && (
                <>
                  <div className="flex gap-4 p-3 bg-slate-800/30 rounded-lg border border-cyan-500/20">
                    <label className="flex items-center gap-2 cursor-pointer flex-1">
                      <input 
                        type="radio" 
                        name="itemType"
                        checked={itemType === 'attachment'}
                        onChange={() => setItemType('attachment')}
                        className="accent-cyan-500"
                      />
                      <FiTool className="text-cyan-400" />
                      <span className="text-white">Attachment</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer flex-1">
                      <input 
                        type="radio" 
                        name="itemType"
                        checked={itemType === 'perk'}
                        onChange={() => setItemType('perk')}
                        className="accent-purple-500"
                      />
                      <FiZap className="text-purple-400" />
                      <span className="text-white">Perk</span>
                    </label>
                  </div>

                  <div>
                    <label className="block text-sm text-cyan-300/70 mb-2">Compatible Part Category</label>
                    <select 
                      value={selectedPartCategory}
                      onChange={(e) => setSelectedPartCategory(e.target.value)}
                      className="w-full bg-slate-800/50 border border-cyan-500/40 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(6,182,212,0.5)]"
                    >
                      {categories.filter(cat => cat !== 'All').map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                </>
              )}

              <div>
                <label className="block text-sm text-cyan-300/70 mb-2">
                  <FiTag className="inline mr-2" />
                  Name
                </label>
                <input 
                  type="text" 
                  defaultValue={selectedItem?.name || ''}
                  placeholder="Enter name"
                  className="w-full bg-slate-800/50 border border-cyan-500/40 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(6,182,212,0.5)]"
                />
              </div>

              <div>
                <label className="block text-sm text-cyan-300/70 mb-2">
                  <FiDollarSign className="inline mr-2" />
                  Price
                </label>
                <input 
                  type="number" 
                  defaultValue={selectedItem?.price || ''}
                  placeholder="0.00"
                  className="w-full bg-slate-800/50 border border-cyan-500/40 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(6,182,212,0.5)]"
                />
              </div>

              <div>
                <label className="block text-sm text-cyan-300/70 mb-2">
                  <FiInfo className="inline mr-2" />
                  Description
                </label>
                <textarea 
                  defaultValue={selectedItem?.description || ''}
                  placeholder="Description..."
                  className="w-full bg-slate-800/50 border border-cyan-500/40 rounded-lg px-4 py-3 text-white min-h-20 focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(6,182,212,0.5)]"
                />
              </div>

              {modalType?.includes('part') && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-cyan-300/70 mb-2">Category</label>
                    <select 
                      defaultValue={selectedItem?.category || 'Arm'}
                      className="w-full bg-slate-800/50 border border-cyan-500/40 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(6,182,212,0.5)]"
                    >
                      {categories.filter(cat => cat !== 'All').map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-cyan-300/70 mb-2">Max Attachments</label>
                    <input 
                      type="number" 
                      defaultValue={selectedItem?.maxAttachments || 3}
                      min="0"
                      max="10"
                      className="w-full bg-slate-800/50 border border-cyan-500/40 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(6,182,212,0.5)]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-purple-300/70 mb-2">Max Perks</label>
                    <input 
                      type="number" 
                      defaultValue={selectedItem?.maxPerks || 2}
                      min="0"
                      max="10"
                      className="w-full bg-slate-800/50 border border-purple-500/40 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-400 focus:shadow-[0_0_15px_rgba(168,85,247,0.5)]"
                    />
                  </div>
                </div>
              )}

              <button 
                onClick={handleSave}
                className="w-full mt-4 px-6 py-3 bg-linear-to-r from-cyan-500/30 to-blue-500/30 text-cyan-300 rounded-xl border border-cyan-500/40 hover:border-cyan-400/50 hover:shadow-[0_0_25px_rgba(6,182,212,0.6)] transition-all text-lg font-bold"
              >
                {modalType?.includes('add') ? 'Add' : 'Save Changes'}
              </button>
            </div>
          )}
        </div>
        
        <div className={`h-1 bg-linear-to-r from-transparent ${modalType?.includes('delete') ? 'via-red' : modalType?.includes('compatible') ? 'via-purple' : 'via-cyan'}-400 to-transparent animate-pulse`}></div>
      </div>
    </div>
  );

 
  const Pagination = ({ currentPage, totalPages, setPage }: { currentPage: number, totalPages: number, setPage: React.Dispatch<React.SetStateAction<number>> }) => (
    totalPages > 1 && (
      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          onClick={() => setPage((prev: number) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-all ${currentPage === 1 
            ? 'border-slate-700/50 text-slate-500 cursor-not-allowed' 
            : 'border-cyan-500/30 text-cyan-300 hover:border-cyan-400/50 hover:shadow-[0_0_20px_rgba(6,182,212,0.5)] hover:scale-105'
          }`}
        >
          ← Previous
        </button>
        
        <div className="flex items-center space-x-2">
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            let pageNum;
            if (totalPages <= 5) pageNum = i + 1;
            else if (currentPage <= 3) pageNum = i + 1;
            else if (currentPage >= totalPages - 2) pageNum = totalPages - 4 + i;
            else pageNum = currentPage - 2 + i;
            
            return (
              <button
                key={pageNum}
                onClick={() => setPage(pageNum)}
                className={`w-10 h-10 rounded-xl border transition-all flex items-center justify-center ${currentPage === pageNum
                  ? 'border-cyan-400/50 bg-linear-to-r from-cyan-500/30 to-blue-500/30 text-cyan-300 shadow-[0_0_25px_rgba(6,182,212,0.6)] font-bold scale-110'
                  : 'border-slate-700/50 text-gray-400 hover:border-cyan-500/30 hover:text-cyan-300 hover:shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                }`}
              >
                {pageNum}
              </button>
            );
          })}
        </div>
        
        <button
          onClick={() => setPage((prev: number) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-all ${currentPage === totalPages
            ? 'border-slate-700/50 text-slate-500 cursor-not-allowed'
            : 'border-cyan-500/30 text-cyan-300 hover:border-cyan-400/50 hover:shadow-[0_0_20px_rgba(6,182,212,0.5)] hover:scale-105'
          }`}
        >
          Next →
        </button>
      </div>
    )
  );

  return (
    <AdminLayout>
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2 drop-shadow-[0_0_12px_rgba(6,182,212,0.6)]">PRODUCTS MANAGER</h1>
        <p className="text-cyan-300/70">Manage parts, attachments & perks</p>
      </div>

    
      <div className="mb-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white">ATTACHMENTS & PERKS</h2>
          <button 
            onClick={() => openModal(null, 'add-compatible', 'attachment')}
            className="flex items-center gap-2 px-4 py-2 bg-linear-to-r from-purple-500/20 to-pink-500/20 text-purple-300 rounded-xl border border-purple-500/30 hover:border-purple-400/50 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all"
          >
            <FiPlus />
            Add Compatible
          </button>
        </div>

       
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-400/70" />
              <input 
                type="text" 
                value={searchCompat}
                onChange={(e) => {
                  setSearchCompat(e.target.value);
                  setCurrentCompatPage(1);
                }}
                placeholder="Search attachments & perks..."
                className="w-full bg-slate-900/60 border border-purple-500/30 rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:shadow-[0_0_20px_rgba(168,85,247,0.5)] transition-all drop-shadow-[0_0_8px_rgba(168,85,247,0.3)]"
              />
            </div>
          </div>
          
          <div className="relative" ref={compatFilterRef}>
            <button 
              onClick={() => setIsCompatFilterOpen(!isCompatFilterOpen)}
              className="flex items-center gap-2 px-5 py-3 bg-linear-to-r from-purple-500/20 to-pink-500/20 text-purple-300 rounded-xl border border-purple-500/30 hover:border-purple-400/50 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all group"
            >
              <FiFilter className="group-hover:scale-110 transition-transform" />
              <span>{selectedCompatType}</span>
            </button>
            
            {isCompatFilterOpen && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-slate-900/95 backdrop-blur-sm rounded-xl border border-purple-500/40 shadow-[0_0_50px_rgba(168,85,247,0.5)] p-3 z-20">
                <div className="space-y-2">
                  {compatTypes.map((type) => (
                    <button
                      key={type}
                      onClick={() => {
                        setSelectedCompatType(type);
                        setCurrentCompatPage(1);
                        setIsCompatFilterOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2.5 rounded-lg transition-all text-sm ${selectedCompatType === type ? 'text-purple-300 bg-purple-500/10 border border-purple-500/30' : 'text-gray-300 hover:text-purple-300 hover:bg-purple-500/10'}`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

       
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {currentCompatibles.map(item => (
            <div key={item.id} className="bg-slate-900/60 backdrop-blur-sm rounded-xl border border-slate-700/50 p-4 hover:border-purple-500/30 transition-all">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <div className={`flex items-center gap-2 ${item.type === 'attachment' ? 'text-cyan-300' : 'text-purple-300'}`}>
                    {item.type === 'attachment' ? <FiTool /> : <FiZap />}
                    <span className="font-medium">{item.name}</span>
                  </div>
                  <div className="text-gray-400 text-sm mt-1">{item.description}</div>
                  <div className="mt-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${getCategoryBadgeColor(item.partCategory)}`}>
                      For {item.partCategory}
                    </span>
                  </div>
                </div>
                <div className="text-green-400 font-bold">${item.price}</div>
              </div>
              
              <div className="flex justify-end gap-2">
                <button 
                  onClick={() => openModal(item, 'edit-compatible', item.type)}
                  className="px-3 py-1.5 bg-linear-to-r from-yellow-500/10 to-amber-500/10 text-yellow-300 rounded-lg border border-yellow-500/20 hover:border-yellow-400/30 transition-all"
                >
                  <FiEdit />
                </button>
                <button 
                  onClick={() => openModal(item, 'delete-compatible', item.type)}
                  className="px-3 py-1.5 bg-linear-to-r from-red-500/10 to-pink-500/10 text-red-300 rounded-lg border border-red-500/20 hover:border-red-400/30 transition-all"
                >
                  <FiTrash2 />
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredCompatibles.length === 0 && (
          <div className="text-center py-8 text-cyan-300/70">
            No {selectedCompatType !== 'All' ? selectedCompatType.toLowerCase() : ''} items found
          </div>
        )}

        <Pagination 
          currentPage={currentCompatPage} 
          totalPages={totalCompatPages} 
          setPage={setCurrentCompatPage}
        />
      </div>

  
      <div className="mb-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white">PARTS</h2>
          <button 
            onClick={() => openModal(null, 'add-part')}
            className="flex items-center gap-2 px-4 py-2 bg-linear-to-r from-green-500/20 to-emerald-500/20 text-green-300 rounded-xl border border-green-500/30 hover:border-green-400/50 hover:shadow-[0_0_20px_rgba(34,197,94,0.4)] transition-all"
          >
            <FiPlus />
            Add Part
          </button>
        </div>

       
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-cyan-400/70" />
              <input 
                type="text" 
                value={searchParts}
                onChange={(e) => {
                  setSearchParts(e.target.value);
                  setCurrentPartsPage(1);
                }}
                placeholder="Search parts..."
                className="w-full bg-slate-900/60 border border-cyan-500/30 rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_20px_rgba(6,182,212,0.5)] transition-all drop-shadow-[0_0_8px_rgba(6,182,212,0.3)]"
              />
            </div>
          </div>
          
          <div className="relative" ref={partsFilterRef}>
            <button 
              onClick={() => setIsPartsFilterOpen(!isPartsFilterOpen)}
              className="flex items-center gap-2 px-5 py-3 bg-linear-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 rounded-xl border border-cyan-500/30 hover:border-cyan-400/50 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all group"
            >
              <FiFilter className="group-hover:scale-110 transition-transform" />
              <span>{selectedCategory}</span>
            </button>
            
            {isPartsFilterOpen && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-slate-900/95 backdrop-blur-sm rounded-xl border border-cyan-500/40 shadow-[0_0_50px_rgba(6,182,212,0.5)] p-3 z-20">
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => {
                        setSelectedCategory(category);
                        setCurrentPartsPage(1);
                        setIsPartsFilterOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2.5 rounded-lg transition-all text-sm ${selectedCategory === category ? 'text-cyan-300 bg-cyan-500/10 border border-cyan-500/30' : 'text-gray-300 hover:text-cyan-300 hover:bg-cyan-500/10'}`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

       
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentParts.map(part => (
            <div key={part.id} className="bg-transparent backdrop-blur-sm rounded-xl border border-slate-700/50 overflow-hidden group hover:border-cyan-500/40 hover:shadow-[0_0_30px_rgba(6,182,212,0.3)] transition-all">
              <div className={`h-40 relative bg-linear-to-br ${getCategoryColor(part.category)}`}>
                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent"></div>
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryBadgeColor(part.category)}`}>
                    {part.category}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex justify-between items-end">
                    <div>
                      <div className="text-white font-bold text-xl">{part.name}</div>
                      <div className="text-cyan-300/70 text-sm">Slots: {part.maxAttachments}A/{part.maxPerks}P</div>
                    </div>
                    <div className="text-green-400 font-bold text-xl">${part.price}</div>
                  </div>
                </div>
              </div>

              <div className="p-5">
                <p className="text-gray-300 text-sm mb-4 line-clamp-2">{part.description}</p>
                <div className="flex space-x-3">
                  <button 
                    onClick={() => openModal(part, 'edit-part')}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-linear-to-r from-yellow-500/20 to-amber-500/20 text-yellow-300 rounded-lg border border-yellow-500/30 hover:border-yellow-400/50 hover:shadow-[0_0_15px_rgba(245,158,11,0.4)] transition-all"
                  >
                    <FiEdit />
                    <span className="text-sm">Edit</span>
                  </button>
                  <button 
                    onClick={() => openModal(part, 'delete-part')}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-linear-to-r from-red-500/20 to-pink-500/20 text-red-300 rounded-lg border border-red-500/30 hover:border-red-400/50 hover:shadow-[0_0_15px_rgba(239,68,68,0.4)] transition-all"
                  >
                    <FiTrash2 />
                    <span className="text-sm">Delete</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredParts.length === 0 && (
          <div className="text-center py-8 text-cyan-300/70">
            No parts found
          </div>
        )}

        <Pagination 
          currentPage={currentPartsPage} 
          totalPages={totalPartsPages} 
          setPage={setCurrentPartsPage}
        />
      </div>

    
      <footer className="pt-6 border-t border-slate-800/50">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div>
            <div className="text-white font-bold mb-1">CYBORGMANIA INVENTORY</div>
            <p className="text-slate-400 text-sm">Parts: {parts.length} • Attachments: {compatibles.filter(c => c.type === 'attachment').length} • Perks: {compatibles.filter(c => c.type === 'perk').length}</p>
          </div>
          <div className="text-slate-500 text-sm">
            <p>© {new Date().getFullYear()} Neural Network Operations</p>
          </div>
        </div>
      </footer>

      {modalType && <Modal />}
    </AdminLayout>
  );
};

export default ProductsList;