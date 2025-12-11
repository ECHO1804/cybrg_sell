import { useState, useEffect } from 'react';
import { FiPackage, FiShoppingBag, FiLogOut, FiChevronDown, FiChevronUp } from 'react-icons/fi';

const Navigation = () => {
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [isAtTop, setIsAtTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const atTop = window.scrollY === 0;
      setIsAtTop(atTop);
      if (atTop) setIsNavbarVisible(true);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignOut = () => {
    console.log('Signing out...');
  };

  const toggleNavbar = () => setIsNavbarVisible(!isNavbarVisible);

  return (
    <>
      {!isAtTop && (
        <button
          onClick={toggleNavbar}
          className="fixed top-4 right-4 z-9999 p-2 bg-slate-900/90 backdrop-blur-sm rounded-lg border border-cyan-500/30 text-cyan-300 hover:border-cyan-400/50 hover:shadow-[0_0_20px_rgba(6,182,212,0.6)] transition-all group"
        >
          {isNavbarVisible ? <FiChevronUp /> : <FiChevronDown />}
        </button>
      )}


      <nav 
        className={`fixed top-0 left-0 right-0 z-9998 transition-transform duration-300 ${
          isNavbarVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div 
          className="text-white p-1px rounded-b-lg bg-linear-to-r from-cyan-500 via-blue-500 to-blue-50"
          style={{ animation: 'glow-pulse 2s ease-in-out infinite' }}
        >
          <div className="bg-slate-950 rounded-b-lg">
            <div className="h-16 container mx-auto px-4 sm:px-6 flex items-center justify-between">
          
              <a href="/admin" className="flex items-center space-x-3 group">
                <div className="relative">
                  <img 
                    src="./assets/images/logo.png"
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
           
                <a href="/admin" className="nav-link flex items-center space-x-2 group">
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

            </div>

          
           
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navigation;