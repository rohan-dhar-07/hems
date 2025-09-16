import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const TopBar = ({ totalCartItems, cartRef }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false); // New state for mobile search
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const location = useLocation();

  const allItems = [
    'Chocolate Cake', 'Vanilla Cake', 'Red Velvet Cake', 'Cheesecake',
    'Croissant', 'Pain au Chocolat', 'Muffin', 'Danish Pastry',
    'Sourdough Bread', 'Rye Bread', 'Baguette', 'Focaccia',
    'Strawberry Ice Cream', 'Chocolate Ice Cream', 'Vanilla Ice Cream', 'Mint Chip Ice Cream'
  ];

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.length > 1) {
      const filteredSuggestions = allItems.filter(item =>
        item.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSearchFocus = () => setIsSearchActive(true);
  const handleSearchBlur = () => setTimeout(() => setIsSearchActive(false), 200);

  // Effect to close mobile menu if mobile search is opened
  useEffect(() => {
    if (isMobileSearchOpen) {
      setIsMenuOpen(false);
    }
  }, [isMobileSearchOpen]);
  
  const navItems = [
    { name: 'Custom Orders', path: '/custom-orders' },
    { name: 'Gifting & Events', path: '/gifting' },
    { name: 'About Us', path: '/about' },
  ];

  const closeMobileSearch = () => {
    setIsMobileSearchOpen(false);
    setSearchQuery('');
    setSuggestions([]);
  };

  return (
    <header className="bg-white fixed top-0 w-full z-40 shadow-md border-b border-amber-100">
      <div className="container mx-auto px-4 flex justify-between items-center h-16 relative">
        
        <Link to="/" className="flex items-center space-x-2">
          <img src="/logo/image33.jpeg" alt="HEMS Bakery Logo" className="h-12 w-auto" />
        </Link>

        {/* --- DESKTOP NAVIGATION --- */}
        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <Link 
              key={item.name}
              to={item.path} 
              className="relative text-gray-700 hover:text-pink-600 font-medium text-sm transition-colors py-1 group"
            >
              {item.name}
              <span className={`absolute bottom-0 left-0 h-0.5 bg-pink-500 transition-all duration-300 ${location.pathname === item.path ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
            </Link>
          ))}
        </nav>
        
        {/* --- ICONS & DESKTOP SEARCH --- */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          
          {/* Desktop Search Bar */}
          <div className="relative hidden md:block">
            <input 
              type="text" 
              placeholder="Search pastries, cakes..." 
              value={searchQuery}
              onChange={handleSearchChange}
              onFocus={handleSearchFocus}
              onBlur={handleSearchBlur}
              className="w-56 pl-4 pr-10 py-2 rounded-full border border-amber-200 bg-white text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400" 
            />
            <svg className="absolute right-3 top-2.5 h-4 w-4 text-amber-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            {isSearchActive && suggestions.length > 0 && (
              <ul className="absolute top-full left-0 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                {suggestions.map((item, index) => (
                  <li key={index}><Link to={`/search?q=${item}`} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setSearchQuery(item)}>{item}</Link></li>
                ))}
              </ul>
            )}
          </div>

          {/* --- NEW: Mobile Search Icon --- */}
          <button onClick={() => setIsMobileSearchOpen(true)} className="p-2 rounded-full hover:bg-amber-100 transition-colors md:hidden" aria-label="Open search">
            <svg className="h-5 w-5 text-amber-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>

          {/* Cart Icon */}
          <Link to="/cart" ref={cartRef} className="relative p-2 rounded-full hover:bg-amber-100 transition-colors" aria-label="Cart">
            <svg className="h-5 w-5 text-amber-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {totalCartItems > 0 && (
              <span className="absolute -top-1 -right-1 block h-5 w-5 rounded-full bg-pink-500 text-white text-xs flex items-center justify-center font-bold">
                {totalCartItems}
              </span>
            )}
          </Link>

          {/* Hamburger Menu Icon */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 rounded-full hover:bg-amber-100 transition-colors" aria-label="Open menu">
              <svg className="h-5 w-5 text-amber-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* --- NEW: Mobile Search Overlay --- */}
      {isMobileSearchOpen && (
        <div className="absolute top-0 left-0 w-full h-16 bg-white z-50 flex items-center px-4 md:hidden border-b border-amber-200">
          <input
            type="text"
            placeholder="Search pastries, cakes..."
            className="w-full h-full text-gray-800 placeholder-gray-400 focus:outline-none"
            value={searchQuery}
            onChange={handleSearchChange}
            autoFocus
          />
          <button onClick={closeMobileSearch} className="p-2" aria-label="Close search">
            <svg className="h-5 w-5 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          {suggestions.length > 0 && (
            <ul className="absolute top-full left-0 mt-0 w-full bg-white border-t border-gray-200 shadow-lg">
              {suggestions.map((item, index) => (
                <li key={index}><Link to={`/search?q=${item}`} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={closeMobileSearch}>{item}</Link></li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* --- Mobile Dropdown Menu (Search bar removed) --- */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-lg md:hidden border-t border-amber-100">
          <div className="flex flex-col px-4 pt-4 pb-6 space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="text-gray-700 hover:text-pink-600 font-medium py-2 border-b border-amber-50"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default TopBar;