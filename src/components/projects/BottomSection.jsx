import React from 'react';
// To enable navigation between React components, we import the Link component.
import { Link } from 'react-router-dom';

const BottomSection = () => {
  return (
    <>
      <footer className="bg-amber-900 text-amber-50 py-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-xl mb-4">Humble Bakery</p>
          <p className="mb-6">Fresh baked goods made with love</p>
          <div className="flex justify-center space-x-6">
            <a href="#" className="text-amber-200 hover:text-white">Instagram</a>
            <a href="#" className="text-amber-200 hover:text-white">Facebook</a>
            <a href="#" className="text-amber-200 hover:text-white">Twitter</a>
          </div>
        </div>
      </footer>

      {/* BOTTOM NAVIGATION BAR */}
      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.1)] z-50">
        <div className="container mx-auto h-20 flex justify-around items-center">
          {/* The `a` tags have been replaced with `Link` components for client-side routing. */}
          <Link to="/" className="flex flex-col items-center justify-center text-center text-amber-800 hover:text-pink-600 transition-colors w-full h-full">
            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span className="text-xs mt-1 font-semibold">Home</span>
          </Link>
          <Link to="/categories" className="flex flex-col items-center justify-center text-center text-gray-500 hover:text-pink-600 transition-colors w-full h-full">
            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
            <span className="text-xs mt-1 font-semibold">Categories</span>
          </Link>
          <Link to="/cart" className="flex flex-col items-center justify-center text-center text-gray-500 hover:text-pink-600 transition-colors w-full h-full">
            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span className="text-xs mt-1 font-semibold">Cart</span>
          </Link>
          <Link to="/wishlist" className="flex flex-col items-center justify-center text-center text-gray-500 hover:text-pink-600 transition-colors w-full h-full">
            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span className="text-xs mt-1 font-semibold">Wishlist</span>
          </Link>
          
          {/* This now links to the /profile route */}
          <Link to="/profilepage" className="flex flex-col items-center justify-center text-center text-gray-500 hover:text-pink-600 transition-colors w-full h-full">
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
