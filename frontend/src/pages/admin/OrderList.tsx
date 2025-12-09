import { FiEye, FiTrash2, FiFilter, FiEdit, FiChevronLeft, FiChevronRight, FiAlertCircle, FiCheckCircle, FiClock } from 'react-icons/fi';
import AdminLayout from './components/AdminLayout';

const OrderList = () => {
  const orders = [
    { id: 'CYB-001', cyborg: 'RX-78', type: 'Maintenance', status: 'Processing', date: '2024-01-15', priority: 'High' },
    { id: 'CYB-002', cyborg: 'T-800', type: 'Upgrade', status: 'Completed', date: '2024-01-14', priority: 'Medium' },
    { id: 'CYB-003', cyborg: 'HK-47', type: 'Repair', status: 'Pending', date: '2024-01-13', priority: 'Critical' },
    { id: 'CYB-004', cyborg: 'EVA-01', type: 'Maintenance', status: 'Completed', date: '2024-01-12', priority: 'Low' },
  ];

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'Completed': return <FiCheckCircle className="text-green-400 drop-shadow-[0_0_6px_rgba(34,197,94,0.6)]" />;
      case 'Processing': return <FiClock className="text-blue-400 drop-shadow-[0_0_6px_rgba(59,130,246,0.6)]" />;
      case 'Pending': return <FiAlertCircle className="text-yellow-400 drop-shadow-[0_0_6px_rgba(245,158,11,0.6)]" />;
      default: return <FiAlertCircle className="text-gray-400" />;
    }
  };

  return (
    <AdminLayout>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white mb-2 drop-shadow-[0_0_10px_rgba(6,182,212,0.5)]">NEURAL ORDERS</h1>
        <p className="text-cyan-300/70 drop-shadow-[0_0_5px_rgba(6,182,212,0.3)]">Cyborg maintenance & upgrade requests</p>
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 flex gap-3">
          <div className="flex-1">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search orders..." 
                className="w-full bg-slate-900/60 border border-cyan-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all drop-shadow-[0_0_5px_rgba(6,182,212,0.2)]"
              />
            </div>
          </div>
          <button className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 rounded-lg border border-cyan-500/30 hover:border-cyan-400/50 hover:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all group drop-shadow-[0_0_8px_rgba(6,182,212,0.3)]">
            <FiFilter className="group-hover:scale-110 transition-transform" />
            <span>Filters</span>
          </button>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-slate-900/60 backdrop-blur-sm rounded-xl border border-slate-700/50 overflow-hidden shadow-[0_0_30px_rgba(6,182,212,0.15)]">
        {/* Table Header */}
        <div className="grid grid-cols-12 gap-4 p-4 border-b border-slate-700/50 text-sm text-gray-400 font-medium bg-gradient-to-r from-slate-900/80 to-slate-800/60">
          <div className="col-span-2 drop-shadow-[0_0_3px_rgba(6,182,212,0.5)]">ORDER ID</div>
          <div className="col-span-2 drop-shadow-[0_0_3px_rgba(6,182,212,0.5)]">CYBORG</div>
          <div className="col-span-2 drop-shadow-[0_0_3px_rgba(6,182,212,0.5)]">TYPE</div>
          <div className="col-span-2 drop-shadow-[0_0_3px_rgba(6,182,212,0.5)]">STATUS</div>
          <div className="col-span-2 drop-shadow-[0_0_3px_rgba(6,182,212,0.5)]">DATE</div>
          <div className="col-span-2 drop-shadow-[0_0_3px_rgba(6,182,212,0.5)]">ACTIONS</div>
        </div>

        {/* Orders List */}
        <div className="divide-y divide-slate-800/50">
          {orders.map((order) => (
            <div key={order.id} className="grid grid-cols-12 gap-4 p-4 hover:bg-slate-800/30 transition-colors group hover:shadow-[inset_0_0_20px_rgba(6,182,212,0.05)]">
              <div className="col-span-2">
                <div className="font-mono text-cyan-300 font-medium drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]">{order.id}</div>
              </div>
              <div className="col-span-2 text-white drop-shadow-[0_0_3px_rgba(6,182,212,0.3)]">{order.cyborg}</div>
              <div className="col-span-2 text-gray-300 drop-shadow-[0_0_3px_rgba(6,182,212,0.2)]">{order.type}</div>
              <div className="col-span-2">
                <div className="flex items-center gap-2">
                  {getStatusIcon(order.status)}
                  <span className="text-gray-300 drop-shadow-[0_0_3px_rgba(6,182,212,0.2)]">{order.status}</span>
                </div>
              </div>
              <div className="col-span-2 text-gray-400 drop-shadow-[0_0_3px_rgba(6,182,212,0.2)]">{order.date}</div>
              <div className="col-span-2">
                <div className="flex items-center gap-3">
                  <button 
                    className="p-2 rounded-lg border border-cyan-500/30 hover:border-cyan-400/50 hover:bg-cyan-500/10 hover:shadow-[0_0_10px_rgba(6,182,212,0.4)] transition-all group/btn"
                    title="View details"
                  >
                    <FiEye className="text-cyan-300 group-hover/btn:scale-110 transition-transform" />
                  </button>
                  <button 
                    className="p-2 rounded-lg border border-yellow-500/30 hover:border-yellow-400/50 hover:bg-yellow-500/10 hover:shadow-[0_0_10px_rgba(245,158,11,0.4)] transition-all group/btn"
                    title="Edit order"
                  >
                    <FiEdit className="text-yellow-300 group-hover/btn:scale-110 transition-transform" />
                  </button>
                  <button 
                    className="p-2 rounded-lg border border-red-500/30 hover:border-red-400/50 hover:bg-red-500/10 hover:shadow-[0_0_10px_rgba(239,68,68,0.4)] transition-all group/btn"
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

      {/* Sci-Fi Pagination */}
      <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="text-gray-400 text-sm drop-shadow-[0_0_5px_rgba(6,182,212,0.3)]">
          Showing <span className="text-cyan-300 font-bold">{orders.length}</span> neural orders
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-slate-800/60 to-slate-900/60 text-cyan-300 rounded-lg border border-cyan-500/30 hover:border-cyan-400/50 hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all group">
            <FiChevronLeft className="group-hover:-translate-x-1 transition-transform" />
            <span>Previous</span>
          </button>
          <div className="flex space-x-2">
            {[1, 2, 3].map((num) => (
              <button 
                key={num}
                className={`w-10 h-10 rounded-lg border ${num === 1 ? 'border-cyan-400/50 bg-cyan-500/20 text-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.4)]' : 'border-slate-700/50 text-gray-400 hover:border-cyan-500/30'} transition-all hover:shadow-[0_0_10px_rgba(6,182,212,0.3)]`}
              >
                {num}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-slate-800/60 to-slate-900/60 text-cyan-300 rounded-lg border border-cyan-500/30 hover:border-cyan-400/50 hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all group">
            <span>Next</span>
            <FiChevronRight className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-10 pt-6 border-t border-slate-800/50">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <div className="text-white font-bold text-lg mb-1 drop-shadow-[0_0_8px_rgba(6,182,212,0.4)]">CYBORGMANIA ORDERS</div>
            <p className="text-slate-400 text-sm drop-shadow-[0_0_5px_rgba(6,182,212,0.3)]">Order Management System v1.0</p>
          </div>
          <div className="text-center text-slate-500 text-sm drop-shadow-[0_0_5px_rgba(6,182,212,0.2)]">
            <p>© {new Date().getFullYear()} Neural Network Operations. All orders are processed in real-time quantum simulation.</p>
          </div>
        </div>
      </footer>
    </AdminLayout>
  );
};

export default OrderList;