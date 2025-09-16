// src/pages/WishlistPage.jsx

import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const Navbar = () => (
  <header className="bg-white/90 backdrop-blur-sm sticky top-0 z-40 shadow-sm">
    <div className="container mx-auto px-4 flex justify-between items-center h-20">
      <Link to="/" className="text-3xl font-bold text-amber-900">HEMS</Link>
      <div>
        <Link to="/order" className="text-gray-600 hover:text-pink-600 font-medium transition-colors">Order Now</Link>
      </div>
    </div>
  </header>
);

// --- FIX: Accept real wishlistItems and setWishlistItems from props here ---
const WishlistPage = ({ wishlistItems, setWishlistItems }) => {
  const container = useRef(null);
  
  // --- The local 'initialWishlist' state has been correctly removed ---

  useGSAP(() => {
    gsap.from(".wishlist-title", { duration: 0.8, y: 50, opacity: 0, ease: 'power3.out' });
    gsap.from(".wishlist-card", { duration: 0.7, y: 100, opacity: 0, scale: 0.9, stagger: 0.15, ease: 'power2.out' });
  }, { scope: container, dependencies: [wishlistItems] });

  const handleRemoveItem = (idToRemove) => {
    const cardToRemove = document.querySelector(`[data-id='${idToRemove}']`);
    if (cardToRemove) {
      gsap.to(cardToRemove, {
        duration: 0.5,
        scale: 0.8,
        opacity: 0,
        x: 100,
        ease: 'power2.in',
        onComplete: () => {
          // --- Use the setter function from props to update the state in App.jsx ---
          setWishlistItems(prevItems => prevItems.filter(item => item.id !== idToRemove));
        }
      });
    }
  };
  
  const handleMoveToCart = (idToMove) => {
    console.log(`Moving item ${idToMove} to cart!`); // Add your cart logic here
    handleRemoveItem(idToMove);
  };

  return (
    <div ref={container} className="min-h-screen bg-gradient-to-br from-amber-50 to-pink-50 font-[sans-serif] overflow-hidden">
      <Navbar />
      <main className="container mx-auto px-4 py-12 md:py-16">
        <h1 className="wishlist-title text-5xl md:text-7xl font-bold text-amber-900 text-center mb-12">My Wishlist</h1>
        {wishlistItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {wishlistItems.map((item) => (
              <div key={item.id} data-id={item.id} className="wishlist-card bg-white rounded-2xl shadow-lg overflow-hidden group">
                <div className="h-64 overflow-hidden">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover transform transition-transform duration-500 ease-in-out group-hover:scale-110" />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-amber-900 mb-2 truncate">{item.name}</h3>
                  <p className="text-3xl font-bold text-pink-700 mb-6">₹{item.price.toFixed(2)}</p>
                  <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                    <button onClick={() => handleMoveToCart(item.id)} className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105">Move to Cart</button>
                    <button onClick={() => handleRemoveItem(item.id)} className="w-full bg-gray-200 hover:bg-red-500 hover:text-white text-gray-700 font-bold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105">Remove</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 wishlist-card">
            <h2 className="text-3xl font-bold text-amber-900 mb-4">Your Wishlist is Empty!</h2>
            <p className="text-lg text-amber-800 mb-8">Looks like you haven't added any treats yet. Let's find something sweet!</p>
            <Link to="/order">
              <button className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-4 px-10 rounded-full shadow-lg transform transition-transform duration-300 hover:scale-110">
                Browse Our Bakes
              </button>
            </Link>
          </div>
        )}
      </main>
    </div>
  );
};

export default WishlistPage;  