import React, { useState, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom'; // <-- 1. Import the Link component

import BottomSection from '../components/projects/BottomSection';
import MiddleContent from '../components/projects/MiddleContent';
import TopBar from '../components/projects/TopBar';

gsap.registerPlugin(ScrollTrigger);

const BakeryOrderPage = ({ wishlistItems, onToggleWishlist, cartItems, onUpdateCart }) => { // Assuming you have cart props from App.jsx
  const [flyingItem, setFlyingItem] = useState(null);
  const container = useRef(null);
  const cartRef = useRef(null);

  const bakeryProducts = [
      { id: 1, name: "Chocolate Decadence", price: 1499.00, description: "Rich chocolate cake with a molten core.", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1089&q=80" },
      { id: 2, name: "Sunrise Blueberry Muffin", price: 249.00, description: "Packed with fresh, juicy blueberries.", image: "https://static.vecteezy.com/system/resources/previews/069/054/159/large_2x/freshly-baked-blueberry-muffins-cooling-on-a-wire-rack-on-the-beach-at-sunset-with-ocean-waves-photo.jpg" },
      { id: 3, name: "Classic Parisian Croissant", price: 199.00, description: "Buttery, flaky, and baked to perfection.", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzqVN1SZJuMBXn2S5Z1NzXHvC0Ua2ipZKj_w&s" },
      { id: 4, name: "Homestyle Apple Pie", price: 999.00, description: "Sweet apples and cinnamon in a golden crust.", image: "https://www.simplyrecipes.com/thmb/SeOrwAcn5dAuazvh-AhlrDbAd24=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Simply-Recipes-Homemade-Apple-Pie-LEAD-04-11db861782aa4ebdb5ef9948125ef0ef.jpg" },
      { id: 5, name: "Celebration Cupcakes", price: 599.00, description: "A delightful pack of four assorted cupcakes.", image: "https://images.unsplash.com/photo-161470726753T-b85aaf00c4b7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80" },
      { id: 6, name: "Artisan Sourdough Loaf", price: 349.00, description: "Freshly baked with a perfectly crisp crust.", image: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" }
  ];

  // Using onUpdateCart from props now, but keeping the flying item logic here
  const handleCartAndUpdateFlyingItem = (productId, quantity, e) => {
    // This assumes onUpdateCart is passed down from App.jsx
    if(onUpdateCart) onUpdateCart(productId, quantity);

    if (quantity === 1 && e) {
        const productImg = e.currentTarget.closest('.product-card').querySelector('img');
        const startRect = productImg.getBoundingClientRect();
        const endRect = cartRef.current.getBoundingClientRect();
        setFlyingItem({
            src: productImg.src,
            startX: startRect.left + startRect.width / 2,
            startY: startRect.top + startRect.height / 2,
            endX: endRect.left + endRect.width / 2,
            endY: endRect.top + endRect.height / 2
        });
    }
  };

  useGSAP(() => {
    gsap.from(".hero-text", { y: 100, opacity: 0, duration: 1, stagger: 0.2, ease: "power3.out" });
    gsap.utils.toArray('.product-card').forEach(card => { /* ... card animation ... */ });

    // --- 2. ADDED: Animation for the new pastry section ---
    const promoSection = ".pastries-promo-section";
    gsap.from(`${promoSection} .promo-title`, {
        scrollTrigger: { trigger: promoSection, start: "top 80%" },
        opacity: 0, y: 50, duration: 0.8, ease: 'power3.out'
    });
    gsap.from(`${promoSection} .promo-image`, {
        scrollTrigger: { trigger: promoSection, start: "top 75%" },
        opacity: 0, y: 50, scale: 0.9, stagger: 0.2, duration: 0.7, ease: 'power2.out'
    });
    gsap.from(`${promoSection} .promo-button`, {
        scrollTrigger: { trigger: promoSection, start: "top 70%" },
        opacity: 0, scale: 0.5, duration: 0.8, ease: 'back.out(1.7)'
    });

  }, { scope: container });

  const totalCartItems = cartItems ? Object.values(cartItems).reduce((total, quantity) => total + quantity, 0) : 0;

  return (
    <div ref={container} className="relative min-h-screen font-[sans-serif] pb-24 bg-fixed bg-cover bg-center" style={{ backgroundImage: `url('/logo/image44.webp')` }}>
      <div className="absolute inset-0 bg-white opacity-60 pointer-events-none z-0"></div> 
      <div className="relative z-10">
        <TopBar totalCartItems={totalCartItems} cartRef={cartRef} />
        {flyingItem && ( <img src={flyingItem.src} className="flying-item fixed block w-12 h-12 rounded-full z-[100] object-cover" alt="product" style={{ left: flyingItem.startX, top: flyingItem.startY }} /> )}
        
        <MiddleContent 
          bakeryProducts={bakeryProducts} 
          handleUpdateCart={handleCartAndUpdateFlyingItem} 
          productQuantities={cartItems || {}} // Fallback to empty object
          wishlistItems={wishlistItems}
          onToggleWishlist={onToggleWishlist}
        />
        
        {/* --- 3. NEW PASTRY PROMOTION SECTION --- */}
        <section className="pastries-promo-section container mx-auto px-4 py-16 text-center">
            <h2 className="promo-title text-4xl md:text-5xl font-extrabold text-amber-900">Craving More?</h2>
            <p className="promo-title text-lg text-gray-700 mt-2">Discover our flaky, buttery, and utterly irresistible pastries.</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">
                <Link to="/pastries" className="promo-image block overflow-hidden rounded-2xl shadow-lg group">
                    <img src="https://images.pexels.com/photos/2067576/pexels-photo-2067576.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Assorted Pastries" className="w-full h-64 object-cover transform transition-transform duration-500 group-hover:scale-110"/>
                </Link>
                <Link to="/pastries" className="promo-image block overflow-hidden rounded-2xl shadow-lg group">
                    <img src="https://images.pexels.com/photos/1721932/pexels-photo-1721932.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Glazed Croissant" className="w-full h-64 object-cover transform transition-transform duration-500 group-hover:scale-110"/>
                </Link>
                <Link to="/pastries" className="promo-image block overflow-hidden rounded-2xl shadow-lg group">
                    <img src="https://images.pexels.com/photos/267308/pexels-photo-267308.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Fruit Tart" className="w-full h-64 object-cover transform transition-transform duration-500 group-hover:scale-110"/>
                </Link>
            </div>

            <div className="mt-12">
                <Link to="/pastries">
                    <button className="promo-button px-8 py-4 rounded-full bg-pink-500 text-white font-semibold transition-all duration-300 transform hover:scale-105 hover:bg-pink-600 shadow-lg">
                        See Our Delicious Pastries
                    </button>
                </Link>
            </div>
        </section>
        
        <BottomSection />
      </div>
    </div>
  );
};

export default BakeryOrderPage;