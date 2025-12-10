import { useState, useRef, useEffect } from 'react';
import { FiEdit, FiTrash2, FiPlus, FiSearch, FiFilter, FiPackage, FiEye, FiX, FiImage, FiTag, FiDollarSign, FiInfo } from 'react-icons/fi';
import AdminLayout from './components/AdminLayout';

const ProductsList = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [modalType, setModalType] = useState<'view' | 'edit' | 'add' | 'delete' | null>(null);
  const filterRef = useRef<HTMLDivElement>(null);

  // Sample product data PARTS table
  const products = [
    { id: 'PRT-001', name: 'Quantum Arm', category: 'Arm', price: '$2,500', stock: 15, status: 'Active', image: '/api/placeholder/100/100' },
    { id: 'PRT-002', name: 'Neural Processor', category: 'Brain', price: '$1,800', stock: 8, status: 'Active', image: '/api/placeholder/100/100' },
    { id: 'PRT-003', name: 'Titanium Leg', category: 'Leg', price: '$2,200', stock: 0, status: 'Out of Stock', image: '/api/placeholder/100/100' },
    { id: 'PRT-004', name: 'Holo-Vision Eye', category: 'Eye', price: '$1,500', stock: 22, status: 'Active', image: '/api/placeholder/100/100' },
    { id: 'PRT-005', name: 'Carbon Fiber Torso', category: 'Torso', price: '$3,000', stock: 5, status: 'Low Stock', image: '/api/placeholder/100/100' },
    { id: 'PRT-006', name: 'Synthetic Heart', category: 'Organ', price: '$4,200', stock: 3, status: 'Low Stock', image: '/api/placeholder/100/100' },
  ];

  const categories = ['All', 'Arm', 'Leg', 'Eye', 'Torso', 'Organ', 'Brain', 'Attachment', 'Perk'];


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setIsFilterOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const openModal = (product: any | null, type: 'view' | 'edit' | 'add' | 'delete') => {
    setSelectedProduct(product);
    setModalType(type);
  };

  const closeModal = () => {
    setModalType(null);
    setSelectedProduct(null);
  };

  const handleDelete = () => {
    console.log('Deleting product:', selectedProduct?.id);
    closeModal();
  };

  const handleSave = () => {
    console.log('Saving product:', selectedProduct);
    closeModal();
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Active': return 'text-green-400 drop-shadow-[0_0_6px_rgba(34,197,94,0.6)]';
      case 'Low Stock': return 'text-yellow-400 drop-shadow-[0_0_6px_rgba(245,158,11,0.6)]';
      case 'Out of Stock': return 'text-red-400 drop-shadow-[0_0_6px_rgba(239,68,68,0.6)]';
      default: return 'text-gray-400';
    }
  };

  return (
    <AdminLayout>
     
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 drop-shadow-[0_0_12px_rgba(6,182,212,0.6)]">NEURAL PRODUCTS</h1>
          <p className="text-cyan-300/70 drop-shadow-[0_0_6px_rgba(6,182,212,0.4)]">Manage cyborg parts, attachments & perks</p>
        </div>
        <button 
          onClick={() => openModal(null, 'add')}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-300 rounded-xl border border-green-500/30 hover:border-green-400/50 hover:shadow-[0_0_20px_rgba(34,197,94,0.4)] transition-all group drop-shadow-[0_0_10px_rgba(34,197,94,0.3)]"
        >
          <FiPlus className="group-hover:scale-110 transition-transform" />
          <span className="font-medium">Add Product</span>
        </button>
      </div>

     
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1 flex gap-3">
          <div className="flex-1">
            <div className="relative">
              <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-cyan-400/70" />
              <input 
                type="text" 
                placeholder="Search products by name, ID, or category..." 
                className="w-full bg-slate-900/60 border border-cyan-500/30 rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_20px_rgba(6,182,212,0.5)] transition-all drop-shadow-[0_0_8px_rgba(6,182,212,0.3)]"
              />
            </div>
          </div>
          

          <div className="relative" ref={filterRef}>
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 rounded-xl border border-cyan-500/30 hover:border-cyan-400/50 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all group drop-shadow-[0_0_10px_rgba(6,182,212,0.4)]"
            >
              <FiFilter className="group-hover:scale-110 transition-transform" />
              <span>Categories</span>
            </button>
            
            {isFilterOpen && (
              <div className="absolute top-full left-0 mt-2 w-56 bg-slate-900/95 backdrop-blur-sm rounded-xl border border-cyan-500/30 shadow-[0_0_40px_rgba(6,182,212,0.4)] p-4 z-20">
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      className="w-full text-left px-3 py-2 rounded-lg text-gray-300 hover:text-cyan-300 hover:bg-cyan-500/10 transition-colors text-sm"
                      onClick={() => {
                        console.log('Filter by:', category);
                        setIsFilterOpen(false);
                      }}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

   
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {products.map((product) => (
          <div key={product.id} className="bg-slate-900/60 backdrop-blur-sm rounded-xl border border-slate-700/50 overflow-hidden group hover:border-cyan-500/40 hover:shadow-[0_0_30px_rgba(6,182,212,0.3)] transition-all">
           
            <div className="h-48 bg-gradient-to-br from-slate-800 to-slate-900 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              <div className="absolute top-4 left-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(product.status)} bg-slate-900/70 backdrop-blur-sm border border-slate-700/50`}>
                  {product.status}
                </span>
              </div>
              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex justify-between items-end">
                  <div>
                    <div className="text-white font-bold text-xl drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]">{product.name}</div>
                    <div className="text-cyan-300/70 text-sm">{product.category}</div>
                  </div>
                  <div className="text-green-400 font-bold text-xl drop-shadow-[0_0_8px_rgba(34,197,94,0.6)]">{product.price}</div>
                </div>
              </div>
            </div>

        
            <div className="p-5">
              <div className="flex justify-between items-center mb-4">
                <div className="text-cyan-300/70 font-mono text-sm">ID: {product.id}</div>
                <div className="text-gray-400 text-sm">Stock: {product.stock}</div>
              </div>

          
              <div className="flex space-x-3">
                <button 
                  onClick={() => openModal(product, 'view')}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 rounded-lg border border-cyan-500/30 hover:border-cyan-400/50 hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all group/btn"
                >
                  <FiEye className="group-hover/btn:scale-110 transition-transform" />
                  <span className="text-sm">View</span>
                </button>
                <button 
                  onClick={() => openModal(product, 'edit')}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-yellow-500/20 to-amber-500/20 text-yellow-300 rounded-lg border border-yellow-500/30 hover:border-yellow-400/50 hover:shadow-[0_0_15px_rgba(245,158,11,0.4)] transition-all group/btn"
                >
                  <FiEdit className="group-hover/btn:scale-110 transition-transform" />
                  <span className="text-sm">Edit</span>
                </button>
                <button 
                  onClick={() => openModal(product, 'delete')}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-red-500/20 to-pink-500/20 text-red-300 rounded-lg border border-red-500/30 hover:border-red-400/50 hover:shadow-[0_0_15px_rgba(239,68,68,0.4)] transition-all group/btn"
                >
                  <FiTrash2 className="group-hover/btn:scale-110 transition-transform" />
                  <span className="text-sm">Delete</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      
      <footer className="pt-6 border-t border-slate-800/50">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <div className="text-white font-bold text-lg mb-1 drop-shadow-[0_0_10px_rgba(6,182,212,0.5)]">CYBORGMANIA PRODUCT CATALOG</div>
            <p className="text-slate-400 text-sm drop-shadow-[0_0_6px_rgba(6,182,212,0.4)]">Parts + Attachments + Perks Management v2.1</p>
          </div>
          <div className="text-center text-slate-500 text-sm drop-shadow-[0_0_6px_rgba(6,182,212,0.3)]">
            <p>© {new Date().getFullYear()} Neural Network Operations. {products.length} products in catalog.</p>
          </div>
        </div>
      </footer>

     
      {modalType && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="relative bg-slate-900/95 backdrop-blur-sm rounded-2xl border border-cyan-500/40 shadow-[0_0_60px_rgba(6,182,212,0.6)] max-w-lg w-full overflow-hidden">
            
          
            <div className="p-6 border-b border-slate-700/50 bg-gradient-to-r from-slate-900/80 to-slate-800/60">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold text-white drop-shadow-[0_0_12px_rgba(6,182,212,0.7)]">
                    {modalType === 'view' && 'PRODUCT DETAILS'}
                    {modalType === 'edit' && 'EDIT PRODUCT'}
                    {modalType === 'add' && 'ADD NEW PRODUCT'}
                    {modalType === 'delete' && 'DELETE PRODUCT'}
                  </h2>
                  {selectedProduct && (
                    <p className="text-cyan-300/70 text-sm mt-1">ID: {selectedProduct.id}</p>
                  )}
                </div>
                <button 
                  onClick={closeModal}
                  className="p-2 rounded-lg border border-cyan-500/30 hover:border-cyan-400/50 hover:bg-cyan-500/10 hover:shadow-[0_0_15px_rgba(6,182,212,0.5)] transition-all"
                >
                  <FiX className="text-cyan-300 drop-shadow-[0_0_6px_rgba(6,182,212,0.5)]" />
                </button>
              </div>
            </div>

          
            <div className="p-6 max-h-[70vh] overflow-y-auto">
              {modalType === 'delete' ? (
                
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-red-500/20 to-pink-500/20 border border-red-500/40 flex items-center justify-center shadow-[0_0_30px_rgba(239,68,68,0.4)]">
                    <FiTrash2 className="text-red-400 text-3xl drop-shadow-[0_0_10px_rgba(239,68,68,0.6)]" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3 drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]">Confirm Deletion</h3>
                  <p className="text-gray-300 mb-8 text-lg">
                    Delete product <span className="text-cyan-300 font-bold">{selectedProduct?.name}</span> ({selectedProduct?.id})?
                  </p>
                  <div className="flex space-x-4">
                    <button 
                      onClick={closeModal}
                      className="flex-1 px-6 py-4 bg-gradient-to-r from-slate-800/60 to-slate-900/60 text-gray-300 rounded-xl border border-slate-700/50 hover:border-cyan-500/30 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all text-lg"
                    >
                      Cancel
                    </button>
                    <button 
                      onClick={handleDelete}
                      className="flex-1 px-6 py-4 bg-gradient-to-r from-red-500/30 to-pink-500/30 text-red-300 rounded-xl border border-red-500/40 hover:border-red-400/50 hover:shadow-[0_0_25px_rgba(239,68,68,0.5)] transition-all text-lg"
                    >
                      Delete Product
                    </button>
                  </div>
                </div>
              ) : (
               
                <div className="space-y-6">
           
                  <div className="flex justify-center">
                    <div className="relative w-32 h-32 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-cyan-500/30 flex items-center justify-center overflow-hidden">
                      {selectedProduct ? (
                        <>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                          <FiImage className="text-cyan-400/50 text-4xl" />
                        </>
                      ) : (
                        <FiImage className="text-cyan-400/50 text-4xl" />
                      )}
                      <div className="absolute bottom-2 right-2">
                        <button className="p-1.5 bg-cyan-500/20 rounded-lg border border-cyan-500/30 hover:bg-cyan-500/30 transition-colors">
                          <FiEdit className="text-cyan-300 text-sm" />
                        </button>
                      </div>
                    </div>
                  </div>

                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-cyan-300/70 mb-2 flex items-center gap-2">
                        <FiTag />
                        Product Name
                      </label>
                      {modalType === 'view' ? (
                        <div className="text-white font-medium">{selectedProduct?.name}</div>
                      ) : (
                        <input 
                          type="text" 
                          defaultValue={selectedProduct?.name || ''}
                          placeholder="Enter product name"
                          className="w-full bg-slate-800/50 border border-cyan-500/40 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(6,182,212,0.5)]"
                        />
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-cyan-300/70 mb-2">Category</label>
                        {modalType === 'view' ? (
                          <div className="text-white">{selectedProduct?.category}</div>
                        ) : (
                          <select 
                            defaultValue={selectedProduct?.category || 'Arm'}
                            className="w-full bg-slate-800/50 border border-cyan-500/40 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(6,182,212,0.5)]"
                          >
                            {categories.filter(cat => cat !== 'All').map(cat => (
                              <option key={cat} value={cat}>{cat}</option>
                            ))}
                          </select>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm text-cyan-300/70 mb-2 flex items-center gap-2">
                          <FiDollarSign />
                          Price
                        </label>
                        {modalType === 'view' ? (
                          <div className="text-green-400 font-bold">{selectedProduct?.price}</div>
                        ) : (
                          <input 
                            type="text" 
                            defaultValue={selectedProduct?.price || ''}
                            placeholder="0.00"
                            className="w-full bg-slate-800/50 border border-cyan-500/40 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(6,182,212,0.5)]"
                          />
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm text-cyan-300/70 mb-2 flex items-center gap-2">
                        <FiInfo />
                        Description
                      </label>
                      {modalType === 'view' ? (
                        <div className="text-gray-300">Cyborg enhancement component with neural interface compatibility.</div>
                      ) : (
                        <textarea 
                          defaultValue={selectedProduct?.description || ''}
                          placeholder="Product description..."
                          className="w-full bg-slate-800/50 border border-cyan-500/40 rounded-lg px-4 py-3 text-white min-h-[100px] focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(6,182,212,0.5)]"
                        />
                      )}
                    </div>

                    {modalType !== 'view' && (
                      <button 
                        onClick={handleSave}
                        className="w-full mt-4 px-6 py-4 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 text-cyan-300 rounded-xl border border-cyan-500/40 hover:border-cyan-400/50 hover:shadow-[0_0_25px_rgba(6,182,212,0.6)] transition-all text-lg font-bold drop-shadow-[0_0_10px_rgba(6,182,212,0.5)]"
                      >
                        {modalType === 'add' ? 'Add Product' : 'Save Changes'}
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default ProductsList;