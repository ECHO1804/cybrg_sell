import type { ReactNode } from 'react';
import Navigation from './Navigation';

interface AdminLayoutProps {
  children: ReactNode;
}


const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <div 
      className="min-h-screen bg-slate-950"
      style={{ fontFamily: "'Aquire', 'Orbitron'" }}
    >
      <Navigation />
      <main className="max-w-7xl mx-auto py-6 px-4 pt-20">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;