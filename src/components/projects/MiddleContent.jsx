import React from 'react';
import { Link } from 'react-router-dom';

const MiddleContent = ({ bakeryProducts, handleAddToCart, flyingItem }) => {
  return (
    <>
      {flyingItem && <img src={flyingItem.src} className="flying-item fixed w-24 h-24 object-cover rounded-full z-[999] pointer-events-none" alt="" />}

      <div className="relative min-h-[70vh] flex flex-col justify-center items-center px-4 overflow-hidden">
        <div className="text-center mb-12 z-10">
          <h1 className="hero-text text-6xl md:text-8xl font-bold text-amber-900 mb-4">HEMS</h1>
          <h2 className="hero-text text-5xl md:text-7xl font-bold text-pink-700 mb-8">Crafted with Love</h2>
          <p className="hero-text text-xl md:text-2xl text-amber-800 max-w-2xl mx-auto">Freshly baked goods delivered to your doorstep.</p>
        </div>
        <div className="absolute top-1/4 left-10 w-20 h-20 bg-amber-300 rounded-full opacity-20 featured-product"></div>
        <div className="absolute bottom-1/4 right-10 w-24 h-24 bg-pink-300 rounded-full opacity-20 featured-product"></div>
        <div className="absolute top-1/3 right-1/4 w-16 h-16 bg-yellow-200 rounded-full opacity-30 featured-product"></div>
      </div>

      <div className="categories-section py-16 bg-gradient-to-b from-amber-50 to-amber-100 relative overflow-hidden">
  {/* Decorative elements */}
  <div className="absolute -top-10 -left-10 w-28 h-28 bg-amber-300/20 rounded-full"></div>
  <div className="absolute bottom-10 -right-8 w-24 h-24 bg-rose-300/20 rounded-full"></div>
  <div className="absolute top-1/3 left-1/4 w-16 h-16 bg-amber-200/30 rounded-full"></div>
  
  <div className="container mx-auto px-4 relative z-10">
    <h2 className="text-5xl font-bold text-center text-amber-900 mb-4 font-playfair">Our Bakery Selection</h2>
    <p className="text-lg text-amber-700 text-center max-w-2xl mx-auto mb-16">
      Discover our handcrafted delights, baked fresh daily with love and tradition
    </p>
    
    <div className="flex flex-wrap justify-center gap-8">
      <Link to="/cake">
        <div className="category-card group relative cursor-pointer">
          <div className="w-48 h-48 rounded-3xl bg-gradient-to-br from-amber-500 to-amber-700 shadow-lg flex items-center justify-center transition-all duration-500 group-hover:scale-105 group-hover:shadow-xl group-hover:from-amber-600 group-hover:to-amber-800">
            <div className="text-center p-6">
              <div className="mb-3 transform group-hover:scale-110 transition-transform duration-300">
                <svg className="w-12 h-12 mx-auto text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd"></path>
                </svg>
              </div>
              <span className="text-white font-bold text-xl font-playfair">Cakes</span>
            </div>
          </div>
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4/5 h-3 bg-amber-800/30 blur-md rounded-full group-hover:bg-amber-900/40 transition-all duration-300"></div>
        </div>
      </Link>
      
      <Link to="/pastries">
        <div className="category-card group relative cursor-pointer">
          <div className="w-48 h-48 rounded-3xl bg-gradient-to-br from-amber-500 to-amber-700 shadow-lg flex items-center justify-center transition-all duration-500 group-hover:scale-105 group-hover:shadow-xl group-hover:from-amber-600 group-hover:to-amber-800">
            <div className="text-center p-6">
              <div className="mb-3 transform group-hover:scale-110 transition-transform duration-300">
                <svg className="w-12 h-12 mx-auto text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd"></path>
                </svg>
              </div>
              <span className="text-white font-bold text-xl font-playfair">Pastries</span>
            </div>
          </div>
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4/5 h-3 bg-amber-800/30 blur-md rounded-full group-hover:bg-amber-900/40 transition-all duration-300"></div>
        </div>
      </Link>
      
      <Link to="/breads">
        <div className="category-card group relative cursor-pointer">
          <div className="w-48 h-48 rounded-3xl bg-gradient-to-br from-amber-500 to-amber-700 shadow-lg flex items-center justify-center transition-all duration-500 group-hover:scale-105 group-hover:shadow-xl group-hover:from-amber-600 group-hover:to-amber-800">
            <div className="text-center p-6">
              <div className="mb-3 transform group-hover:scale-110 transition-transform duration-300">
                <svg className="w-12 h-12 mx-auto text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
                  <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"></path>
                </svg>
              </div>
              <span className="text-white font-bold text-xl font-playfair">Breads</span>
            </div>
          </div>
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4/5 h-3 bg-amber-800/30 blur-md rounded-full group-hover:bg-amber-900/40 transition-all duration-300"></div>
        </div>
      </Link>
      
      <Link to="/icecream">
        <div className="category-card group relative cursor-pointer">
          <div className="w-48 h-48 rounded-3xl bg-gradient-to-br from-amber-500 to-amber-700 shadow-lg flex items-center justify-center transition-all duration-500 group-hover:scale-105 group-hover:shadow-xl group-hover:from-amber-600 group-hover:to-amber-800">
            <div className="text-center p-6">
              <div className="mb-3 transform group-hover:scale-110 transition-transform duration-300">
                <svg className="w-12 h-12 mx-auto text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd"></path>
                </svg>
              </div>
              <span className="text-white font-bold text-xl font-playfair">Ice Cream</span>
            </div>
          </div>
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4/5 h-3 bg-amber-800/30 blur-md rounded-full group-hover:bg-amber-900/40 transition-all duration-300"></div>
        </div>
      </Link>
    </div>
  </div>
</div>
      
      <div className="container mx-auto px-4 py-16">
        <div className="products-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {bakeryProducts.map(product => (
            <div key={product.id} className="product-card bg-white rounded-2xl overflow-hidden shadow-lg [perspective:1000px]">
              <div className="h-64 overflow-hidden">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover"/>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-amber-900 mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-4 h-12">{product.description}</p>
                <div className="flex justify-between items-center mt-6">
                  <span className="text-3xl font-bold text-pink-700">₹{product.price.toFixed(2)}</span>
                  <button onClick={(e) => handleAddToCart(product, e)} className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-6 rounded-full transition-colors">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="special-offer-section bg-amber-100 py-16 overflow-hidden">
        <div className="container mx-auto px-4 text-center">
          <h2 className="offer-title text-4xl font-bold text-amber-900 mb-6">A Sweet Surprise!</h2>
          <p className="offer-text text-xl text-amber-800 mb-8">Get 15% off your first order with code: <span className="coupon-code inline-block font-bold text-pink-600 bg-white/50 px-3 py-1 rounded-lg ml-2">BAKERY15</span></p>
          <button className="offer-button bg-pink-500 hover:bg-pink-600 text-white font-bold py-4 px-8 rounded-full shadow-lg">Claim Offer</button>
        </div>
      </div>
    </>
  );
};

export default MiddleContent;