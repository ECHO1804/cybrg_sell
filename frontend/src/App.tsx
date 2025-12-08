// App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PartsCatalog from './pages/cyborg/PartsCatalog';
import ShoppingCart from './pages/cyborg/ShoppingCart';
import Orders from './pages/cyborg/Order';
import PartsPage from './pages/cyborg/PartsPage';
import Dashboard from './pages/admin/Dashboard';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/cyborg/parts" element={<PartsCatalog />} />
        <Route path="/cyborg/cart" element={<ShoppingCart />} />
        <Route path="/cyborg/orders" element={<Orders />} />
        <Route path="/" element={<PartsCatalog />} /> 
        <Route path="/cyborg/parts/:id" element={<PartsPage />} /> 

        <Route path="/admin" element={<Dashboard />} /> 
      </Routes>
    </Router>
  );
}

export default App;