import { useState, useRef, useEffect } from 'react';
import { FiEye, FiTrash2, FiFilter, FiEdit, FiChevronLeft, FiChevronRight, FiAlertCircle, FiCheckCircle, FiClock, FiX, FiPackage, FiTool, FiZap, FiUser, FiDollarSign, FiCalendar } from 'react-icons/fi';
import AdminLayout from './components/AdminLayout';

const OrderList = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [modalType, setModalType] = useState<'view' | 'edit' | 'delete' | null>(null);
  const filterRef = useRef<HTMLDivElement>(null);

  const orders = [
    {
      id: 'CYB-001',
      cyborg: { id: 'CBG-101', name: 'RX-78 Unit', email: 'rx78@cybernet.com' },
      seller: { id: 'SLR-001', name: 'CyberTech Corp' },
      status: 'Processing',
      date: '2024-01-15',
      totalPrice: '$4,850',
      items: [
        {
          id: 'ITM-001',
          part: { id: 'PRT-005', name: 'Quantum Arm', category: 'Arm', price: '$2,500' },
          subtotal: '$3,450',
          attachments: [
            { id: 'ATT-010', name: 'Plasma Cannon', price: '$500' },
            { id: 'ATT-015', name: 'Shield Generator', price: '$450' }
          ],
          perks: [
            { id: 'PRK-007', name: 'Strength Boost +50%', price: '$500' }
          ]
        },
        {
          id: 'ITM-002',
          part: { id: 'PRT-012', name: 'Neural Processor', category: 'Brain', price: '$1,400' },
          subtotal: '$1,400',
          attachments: [],
          perks: [
            { id: 'PRK-012', name: 'IQ Boost +30', price: '$300' },
            { id: 'PRK-015', name: 'Memory Expansion', price: '$200' }
          ]
        }
      ]
    },
    {
      id: 'CYB-002',
      cyborg: { id: 'CBG-102', name: 'T-800 Series', email: 't800@futuretech.com' },
      seller: { id: 'SLR-001', name: 'CyberTech Corp' },
      status: 'Completed',
      date: '2024-01-14',
      totalPrice: '$3,200',
      items: [
        {
          id: 'ITM-003',
          part: { id: 'PRT-008', name: 'Titanium Leg', category: 'Leg', price: '$1,800' },
          subtotal: '$2,600',
          attachments: [
            { id: 'ATT-020', name: 'Hydraulic Jump Boost', price: '$800' }
          ],
          perks: []
        }
      ]
    }
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

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'Completed': return <FiCheckCircle className="text-green-400 drop-shadow-[0_0_8px_rgba(34,197,94,0.7)]" />;
      case 'Processing': return <FiClock className="text-blue-400 drop-shadow-[0_0_8px_rgba(59,130,246,0.7)]" />;
      case 'Pending': return <FiAlertCircle className="text-yellow-400 drop-shadow-[0_0_8px_rgba(245,158,11,0.7)]" />;
      default: return <FiAlertCircle className="text-gray-400" />;
    }
  };

  const openModal = (order: any, type: 'view' | 'edit' | 'delete') => {
    setSelectedOrder(order);
    setModalType(type);
  };

  const closeModal = () => {
    setModalType(null);
    setSelectedOrder(null);
  };

  const handleDelete = () => {
    console.log('Deleting order:', selectedOrder?.id);
    closeModal();
  };

  return (
    <AdminLayout>
    
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white mb-2 drop-shadow-[0_0_12px_rgba(6,182,212,0.6)]">NEURAL ORDERS</h1>
        <p className="text-cyan-300/70 drop-shadow-[0_0_6px_rgba(6,182,212,0.4)]">Cyborg Parts & Attachments Order Management</p>
      </div>

      
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 flex gap-3">
          <div className="flex-1">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search by order ID, cyborg, or part..." 
                className="w-full bg-slate-900/60 border border-cyan-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_20px_rgba(6,182,212,0.5)] transition-all drop-shadow-[0_0_8px_rgba(6,182,212,0.3)]"
              />
            </div>
          </div>
          
          
          <div className="relative" ref={filterRef}>
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center gap-2 px-5 py-3 bg-linear-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 rounded-lg border border-cyan-500/30 hover:border-cyan-400/50 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all group drop-shadow-[0_0_10px_rgba(6,182,212,0.4)]"
            >
              <FiFilter className="group-hover:scale-110 transition-transform" />
              <span>Filters</span>
            </button>
            
            {isFilterOpen && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-slate-900/95 backdrop-blur-sm rounded-xl border border-cyan-500/30 shadow-[0_0_40px_rgba(6,182,212,0.4)] p-4 z-20">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-cyan-300/70 mb-2 drop-shadow-[0_0_4px_rgba(6,182,212,0.4)]">Status</label>
                    <div className="space-y-2">
                      {['All', 'Pending', 'Processing', 'Completed', 'Cancelled'].map(status => (
                        <label key={status} className="flex items-center space-x-2 cursor-pointer group/filter">
                          <input type="checkbox" className="rounded border-cyan-500/50 bg-slate-800/50 accent-cyan-500" />
                          <span className="text-gray-300 text-sm group-hover/filter:text-cyan-300 transition-colors">{status}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm text-cyan-300/70 mb-2 drop-shadow-[0_0_4px_rgba(6,182,212,0.4)]">Category</label>
                    <div className="space-y-2">
                      {['All', 'Arm', 'Leg','Torso', 'Organ'].map(category => (
                        <label key={category} className="flex items-center space-x-2 cursor-pointer group/filter">
                          <input type="checkbox" className="rounded border-cyan-500/50 bg-slate-800/50 accent-cyan-500" />
                          <span className="text-gray-300 text-sm group-hover/filter:text-cyan-300 transition-colors">{category}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  <button className="w-full mt-4 px-4 py-2.5 bg-linear-to-r from-cyan-500/30 to-blue-500/30 text-cyan-300 rounded-lg border border-cyan-500/30 hover:border-cyan-400/50 hover:shadow-[0_0_15px_rgba(6,182,212,0.5)] transition-all text-sm drop-shadow-[0_0_6px_rgba(6,182,212,0.3)]">
                    Apply Filters
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

     
      <div className="bg-slate-900/60 backdrop-blur-sm rounded-xl border border-slate-700/50 overflow-hidden shadow-[0_0_40px_rgba(6,182,212,0.2)]">
      
        <div className="grid grid-cols-12 gap-4 p-4 border-b border-slate-700/50 text-sm text-gray-400 font-medium bg-linear-to-r from-slate-900/80 to-slate-800/60">
          <div className="col-span-2 drop-shadow-[0_0_4px_rgba(6,182,212,0.6)]">ORDER ID</div>
          <div className="col-span-2 drop-shadow-[0_0_4px_rgba(6,182,212,0.6)]">CYBORG</div>
          <div className="col-span-2 drop-shadow-[0_0_4px_rgba(6,182,212,0.6)]">STATUS</div>
          <div className="col-span-2 drop-shadow-[0_0_4px_rgba(6,182,212,0.6)]">TOTAL</div>
          <div className="col-span-2 drop-shadow-[0_0_4px_rgba(6,182,212,0.6)]">DATE</div>
          <div className="col-span-2 drop-shadow-[0_0_4px_rgba(6,182,212,0.6)]">ACTIONS</div>
        </div>

       
        <div className="divide-y divide-slate-800/50">
          {orders.map((order) => (
            <div key={order.id} className="grid grid-cols-12 gap-4 p-4 hover:bg-slate-800/30 transition-colors group hover:shadow-[inset_0_0_25px_rgba(6,182,212,0.08)]">
              <div className="col-span-2">
                <div className="font-mono text-cyan-300 font-medium drop-shadow-[0_0_10px_rgba(6,182,212,0.6)]">{order.id}</div>
              </div>
              <div className="col-span-2">
                <div className="text-white drop-shadow-[0_0_4px_rgba(6,182,212,0.4)]">{order.cyborg.name}</div>
                <div className="text-cyan-300/60 text-xs">{order.cyborg.id}</div>
              </div>
              <div className="col-span-2">
                <div className="flex items-center gap-2">
                  {getStatusIcon(order.status)}
                  <span className="text-gray-300 drop-shadow-[0_0_4px_rgba(6,182,212,0.3)]">{order.status}</span>
                </div>
              </div>
              <div className="col-span-2">
                <div className="flex items-center gap-2 text-green-400 drop-shadow-[0_0_8px_rgba(34,197,94,0.5)]">
                  <FiDollarSign />
                  <span className="font-bold">{order.totalPrice}</span>
                </div>
              </div>
              <div className="col-span-2 text-gray-400 drop-shadow-[0_0_4px_rgba(6,182,212,0.3)]">{order.date}</div>
              <div className="col-span-2">
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => openModal(order, 'view')}
                    className="p-2 rounded-lg border border-cyan-500/30 hover:border-cyan-400/50 hover:bg-cyan-500/10 hover:shadow-[0_0_15px_rgba(6,182,212,0.5)] transition-all group/btn"
                    title="View order details"
                  >
                    <FiEye className="text-cyan-300 group-hover/btn:scale-110 transition-transform" />
                  </button>
                  <button 
                    onClick={() => openModal(order, 'edit')}
                    className="p-2 rounded-lg border border-yellow-500/30 hover:border-yellow-400/50 hover:bg-yellow-500/10 hover:shadow-[0_0_15px_rgba(245,158,11,0.5)] transition-all group/btn"
                    title="Edit order"
                  >
                    <FiEdit className="text-yellow-300 group-hover/btn:scale-110 transition-transform" />
                  </button>
                  <button 
                    onClick={() => openModal(order, 'delete')}
                    className="p-2 rounded-lg border border-red-500/30 hover:border-red-400/50 hover:bg-red-500/10 hover:shadow-[0_0_15px_rgba(239,68,68,0.5)] transition-all group/btn"
                    title="Delete order"
                  >
                    <FiTrash2 className="text-red-300 group-hover/btn:scale-110 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

   
      <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="text-gray-400 text-sm drop-shadow-[0_0_6px_rgba(6,182,212,0.4)]">
          Showing <span className="text-cyan-300 font-bold">{orders.length}</span> configured orders
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-linear-to-r from-slate-800/60 to-slate-900/60 text-cyan-300 rounded-lg border border-cyan-500/30 hover:border-cyan-400/50 hover:shadow-[0_0_20px_rgba(6,182,212,0.5)] transition-all group drop-shadow-[0_0_8px_rgba(6,182,212,0.4)]">
            <FiChevronLeft className="group-hover:-translate-x-1 transition-transform" />
            <span>Previous</span>
          </button>
          <div className="flex space-x-2">
            {[1, 2, 3].map((num) => (
              <button 
                key={num}
                className={`w-10 h-10 rounded-lg border ${num === 1 ? 'border-cyan-400/50 bg-cyan-500/20 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.5)]' : 'border-slate-700/50 text-gray-400 hover:border-cyan-500/30'} transition-all hover:shadow-[0_0_12px_rgba(6,182,212,0.4)] drop-shadow-[0_0_6px_rgba(6,182,212,0.3)]`}
              >
                {num}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-linear-to-r from-slate-800/60 to-slate-900/60 text-cyan-300 rounded-lg border border-cyan-500/30 hover:border-cyan-400/50 hover:shadow-[0_0_20px_rgba(6,182,212,0.5)] transition-all group drop-shadow-[0_0_8px_rgba(6,182,212,0.4)]">
            <span>Next</span>
            <FiChevronRight className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      
      <footer className="mt-10 pt-6 border-t border-slate-800/50">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <div className="text-white font-bold text-lg mb-1 drop-shadow-[0_0_10px_rgba(6,182,212,0.5)]">CYBORGMANIA ORDER SYSTEM</div>
            <p className="text-slate-400 text-sm drop-shadow-[0_0_6px_rgba(6,182,212,0.4)]">Parts + Attachments + Perks Configuration v2.1</p>
          </div>
          <div className="text-center text-slate-500 text-sm drop-shadow-[0_0_6px_rgba(6,182,212,0.3)]">
            <p>© {new Date().getFullYear()} Neural Network Operations. Database: 15 tables, Full customization support.</p>
          </div>
        </div>
      </footer>

     
      {modalType && selectedOrder && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="relative bg-slate-900/95 backdrop-blur-sm rounded-2xl border border-cyan-500/40 shadow-[0_0_60px_rgba(6,182,212,0.6)] max-w-2xl w-full overflow-hidden">
            
          
            <div className="p-6 border-b border-slate-700/50 bg-linear-to-r from-slate-900/80 to-slate-800/60">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold text-white drop-shadow-[0_0_12px_rgba(6,182,212,0.7)]">
                    {modalType === 'view' && 'ORDER DETAILS'}
                    {modalType === 'edit' && 'EDIT ORDER CONFIGURATION'}
                    {modalType === 'delete' && 'DELETE ORDER'}
                  </h2>
                  <div className="flex items-center gap-4 mt-2">
                    <div className="flex items-center gap-2">
                      <FiPackage className="text-cyan-400 drop-shadow-[0_0_6px_rgba(6,182,212,0.5)]" />
                      <span className="text-cyan-300/70">ID: {selectedOrder.id}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FiCalendar className="text-cyan-400 drop-shadow-[0_0_6px_rgba(6,182,212,0.5)]" />
                      <span className="text-cyan-300/70">{selectedOrder.date}</span>
                    </div>
                  </div>
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
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-linear-to-r from-red-500/20 to-pink-500/20 border border-red-500/40 flex items-center justify-center shadow-[0_0_30px_rgba(239,68,68,0.4)]">
                    <FiAlertCircle className="text-red-400 text-3xl drop-shadow-[0_0_10px_rgba(239,68,68,0.6)]" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3 drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]">Confirm Deletion</h3>
                  <p className="text-gray-300 mb-8 text-lg">
                    Delete order <span className="text-cyan-300 font-bold">{selectedOrder.id}</span> for <span className="text-cyan-300">{selectedOrder.cyborg.name}</span>?
                  </p>
                  <div className="flex space-x-4">
                    <button 
                      onClick={closeModal}
                      className="flex-1 px-6 py-4 bg-linear-to-r from-slate-800/60 to-slate-900/60 text-gray-300 rounded-xl border border-slate-700/50 hover:border-cyan-500/30 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all text-lg"
                    >
                      Cancel
                    </button>
                    <button 
                      onClick={handleDelete}
                      className="flex-1 px-6 py-4 bg-linear-to-r from-red-500/30 to-pink-500/30 text-red-300 rounded-xl border border-red-500/40 hover:border-red-400/50 hover:shadow-[0_0_25px_rgba(239,68,68,0.5)] transition-all text-lg"
                    >
                      Delete Order
                    </button>
                  </div>
                </div>
              ) : (
                
                <div className="space-y-6">
                 
                  <div className="bg-slate-800/30 rounded-xl p-5 border border-slate-700/50">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2 drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]">
                      <FiUser className="text-cyan-400" />
                      Order Summary
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-cyan-300/70 mb-2">Cyborg Information</label>
                        <div className="space-y-2">
                          <div className="text-white font-medium">{selectedOrder.cyborg.name}</div>
                          <div className="text-cyan-300/60 text-sm">{selectedOrder.cyborg.email}</div>
                          <div className="text-gray-400 text-sm">ID: {selectedOrder.cyborg.id}</div>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm text-cyan-300/70 mb-2">Seller Information</label>
                        <div className="space-y-2">
                          <div className="text-white font-medium">{selectedOrder.seller.name}</div>
                          <div className="text-gray-400 text-sm">ID: {selectedOrder.seller.id}</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                      <div>
                        <label className="block text-sm text-cyan-300/70 mb-2">Status</label>
                        {modalType === 'view' ? (
                          <div className="flex items-center gap-2">
                            {getStatusIcon(selectedOrder.status)}
                            <span className="text-white font-medium">{selectedOrder.status}</span>
                          </div>
                        ) : (
                          <select 
                            defaultValue={selectedOrder.status}
                            className="w-full bg-slate-800/50 border border-cyan-500/40 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(6,182,212,0.5)]"
                          >
                            <option value="Pending">Pending</option>
                            <option value="Processing">Processing</option>
                            <option value="Completed">Completed</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm text-cyan-300/70 mb-2">Total Price</label>
                        <div className="text-green-400 font-bold text-xl drop-shadow-[0_0_10px_rgba(34,197,94,0.6)]">
                          {selectedOrder.totalPrice}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm text-cyan-300/70 mb-2">Order Date</label>
                        <div className="text-gray-300">{selectedOrder.date}</div>
                      </div>
                    </div>
                  </div>

                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2 drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]">
                      <FiPackage className="text-cyan-400" />
                      Configured Parts ({selectedOrder.items.length})
                    </h3>
                    
                    {selectedOrder.items.map((item: any, index: number) => (
                      <div key={item.id} className="bg-slate-800/30 rounded-xl p-4 border border-slate-700/50">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className="text-white font-bold drop-shadow-[0_0_6px_rgba(6,182,212,0.4)]">{item.part.name}</h4>
                            <div className="text-cyan-300/60 text-sm mt-1">Category: {item.part.category} | Part ID: {item.part.id}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-green-400 font-bold drop-shadow-[0_0_8px_rgba(34,197,94,0.5)]">{item.subtotal}</div>
                            <div className="text-gray-400 text-sm">Base: {item.part.price}</div>
                          </div>
                        </div>
                        
                    
                        {item.attachments.length > 0 && (
                          <div className="mt-3">
                            <div className="flex items-center gap-2 text-sm text-cyan-300/70 mb-2">
                              <FiTool />
                              <span>Attachments ({item.attachments.length})</span>
                            </div>
                            <div className="space-y-2">
                              {item.attachments.map((att: any) => (
                                <div key={att.id} className="flex justify-between items-center text-sm">
                                  <span className="text-gray-300">{att.name}</span>
                                  <span className="text-green-400">{att.price}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        
                     
                        {item.perks.length > 0 && (
                          <div className="mt-3">
                            <div className="flex items-center gap-2 text-sm text-cyan-300/70 mb-2">
                              <FiZap />
                              <span>Perks ({item.perks.length})</span>
                            </div>
                            <div className="space-y-2">
                              {item.perks.map((perk: any) => (
                                <div key={perk.id} className="flex justify-between items-center text-sm">
                                  <span className="text-gray-300">{perk.name}</span>
                                  <span className="text-green-400">{perk.price}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {modalType === 'edit' && (
                    <div className="pt-4 border-t border-slate-700/50">
                      <div className="space-y-4">
                        <button className="w-full mt-4 px-6 py-4 bg-linear-to-r from-cyan-500/30 to-blue-500/30 text-cyan-300 rounded-xl border border-cyan-500/40 hover:border-cyan-400/50 hover:shadow-[0_0_25px_rgba(6,182,212,0.6)] transition-all text-lg font-bold drop-shadow-[0_0_10px_rgba(6,182,212,0.5)]">
                          Update Order Configuration
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default OrderList;