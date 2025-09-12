import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const MiddleContent = ({ bakeryProducts, handleAddToCart, flyingItem }) => {
  const categoriesContainer = useRef(null);

  // All GSAP animations are managed within this hook for proper cleanup.
  useGSAP(() => {
    // --- TITLE ANIMATION ---
    gsap.from(".category-title-word", {
      y: 60, opacity: 0, duration: 1, ease: 'power3.out', stagger: 0.1,
      scrollTrigger: { trigger: ".category-title", start: 'top 85%' }
    });
    
    // --- NEW: CARD SCROLL-IN ANIMATION ---
    // Cards on the left slide in from the left, cards on the right from the right.
    gsap.from(".card-from-left", {
      x: -100, opacity: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out',
      scrollTrigger: { trigger: ".category-grid", start: 'top 85%' }
    });
    gsap.from(".card-from-right", {
      x: 100, opacity: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out',
      scrollTrigger: { trigger: ".category-grid", start: 'top 85%' }
    });

    // --- NEW: MAGNETIC & MORPHING HOVER ANIMATION ---
    const cards = gsap.utils.toArray('.category-card');
    
    cards.forEach(card => {
      const icon = card.querySelector('.card-icon');

      // Mouse Move for Magnetic Effect
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Move card towards cursor
        gsap.to(card, {
          x: (x - rect.width / 2) * 0.4,
          y: (y - rect.height / 2) * 0.4,
          duration: 1,
          ease: 'power3.out'
        });
      });
      
      // Mouse Enter for Morphing Effect
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          scale: 1.05,
          borderRadius: '1.25rem', // Slightly less rounded
          duration: 0.5,
          ease: 'elastic.out(1, 0.4)'
        });
        gsap.to(icon, {
          scale: 1.1,
          rotate: '5deg',
          duration: 0.5,
          ease: 'elastic.out(1, 0.3)'
        });
      });

      // Mouse Leave to Reset
      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          x: 0,
          y: 0,
          scale: 1,
          borderRadius: '1.875rem', // Back to original rounded-3xl
          duration: 1.2,
          ease: 'elastic.out(1, 0.3)'
        });
        gsap.to(icon, {
          scale: 1,
          rotate: '0deg',
          duration: 1.2,
          ease: 'elastic.out(1, 0.3)'
        });
      });
    });

  }, { scope: categoriesContainer });

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

      <div ref={categoriesContainer} className="py-20 bg-white/70 backdrop-blur-md overflow-hidden">
        <div className="container mx-auto px-4">
          <h2 className="category-title text-4xl md:text-5xl font-bold text-center text-amber-900 mb-16">
            {"Browse Our Selection".split(" ").map((word, index) => (
              <span key={index} className="inline-block overflow-hidden">
                <span className="inline-block category-title-word pr-2">{word}</span>
              </span>
            ))}
          </h2>
          <div className="category-grid flex flex-wrap justify-center gap-8 md:gap-12">
            
            <Link to="/cake">
              <div className="category-card card-from-left w-48 h-56 bg-gradient-to-br from-amber-400 to-amber-600 rounded-3xl shadow-lg cursor-pointer">
                <div className="flex flex-col items-center justify-center h-full text-white p-4">
                  <div className="card-icon mb-3">
                    <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 15.795c-.225.265-.45.525-.675.785A10.96 10.96 0 0112 21c-2.204 0-4.22-.64-5.962-1.755-.225-.26-.45-.52-.675-.785m13.312 0c-3.558 1.49-7.108 1.49-10.666 0M3 8.205c.225-.26.45-.52.675-.785A10.96 10.96 0 0112 3c2.204 0 4.22.64 5.962 1.755.225.26.45.52.675.785m-13.312 0c3.558-1.49 7.108-1.49 10.666 0" /></svg>
                  </div>
                  <span className="font-bold text-xl">Cakes</span>
                </div>
              </div>
            </Link>

            <Link to="/pastries">
              <div className="category-card card-from-left w-48 h-56 bg-gradient-to-br from-pink-400 to-pink-600 rounded-3xl shadow-lg cursor-pointer">
                <div className="flex flex-col items-center justify-center h-full text-white p-4">
                  <div className="card-icon mb-3">
                    <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12.032,8.018c-1.33-1.322-3.481-1.322-4.811,0C5.9,9.34,5.9,11.474,7.221,12.796C10.211,15.761,12,12,12,12s1.789,3.761,4.779-0.796c1.32-1.322,1.32-3.456,0-4.778C15.513,6.696,13.362,6.696,12.032,8.018z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21.732,7.588c-1.76-1.746-4.223-2.436-6.6-2.019c-2.377,0.417-4.529,1.64-6.252,3.464c-2.316,2.585-3.428,5.83-3.327,9.07c0.852,2.83,3.018,4.996,5.848,5.848c3.24,0.101,6.485-1.011,9.07-3.327c1.824-1.723,3.047-3.875,3.464-6.252C24.283,11.968,23.491,9.334,21.732,7.588z" /></svg>
                  </div>
                  <span className="font-bold text-xl">Pastries</span>
                </div>
              </div>
            </Link>
            
            <Link to="/breads">
              <div className="category-card card-from-right w-48 h-56 bg-gradient-to-br from-amber-600 to-amber-800 rounded-3xl shadow-lg cursor-pointer">
                <div className="flex flex-col items-center justify-center h-full text-white p-4">
                  <div className="card-icon mb-3">
                    <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6z M4 12h16" /></svg>
                  </div>
                  <span className="font-bold text-xl">Breads</span>
                </div>
              </div>
            </Link>

            <Link to="/icecream">
              <div className="category-card card-from-right w-48 h-56 bg-gradient-to-br from-sky-400 to-sky-600 rounded-3xl shadow-lg cursor-pointer">
                <div className="flex flex-col items-center justify-center h-full text-white p-4">
                  <div className="card-icon mb-3">
                    <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 22a7.5 7.5 0 007.5-7.5c0-2.08-.84-3.957-2.197-5.303s-3.223-2.197-5.303-2.197S8.28 7.043 6.977 8.354A7.5 7.5 0 0012 22z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 2v2.25" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 9.75h1.5" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.75 9.75h1.5" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6.343 5.343l1.06 1.06" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.597 5.343l1.06 1.06" /></svg>
                  </div>
                  <span className="font-bold text-xl">Ice Cream</span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Products Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="products-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {(bakeryProducts || []).map(product => (
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

      {/* Special Offer Section */}
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