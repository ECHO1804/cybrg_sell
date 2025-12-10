import type { ReactNode } from 'react';
import Navigation from './Navigation';

interface CyborgLayoutProps {
  children: ReactNode;
  cartItemsCount?: number; // Made optional
}

const CyborgLayout = ({ children, cartItemsCount = 0 }: CyborgLayoutProps) => {
  return (
    <div
      style={{ fontFamily: "'Aquire', 'Orbitron'" }}
    className="min-h-screen bg-slate-950">
      <Navigation cartItemsCount={cartItemsCount} />
      <main className="max-w-7xl mx-auto py-6 px-4">
        {children}
      </main>
    </div>
  );
};

export default CyborgLayout;