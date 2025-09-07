import React from 'react';
import { Link } from 'react-router-dom';

const MiddlePart = ({ bakeryProducts, handleAddToCart }) => {
  return (
    <>
      <div className="categories py-12 bg-white bg-opacity-80 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-amber-900 mb-12">Browse Our Selection</h2>
          <div className="flex flex-wrap justify-center gap-6">
            <Link to="/cake"><button className="category-btn bg-amber-500 hover:bg-amber-600 text-white font-bold py-4 px-8 rounded-full shadow-lg">Cakes</button></Link>
            <Link to="/pastries"><button className="category-btn bg-pink-500 hover:bg-pink-600 text-white font-bold py-4 px-8 rounded-full shadow-lg">Pastries</button></Link>
            <Link to="/breads"><button className="category-btn bg-amber-700 hover:bg-amber-800 text-white font-bold py-4 px-8 rounded-full shadow-lg">Breads</button></Link>
            <Link to="/icecream"><button className="category-btn bg-pink-700 hover:bg-pink-800 text-white font-bold py-4 px-8 rounded-full shadow-lg">Icecream</button></Link>
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

export default MiddlePart;