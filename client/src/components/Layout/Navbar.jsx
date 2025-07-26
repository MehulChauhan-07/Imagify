import React, { useContext, useState, useEffect } from "react";
import { assets } from "../../assets/assets.js";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AppContext } from "../../context/AppContext.jsx";
import { ModeToggle } from "../ModeToggle.tsx";
// import { useClerk, UserButton, useUser } from "@clerk/clerk-react";

const Navbar = () => {
  // const [user, setUser] = React.useState(null);
  const { user } = useContext(AppContext);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // const { openSignIn } = useClerk();
  const navigate = useNavigate();
  const location = useLocation();
  // const { isSignedIn, user } = useUser();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsProfileOpen(false);
  }, [location.pathname]);

  const openSignIn = () => {
    // Placeholder for actual sign in function
    console.log("Sign in clicked");
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Pricing", path: "/pricing" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav
      className={`relative transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo Section */}
          <Link to="/" className="group flex items-center">
            <div className="relative">
              <img
                className="w-28 sm:w-32 lg:w-40 transition-transform duration-300 group-hover:scale-105"
                src={assets.logo}
                alt="Imagify Logo"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300 rounded-lg"></div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-3 py-2 text-sm font-medium transition-colors duration-300 group ${
                  location.pathname === link.path
                    ? "text-purple-600 dark:text-purple-400"
                    : "text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
                }`}
              >
                {link.name}
                <span
                  className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-600 to-pink-600 transform transition-transform duration-300 ${
                    location.pathname === link.path
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-100"
                  }`}
                ></span>
              </Link>
            ))}
          </div>

          {/* User Section */}
          {user ? (
            <div className="flex items-center gap-3 sm:gap-4">
              {/* Theme Toggle */}
              <ModeToggle />

              {/* Credits Button */}
              <button
                onClick={() => navigate("/pricing")}
                className="group flex items-center gap-2 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 border border-blue-200 dark:border-blue-700 px-3 py-2 sm:px-4 sm:py-2.5 rounded-full hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <div className="relative">
                  <img
                    src={assets.credit_star}
                    alt="Credits"
                    className="w-4 h-4 sm:w-5 sm:h-5"
                  />
                  <div className="absolute inset-0 bg-yellow-400 blur opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                </div>
                <p className="text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300">
                  <span className="hidden sm:inline">Credits: </span>50
                </p>
                <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse"></div>
              </button>

              {/* Welcome Text */}
              <p className="text-gray-600 dark:text-gray-400 max-sm:hidden text-sm">
                Hi,{" "}
                <span className="font-semibold text-gray-800 dark:text-gray-200">
                  Mehulsinh
                </span>
              </p>

              {/* Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="group relative w-10 h-10 rounded-full overflow-hidden border-2 border-gray-200 dark:border-gray-700 hover:border-purple-400 dark:hover:border-purple-500 transition-all duration-300 hover:scale-110"
                >
                  <img
                    src={assets.profile_icon}
                    alt="Profile"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                </button>

                {/* Dropdown Menu */}
                {isProfileOpen && (
                  <div className="absolute right-0 top-12 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 py-2 z-50 animate-in slide-in-from-top-2">
                    <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-700">
                      <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                        Mehulsinh
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        mehul@example.com
                      </p>
                    </div>

                    <Link
                      to="/profile"
                      className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                    >
                      <span className="text-lg">👤</span>
                      Profile Settings
                    </Link>

                    <Link
                      to="/history"
                      className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                    >
                      <span className="text-lg">📜</span>
                      Generation History
                    </Link>

                    <Link
                      to="/pricing"
                      className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                    >
                      <span className="text-lg">💳</span>
                      Buy Credits
                    </Link>

                    <div className="border-t border-gray-100 dark:border-gray-700 mt-2 pt-2">
                      <button className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200">
                        <span className="text-lg">🚪</span>
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3 sm:gap-5">
              {/* Theme Toggle */}
              <ModeToggle />

              {/* Desktop Links */}
              {/* <div className="hidden sm:flex items-center gap-4">
                <Link
                  to="/pricing"
                  className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium transition-colors duration-300"
                >
                  Pricing
                </Link>
              </div> */}

              {/* Login Button */}
              <button
                className="group relative bg-gradient-to-r from-gray-800 to-gray-900 dark:from-gray-700 dark:to-gray-800 text-white py-2.5 px-6 sm:px-8 text-sm font-semibold rounded-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-105"
                onClick={() => openSignIn()}
              >
                <span className="relative z-10">Sign In</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 group-hover:animate-shimmer"></div>
              </button>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 shadow-lg z-50">
            <div className="px-4 py-4 space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block px-3 py-2 rounded-lg text-base font-medium transition-colors duration-200 ${
                    location.pathname === link.path
                      ? "text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                  }`}
                >
                  {link.name}
                </Link>
              ))}

              {!user && (
                <button
                  onClick={() => openSignIn()}
                  className="w-full text-left px-3 py-2 rounded-lg text-base font-medium text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors duration-200"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Backdrop for mobile menu */}
      {(isMobileMenuOpen || isProfileOpen) && (
        <div
          className="fixed inset-0 bg-black/20 z-40"
          onClick={() => {
            setIsMobileMenuOpen(false);
            setIsProfileOpen(false);
          }}
        />
      )}
    </nav>
  );
};

export default Navbar;
