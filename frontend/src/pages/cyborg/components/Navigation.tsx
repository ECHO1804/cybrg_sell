import { Link, useLocation } from 'react-router-dom';
import { FiShoppingCart, FiPackage, FiList } from 'react-icons/fi';

interface NavigationProps {
  cartItemsCount: number;
}

const Navigation = ({ cartItemsCount }: NavigationProps) => {
  const location = useLocation();

  const navItems = [
    { path: '/cyborg/parts', label: 'Parts Catalog', icon: FiList },
    { path: '/cyborg/cart', label: 'Shopping Cart', icon: FiShoppingCart },
    { path: '/cyborg/orders', label: 'Orders', icon: FiPackage },
  ];

  return (
    <nav className="bg-slate-900 border-b border-cyan-500/30 shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
        
          <div className="shrink-0">
            <h1 className="text-cyan-400 text-xl font-bold tracking-wider">
              CYBORG PARTS
            </h1>
          </div>

          {/* Links */}
          <div className="flex space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50'
                      : 'text-gray-300 hover:text-cyan-400 hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                  {item.label === 'Shopping Cart' && cartItemsCount > 0 && (
                    <span className="bg-rose-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                      {cartItemsCount}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;