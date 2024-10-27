// App.tsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './components/Register/Register'; // Import the Register component
import Login from './components/Login/Login'; // Import the Login component
import Home from './components/Home/Home'; // Import Home component
import Profile from './components/Profile/Profile'; // Import Profile component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} /> {/* Set Home as the default page */}
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} /> {/* Profile Route */}
      </Routes>
    </Router>
  );
}

export default App;
