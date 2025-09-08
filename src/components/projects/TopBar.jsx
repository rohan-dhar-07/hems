import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const TopBar = ({ totalCartItems }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white/95 backdrop-blur-md sticky top-0 z-40 shadow-md border-b border-amber-100">
      <div className="container mx-auto px-4 flex justify-between items-center h-16">
        
        {/* Logo/Brand Name */}
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-amber-700">HEMS</span>
          <span className="text-xs text-pink-500 font-medium">BAKERY</span>
        </Link>

        {/* Desktop Navigation (hidden on mobile) */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/custom-orders" className="text-gray-700 hover:text-pink-600 font-medium text-sm transition-colors">Custom Orders</Link>
          <Link to="/gifting" className="text-gray-700 hover:text-pink-600 font-medium text-sm transition-colors">Gifting & Events</Link>
          <Link to="/about" className="text-gray-700 hover:text-pink-600 font-medium text-sm transition-colors">About Us</Link>
          <Link to="/contact" className="text-gray-700 hover:text-pink-600 font-medium text-sm transition-colors">Contact</Link>
        </nav>

        {/* Right Side: Actions */}
        <div className="flex items-center space-x-3">
          
          {/* Search Bar (hidden on mobile) */}
          <div className="relative hidden md:block">
            <input 
              type="text" 
              placeholder="Search pastries, cakes..." 
              className="w-56 pl-4 pr-10 py-2 rounded-full border border-amber-200 bg-amber-50 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent" 
            />
            <svg className="absolute right-3 top-2.5 h-4 w-4 text-amber-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          {/* Auth/Account Icon Link */}
          <Link to="/auth" className="p-2 rounded-full hover:bg-amber-100 transition-colors" aria-label="Account">
            <svg className="h-5 w-5 text-amber-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </Link>

          {/* Cart Icon Link */}
          <Link to="/cart" className="relative p-2 rounded-full hover:bg-amber-100 transition-colors" aria-label="Cart">
            <svg className="h-5 w-5 text-amber-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {totalCartItems > 0 && (
              <span className="absolute -top-1 -right-1 block h-5 w-5 rounded-full bg-pink-500 text-white text-xs flex items-center justify-center font-bold">
                {totalCartItems}
              </span>
            )}
          </Link>

          {/* Mobile Menu Hamburger Button */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 rounded-full hover:bg-amber-100 transition-colors" aria-label="Open menu">
              <svg className="h-5 w-5 text-amber-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU OVERLAY */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-lg md:hidden border-t border-amber-100">
          <div className="flex flex-col px-4 pt-4 pb-6 space-y-4">
            <div className="relative mb-2">
              <input 
                type="text" 
                placeholder="Search..." 
                className="w-full pl-4 pr-10 py-2 rounded-full border border-amber-200 bg-amber-50 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400" 
              />
              <svg className="absolute right-3 top-2.5 h-4 w-4 text-amber-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <Link to="/custom-orders" className="text-gray-700 hover:text-pink-600 font-medium py-2 border-b border-amber-50" onClick={() => setIsMenuOpen(false)}>Custom Orders</Link>
            <Link to="/gifting" className="text-gray-700 hover:text-pink-600 font-medium py-2 border-b border-amber-50" onClick={() => setIsMenuOpen(false)}>Gifting & Events</Link>
            <Link to="/about" className="text-gray-700 hover:text-pink-600 font-medium py-2 border-b border-amber-50" onClick={() => setIsMenuOpen(false)}>About Us</Link>
            <Link to="/contact" className="text-gray-700 hover:text-pink-600 font-medium py-2" onClick={() => setIsMenuOpen(false)}>Contact</Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default TopBar;