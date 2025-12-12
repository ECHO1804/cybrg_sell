import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PartsCatalog from './pages/cyborg/PartsCatalog';
import ShoppingCart from './pages/cyborg/ShoppingCart';
import PartsPage from './pages/cyborg/PartsPage';
import OrderList from './pages/admin/OrderList';
import ProductsList from './pages/admin/ProductsList';
import Orders from './pages/cyborg/Orders';

import Login from './pages/login_register/login';
import Register from './pages/login_register/register';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/cyborg/cart" element={<ShoppingCart />} />
        <Route path="/cyborg/orders" element={<Orders />} />
        <Route path="/cyborg/parts" element={<PartsCatalog />} /> 
        <Route path="/cyborg/parts/:partId" element={<PartsPage />} />

        <Route path="/admin" element={<OrderList />} /> 
        <Route path="/admin/products" element={<ProductsList />} /> 

        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;