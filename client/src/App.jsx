import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import LandingPage from './pages/LandingPage';
import Team from './pages/Team';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const [showPreloader, setShowPreloader] = useState(true);
  const [safetyTimeoutId, setSafetyTimeoutId] = useState(null);
  const videoRef = useRef(null);

  useEffect(() => {
    // Attempt play programmatically on load to bypass some autoplay blocks
    if (videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.warn("Autoplay block or delay detected. Preloader will transition via safety timer.", err);
      });
    }

    // Default 10 seconds absolute safety fallback if metadata or video load fails
    const fallbackTimer = setTimeout(() => {
      setShowPreloader(false);
    }, 10000);

    return () => {
      clearTimeout(fallbackTimer);
      if (safetyTimeoutId) clearTimeout(safetyTimeoutId);
    };
  }, [safetyTimeoutId]);

  const handleLoadedMetadata = (e) => {
    const duration = e.target.duration;
    if (duration && !isNaN(duration)) {
      // Set safety timeout slightly after video duration
      const safetyTime = (duration + 1.2) * 1000;
      const timer = setTimeout(() => {
        setShowPreloader(false);
      }, safetyTime);
      setSafetyTimeoutId(timer);
    }
  };

  const handleVideoEnded = () => {
    setShowPreloader(false);
  };

  const handleVideoError = () => {
    console.error("Preloader video failed to load or play. Proceeding to website.");
    setShowPreloader(false);
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {showPreloader ? (
          <motion.div
            key="preloader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              backgroundColor: '#000000',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 99999,
              overflow: 'hidden'
            }}
          >
            <video
              ref={videoRef}
              src="/Create_a_luxury_website_preloa.mp4"
              autoPlay
              muted
              playsInline
              preload="auto"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
              onLoadedMetadata={handleLoadedMetadata}
              onEnded={handleVideoEnded}
              onError={handleVideoError}
            />
          </motion.div>
        ) : (
          <motion.div
            key="app-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <div>
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/team" element={<Team />} />
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
