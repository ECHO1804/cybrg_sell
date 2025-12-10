import { useState } from 'react';
import { FiPackage, FiShoppingCart, FiLogOut, FiMenu, FiX, FiUser, FiShoppingBag } from 'react-icons/fi';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartItems] = useState(3); // Example cart count

  const handleSignOut = () => {
    console.log('Signing out...');
    // Cyborg sign out logic
  };

  return (
    <nav 
      className="bg-gray-800 text-white p-[1px] rounded-b-lg bg-gradient-to-r from-cyan-500 via-blue-500 to-blue-50"
      style={{ animation: 'glow-pulse 2s ease-in-out infinite' }}
    >
      <div className="bg-slate-950 rounded-b-lg">
        <div className="h-16 container mx-auto px-4 sm:px-6 flex items-center justify-between">
        
          <a href="/cyborg" className="flex items-center space-x-3 group">
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
        
            <a href="/cyborg/parts" className="nav-link flex items-center space-x-2 group">
              <FiPackage className="text-lg group-hover:scale-110 transition-transform" />
              <span>Parts</span>
            </a>
            
          
            <a href="/cyborg/cart" className="nav-link flex items-center space-x-2 group relative">
              <FiShoppingCart className="text-lg group-hover:scale-110 transition-transform" />
              <span>Cart</span>
              {cartItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center drop-shadow-[0_0_6px_rgba(239,68,68,0.7)]">
                  {cartItems}
                </span>
              )}
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
                href="/cyborg/parts"
                className="flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-gray-800/50 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <FiPackage />
                <span>Parts</span>
              </a>
              
         
              <a
                href="/cyborg/cart"
                className="flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-gray-800/50 transition-colors relative"
                onClick={() => setIsMenuOpen(false)}
              >
                <FiShoppingCart />
                <span>Cart</span>
                {cartItems > 0 && (
                  <span className="absolute right-3 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center drop-shadow-[0_0_6px_rgba(239,68,68,0.7)]">
                    {cartItems}
                  </span>
                )}
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