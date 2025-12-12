import { useState, useRef, useEffect } from 'react';
import { FiPackage, FiTool, FiZap, FiClock, FiCheckCircle, FiXCircle, FiFilter, FiChevronLeft, FiChevronRight, FiX, FiTrash2 } from 'react-icons/fi';
import CyborgLayout from './components/CyborgLayout';

const Order  = () => {
  const [cartCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [cancelOrderId, setCancelOrderId] = useState<string | null>(null);
  const ordersPerPage = 10;
  const filterRef = useRef<HTMLDivElement>(null);

  // Mock order data
  const orders = [
    { id: 'ORD-2024-001', date: '2024-01-15', total: 2950, status: 'completed', items: [{ part: 'Quantum Arm', attachments: ['Laser Emitter', 'Shield Projector'], perks: ['Speed Boost'], quantity: 1 }] },
    { id: 'ORD-2024-002', date: '2024-01-20', total: 2770, status: 'pending', items: [{ part: 'Titanium Leg', attachments: ['Hydraulic Boost'], perks: ['Durability+', 'Energy Efficiency'], quantity: 1 }] },
    { id: 'ORD-2024-003', date: '2024-01-25', total: 1850, status: 'pending', items: [{ part: 'Neural Processor', attachments: [], perks: ['Processing Boost'], quantity: 1 }] },
    { id: 'ORD-2023-045', date: '2023-12-10', total: 4200, status: 'completed', items: [{ part: 'Synthetic Heart', attachments: ['Power Regulator'], perks: ['Extended Lifespan'], quantity: 1 }] },
    { id: 'ORD-2024-004', date: '2024-02-01', total: 3200, status: 'completed', items: [{ part: 'Carbon Fiber Torso', attachments: ['Armor Plating', 'Cooling System'], perks: ['Thermal Regulation'], quantity: 1 }] },
    { id: 'ORD-2024-005', date: '2024-02-05', total: 1500, status: 'cancelled', items: [{ part: 'Holo-Vision Eye', attachments: ['Zoom Lens'], perks: [], quantity: 1 }] },
    { id: 'ORD-2024-006', date: '2024-02-10', total: 2800, status: 'pending', items: [{ part: 'Sensory Array', attachments: ['Radar Scanner'], perks: ['Enhanced Perception'], quantity: 1 }] },
    { id: 'ORD-2024-007', date: '2024-02-15', total: 3600, status: 'completed', items: [{ part: 'Processing Core', attachments: ['Neural Link'], perks: ['Processing Speed+', 'Memory Boost'], quantity: 1 }] },
    { id: 'ORD-2024-008', date: '2024-02-20', total: 2200, status: 'completed', items: [{ part: 'Hydraulic Arm', attachments: ['Grip Enhancer'], perks: ['Strength Boost'], quantity: 1 }] },
    { id: 'ORD-2024-009', date: '2024-02-25', total: 1950, status: 'pending', items: [{ part: 'Power Cell', attachments: [], perks: ['Fast Charging', 'Extended Battery'], quantity: 1 }] },
    { id: 'ORD-2024-010', date: '2024-03-01', total: 4100, status: 'completed', items: [{ part: 'Armored Torso', attachments: ['Reactive Plating', 'Energy Shield'], perks: ['Impact Resistance'], quantity: 1 }] },
    { id: 'ORD-2024-011', date: '2024-03-05', total: 1700, status: 'pending', items: [{ part: 'Mobility Boost', attachments: ['Agility Module'], perks: ['Speed Boost'], quantity: 1 }] },
    { id: 'ORD-2024-012', date: '2024-03-10', total: 3300, status: 'completed', items: [{ part: 'Stealth Arm', attachments: ['Radar Absorber'], perks: ['Stealth Coating'], quantity: 1 }] },
  ];

  const statusFilters = ['All', 'Completed', 'Pending', 'Cancelled'];

  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setIsFilterOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredOrders = orders.filter(order => 
    selectedStatus === 'All' || order.status === selectedStatus.toLowerCase()
  );


  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);
  const startIndex = (currentPage - 1) * ordersPerPage;
  const currentOrders = filteredOrders.slice(startIndex, startIndex + ordersPerPage);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-400 bg-green-500/10 border-green-500/30';
      case 'pending':
        return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30';
      case 'cancelled':
        return 'text-red-400 bg-red-500/10 border-red-500/30';
      default:
        return 'text-gray-400 bg-gray-500/10 border-gray-500/30';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <FiCheckCircle className="text-green-400" />;
      case 'pending':
        return <FiClock className="text-yellow-400" />;
      case 'cancelled':
        return <FiXCircle className="text-red-400" />;
      default:
        return <FiClock className="text-gray-400" />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleCancelOrder = (orderId: string) => {
    console.log('Order cancelled:', orderId);
    setCancelOrderId(null);
  };

  return (
    <CyborgLayout cartItemsCount={cartCount}>
   
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2 drop-shadow-[0_0_15px_rgba(6,182,212,0.7)]">
          ORDER HISTORY
        </h1>
        <p className="text-cyan-300/70 drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]">
          Track and manage your cybernetic upgrades
        </p>
      </div>

      
      <div className="mb-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-cyan-300/70">
            Showing <span className="text-white font-bold">{currentOrders.length}</span> of{' '}
            <span className="text-white font-bold">{filteredOrders.length}</span> orders
            {selectedStatus !== 'All' && (
              <span className="ml-2">
                (Filtered by: <span className="text-cyan-300 font-bold">{selectedStatus}</span>)
              </span>
            )}
          </div>
          
          <div className="relative" ref={filterRef}>
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center gap-2 px-5 py-3 bg-linear-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 rounded-xl border border-cyan-500/30 hover:border-cyan-400/50 hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] transition-all group drop-shadow-[0_0_12px_rgba(6,182,212,0.5)] backdrop-blur-sm"
            >
              <FiFilter className="group-hover:scale-110 transition-transform" />
              <span>{selectedStatus}</span>
            </button>
            
            {isFilterOpen && (
              <div className="absolute top-full right-0 mt-2 w-56 bg-slate-900/95 backdrop-blur-sm rounded-xl border border-cyan-500/40 shadow-[0_0_50px_rgba(6,182,212,0.5)] p-3 z-20">
                <div className="space-y-2">
                  {statusFilters.map((status) => (
                    <button
                      key={status}
                      onClick={() => {
                        setSelectedStatus(status);
                        setCurrentPage(1);
                        setIsFilterOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2.5 rounded-lg transition-all text-sm ${selectedStatus === status ? 'text-cyan-300 bg-cyan-500/10 border border-cyan-500/30' : 'text-gray-300 hover:text-cyan-300 hover:bg-cyan-500/10'}`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      
      <div className="space-y-6 mb-10">
        {currentOrders.length === 0 ? (
          <div className="bg-slate-900/60 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-12 text-center">
            <FiPackage className="text-6xl text-cyan-500/50 mx-auto mb-4 drop-shadow-[0_0_20px_rgba(6,182,212,0.5)]" />
            <h3 className="text-xl font-bold text-white mb-2 drop-shadow-[0_0_10px_rgba(6,182,212,0.6)]">
              No orders found
            </h3>
            <p className="text-cyan-300/70 mb-6">
              {selectedStatus !== 'All' 
                ? `No ${selectedStatus.toLowerCase()} orders found`
                : 'Your order history will appear here'
              }
            </p>
            {selectedStatus !== 'All' && (
              <button
                onClick={() => setSelectedStatus('All')}
                className="inline-flex items-center gap-2 px-6 py-3 bg-linear-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 rounded-xl border border-cyan-500/30 hover:border-cyan-400/50 hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] transition-all"
              >
                View All Orders
              </button>
            )}
          </div>
        ) : (
          currentOrders.map((order) => (
            <div 
              key={order.id}
              className="bg-slate-900/60 backdrop-blur-sm rounded-2xl border border-slate-700/50 overflow-hidden group hover:border-cyan-500/30 transition-all duration-300"
            >
              <div className="p-6">
              
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-white drop-shadow-[0_0_10px_rgba(6,182,212,0.6)]">
                        {order.id}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border flex items-center gap-1.5 ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)}
                        <span className="capitalize">{order.status}</span>
                      </span>
                    </div>
                    <p className="text-cyan-300/70 text-sm">
                      Ordered on {formatDate(order.date)}
                    </p>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-cyan-300/70 text-sm mb-1">Total Amount</div>
                    <div className="text-green-400 text-2xl font-bold drop-shadow-[0_0_15px_rgba(34,197,94,0.7)]">
                      ${order.total.toLocaleString()}
                    </div>
                  </div>
                </div>

               
                <div className="space-y-4">
                  {order.items.map((item, index) => (
                    <div key={index} className="bg-slate-800/30 rounded-xl p-4 border border-slate-700/50">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-3">
                          <FiPackage className="text-cyan-400" />
                          <div>
                            <h4 className="text-white font-medium">{item.part}</h4>
                            <p className="text-cyan-300/70 text-sm">Quantity: {item.quantity}</p>
                          </div>
                        </div>
                      </div>

                     
                      {item.attachments.length > 0 && (
                        <div className="mt-3">
                          <div className="flex items-center gap-2 text-cyan-300 mb-2 text-sm">
                            <FiTool />
                            <span>Attachments</span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {item.attachments.map((attachment, idx) => (
                              <span 
                                key={idx}
                                className="px-3 py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs"
                              >
                                {attachment}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                    
                      {item.perks.length > 0 && (
                        <div className="mt-3">
                          <div className="flex items-center gap-2 text-purple-300 mb-2 text-sm">
                            <FiZap />
                            <span>Perks</span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {item.perks.map((perk, idx) => (
                              <span 
                                key={idx}
                                className="px-3 py-1.5 rounded-lg bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs"
                              >
                                {perk}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

               
                <div className="mt-6 pt-6 border-t border-slate-700/50 flex justify-end">
                  {order.status === 'pending' && (
                    <button
                      onClick={() => setCancelOrderId(order.id)}
                      className="px-5 py-2.5 bg-red-500/10 text-red-300 rounded-lg border border-red-500/30 hover:border-red-400/50 hover:shadow-[0_0_20px_rgba(239,68,68,0.5)] transition-all hover:scale-[1.02]"
                    >
                      Cancel Order
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
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


      {cancelOrderId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={() => setCancelOrderId(null)}></div>
          
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
                  <h2 className="text-2xl font-bold text-white mb-1 drop-shadow-[0_0_15px_rgba(239,68,68,0.8)]">CANCEL ORDER</h2>
                  <p className="text-red-300/70 text-sm">Confirm order cancellation</p>
                </div>
                <button 
                  onClick={() => setCancelOrderId(null)}
                  className="p-2 rounded-lg border border-red-500/30 hover:border-red-400/50 hover:bg-red-500/10 hover:shadow-[0_0_20px_rgba(239,68,68,0.6)] transition-all"
                >
                  <FiX className="text-red-300 drop-shadow-[0_0_8px_rgba(239,68,68,0.6)]" />
                </button>
              </div>
            </div>

            <div className="p-8">
              <div className="text-center mb-6">
                <FiTrash2 className="text-5xl text-red-400 mx-auto mb-4 drop-shadow-[0_0_20px_rgba(239,68,68,0.9)]" />
                <div className="text-red-300 text-lg font-bold mb-2 drop-shadow-[0_0_12px_rgba(239,68,68,0.7)]">
                  Order #{cancelOrderId}
                </div>
                <p className="text-gray-300 mb-2">
                  Are you sure you want to cancel this order?
                </p>
                <p className="text-red-300/70 text-sm">
                  This action cannot be undone.
                </p>
              </div>
              
              <div className="bg-slate-900/40 rounded-xl p-4 mb-6 border border-red-500/20">
                <p className="text-center text-red-300/90">
                  Cancelling this order will remove it from your pending orders and may be subject to cancellation fees.
                </p>
              </div>
              
              <div className="flex gap-4">
                <button
                  onClick={() => setCancelOrderId(null)}
                  className="flex-1 px-6 py-3 bg-linear-to-r from-slate-800/30 to-slate-700/30 text-cyan-300 rounded-xl border border-cyan-500/30 hover:border-cyan-400/50 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all hover:scale-[1.02]"
                >
                  Go Back
                </button>
                <button
                  onClick={() => handleCancelOrder(cancelOrderId)}
                  className="flex-1 px-6 py-3 bg-linear-to-r from-red-500/30 to-pink-500/30 text-red-300 rounded-xl border border-red-500/40 hover:border-red-400/50 hover:shadow-[0_0_35px_rgba(239,68,68,0.8)] transition-all hover:scale-[1.02]"
                >
                  Confirm Cancel
                </button>
              </div>
            </div>
            
            <div className="h-1 bg-linear-to-r from-transparent via-red-400 to-transparent animate-pulse"></div>
          </div>
        </div>
      )}

     
      <footer className="mt-10 pt-6 border-t border-slate-800/50">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <div className="text-white font-bold text-lg mb-1 drop-shadow-[0_0_10px_rgba(6,182,212,0.5)]">
              CYBORGMANIA ACCOUNT PORTAL
            </div>
            <p className="text-slate-400 text-sm drop-shadow-[0_0_8px_rgba(6,182,212,0.4)]">
              Advanced Order Management System v2.1
            </p>
            <p className="text-cyan-300/70 text-xs mt-1">
              Page {currentPage} of {totalPages} • {filteredOrders.length} total orders
            </p>
          </div>
          <div className="text-center text-slate-500 text-sm drop-shadow-[0_0_8px_rgba(6,182,212,0.3)]">
            <p>© {new Date().getFullYear()} Neural Interface Corporation</p>
            <p className="text-xs text-cyan-500/70 mt-1">User ID: CYB-{Math.floor(Math.random() * 10000)}</p>
          </div>
        </div>
      </footer>
    </CyborgLayout>
  );
};

export default Order;