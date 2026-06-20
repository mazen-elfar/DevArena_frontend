import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/home/Home';
import LandingPage from './pages/landing/LandingPage';
import Community from './pages/community/Community';

function App() {
  // Set to false to show Landing Page first by default
  const isAuthenticated = false; 

  return (
    <Router>
      <Routes>
        {/* Landing Page at root */}
        <Route path="/" element={<LandingPage />} />
        
        {/* Dashboard routes */}
        <Route path="/home" element={<Home />} />
        <Route path="/community" element={<Community />} />
        
        {/* Redirect any other address to root */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;