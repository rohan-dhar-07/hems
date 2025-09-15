import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const TopBar = ({ totalCartItems, cartRef }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
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

  const handleSearchFocus = () => {
    setIsSearchActive(true);
  };

  const handleSearchBlur = () => {
    setTimeout(() => {
      setIsSearchActive(false);
    }, 200);
  };
  
  const navItems = [
    { name: 'Custom Orders', path: '/custom-orders' },
    { name: 'Gifting & Events', path: '/gifting' },
    { name: 'About Us', path: '/about' },
  ];

  return (
    <header className="bg-white fixed top-0 w-full z-40 shadow-md border-b border-amber-100">
      <div className="container mx-auto px-4 flex justify-between items-center h-13">
        
        <Link to="/" className="flex items-center space-x-2">
          {/* Logo with a larger size (h-12 is 3rem or 48px) */}
          <img src="/logo/image33.jpeg" alt="HEMS Bakery Logo" className="h-12 w-20" />
        </Link>

        <nav className="hidden md:flex items-center space-x-6 relative">
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

        <div className="flex items-center space-x-3">
          
          <div className="relative hidden md:block">
            <input 
              type="text" 
              placeholder="Search pastries, cakes..." 
              value={searchQuery}
              onChange={handleSearchChange}
              onFocus={handleSearchFocus}
              onBlur={handleSearchBlur}
              className="w-56 pl-4 pr-10 py-2 rounded-full border border-amber-200 bg-white text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent" 
            />
            <svg className="absolute right-3 top-2.5 h-4 w-4 text-amber-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            {isSearchActive && suggestions.length > 0 && (
              <ul className="absolute top-full left-0 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                {suggestions.map((item, index) => (
                  <li key={index}>
                    <Link 
                      to={`/search?q=${item}`} 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => {
                        setSearchQuery(item);
                        setSuggestions([]);
                        setIsSearchActive(false);
                      }}
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <Link to="/cart" ref={cartRef} className="relativea p-2 rounded-full hover:bg-amber-100 transition-colors" aria-label="Cart">
            <svg className="h-5 w-5 text-amber-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {totalCartItems > 0 && (
              <span className="absolute -top-1 -right-1 block h-5 w-5 rounded-full bg-pink-500 text-white text-xs flex items-center justify-center font-bold">
                {totalCartItems}
              </span>
            )}
          </Link>

          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 rounded-full hover:bg-amber-100 transition-colors" aria-label="Open menu">
              <svg className="h-5 w-5 text-amber-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-lg md:hidden border-t border-amber-100">
          <div className="flex flex-col px-4 pt-4 pb-6 space-y-4">
            <div className="relative mb-2">
              <input 
                type="text" 
                placeholder="Search..." 
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full pl-4 pr-10 py-2 rounded-full border border-amber-200 bg-white text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400" 
              />
              <svg className="absolute right-3 top-2.5 h-4 w-4 text-amber-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              {suggestions.length > 0 && (
                <ul className="absolute top-full left-0 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  {suggestions.map((item, index) => (
                    <li key={index}>
                      <Link 
                        to={`/search?q=${item}`} 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => {
                          setSearchQuery(item);
                          setSuggestions([]);
                          setIsMenuOpen(false);
                        }}
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
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