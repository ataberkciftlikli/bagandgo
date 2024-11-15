// App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/Register/Register'; // Import the Register component
import Login from './components/Login/Login'; // Import the Login component
import Home from './components/Home/Home'; // Import Home component
import Profile from './components/Profile/Profile'; // Import Profile component
import User from './components/User/Profile'; // Import Profile component
import Cart from './components/Cart/CartPage'; // Import CartPage component
import QRcode from './components/QR/QRcode'; //IMport QR component
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
        <Route path="/user" element={<User />} />
        <Route path="/code" element={<QRcode />} />
      </Routes>
    </Router>
  );
}

export default App;
