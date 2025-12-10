import { FiThumbsUp, FiThumbsDown, FiTrendingUp, FiBarChart2, FiZap, FiPackage } from 'react-icons/fi';
import AdminLayout from './components/AdminLayout';

const Dashboard = () => {
  const stats = {
    reviews: { positive: 124, negative: 23, total: 147 },
    orders: { today: 42, week: 289, month: 1150 },
    sales: { today: '$8,450', week: '$62,300', month: '$245,800' }
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
   
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-white mb-2 drop-shadow-[0_0_12px_rgba(6,182,212,0.6)]">SELLER DASHBOARD</h1>
          <div className="flex items-center space-x-3">
            <p className="text-cyan-300/70 drop-shadow-[0_0_6px_rgba(6,182,212,0.4)]">CYBORG PARTS & ATTACHMENTS ANALYTICS</p>
            <div className="h-px flex-1 bg-gradient-to-r from-cyan-500/30 to-transparent"></div>
            <FiZap className="text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]" />
          </div>
        </div>

       
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      
          <div className="bg-slate-900/70 backdrop-blur-sm rounded-xl p-6 border border-cyan-500/20 hover:border-cyan-400/40 transition-all duration-300 group">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-1 drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]">REVIEW SENTIMENT</h3>
                <p className="text-sm text-cyan-300/60">Customer Feedback Analysis</p>
              </div>
              <div className="flex space-x-2">
                <FiThumbsUp className="text-2xl text-green-400 drop-shadow-[0_0_8px_rgba(34,197,94,0.6)] group-hover:scale-110 transition-transform" />
                <FiThumbsDown className="text-2xl text-red-400 drop-shadow-[0_0_8px_rgba(239,68,68,0.6)] group-hover:scale-110 transition-transform" />
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400 drop-shadow-[0_0_10px_rgba(34,197,94,0.5)]">{stats.reviews.positive}</div>
                  <div className="text-sm text-green-300/70">Positive</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-400 drop-shadow-[0_0_10px_rgba(239,68,68,0.5)]">{stats.reviews.negative}</div>
                  <div className="text-sm text-red-300/70">Negative</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white drop-shadow-[0_0_10px_rgba(6,182,212,0.5)]">{stats.reviews.total}</div>
                  <div className="text-sm text-cyan-300/70">Total</div>
                </div>
              </div>
              <div className="h-2 bg-slate-800/50 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-green-500 to-green-400 drop-shadow-[0_0_8px_rgba(34,197,94,0.6)]" 
                  style={{ width: `${(stats.reviews.positive / stats.reviews.total) * 100}%` }}
                ></div>
              </div>
              <div className="text-center text-slate-400 text-sm">
                Chart integration area for sentiment analysis
              </div>
            </div>
          </div>

          
          <div className="bg-slate-900/70 backdrop-blur-sm rounded-xl p-6 border border-blue-500/20 hover:border-blue-400/40 transition-all duration-300 group">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-1 drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]">ORDER RATES</h3>
                <p className="text-sm text-blue-300/60">Cyborg Purchase Frequency</p>
              </div>
              <FiTrendingUp className="text-2xl text-blue-400 drop-shadow-[0_0_8px_rgba(59,130,246,0.6)] group-hover:scale-110 transition-transform" />
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                  <div className="text-2xl font-bold text-blue-400 drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]">{stats.orders.today}</div>
                  <div className="text-sm text-blue-300/70">Today</div>
                </div>
                <div className="text-center p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                  <div className="text-2xl font-bold text-blue-400 drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]">{stats.orders.week}</div>
                  <div className="text-sm text-blue-300/70">This Week</div>
                </div>
                <div className="text-center p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                  <div className="text-2xl font-bold text-blue-400 drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]">{stats.orders.month}</div>
                  <div className="text-sm text-blue-300/70">This Month</div>
                </div>
              </div>
              <div className="text-center text-slate-400 text-sm">
                Chart integration area for order frequency
              </div>
            </div>
          </div>

          
          <div className="bg-slate-900/70 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 group">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-1 drop-shadow-[0_0_8px_rgba(147,51,234,0.5)]">SALES METRICS</h3>
                <p className="text-sm text-purple-300/60">Revenue Performance</p>
              </div>
              <FiBarChart2 className="text-2xl text-purple-400 drop-shadow-[0_0_8px_rgba(147,51,234,0.6)] group-hover:scale-110 transition-transform" />
            </div>
            <div className="space-y-4">
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm text-purple-300/70 mb-1">
                    <span>Today</span>
                    <span className="text-green-400">+12.5%</span>
                  </div>
                  <div className="text-2xl font-bold text-white drop-shadow-[0_0_8px_rgba(147,51,234,0.5)]">{stats.sales.today}</div>
                </div>
                <div>
                  <div className="flex justify-between text-sm text-purple-300/70 mb-1">
                    <span>This Week</span>
                    <span className="text-green-400">+8.3%</span>
                  </div>
                  <div className="text-2xl font-bold text-white drop-shadow-[0_0_8px_rgba(147,51,234,0.5)]">{stats.sales.week}</div>
                </div>
                <div>
                  <div className="flex justify-between text-sm text-purple-300/70 mb-1">
                    <span>This Month</span>
                    <span className="text-green-400">+15.7%</span>
                  </div>
                  <div className="text-3xl font-bold text-green-400 drop-shadow-[0_0_10px_rgba(34,197,94,0.6)]">{stats.sales.month}</div>
                </div>
              </div>
              <div className="text-center text-slate-400 text-sm">
                Chart integration area for sales trends
              </div>
            </div>
          </div>
        </div>

       
        <div className="bg-slate-900/60 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6 shadow-[0_0_30px_rgba(6,182,212,0.15)]">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-white mb-1 drop-shadow-[0_0_10px_rgba(6,182,212,0.5)]">TOP PERFORMING PRODUCTS</h2>
              <p className="text-cyan-300/60 text-sm">Best-selling cyborg parts & attachments</p>
            </div>
            <FiPackage className="text-2xl text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { name: 'Quantum Arm', category: 'Arm', sales: 142, revenue: '$355,000' },
              { name: 'Neural Processor', category: 'Brain', sales: 98, revenue: '$176,400' },
              { name: 'Titanium Leg', category: 'Leg', sales: 87, revenue: '$191,400' }
            ].map((product, index) => (
              <div key={index} className="bg-slate-800/40 rounded-lg p-4 border border-slate-700/50 hover:border-cyan-500/30 transition-all">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="text-white font-medium drop-shadow-[0_0_6px_rgba(6,182,212,0.4)]">{product.name}</div>
                    <div className="text-cyan-300/60 text-sm">{product.category}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-green-400 font-bold drop-shadow-[0_0_8px_rgba(34,197,94,0.5)]">{product.revenue}</div>
                    <div className="text-gray-400 text-xs">{product.sales} units sold</div>
                  </div>
                </div>
                <div className="h-1.5 bg-slate-700/50 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-500" style={{ width: `${(product.sales / 142) * 100}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

       
        <footer className="pt-6 border-t border-slate-800/50">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <div className="text-white font-bold text-lg mb-1 drop-shadow-[0_0_10px_rgba(6,182,212,0.5)]">CYBORGMANIA SELLER PORTAL</div>
              <p className="text-slate-400 text-sm drop-shadow-[0_0_6px_rgba(6,182,212,0.4)]">Dashboard v1.0 • Seller ID: SLR-001</p>
            </div>
            <div className="text-center text-slate-500 text-sm drop-shadow-[0_0_6px_rgba(6,182,212,0.3)]">
              <p>© {new Date().getFullYear()} Neural Network Operations. Data updates in real-time.</p>
            </div>
          </div>
        </footer>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;