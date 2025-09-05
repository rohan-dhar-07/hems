import React, { useState, useRef, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Cart from '../components/home/Cart';
import Navbar from '../components/home/Navbar';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const BakeryOrderPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [flyingItem, setFlyingItem] = useState(null);
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
  
  // --- CART LOGIC & ANIMATION TRIGGER ---
  const handleAddToCart = (product, e) => {
    // Add a quick "pop" animation to the button for feedback
    gsap.to(e.currentTarget, { scale: 1.1, yoyo: true, repeat: 1, duration: 0.15, ease: 'power1.inOut' });

    // Add item to cart
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });

    // Get positions for the "fly to cart" animation
    const productImg = e.currentTarget.closest('.product-card').querySelector('img');
    const startRect = productImg.getBoundingClientRect();
    const endRect = cartRef.current.getBoundingClientRect();

    setFlyingItem({
      src: product.image,
      startX: startRect.left + startRect.width / 2,
      startY: startRect.top + startRect.height / 2,
      endX: endRect.left + endRect.width / 2,
      endY: endRect.top + endRect.height / 2,
    });
  };

  // --- GSAP ANIMATIONS ---
  useGSAP(() => {
    // --- Fly to Cart Animation ---
    if (flyingItem) {
      const flyer = document.querySelector('.flying-item');
      gsap.fromTo(flyer,
        { left: flyingItem.startX, top: flyingItem.startY, opacity: 1, scale: 0.5 },
        { left: flyingItem.endX, top: flyingItem.endY, opacity: 0, scale: 0, duration: 0.8, ease: 'power1.in', onComplete: () => setFlyingItem(null) }
      );
    }
  }, [flyingItem]);

  useGSAP(() => {
    // --- Hero & Decorative Elements ---
    gsap.from(".hero-text", { y: 100, opacity: 0, duration: 1, stagger: 0.2, ease: "power3.out" });
    gsap.to(".featured-product", { y: "random(-20, 20)", rotation: "random(-15, 15)", duration: 3, repeat: -1, yoyo: true, ease: "sine.inOut", stagger: 0.3 });

    // --- Category Buttons ---
    gsap.from(".category-btn", {
      scrollTrigger: { trigger: ".categories", start: "top 85%" },
      y: 30, opacity: 0, duration: 0.7, stagger: 0.1, ease: "power2.out"
    });

    // --- 3D Product Card Entrance Animation ---
    gsap.utils.toArray('.product-card').forEach(card => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          toggleActions: "play none none none",
        },
        opacity: 0, y: 100, scale: 0.9, rotateX: -45,
        transformOrigin: "center bottom", duration: 0.8, ease: 'power2.out'
      });
      
      // --- Parallax Image Effect ---
      gsap.to(card.querySelector('img'), {
        yPercent: -20, ease: 'none',
        scrollTrigger: { trigger: card, scrub: true, start: "top bottom", end: "bottom top" },
      });
    });

    // --- ADDED: Special Offer Section Animation ---
    const offerTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".special-offer-section",
        start: "top 75%",
        toggleActions: "play none none reset"
      }
    });

    offerTimeline
      .from(".offer-title", { y: 50, opacity: 0, duration: 0.8, ease: 'power3.out' })
      .from(".offer-text", { y: 30, opacity: 0, duration: 0.8, ease: 'power3.out' }, "-=0.5")
      .from(".coupon-code", { scale: 0, rotation: -15, opacity: 0, duration: 0.6, ease: 'back.out(1.7)' })
      .from(".offer-button", { scale: 0.5, opacity: 0, duration: 0.7, ease: 'back.out(1.7)' }, "-=0.4")
      .to(".offer-button", {
        scale: 1.05, repeat: -1, yoyo: true,
        duration: 1.5, ease: 'sine.inOut'
      });

}, { scope: container });

  return (
    <div ref={container} className="min-h-screen bg-gradient-to-br from-amber-50 to-pink-50 overflow-x-hidden font-[sans-serif]">
      <Navbar />
      <Cart ref={cartRef} cartItems={cartItems} />
      
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
            <button className="category-btn bg-amber-500 hover:bg-amber-600 text-white font-bold py-4 px-8 rounded-full shadow-lg">Cakes</button>
            <button className="category-btn bg-pink-500 hover:bg-pink-600 text-white font-bold py-4 px-8 rounded-full shadow-lg">Pastries</button>
            <button className="category-btn bg-amber-700 hover:bg-amber-800 text-white font-bold py-4 px-8 rounded-full shadow-lg">Breads</button>
            <button className="category-btn bg-pink-700 hover:bg-pink-800 text-white font-bold py-4 px-8 rounded-full shadow-lg">Icecream</button>
          </div>
        </div>
      </div>
      
      {/* REDESIGNED Products Grid */}
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
                  <button onClick={(e) => handleAddToCart(e, product)} className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-6 rounded-full transition-colors">
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
    <h2 className="offer-title text-4xl font-bold text-amber-900 mb-6">
      A Sweet Surprise!
    </h2>
    <p className="offer-text text-xl text-amber-800 mb-8">
      Get 15% off your first order with code: 
      <span className="coupon-code inline-block font-bold text-pink-600 bg-white/50 px-3 py-1 rounded-lg ml-2">
        BAKERY15
      </span>
    </p>
    <button className="offer-button bg-pink-500 hover:bg-pink-600 text-white font-bold py-4 px-8 rounded-full shadow-lg">
      Claim Offer
    </button>
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
    </div>
  );
};

export default BakeryOrderPage;