import { useState, useRef, useEffect } from 'react';
import { FiSearch, FiFilter, FiShoppingCart, FiPackage, FiTool, FiZap, FiX, FiChevronLeft, FiChevronRight, FiCheck } from 'react-icons/fi';
import CyborgLayout from './components/CyborgLayout';

const PartsCatalog = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [selectedPart, setSelectedPart] = useState<any>(null);
  const [isHoloModalOpen, setIsHoloModalOpen] = useState(false);
  const [modalSelectedAttachments, setModalSelectedAttachments] = useState<number[]>([]);
  const [modalSelectedPerks, setModalSelectedPerks] = useState<number[]>([]);
  const filterRef = useRef<HTMLDivElement>(null);
  const itemsPerPage = 12;

  const parts = [
    { id: 'PRT-001', name: 'Quantum Arm', category: 'Arm', price: '$2,500', description: 'Advanced neural-controlled arm with precision sensors', maxAttachments: 3, maxPerks: 2, image: '/api/placeholder/400/300' },
    { id: 'PRT-002', name: 'Neural Processor', category: 'Organ', price: '$1,800', description: 'High-speed cognitive processing unit', maxAttachments: 2, maxPerks: 3, image: '/api/placeholder/400/300' },
    { id: 'PRT-003', name: 'Titanium Leg', category: 'Leg', price: '$2,200', description: 'Durable leg with hydraulic boost system', maxAttachments: 4, maxPerks: 2, image: '/api/placeholder/400/300' },
    { id: 'PRT-004', name: 'Holo-Vision Eye', category: 'Organ', price: '$1,500', description: 'Enhanced vision with augmented reality overlay', maxAttachments: 3, maxPerks: 1, image: '/api/placeholder/400/300' },
    { id: 'PRT-005', name: 'Carbon Fiber Torso', category: 'Torso', price: '$3,000', description: 'Lightweight torso with integrated armor', maxAttachments: 5, maxPerks: 3, image: '/api/placeholder/400/300' },
    { id: 'PRT-006', name: 'Synthetic Heart', category: 'Organ', price: '$4,200', description: 'Advanced life support and energy system', maxAttachments: 2, maxPerks: 4, image: '/api/placeholder/400/300' },
    { id: 'PRT-007', name: 'Hydraulic Arm', category: 'Arm', price: '$1,900', description: 'Industrial strength arm for heavy lifting', maxAttachments: 4, maxPerks: 2, image: '/api/placeholder/400/300' },
    { id: 'PRT-008', name: 'Cybernetic Liver', category: 'Organ', price: '$3,500', description: 'Toxin filtering and metabolic enhancer', maxAttachments: 3, maxPerks: 2, image: '/api/placeholder/400/300' },
    { id: 'PRT-009', name: 'Power Cell', category: 'Organ', price: '$1,600', description: 'Enhanced energy storage and distribution', maxAttachments: 1, maxPerks: 1, image: '/api/placeholder/400/300' },
    { id: 'PRT-010', name: 'Mobility Boost', category: 'Leg', price: '$1,200', description: 'Enhanced speed and agility system', maxAttachments: 2, maxPerks: 3, image: '/api/placeholder/400/300' },
    { id: 'PRT-011', name: 'Sensory Array', category: 'Organ', price: '$2,800', description: 'Multi-spectrum vision and detection suite', maxAttachments: 3, maxPerks: 2, image: '/api/placeholder/400/300' },
    { id: 'PRT-012', name: 'Processing Core', category: 'Organ', price: '$3,200', description: 'Advanced computing and analysis unit', maxAttachments: 2, maxPerks: 4, image: '/api/placeholder/400/300' },
    { id: 'PRT-013', name: 'Stealth Arm', category: 'Arm', price: '$2,800', description: 'Low-profile arm with radar absorbing materials', maxAttachments: 3, maxPerks: 2, image: '/api/placeholder/400/300' },
    { id: 'PRT-014', name: 'Jump Boost Leg', category: 'Leg', price: '$2,500', description: 'Enhanced jumping and impact absorption', maxAttachments: 3, maxPerks: 2, image: '/api/placeholder/400/300' },
    { id: 'PRT-015', name: 'Armored Torso', category: 'Torso', price: '$3,500', description: 'Heavy-duty torso with ballistic protection', maxAttachments: 4, maxPerks: 3, image: '/api/placeholder/400/300' },
  ];

  const categories = ['All', 'Arm', 'Leg', 'Torso', 'Organ'];

  // Modal attachments and perks data
  const modalAttachments = [
    { id: 1, name: 'Laser Emitter', price: 200 },
    { id: 2, name: 'Hydraulic Grip', price: 150 },
    { id: 3, name: 'Sensor Array', price: 300 },
    { id: 4, name: 'Shield Projector', price: 400 },
    { id: 5, name: 'Toolkit Integration', price: 180 }
  ];

  const modalPerks = [
    { id: 1, name: 'Speed Boost', price: 100 },
    { id: 2, name: 'Durability+', price: 150 },
    { id: 3, name: 'Energy Efficiency', price: 120 },
    { id: 4, name: 'Stealth Coating', price: 200 }
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setIsFilterOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredParts = parts.filter(part => {
    const matchesCategory = selectedCategory === 'All' || part.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      part.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      part.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const totalPages = Math.ceil(filteredParts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentParts = filteredParts.slice(startIndex, startIndex + itemsPerPage);

  const openHoloModal = (part: any) => {
    setSelectedPart(part);
    setModalSelectedAttachments([]);
    setModalSelectedPerks([]);
    setIsHoloModalOpen(true);
  };

  const closeHoloModal = () => {
    setIsHoloModalOpen(false);
    setSelectedPart(null);
    setModalSelectedAttachments([]);
    setModalSelectedPerks([]);
  };

  const handleToggleModalAttachment = (attachmentId: number) => {
    if (modalSelectedAttachments.includes(attachmentId)) {
      setModalSelectedAttachments(prev => prev.filter(id => id !== attachmentId));
    } else if (modalSelectedAttachments.length < (selectedPart?.maxAttachments || 0)) {
      setModalSelectedAttachments(prev => [...prev, attachmentId]);
    }
  };

  const handleToggleModalPerk = (perkId: number) => {
    if (modalSelectedPerks.includes(perkId)) {
      setModalSelectedPerks(prev => prev.filter(id => id !== perkId));
    } else if (modalSelectedPerks.length < (selectedPart?.maxPerks || 0)) {
      setModalSelectedPerks(prev => [...prev, perkId]);
    }
  };

  const calculateModalTotal = () => {
    const basePrice = selectedPart ? parseInt(selectedPart.price.replace(/[^0-9]/g, '')) : 0;
    const attachmentsTotal = modalSelectedAttachments.reduce((total, id) => {
      const attachment = modalAttachments.find(a => a.id === id);
      return total + (attachment?.price || 0);
    }, 0);
    const perksTotal = modalSelectedPerks.reduce((total, id) => {
      const perk = modalPerks.find(p => p.id === id);
      return total + (perk?.price || 0);
    }, 0);
    return basePrice + attachmentsTotal + perksTotal;
  };

  const handleAddToCart = () => {
    setCartCount(prev => prev + 1);
    console.log('Added to cart:', selectedPart?.name);
    closeHoloModal();
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

  const getCategoryShineColor = (category: string) => {
    const colors = {
      'Arm': 'rgba(6, 182, 212, 0.7)',
      'Leg': 'rgba(168, 85, 247, 0.7)',
      'Torso': 'rgba(249, 115, 22, 0.7)',
      'Organ': 'rgba(244, 63, 94, 0.7)'
    };
    return colors[category as keyof typeof colors] || 'rgba(100, 116, 139, 0.7)';
  };

  return (
    <CyborgLayout cartItemsCount={cartCount}>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2 drop-shadow-[0_0_15px_rgba(6,182,212,0.7)]">NEURAL PARTS CATALOG</h1>
        <p className="text-cyan-300/70 drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]">Enhance your capabilities with cybernetic upgrades</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1">
          <div className="relative">
            <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-cyan-400/70 drop-shadow-[0_0_6px_rgba(6,182,212,0.5)]" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search parts by name or description..." 
              className="w-full bg-slate-900/60 border border-cyan-500/30 rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_25px_rgba(6,182,212,0.6)] transition-all drop-shadow-[0_0_10px_rgba(6,182,212,0.4)] backdrop-blur-sm"
            />
          </div>
        </div>
        
        <div className="relative" ref={filterRef}>
          <button 
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 rounded-xl border border-cyan-500/30 hover:border-cyan-400/50 hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] transition-all group drop-shadow-[0_0_12px_rgba(6,182,212,0.5)] backdrop-blur-sm"
          >
            <FiFilter className="group-hover:scale-110 transition-transform" />
            <span>{selectedCategory}</span>
          </button>
          
          {isFilterOpen && (
            <div className="absolute top-full left-0 mt-2 w-56 bg-slate-900/95 backdrop-blur-sm rounded-xl border border-cyan-500/40 shadow-[0_0_50px_rgba(6,182,212,0.5)] p-3 z-20">
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => {
                      setSelectedCategory(category);
                      setCurrentPage(1);
                      setIsFilterOpen(false);
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-10">
        {currentParts.map((part) => (
          <div 
            key={part.id} 
            className="bg-transparent backdrop-blur-sm rounded-2xl overflow-hidden group hover:shadow-[0_0_35px_rgba(6,182,212,0.6)] transition-all duration-300 flex flex-col h-full border border-cyan-500/20 hover:border-cyan-400/40 cursor-pointer"
            onClick={() => window.location.href = `/cyborg/parts/${part.id}`}
          >
          
            <div className="h-56 relative overflow-hidden">
    
              <div className={`absolute inset-0 bg-gradient-to-br ${getCategoryColor(part.category)}`}>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              </div>
              
              
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(circle at center, ${getCategoryShineColor(part.category)} 0%, transparent 70%)`
                }}
              ></div>
              
              
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -inset-x-full -inset-y-1/2 rotate-12 bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-shine"></div>
              </div>

            
              <div className="absolute top-4 left-4 z-10">
                <span className="px-3 py-1.5 rounded-full text-xs font-medium text-white bg-slate-900/90 backdrop-blur-sm border border-cyan-500/40 drop-shadow-[0_0_12px_rgba(6,182,212,0.6)]">
                  {part.category}
                </span>
              </div>

              
              <div className="absolute inset-0 flex items-center justify-center">
                <FiPackage className="text-white/30 text-6xl drop-shadow-[0_0_25px_rgba(6,182,212,0.7)] group-hover:scale-110 group-hover:text-white/40 transition-all duration-500" />
              </div>

            
              <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-950/80 to-transparent"></div>
            </div>

           
            <div className="p-5 flex flex-col flex-grow bg-gradient-to-b from-slate-900/30 to-slate-900/10 backdrop-blur-sm border-t border-cyan-500/10">
             
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white drop-shadow-[0_0_10px_rgba(6,182,212,0.5)] group-hover:text-cyan-300 transition-colors line-clamp-1">
                    {part.name}
                  </h3>
                </div>
                <div className="text-green-400 font-bold text-xl drop-shadow-[0_0_12px_rgba(34,197,94,0.7)] ml-3">
                  {part.price}
                </div>
              </div>

          
              <div className="flex items-center justify-between text-sm text-cyan-300/70 mb-5">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5">
                    <FiTool className="drop-shadow-[0_0_6px_rgba(6,182,212,0.5)]" />
                    <span>{part.maxAttachments} slots</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <FiZap className="drop-shadow-[0_0_6px_rgba(6,182,212,0.5)]" />
                    <span>{part.maxPerks} slots</span>
                  </div>
                </div>
              </div>

             
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  openHoloModal(part);
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-green-500/15 to-emerald-500/15 text-green-300 rounded-lg border border-green-500/30 hover:border-green-400/50 hover:shadow-[0_0_20px_rgba(34,197,94,0.5)] transition-all group/btn backdrop-blur-sm mt-auto"
              >
                <FiShoppingCart className="group-hover/btn:scale-110 transition-transform" />
                <span className="text-sm font-medium">Add to Cart</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mb-10">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-all backdrop-blur-sm ${currentPage === 1 
              ? 'border-slate-700/50 text-slate-500 cursor-not-allowed' 
              : 'border-cyan-500/30 text-cyan-300 hover:border-cyan-400/50 hover:shadow-[0_0_20px_rgba(6,182,212,0.5)] hover:scale-105'
            }`}
          >
            <FiChevronLeft className="drop-shadow-[0_0_6px_rgba(6,182,212,0.5)]" />
            <span className="font-medium">Previous</span>
          </button>
          
          <div className="flex items-center space-x-2">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }
              
              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`w-12 h-12 rounded-xl border transition-all flex items-center justify-center backdrop-blur-sm ${currentPage === pageNum
                    ? 'border-cyan-400/50 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 text-cyan-300 shadow-[0_0_25px_rgba(6,182,212,0.6)] font-bold scale-110'
                    : 'border-slate-700/50 text-gray-400 hover:border-cyan-500/30 hover:text-cyan-300 hover:shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>
          
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-all backdrop-blur-sm ${currentPage === totalPages
              ? 'border-slate-700/50 text-slate-500 cursor-not-allowed'
              : 'border-cyan-500/30 text-cyan-300 hover:border-cyan-400/50 hover:shadow-[0_0_20px_rgba(6,182,212,0.5)] hover:scale-105'
            }`}
          >
            <span className="font-medium">Next</span>
            <FiChevronRight className="drop-shadow-[0_0_6px_rgba(6,182,212,0.5)]" />
          </button>
        </div>
      )}

      <footer className="mt-10 pt-6 border-t border-slate-800/50">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <div className="text-white font-bold text-lg mb-1 drop-shadow-[0_0_10px_rgba(6,182,212,0.5)]">CYBORGMANIA NEURAL MARKET</div>
            <p className="text-slate-400 text-sm drop-shadow-[0_0_8px_rgba(6,182,212,0.4)]">Advanced Cybernetic Parts Catalog v2.1</p>
          </div>
          <div className="text-center text-slate-500 text-sm drop-shadow-[0_0_8px_rgba(6,182,212,0.3)]">
            <p>© {new Date().getFullYear()} Neural Interface Corporation</p>
          </div>
        </div>
      </footer>

      {isHoloModalOpen && selectedPart && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={closeHoloModal}></div>
          
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: `linear-gradient(0deg, transparent 50%, rgba(6, 182, 212, 0.5) 50%)`,
            backgroundSize: '4px 4px'
          }}></div>
          
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-transparent to-purple-500/5 animate-pulse"></div>
          
          <div className="relative bg-gradient-to-br from-slate-900/40 to-slate-800/30 backdrop-blur-xl rounded-2xl border border-cyan-500/30 shadow-[0_0_80px_rgba(6,182,212,0.8)] max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse"></div>
            
            <div className="p-6 border-b border-cyan-500/20 bg-gradient-to-r from-slate-900/80 to-slate-800 sticky top-0 z-10">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-1 drop-shadow-[0_0_15px_rgba(6,182,212,0.8)]">HOLO-CONFIGURATOR</h2>
                  <p className="text-cyan-300/70 text-sm">Customize your {selectedPart.name}</p>
                </div>
                <button 
                  onClick={closeHoloModal}
                  className="p-2 rounded-lg border border-cyan-500/30 hover:border-cyan-400/50 hover:bg-cyan-500/10 hover:shadow-[0_0_20px_rgba(6,182,212,0.6)] transition-all"
                >
                  <FiX className="text-cyan-300 drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]" />
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <div className="text-cyan-300 text-lg font-bold mb-2 drop-shadow-[0_0_12px_rgba(6,182,212,0.7)]">{selectedPart.name}</div>
                  <div className="text-green-400 text-3xl font-bold mb-4 drop-shadow-[0_0_20px_rgba(34,197,94,0.8)]">{selectedPart.price}</div>
                  <p className="text-gray-300 text-sm">{selectedPart.description}</p>
                  
              
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="text-center p-3 rounded-lg bg-cyan-500/10 border border-cyan-500/30">
                      <div className="text-cyan-300 text-sm mb-1">Attachment Slots</div>
                      <div className="text-cyan-200 font-bold">{modalSelectedAttachments.length}/{selectedPart.maxAttachments}</div>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-purple-500/10 border border-purple-500/30">
                      <div className="text-purple-300 text-sm mb-1">Perk Slots</div>
                      <div className="text-purple-200 font-bold">{modalSelectedPerks.length}/{selectedPart.maxPerks}</div>
                    </div>
                  </div>
                </div>
                
             
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-lg font-semibold text-white flex items-center gap-2 drop-shadow-[0_0_10px_rgba(6,182,212,0.6)]">
                      <FiTool />
                      <span>ATTACHMENTS</span>
                    </h3>
                    <div className="text-sm text-cyan-300/70">
                      {modalSelectedAttachments.length}/{selectedPart.maxAttachments}
                    </div>
                  </div>
                  <div className="space-y-2">
                    {modalAttachments.map(attachment => {
                      const isSelected = modalSelectedAttachments.includes(attachment.id);
                      const isDisabled = !isSelected && modalSelectedAttachments.length >= selectedPart.maxAttachments;
                      
                      return (
                        <button
                          key={attachment.id}
                          onClick={() => handleToggleModalAttachment(attachment.id)}
                          disabled={isDisabled}
                          className={`w-full text-left p-3 rounded-lg border transition-all backdrop-blur-sm flex items-center justify-between group ${
                            isSelected
                              ? 'border-cyan-400/50 bg-cyan-500/10 shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                              : isDisabled
                              ? 'border-slate-700/30 bg-slate-800/30 cursor-not-allowed opacity-50'
                              : 'border-cyan-500/20 hover:border-cyan-400/40 hover:shadow-[0_0_10px_rgba(6,182,212,0.2)]'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                              isSelected
                                ? 'bg-cyan-500/20 border border-cyan-400/50'
                                : 'bg-slate-800/50 border border-cyan-500/10'
                            }`}>
                              {isSelected ? (
                                <FiCheck className="text-cyan-300 text-sm drop-shadow-[0_0_6px_rgba(6,182,212,0.6)]" />
                              ) : (
                                <div className="w-4 h-4 rounded border border-cyan-500/30"></div>
                              )}
                            </div>
                            <div>
                              <div className={`text-sm font-medium transition-colors ${
                                isSelected ? 'text-cyan-300' : isDisabled ? 'text-gray-500' : 'text-white group-hover:text-cyan-300'
                              }`}>
                                {attachment.name}
                              </div>
                            </div>
                          </div>
                          <div className={`text-sm font-bold ${
                            isDisabled ? 'text-gray-500' : 'text-green-400 drop-shadow-[0_0_8px_rgba(34,197,94,0.6)]'
                          }`}>
                            +${attachment.price}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
                
                
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-lg font-semibold text-white flex items-center gap-2 drop-shadow-[0_0_10px_rgba(6,182,212,0.6)]">
                      <FiZap />
                      <span>PERKS</span>
                    </h3>
                    <div className="text-sm text-purple-300/70">
                      {modalSelectedPerks.length}/{selectedPart.maxPerks}
                    </div>
                  </div>
                  <div className="space-y-2">
                    {modalPerks.map(perk => {
                      const isSelected = modalSelectedPerks.includes(perk.id);
                      const isDisabled = !isSelected && modalSelectedPerks.length >= selectedPart.maxPerks;
                      
                      return (
                        <button
                          key={perk.id}
                          onClick={() => handleToggleModalPerk(perk.id)}
                          disabled={isDisabled}
                          className={`w-full text-left p-3 rounded-lg border transition-all backdrop-blur-sm flex items-center justify-between group ${
                            isSelected
                              ? 'border-purple-400/50 bg-purple-500/10 shadow-[0_0_15px_rgba(168,85,247,0.3)]'
                              : isDisabled
                              ? 'border-slate-700/30 bg-slate-800/30 cursor-not-allowed opacity-50'
                              : 'border-purple-500/20 hover:border-purple-400/40 hover:shadow-[0_0_10px_rgba(168,85,247,0.2)]'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                              isSelected
                                ? 'bg-purple-500/20 border border-purple-400/50'
                                : 'bg-slate-800/50 border border-purple-500/10'
                            }`}>
                              {isSelected ? (
                                <FiCheck className="text-purple-300 text-sm drop-shadow-[0_0_6px_rgba(168,85,247,0.6)]" />
                              ) : (
                                <div className="w-4 h-4 rounded border border-purple-500/30"></div>
                              )}
                            </div>
                            <div>
                              <div className={`text-sm font-medium transition-colors ${
                                isSelected ? 'text-purple-300' : isDisabled ? 'text-gray-500' : 'text-white group-hover:text-purple-300'
                              }`}>
                                {perk.name}
                              </div>
                            </div>
                          </div>
                          <div className={`text-sm font-bold ${
                            isDisabled ? 'text-gray-500' : 'text-green-400 drop-shadow-[0_0_8px_rgba(34,197,94,0.6)]'
                          }`}>
                            +${perk.price}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
                
               
                <div className="pt-6 border-t border-cyan-500/20">
                  <div className="flex justify-between items-center mb-6">
                    <div className="text-white text-lg">TOTAL</div>
                    <div className="text-3xl font-bold text-green-400 drop-shadow-[0_0_20px_rgba(34,197,94,0.8)]">
                      ${calculateModalTotal().toLocaleString()}
                    </div>
                  </div>
                  <button 
                    onClick={handleAddToCart}
                    className="w-full px-6 py-4 bg-gradient-to-r from-green-500/30 to-emerald-500/30 text-green-300 rounded-xl border border-green-500/40 hover:border-green-400/50 hover:shadow-[0_0_35px_rgba(34,197,94,0.8)] transition-all text-lg font-bold drop-shadow-[0_0_15px_rgba(34,197,94,0.7)] backdrop-blur-sm hover:scale-[1.02]"
                  >
                    <FiShoppingCart className="inline mr-2" />
                    ADD TO CART
                  </button>
                </div>
              </div>
            </div>
            
            <div className="h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse"></div>
          </div>
        </div>
      )}
    </CyborgLayout>
  );
};

export default PartsCatalog;