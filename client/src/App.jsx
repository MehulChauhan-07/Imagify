import React, { useState, useEffect } from "react";
// import './App.css'
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Result from "./pages/Result.jsx";
import BuyCredit from "./pages/BuyCredit.jsx";
import Navbar from "./components/Layout/Navbar.jsx";
import Footer from "./components/Layout/Footer.jsx";
import { ThemeProvider } from "./components/ThemeProvider.tsx";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [pageTransition, setPageTransition] = useState(false);
  const location = useLocation();

  // Initial loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Page transition effect
  useEffect(() => {
    setPageTransition(true);
    const timer = setTimeout(() => setPageTransition(false), 300);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  if (isLoading) {
    return (
      <ThemeProvider defaultTheme="system" storageKey="imagify-ui-theme">
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-4"></div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Loading Imagify
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Preparing your creative workspace...
            </p>
          </div>
        </div>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider defaultTheme="system" storageKey="imagify-ui-theme">
      <div className="min-h-screen bg-gradient-to-br from-blue-50/30 via-purple-50/20 to-pink-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-500">
        {/* Enhanced Background Pattern */}
        <div className="fixed inset-0 opacity-5 dark:opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,119,198,0.1),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(119,255,198,0.1),transparent_50%)]"></div>
        </div>

        {/* Main App Container */}
        <div className="relative z-10 px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
          <div className="max-w-7xl mx-auto">
            {/* Enhanced Navbar */}
            <div className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-gray-900/80 rounded-b-xl shadow-lg border-b border-gray-200/50 dark:border-gray-700/50 mb-6">
              <Navbar />
            </div>

            {/* Page Content with Transition */}
            <main
              className={`transition-all duration-500 ${
                pageTransition
                  ? "opacity-50 translate-y-4"
                  : "opacity-100 translate-y-0"
              }`}
            >
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/result" element={<Result />} />
                <Route path="/pricing" element={<BuyCredit />} />
              </Routes>
            </main>

            {/* Enhanced Footer */}
            <div className="mt-20">
              <Footer />
            </div>
          </div>
        </div>

        {/* Scroll to Top Button */}
        <ScrollToTop />

        {/* Performance Monitor (Development Only) */}
        {process.env.NODE_ENV === "development" && <PerformanceMonitor />}
      </div>
    </ThemeProvider>
  );
}

// Scroll to Top Component
const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.pageYOffset > 300);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      className={`fixed bottom-8 right-8 p-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-50 ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-10 pointer-events-none"
      }`}
      onClick={scrollToTop}
      aria-label="Scroll to top"
    >
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 10l7-7m0 0l7 7m-7-7v18"
        />
      </svg>
    </button>
  );
};

// Performance Monitor Component (Development)
const PerformanceMonitor = () => {
  const [fps, setFps] = useState(0);

  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();

    const updateFps = () => {
      frameCount++;
      const currentTime = performance.now();

      if (currentTime >= lastTime + 1000) {
        setFps(Math.round((frameCount * 1000) / (currentTime - lastTime)));
        frameCount = 0;
        lastTime = currentTime;
      }

      requestAnimationFrame(updateFps);
    };

    requestAnimationFrame(updateFps);
  }, []);

  return (
    <div className="fixed top-4 right-4 bg-black/80 text-white px-3 py-1 rounded text-sm font-mono z-50">
      FPS: {fps}
    </div>
  );
};

export default App;
