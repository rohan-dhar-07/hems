import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const BottomSection = () => {
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const categoriesRef = useRef(null);

  // An array to hold the category data, including unique colors
  const categoryItems = [
    { name: 'Cakes', path: '/categories/cakes', color: 'bg-pink-500', hoverColor: 'hover:bg-pink-600' },
    { name: 'Pastries', path: '/categories/pastries', color: 'bg-rose-500', hoverColor: 'hover:bg-rose-600' },
    { name: 'Breads', path: '/categories/breads', color: 'bg-amber-500', hoverColor: 'hover:bg-amber-600' },
    { name: 'Ice Cream', path: '/categories/ice-cream', color: 'bg-sky-500', hoverColor: 'hover:bg-sky-600' }
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (categoriesRef.current && !categoriesRef.current.contains(event.target)) {
        setIsCategoriesOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleCategoryLinkClick = () => {
    setIsCategoriesOpen(false);
  };

  return (
    <>
      {/* --- FOOTER (Unchanged) --- */}
      <footer className="bg-pink-800 text-pink-50 py-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-xl mb-4">Humble Bakery</p>
          <p className="mb-6">Fresh baked goods made with love</p>
          <div className="flex justify-center space-x-6">
            <a href="#" className="text-pink-200 hover:text-white">Instagram</a>
            <a href="#" className="text-pink-200 hover:text-white">Facebook</a>
            <a href="#" className="text-pink-200 hover:text-white">Twitter</a>
          </div>
        </div>
      </footer>

      {/* BOTTOM NAVIGATION BAR */}
      <div className="fixed bottom-0 left-0 right-0 bg-pink-50 shadow-[0_-2px_10px_rgba(0,0,0,0.1)] z-50">
        <div className="container mx-auto h-16 flex justify-around items-center">
          {/* Home Link */}
          <Link to="/" className="flex flex-col items-center justify-center text-center text-pink-800 hover:text-pink-600 transition-colors w-full h-full">
            <svg className="h-6 w-6" xmlns="http://www.w.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span className="text-xs mt-1 font-semibold">Home</span>
          </Link>

          {/* Categories Link with Dropdown */}
          <div 
            ref={categoriesRef}
            onClick={() => setIsCategoriesOpen(!isCategoriesOpen)} 
            className="flex flex-col items-center justify-center text-center text-pink-600 hover:text-pink-800 transition-colors w-full h-full relative cursor-pointer"
          >
            <svg className="h-6 w-6" xmlns="http://www.w.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
            <span className="text-xs mt-1 font-semibold">Categories</span>

            {/* --- CHANGE: DROPDOWN MENU now renders items with multiple colors --- */}
            {isCategoriesOpen && (
              <div className="absolute bottom-full mb-2 bg-white text-white p-2 rounded-lg shadow-lg w-32 space-y-2">
                  {categoryItems.map((item) => (
                    <Link 
                      key={item.name}
                      to={item.path} 
                      className={`block px-4 py-2 text-center rounded transition-colors ${item.color} ${item.hoverColor}`} 
                      onClick={handleCategoryLinkClick}
                    >
                      {item.name}
                    </Link>
                  ))}
              </div>
            )}
          </div>

          {/* Other Links (Unchanged) */}
          <Link to="/cart" className="flex flex-col items-center justify-center text-center text-pink-600 hover:text-pink-800 transition-colors w-full h-full">
            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span className="text-xs mt-1 font-semibold">Cart</span>
          </Link>
          <Link to="/wishlist" className="flex flex-col items-center justify-center text-center text-pink-600 hover:text-pink-800 transition-colors w-full h-full">
            <svg className="h-6 w-6" xmlns="http://www.w.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span className="text-xs mt-1 font-semibold">Wishlist</span>
          </Link>
          <Link to="/profilepage" className="flex flex-col items-center justify-center text-center text-pink-600 hover:text-pink-800 transition-colors w-full h-full">
            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className="text-xs mt-1 font-semibold">Profile</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default BottomSection;