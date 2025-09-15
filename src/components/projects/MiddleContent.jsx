import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const MiddleContent = ({ bakeryProducts, handleUpdateCart, productQuantities }) => {
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
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h2 className="hero-text text-4xl md:text-5xl font-extrabold text-amber-900 leading-tight mb-2">
          Baked With Passion,<br />Served With Love.
        </h2>
        <p className="hero-text text-xl text-gray-700">Explore our delicious creations, made fresh daily.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {bakeryProducts.map(product => {
          const quantity = productQuantities[product.id] || 0;
          
          return (
            <div key={product.id} className="product-card bg-white rounded-3xl overflow-hidden shadow-[0_0_15px_rgba(236,72,153,0.7)] transition-all duration-300 transform hover:-translate-y-2 hover:rotate-3 relative group">
              <img src={product.image} alt={product.name} className="w-full h-48 object-cover transform transition-transform duration-500 group-hover:scale-110" />
              
              <div className="p-4 text-center">
                <h3 className="text-lg font-bold text-amber-800 mb-1">{product.name}</h3>
                <p className="text-gray-600 text-xs mb-3 truncate">{product.description}</p>
                <p className="text-xl font-extrabold text-pink-600">₹{product.price.toFixed(2)}</p>
                
                <div className="mt-4 flex flex-col items-center space-y-2">
                  <button onClick={() => handleViewDetails(product)} className="w-full px-4 py-2 rounded-full bg-amber-500 text-white font-semibold transition-all duration-300 transform hover:scale-105 hover:bg-amber-600 flex items-center justify-center space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.577 3.01 9.964 7.822a1.012 1.012 0 010 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.577-3.01-9.964-7.822z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>View</span>
                  </button>

                  {quantity === 0 ? (
                    <button
                      onClick={(e) => handleAddToCartClick(product, e)}
                      className="w-full mt-2 px-4 py-2 rounded-full bg-pink-500 text-white font-semibold transition-all duration-300 transform hover:scale-105 hover:bg-pink-600"
                    >
                      Add to Cart
                    </button>
                  ) : (
                    <div className="w-full mt-2 flex justify-center items-center space-x-2 bg-pink-100 rounded-full px-4 py-2">
                      <button
                        onClick={() => handleQuantityChange(product, -1)}
                        className="p-1 text-pink-600 font-bold text-lg leading-none"
                      >
                        -
                      </button>
                      <span className="font-bold text-xl text-pink-600">{quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(product, 1)}
                        className="p-1 text-pink-600 font-bold text-lg leading-none"
                      >
                        +
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-3xl p-6 relative w-full max-w-lg shadow-xl animate-fade-in-down">
            <button onClick={closePopup} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
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