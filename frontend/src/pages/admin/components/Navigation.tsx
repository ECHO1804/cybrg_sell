import { useState } from 'react';
import { FiPackage, FiShoppingBag, FiLogOut, FiMenu, FiX } from 'react-icons/fi';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSignOut = () => {
    console.log('Signing out...');
  };

  return (
    <nav 
      className="bg-gray-800 text-white p-[1px] rounded-b-lg bg-gradient-to-r from-cyan-500 via-blue-500 to-blue-50"
      style={{ animation: 'glow-pulse 2s ease-in-out infinite' }}
    >
      <div className="bg-slate-950 rounded-b-lg">
        <div className="h-16 container mx-auto px-4 sm:px-6 flex items-center justify-between">
    
          <a href="/admin" className="flex items-center space-x-3 group">
            <div className="relative">
              <img 
                src="/path-to-your-logo.png"
                alt="CYBORGMANIA Logo"
                className="h-10 w-10 object-contain filter brightness-125 saturate-150 drop-shadow-[0_0_8px_rgba(6,182,212,0.7)] group-hover:drop-shadow-[0_0_15px_rgba(6,182,212,1)] transition-all duration-300"
              />
              <div className="absolute inset-0 rounded-full border border-cyan-400/50 group-hover:border-cyan-300 group-hover:scale-110 transition-all duration-500"></div>
            </div>
            <div className="font-bold text-xl text-cyber-glow animate-text-glow">
              CYBORGMANIA
            </div>
          </a>

          <div className="hidden md:flex items-center space-x-6">
        
            <a href="/admin/orders" className="nav-link flex items-center space-x-2 group">
              <FiPackage className="text-lg group-hover:scale-110 transition-transform" />
              <span>Orders</span>
            </a>
            
          
            <a href="/admin/products" className="nav-link flex items-center space-x-2 group">
              <FiShoppingBag className="text-lg group-hover:scale-110 transition-transform" />
              <span>Products</span>
            </a>
            
            <div className="h-6 w-px bg-gray-700"></div>
            
        
            <button
              onClick={handleSignOut}
              className="nav-link flex items-center space-x-2 group px-4 py-2 rounded-md hover:bg-gray-800/50 transition-all duration-300"
            >
              <FiLogOut className="text-lg" />
              <span>Sign Out</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md hover:bg-gray-800/50 transition-colors"
          >
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-700 px-4 py-3 bg-slate-950/95 backdrop-blur-sm">
            <div className="space-y-3">
           
              <a
                href="/admin/orders"
                className="flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-gray-800/50 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <FiPackage />
                <span>Orders</span>
              </a>
              
           
              <a
                href="#"
                className="flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-gray-800/50 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <FiShoppingBag />
                <span>Products</span>
              </a>
              
           
              <button
                onClick={() => {
                  handleSignOut();
                  setIsMenuOpen(false);
                }}
                className="w-full flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-red-500/10 text-red-300 transition-colors"
              >
                <FiLogOut />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;