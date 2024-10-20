// App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/Register/Register'; // Import the Register component


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
