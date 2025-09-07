import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Cart from '../components/home/Cart';
import Navbar from '../components/home/Navbar';
import Auth from '../components/Auth'; // 1. IMPORT THE AUTH COMPONENT

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const BakeryOrderPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [flyingItem, setFlyingItem] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const container = useRef(null);
  const cartRef = useRef(null);

  const bakeryProducts = [
    { id: 1, name: "Chocolate Decadence", price: 1499.00, description: "Rich chocolate cake with a molten core.", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1089&q=80" },
    { id: 2, name: "Sunrise Blueberry Muffin", price: 249.00, description: "Packed with fresh, juicy blueberries.", image: "https://static.vecteezy.com/system/resources/previews/069/054/159/large_2x/freshly-baked-blueberry-muffins-cooling-on-a-wire-rack-on-the-beach-at-sunset-with-ocean-waves-photo.jpg" },
    { id: 3, name: "Classic Parisian Croissant", price: 199.00, description: "Buttery, flaky, and baked to perfection.", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzqVN1SZJuMBXn2S5Z1NzXHvC0Ua2ipZKj_w&s" },
    { id: 4, name: "Homestyle Apple Pie", price: 999.00, description: "Sweet apples and cinnamon in a golden crust.", image: "https://www.simplyrecipes.com/thmb/SeOrwAcn5dAuazvh-AhlrDbAd24=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Simply-Recipes-Homemade-Apple-Pie-LEAD-04-11db861782aa4ebdb5ef9948125ef0ef.jpg" },
    { id: 5, name: "Celebration Cupcakes", price: 599.00, description: "A delightful pack of four assorted cupcakes.", image: "https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80" },
    { id: 6, name: "Artisan Sourdough Loaf", price: 349.00, description: "Freshly baked with a perfectly crisp crust.", image: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" }
  ];
  
  const handleAddToCart = (product, e) => {
    gsap.to(e.currentTarget, { scale: 1.1, yoyo: true, repeat: 1, duration: 0.15, ease: 'power1.inOut' });
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
    const productImg = e.currentTarget.closest('.product-card').querySelector('img');
    const startRect = productImg.getBoundingClientRect();
    const endRect = cartRef.current.getBoundingClientRect();
    setFlyingItem({ src: product.image, startX: startRect.left + startRect.width / 2, startY: startRect.top + startRect.height / 2, endX: endRect.left + endRect.width / 2, endY: endRect.top + endRect.height / 2 });
  };

  useGSAP(() => {
    if (flyingItem) {
      const flyer = document.querySelector('.flying-item');
      gsap.fromTo(flyer, { left: flyingItem.startX, top: flyingItem.startY, opacity: 1, scale: 0.5 }, { left: flyingItem.endX, top: flyingItem.endY, opacity: 0, scale: 0, duration: 0.8, ease: 'power1.in', onComplete: () => setFlyingItem(null) });
    }
  }, [flyingItem]);

  useGSAP(() => {
    gsap.from(".hero-text", { y: 100, opacity: 0, duration: 1, stagger: 0.2, ease: "power3.out" });
    gsap.to(".featured-product", { y: "random(-20, 20)", rotation: "random(-15, 15)", duration: 3, repeat: -1, yoyo: true, ease: "sine.inOut", stagger: 0.3 });
    gsap.from(".category-btn", { scrollTrigger: { trigger: ".categories", start: "top 85%" }, y: 30, opacity: 0, duration: 0.7, stagger: 0.1, ease: "power2.out" });
    gsap.utils.toArray('.product-card').forEach(card => {
      gsap.from(card, {
        scrollTrigger: { trigger: card, start: "top 85%", toggleActions: "play none none none" },
        opacity: 0, y: 100, scale: 0.9, rotateX: -45, transformOrigin: "center bottom", duration: 0.8, ease: 'power2.out'
      });
      gsap.to(card.querySelector('img'), {
        yPercent: -20, ease: 'none',
        scrollTrigger: { trigger: card, scrub: true, start: "top bottom", end: "bottom top" },
      });
    });
    const offerTimeline = gsap.timeline({ scrollTrigger: { trigger: ".special-offer-section", start: "top 75%", toggleActions: "play none none reset" } });
    offerTimeline
      .from(".offer-title", { y: 50, opacity: 0, duration: 0.8, ease: 'power3.out' })
      .from(".offer-text", { y: 30, opacity: 0, duration: 0.8, ease: 'power3.out' }, "-=0.5")
      .from(".coupon-code", { scale: 0, rotation: -15, opacity: 0, duration: 0.6, ease: 'back.out(1.7)' })
      .from(".offer-button", { scale: 0.5, opacity: 0, duration: 0.7, ease: 'back.out(1.7)' }, "-=0.4")
      .to(".offer-button", { scale: 1.05, repeat: -1, yoyo: true, duration: 1.5, ease: 'sine.inOut' });
  }, { scope: container });

  // Calculate total number of items in the cart
  const totalCartItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    // Added padding-bottom (pb-24) to prevent bottom nav from overlapping the footer
    <div ref={container} className="min-h-screen bg-gradient-to-br from-amber-50 to-pink-50 overflow-x-hidden font-[sans-serif] pb-24">
      
      {/* Non-visual components like modals or sidebars can remain here */}
    


{/* START: COMBINED FLOATING TOP BAR */}
{/* START: CORRECTED FLOATING TOP BAR */}
<header className="bg-white/90 backdrop-blur-sm sticky top-0 z-40 shadow-sm relative">
  <div className="container mx-auto px-4 flex justify-between items-center h-20">
    
    {/* Left Side: Your Navbar */}
    
      <Navbar />
    

    {/* Right Side: Actions */}
    <div className="flex items-center space-x-2">
      
      {/* Search Bar (hidden on mobile) */}
      <div className="relative hidden md:block">
        <input 
          type="text" 
          placeholder="Search..." 
          className="w-48 pl-4 pr-2 py-2 rounded-full border border-gray-300 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400" 
        />
      </div>

      {/* Auth/Account Icon Link */}
      <Link to="/auth" className="p-2 rounded-full hover:bg-amber-100 transition-colors" aria-label="Account">
        <svg className="h-7 w-7 text-amber-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      </Link>

      {/* Cart Icon Link */}
      <Link to="/cart" className="relative p-2 rounded-full hover:bg-amber-100 transition-colors" aria-label="Cart">
        <svg className="h-7 w-7 text-amber-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
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
          <svg className="h-7 w-7 text-amber-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>
    </div>
  </div>

  {/* MOBILE MENU OVERLAY */}
  {isMenuOpen && (
    <div className="absolute top-full left-0 w-full bg-white shadow-lg md:hidden">
      <div className="flex flex-col px-4 pt-2 pb-4 space-y-2">
        <Link to="/custom-orders" className="text-gray-700 hover:text-pink-600 font-medium py-2">Custom Orders</Link>
        <Link to="/gifting" className="text-gray-700 hover:text-pink-600 font-medium py-2">Gifting & Events</Link>
        <Link to="/about" className="text-gray-700 hover:text-pink-600 font-medium py-2">About Us</Link>
        <Link to="/contact" className="text-gray-700 hover:text-pink-600 font-medium py-2">Contact</Link>
      </div>
    </div>
  )}
</header>
{/* END: CORRECTED FLOATING TOP BAR */}
{/* END: COMBINED FLOATING TOP BAR */}
      
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

      {/* START: BOTTOM NAVIGATION BAR - VISIBLE ON ALL DEVICES */}
{/* The 'md:hidden' class has been removed from the line below */}
<div className="fixed bottom-0 left-0 right-0 bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.1)] z-50">
  <div className="container mx-auto h-20 flex justify-around items-center">
    <a href="#" className="flex flex-col items-center justify-center text-center text-amber-800 hover:text-pink-600 transition-colors w-full h-full">
      <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
      <span className="text-xs mt-1 font-semibold">Home</span>
    </a>
    <a href="#" className="flex flex-col items-center justify-center text-center text-gray-500 hover:text-pink-600 transition-colors w-full h-full">
      <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
      <span className="text-xs mt-1 font-semibold">Categories</span>
    </a>
    <a href="#" className="flex flex-col items-center justify-center text-center text-gray-500 hover:text-pink-600 transition-colors w-full h-full">
      <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
      <span className="text-xs mt-1 font-semibold">Cart</span>
    </a>
    <a href="#" className="flex flex-col items-center justify-center text-center text-gray-500 hover:text-pink-600 transition-colors w-full h-full">
      <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
      <span className="text-xs mt-1 font-semibold">Wishlist</span>
    </a>
    <a href="#" className="flex flex-col items-center justify-center text-center text-gray-500 hover:text-pink-600 transition-colors w-full h-full">
      <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
      <span className="text-xs mt-1 font-semibold">Profile</span>
    </a>
  </div>
</div>
{/* END: BOTTOM NAVIGATION BAR */}

    </div>
  );
};

export default BakeryOrderPage;