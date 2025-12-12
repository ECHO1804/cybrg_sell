import { useState, useEffect } from 'react';
import { FiPackage, FiShoppingCart, FiLogOut, FiUser, FiChevronDown, FiEye, FiChevronUp } from 'react-icons/fi';

const Navigation = () => {
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [isAtTop, setIsAtTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const atTop = window.scrollY === 0;
      setIsAtTop(atTop);
      if (atTop) setIsNavbarVisible(true);
      setIsAccountDropdownOpen(false);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleNavbar = () => setIsNavbarVisible(!isNavbarVisible);
  const handleSignOut = () => window.location.href = '/';
  const handleViewOrders = () => {
    window.location.href = '/cyborg/orders';
    setIsAccountDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.account-dropdown-container')) {
        setIsAccountDropdownOpen(false);
      }
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <>
    
      {!isAtTop && (
        <button
          onClick={toggleNavbar}
          className="fixed top-4 right-4 z-[9999] p-2 bg-slate-900/90 backdrop-blur-sm rounded-lg border border-cyan-500/30 text-cyan-300 hover:border-cyan-400/50 hover:shadow-[0_0_20px_rgba(6,182,212,0.6)] transition-all group"
        >
          {isNavbarVisible ? <FiChevronUp /> : <FiChevronDown />}
        </button>
      )}

    
      <nav 
        className={`fixed top-0 left-0 right-0 z-[9998] transition-transform duration-300 ${
          isNavbarVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div 
          className="text-white p-[1px] rounded-b-lg bg-gradient-to-r from-cyan-500 via-blue-500 to-blue-50"
          style={{ animation: 'glow-pulse 2s ease-in-out infinite' }}
        >
          <div className="bg-slate-950 rounded-b-lg">
            <div className="h-16 container mx-auto px-4 sm:px-6 flex items-center justify-between">
            
              <a href="/cyborg/parts" className="flex items-center space-x-3 group">
                <div className="relative">
                  <img 
                    src="https://cdn.pixabay.com/photo/2022/12/29/16/19/logo-7685266_960_720.png"
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
                </a>
                    
                
                <div className="h-6 w-px bg-gray-700"></div>
                
               
                <div className="relative account-dropdown-container">
                  <button
                    onClick={() => setIsAccountDropdownOpen(!isAccountDropdownOpen)}
                    className="nav-link flex items-center space-x-2 group px-4 py-2 rounded-md hover:bg-gray-800/50 transition-all duration-300"
                  >
                    <FiUser className="text-lg" />
                    <span>Account</span>
                    <FiChevronDown className={`ml-1 transition-transform ${isAccountDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {isAccountDropdownOpen && (
                    <div className="absolute top-full right-0 mt-2 w-56 bg-slate-900/95 backdrop-blur-sm rounded-xl border border-cyan-500/40 shadow-[0_0_50px_rgba(6,182,212,0.5)] z-[10000]">
                      <div className="p-2 space-y-1">
                        <button
                          onClick={handleViewOrders}
                          className="w-full text-left flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-300 hover:text-cyan-300 hover:bg-cyan-500/10 transition-all group"
                        >
                          <FiEye className="group-hover:scale-110 transition-transform" />
                          <span>View Orders</span>
                        </button>
                        
                        <div className="h-px bg-cyan-500/20"></div>
                        
                        <button
                          onClick={handleSignOut}
                          className="w-full text-left flex items-center space-x-3 px-4 py-3 rounded-lg text-red-300 hover:text-red-200 hover:bg-red-500/10 transition-all group"
                        >
                          <FiLogOut className="group-hover:scale-110 transition-transform" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navigation;