import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import Navbar from './components/Navbar';
import ServiceStatus from './components/ServiceStatus';
import SpotlightBackground from './components/SpotlightBackground';
import GlassSidebar from './components/GlassSidebar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Items from './pages/Items';
import MyItems from './pages/MyItems';
import Profile from './pages/Profile';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is logged in (from localStorage)
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <ThemeProvider>
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-500">
          <SpotlightBackground />
          <Navbar user={user} onLogout={handleLogout} />
          <GlassSidebar user={user} />
          <main className={`container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 relative z-10 ${user ? 'lg:ml-56 xl:ml-64' : ''} transition-all duration-300`}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route 
                path="/login" 
                element={user ? <Navigate to="/items" /> : <Login onLogin={handleLogin} />} 
              />
              <Route 
                path="/register" 
                element={user ? <Navigate to="/items" /> : <Register onLogin={handleLogin} />} 
              />
              <Route 
                path="/items" 
                element={user ? <Items user={user} /> : <Navigate to="/login" />} 
              />
              <Route 
                path="/my-items" 
                element={user ? <MyItems user={user} /> : <Navigate to="/login" />} 
              />
              <Route 
                path="/profile" 
                element={user ? <Profile user={user} setUser={setUser} /> : <Navigate to="/login" />} 
              />
            </Routes>
          </main>
          <ServiceStatus />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
