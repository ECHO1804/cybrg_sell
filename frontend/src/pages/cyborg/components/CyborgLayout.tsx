import type { ReactNode } from 'react';
import Navigation from './Navigation';

interface CyborgLayoutProps {
  children: ReactNode;
  cartItemsCount: number;
}

const CyborgLayout = ({ children, cartItemsCount }: CyborgLayoutProps) => {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900">
      <Navigation cartItemsCount={cartItemsCount} />
      <main className="max-w-7xl mx-auto py-6 px-4">
        {children}
      </main>
    </div>
  );
};

export default CyborgLayout;