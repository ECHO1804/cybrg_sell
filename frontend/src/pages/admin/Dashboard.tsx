import { FiThumbsUp, FiThumbsDown, FiTrendingUp, FiBarChart2, FiChevronLeft, FiChevronRight, FiZap } from 'react-icons/fi';
import AdminLayout from './components/AdminLayout';

const Dashboard = () => {
  const popularProducts = [
    { id: 1, name: 'NEXUS CORE', category: 'Quantum Processor', price: '$1,299', specs: '16GHz | 128-Core', glow: 'from-cyan-500 via-blue-500 to-purple-500' },
    { id: 2, name: 'NEURAL LINK', category: 'Brain-Computer Interface', price: '$2,499', specs: 'Zero Latency | 1TB/s', glow: 'from-purple-500 via-pink-500 to-red-500' },
    { id: 3, name: 'HOLO-MATRIX', category: 'Holographic Display', price: '$3,199', specs: '8K Holograph | 360°', glow: 'from-green-500 via-teal-500 to-cyan-500' },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">

        <div className="mb-6 px-2">
          <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">NEURAL DASHBOARD</h1>
          <div className="flex items-center space-x-3">
            <p className="text-cyan-300/70">SYSTEM PERFORMANCE METRICS</p>
            <div className="h-px flex-1 bg-gradient-to-r from-cyan-500/30 to-transparent"></div>
            <FiZap className="text-cyan-400 animate-pulse" />
          </div>
        </div>

   
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 px-1">
          <div className="bg-slate-900/70 backdrop-blur-sm rounded-xl p-5 border border-cyan-500/20 hover:border-cyan-400/40 transition-all duration-300 group">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">REVIEW SENTIMENT</h3>
                <p className="text-sm text-cyan-300/60">Positive vs Negative Spectrum</p>
              </div>
              <div className="flex space-x-1">
                <FiThumbsUp className="text-xl text-green-400 group-hover:drop-shadow-[0_0_10px_rgba(34,197,94,0.9)] transition-all" />
                <FiThumbsDown className="text-xl text-red-400 group-hover:drop-shadow-[0_0_10px_rgba(239,68,68,0.9)] transition-all" />
              </div>
            </div>
            <div className="h-64 bg-gradient-to-br from-slate-900/50 to-slate-800/30 rounded-lg border border-slate-700/50 flex items-center justify-center">
              <div className="text-center">
                <div className="text-slate-400 mb-2">Sentiment Analysis Matrix</div>
                <div className="text-xs text-slate-500">[Chart Integration Area]</div>
              </div>
            </div>
          </div>

          <div className="bg-slate-900/70 backdrop-blur-sm rounded-xl p-5 border border-blue-500/20 hover:border-blue-400/40 transition-all duration-300 group">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">ORDER FLUX</h3>
                <p className="text-sm text-blue-300/60">Temporal Processing Rate</p>
              </div>
              <FiTrendingUp className="text-2xl text-blue-400 group-hover:scale-110 group-hover:drop-shadow-[0_0_12px_rgba(59,130,246,0.9)] transition-all" />
            </div>
            <div className="h-64 bg-gradient-to-br from-slate-900/50 to-slate-800/30 rounded-lg border border-slate-700/50 flex items-center justify-center">
              <div className="text-center">
                <div className="text-slate-400 mb-2">Order Frequency Grid</div>
                <div className="text-xs text-slate-500">[Chart Integration Area]</div>
              </div>
            </div>
          </div>

          <div className="bg-slate-900/70 backdrop-blur-sm rounded-xl p-5 border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 group">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">REVENUE STREAM</h3>
                <p className="text-sm text-purple-300/60">Quantum Sales Metrics</p>
              </div>
              <FiBarChart2 className="text-2xl text-purple-400 group-hover:scale-110 group-hover:drop-shadow-[0_0_12px_rgba(147,51,234,0.9)] transition-all" />
            </div>
            <div className="h-64 bg-gradient-to-br from-slate-900/50 to-slate-800/30 rounded-lg border border-slate-700/50 flex items-center justify-center">
              <div className="text-center">
                <div className="text-slate-400 mb-2">Revenue Projection Map</div>
                <div className="text-xs text-slate-500">[Chart Integration Area]</div>
              </div>
            </div>
          </div>
        </div>

 
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-transparent to-purple-500/5"></div>
          
          <div className="relative px-1 py-8">
            <div className="flex items-center justify-between mb-6 px-2">
              <div>
                <h2 className="text-2xl font-bold text-white tracking-tight">QUANTUM PRODUCTS</h2>
                <p className="text-cyan-300/60 text-sm mt-1">Top-Performing Neural Tech</p>
              </div>
              <div className="flex space-x-2">
                <button className="p-2 rounded-lg border border-cyan-500/30 hover:border-cyan-400/50 bg-slate-900/50 backdrop-blur-sm transition-all hover:scale-105">
                  <FiChevronLeft className="text-cyan-300" />
                </button>
                <button className="p-2 rounded-lg border border-cyan-500/30 hover:border-cyan-400/50 bg-slate-900/50 backdrop-blur-sm transition-all hover:scale-105">
                  <FiChevronRight className="text-cyan-300" />
                </button>
              </div>
            </div>

          
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {popularProducts.map((product) => (
                <div key={product.id} className="relative group">
        
                  <div className={`absolute inset-0 rounded-xl bg-gradient-to-r ${product.glow} opacity-20 blur-md group-hover:opacity-30 transition-all duration-500`}></div>
                  
                  <div className="relative bg-slate-900/80 backdrop-blur-sm rounded-xl border border-slate-700/50 overflow-hidden">
                  
                    <div className={`h-40 relative overflow-hidden bg-gradient-to-br ${product.glow}`}>
                    
                      <div className="absolute inset-0 opacity-20" style={{
                        backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px),
                                        linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
                        backgroundSize: '20px 20px'
                      }}></div>
                      

                      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-scan"></div>
                      
                      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                        <div className="text-white font-bold text-xl tracking-wider">{product.name}</div>
                        <div className="text-cyan-100/80 text-sm">{product.category}</div>
                        <div className="text-cyan-300/60 text-xs mt-1 font-mono">{product.specs}</div>
                      </div>
                    </div>
                    
                    <div className="p-5">
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="text-2xl font-bold text-white">{product.price}</div>
                          <div className="text-slate-400 text-xs mt-1">NEURAL CREDITS</div>
                        </div>
                        <button className="px-5 py-2.5 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 rounded-lg hover:from-cyan-500/30 hover:to-blue-500/30 transition-all border border-cyan-500/30 hover:border-cyan-400/50 text-sm font-medium group-hover:scale-105 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                          ACCESS SPECS
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

   
        <footer className="border-t border-slate-800/50 pt-6 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <div className="text-white font-bold text-lg mb-1">CYBORGMANIA ANALYTICS</div>
              <p className="text-slate-400 text-sm">NEURAL DASHBOARD v1.0</p>
            </div>
          </div>
          <div className="mt-6 text-center text-slate-500 text-sm">
            <p>© {new Date().getFullYear()} CYBORGMANIA NEURAL NETWORK. All metrics are quantum-simulated.</p>
          </div>
        </footer>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;