import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import LoadingScreen from './components/layout/LoadingScreen';
import Home from './pages/Home';
import Registration from './pages/Registration';
import CustomCursor from './components/shared/CustomCursor';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user has already seen the boot sequence this session
    const hasSeenBoot = sessionStorage.getItem('doom_boot_seen');
    if (hasSeenBoot) {
      setLoading(false);
    }
  }, []);

  const handleLoadingComplete = () => {
    sessionStorage.setItem('doom_boot_seen', 'true');
    setLoading(false);
  };

  return (
    <Router>
      <CustomCursor />
      {loading ? (
        <LoadingScreen onComplete={handleLoadingComplete} />
      ) : (
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Registration />} />
            </Routes>
          </main>
          <Footer />
        </div>
      )}
    </Router>
  );
}

export default App;
