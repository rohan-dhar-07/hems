import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Accept the new props for the wishlist feature
const MiddleContent = ({ bakeryProducts, handleUpdateCart, productQuantities, wishlistItems, onToggleWishlist }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleAddToCartClick = (product, e) => {
    handleUpdateCart(product.id, 1, e);
  };
  
  const handleQuantityChange = (product, change) => {
    const newQuantity = (productQuantities[product.id] || 0) + change;
    handleUpdateCart(product.id, Math.max(0, newQuantity));
  };
  
  const handleViewDetails = (product) => {
    setSelectedProduct(product);
  };

  const closePopup = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="container mx-auto px-4 py-24">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="hero-text text-5xl md:text-6xl font-extrabold text-amber-900 leading-tight mb-4 animate-fade-in-down">
          HEMS: Where Every Bite Tells a Story
        </h1>
        <p className="hero-text text-xl text-gray-700 mb-6">
          Handcrafted with joy, our treats are a little piece of heaven. Explore our freshly baked goodness below and find your new favorite.
        </p>
        <div className="flex justify-center items-center space-x-4">
          <a href="#products" className="px-6 py-3 rounded-full bg-pink-500 text-white font-semibold transition-all duration-300 transform hover:scale-105 hover:bg-pink-600 animate-flicker">
            Explore Our Selection
          </a>
          <Link to="/about" className="px-6 py-3 rounded-full border-2 border-amber-500 text-amber-600 font-semibold transition-all duration-300 transform hover:scale-105 hover:bg-amber-50 animate-flicker">
            Discover Our Story
          </Link>
        </div>
      </div>

      {/* Product Grid */}
      <div id="products" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {bakeryProducts.map(product => {
          const quantity = productQuantities[product.id] || 0;
          // --- Check if the current product is in the wishlist ---
          const isWishlisted = wishlistItems.some(item => item.id === product.id);
          
          return (
            <div key={product.id} className="product-card bg-white rounded-3xl overflow-hidden shadow-[0_0_15px_rgba(236,72,153,0.7)] transition-all duration-300 transform hover:-translate-y-2 hover:rotate-3 relative group flex flex-col">
              
              <img src={product.image} alt={product.name} className="w-full h-56 object-cover transform transition-transform duration-500 group-hover:scale-110" />
              
              {/* --- NEW: Wishlist Heart Icon Button --- */}
              <button
                onClick={() => onToggleWishlist(product)}
                className="absolute top-4 right-4 bg-white/70 backdrop-blur-sm p-2 rounded-full z-10 transition-transform duration-200 ease-in-out hover:scale-110 active:scale-90"
                aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
              >
                <svg className={`w-6 h-6 ${isWishlisted ? 'text-red-500' : 'text-gray-400'}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={isWishlisted ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
              </button>

              <div className="p-4 text-center flex flex-col flex-grow">
                <h3 className="text-lg font-bold text-amber-800 mb-1">{product.name}</h3>
                <p className="text-gray-600 text-xs mb-3 truncate">{product.description}</p>
                <p className="text-xl font-extrabold text-pink-600 mb-3">₹{product.price.toFixed(2)}</p>
                <div className="flex-grow"></div>
                <div className="mt-4 flex justify-between items-center space-x-2">
                  <button onClick={() => handleViewDetails(product)} className="px-3 py-2 rounded-full bg-amber-500 text-white font-semibold transition-all duration-300 transform hover:scale-105 hover:bg-amber-600 flex items-center justify-center space-x-1 text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.577 3.01 9.964 7.822a1.012 1.012 0 010 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.577-3.01-9.964-7.822z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>View</span>
                  </button>
                  {quantity === 0 ? (
                    <button onClick={(e) => handleAddToCartClick(product, e)} className="px-4 py-2 rounded-full bg-pink-500 text-white font-semibold transition-all duration-300 transform hover:scale-105 hover:bg-pink-600 text-sm">
                      Add to Cart
                    </button>
                  ) : (
                    <div className="flex justify-center items-center space-x-2 bg-pink-100 rounded-full px-2 py-1">
                      <button onClick={() => handleQuantityChange(product, -1)} className="w-6 h-6 rounded-full text-pink-600 font-bold text-lg leading-none transition hover:bg-pink-200">-</button>
                      <span className="font-bold text-lg text-pink-600">{quantity}</span>
                      <button onClick={() => handleQuantityChange(product, 1)} className="w-6 h-6 rounded-full text-pink-600 font-bold text-lg leading-none transition hover:bg-pink-200">+</button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pop-up modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-3xl p-6 relative w-full max-w-lg shadow-xl animate-fade-in-down">
            <button onClick={closePopup} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <div className="text-center">
              <h3 className="text-3xl font-bold text-amber-800 mb-2">{selectedProduct.name}</h3>
              <p className="text-gray-600 text-base mb-4">{selectedProduct.description}</p>
              <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-64 object-cover rounded-2xl mb-4" />
              <p className="text-3xl font-extrabold text-pink-600">₹{selectedProduct.price.toFixed(2)}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MiddleContent;