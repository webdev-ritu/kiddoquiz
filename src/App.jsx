import { useEffect, useState } from 'react'; 
import { Container } from 'react-bootstrap';
import { Routes, Route } from 'react-router-dom';
import useSound from './hooks/useSound'; 
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Categories from './pages/Categories';
import Quiz from './pages/Quiz';
import Results from './pages/Results';
import Dashboard from './pages/Dashboard';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Profile from './pages/Profile';
import './styles/main.css';
import './components/animations.css'; 
import BubbleBackground from './components/BubbleBackground';

function App() {
  const { play: playBackground } = useSound('background', {
    loop: true,
    volume: 0.4,
  }); // ✅ Added

  useEffect(() => {
    const handleFirstInteraction = () => {
      playBackground();
      window.removeEventListener('click', handleFirstInteraction);
    };

    window.addEventListener('click', handleFirstInteraction);
    return () => {
      window.removeEventListener('click', handleFirstInteraction);
    };
  }, []); // ✅ Added

  return (
    <div className="d-flex flex-column min-vh-100 position-relative overflow-hidden">
      
      {/* Floating bubbles */}
      <div className="bubble" style={{ width: 40, height: 40, bottom: 10, left: '10%', animationDelay: '0s' }} />
      <div className="bubble" style={{ width: 30, height: 30, bottom: 40, left: '70%', animationDelay: '2s' }} />
      <div className="bubble" style={{ width: 50, height: 50, bottom: 20, left: '50%', animationDelay: '4s' }} />
      <div className="bubble" style={{ width: 25, height: 25, bottom: 60, left: '30%', animationDelay: '1.5s' }} />
      <div className="bubble" style={{ width: 35, height: 35, bottom: 80, left: '80%', animationDelay: '3s' }} />

      <Header />
      <Container className="flex-grow-1 py-4">
        <BubbleBackground count={30} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/quiz/:category" element={<Quiz />} />
          <Route path="/results" element={<Results />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Container>
      <Footer />
    </div>
  );
}

export default App;
