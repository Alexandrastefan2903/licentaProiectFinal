import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import QuizPage from './pages/QuizPage';
import Quiz from './components/Quiz';
import ResultsPage from './pages/ResultsPage';
import Profile from './pages/Profile';
import LearnMore from './pages/LearnMore';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedIsAuthenticated = JSON.parse(localStorage.getItem('isAuthenticated'));
    const savedUser = JSON.parse(localStorage.getItem('user'));
    const savedIsDarkMode = JSON.parse(localStorage.getItem('isDarkMode'));
    if (savedIsAuthenticated) {
      setIsAuthenticated(savedIsAuthenticated);
      setUser(savedUser);
    }
    if (savedIsDarkMode) {
      setIsDarkMode(savedIsDarkMode);
    }
  }, []);

  const handleLogin = (user) => {
    console.log('Logging in user:', user);
    setIsAuthenticated(true);
    setUser(user);
    localStorage.setItem('isAuthenticated', JSON.stringify(true));
    localStorage.setItem('user', JSON.stringify(user));
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.setItem('isAuthenticated', JSON.stringify(false));
    localStorage.setItem('user', JSON.stringify(null));
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    localStorage.setItem('isDarkMode', JSON.stringify(!isDarkMode));
    document.body.classList.toggle('dark-mode', !isDarkMode); 
  };

  useEffect(() => {
    document.body.classList.toggle('dark-mode', isDarkMode); 
  }, [isDarkMode]);

  return (
    <Router>
      <div className={`App ${isDarkMode ? 'dark-mode' : ''}`}>
        <Navbar
          isAuthenticated={isAuthenticated}
          user={user}
          onLogin={handleLogin}
          onLogout={handleLogout}
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
        />
        <Routes>
          <Route path="/" element={<Home isAuthenticated={isAuthenticated} />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/quiz/start" element={<Quiz user={user} />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/profile" element={<Profile user={user} />} />
          <Route path="/learn-more" element={<LearnMore />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
