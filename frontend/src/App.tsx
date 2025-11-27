// App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PartsCatalog from './pages/cyborg/PartsCatalog';
import ShoppingCart from './pages/cyborg/ShoppingCart';
import Orders from './pages/cyborg/Order';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/cyborg/parts" element={<PartsCatalog />} />
        <Route path="/cyborg/cart" element={<ShoppingCart />} />
        <Route path="/cyborg/orders" element={<Orders />} />
        <Route path="/" element={<PartsCatalog />} /> 
      </Routes>
    </Router>
  );
}

export default App;