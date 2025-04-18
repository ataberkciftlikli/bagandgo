// App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/Register/Register'; // Import the Register component
import Login from './components/Login/Login'; // Import the Login component
import Home from './components/Home/Home'; // Import Home component
import Profile from './components/Profile/Profile'; // Import Profile component
import Cart from './components/Cart/CartPage'; // Import CartPage component
import QRcode from './components/QR/QRcode'; //IMport QR component
import CategoryPage from './components/Category/CategoryPage'; //IMport QR component
import Sales from './components/Home/Sales/Sales';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile/*" element={<Profile />} /> {/* Profile Route */}
        <Route path="/cart" element={<Cart />} />
        <Route path="/code" element={<QRcode />} />
        <Route path="/category/:slug" element={<CategoryPage />} />
        <Route path="/home/sales" element={<Sales />} />
      </Routes>
    </Router>
  );
}

export default App;
