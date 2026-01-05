import React, { useState, useEffect, useRef } from "react";
import logo from "../images/logo.png";
import { Link } from 'react-router-dom';
import {
  FaUser,
  FaShoppingCart,
  FaBars,
  FaChevronRight,
  FaTimes,
} from "react-icons/fa";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase"; // make sure this path is correct



function Header() {
 

 

const [user, setUser] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const [navHovered, setNavHovered] = useState(false);

useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  return () => unsubscribe();
}, []);


  // 🔥 Scroll detection effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    }
    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  // Close mobile menu on Escape key
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape") setIsMenuOpen(false);
    }
    if (isMenuOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMenuOpen]);

 const navLinks = [
  { label: "MEN", path: "/productsmen" },
  { label: "WOMEN", path: "/products" },
  { label: "ACCESSORIES", path: "/products" },
  { label: "COLLECTIONS", path: "/products" },
];


  // Background is white when scrolled or when a nav item is hovered
  const isWhiteBg = isScrolled || navHovered;

  return (
    <header
      className={`w-full fixed z-50 transition-colors duration-1000 ${
        isWhiteBg ? "bg-white" : "bg-transparent"
      }`}
    >
      <div className="mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
        {/* Logo and nav */}
        <div className="flex items-center space-x-8">
          <Link to="/" className="flex items-center">
            <img src={logo} alt="logo" className="h-10 w-auto" />
          </Link>

          <nav className="hidden md:flex items-center tracking-widest space-x-6">
            {navLinks.map((item) => (
              <div
                key={item.label}
                onMouseEnter={() => setNavHovered(true)}
                onMouseLeave={() => setNavHovered(false)}
              >
                <Link
                  to={item.path}
                  className={`group relative text-[1rem] font-['Commuters_Sans'] uppercase transition-colors duration-500 ${
                    isWhiteBg ? "text-black" : "text-white"
                  }`}
                  style={{ cursor: "pointer" }}
                >
                  {item.label}
                  <span
                    className="absolute left-0 -bottom-4 w-full h-1 bg-black transition-transform duration-500 origin-left scale-x-0 group-hover:scale-x-100"
                  ></span>
                </Link>
              </div>
            ))}
          </nav>
        </div>

        {/* Right section */}
          <div className="flex items-center space-x-4">
          <div>
         
          </div>

          <Link to="/login">
  {user ? (
    <div
      className={`w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm uppercase ${
        isWhiteBg ? "text-gray-800" : "text-white"
      }`}
      title={user.email}
    >
      {user.email.charAt(0)}
    </div>
  ) : (
    <FaUser
      className={`text-xl transition-colors duration-300 cursor-pointer ${
        isWhiteBg
        ? "border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white"
        : "border-white text-white hover:bg-white hover:text-gray-500"
      }`}
    />
  )}
</Link>

          <FaShoppingCart
            className={`text-xl transition-colors duration-300 cursor-pointer ${
              isWhiteBg ? "text-gray-800 hover:text-black" : "md:text-white text-black hover:text-black"
            }`}
          />

          {/* Hamburger Menu */}
          <button
            className={`block md:hidden text-2xl focus:outline-none ${isWhiteBg ? 'text-gray-800' : 'text-white'}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            <FaBars />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex justify-end md:hidden">
          <div
            ref={menuRef}
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            className="w-72 h-full bg-white shadow-lg flex flex-col animate-slide-in-right relative"
            style={{ transition: "transform 0.3s cubic-bezier(0.4,0,0.2,1)" }}
          >
            <button
              className="absolute top-4 right-4 text-2xl text-gray-700 hover:text-black focus:outline-none"
              onClick={() => setIsMenuOpen(false)}
              aria-label="Close menu"
            >
              <FaTimes />
            </button>

            <div className="flex-1 flex flex-col gap-2 mt-16">
              {navLinks.map((item, idx) => (
                <div key={item.label}>
                  <Link
                    to={item.path}
                    className="flex items-center justify-between text-lg font-bold text-gray-900 hover:text-yellow-400 py-4 px-6 uppercase tracking-widest transition"
                  >
                    <span>{item.label}</span>
                    <FaChevronRight className="text-gray-400 text-xl" />
                  </Link>
                  {idx !== navLinks.length - 1 && (
                    <div className="border-b border-gray-200 mx-6" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    
    </header>
  );
}

export default Header;
