import React, { useState, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';

import BottomSection from '../components/projects/BottomSection';
import MiddleContent from '../components/projects/MiddleContent';
import TopBar from '../components/projects/TopBar';

gsap.registerPlugin(ScrollTrigger);

const BakeryOrderPage = ({ wishlistItems, onToggleWishlist, cartItems, onUpdateCart }) => {
  const [flyingItem, setFlyingItem] = useState(null);
  const container = useRef(null);
  const cartRef = useRef(null);

  const bakeryProducts = [ /* ... your product list ... */ ];

  const handleCartAndUpdateFlyingItem = (productId, quantity, e) => {
    if(onUpdateCart) onUpdateCart(productId, quantity);
    if (quantity === 1 && e) {
        // ... flying item logic
    }
  };

  useGSAP(() => {
    gsap.from(".hero-text", { y: 100, opacity: 0, duration: 1, stagger: 0.2, ease: "power3.out" });
    gsap.utils.toArray('.product-card').forEach(card => { /* ... card animation ... */ });

    // --- NEW: Helper function for creating promo animations ---
    const createPromoAnimation = (selector) => {
      gsap.from(`${selector} .promo-title`, {
        scrollTrigger: { trigger: selector, start: "top 80%" },
        opacity: 0, y: 50, duration: 0.8, ease: 'power3.out'
      });
      gsap.from(`${selector} .promo-image`, {
        scrollTrigger: { trigger: selector, start: "top 75%" },
        opacity: 0, y: 50, scale: 0.9, stagger: 0.2, duration: 0.7, ease: 'power2.out'
      });
      gsap.from(`${selector} .promo-button`, {
        scrollTrigger: { trigger: selector, start: "top 70%" },
        opacity: 0, scale: 0.5, duration: 0.8, ease: 'back.out(1.7)'
      });
    };

    // --- Create animations for all 4 sections ---
    createPromoAnimation(".pastries-promo-section");
    createPromoAnimation(".cakes-promo-section");
    createPromoAnimation(".breads-promo-section");
    createPromoAnimation(".icecream-promo-section");

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
          productQuantities={cartItems || {}}
          wishlistItems={wishlistItems}
          onToggleWishlist={onToggleWishlist}
        />
        
        {/* --- All 4 Promo Sections --- */}

        {/* 1. Pastries Section */}
        <section className="pastries-promo-section container mx-auto px-4 py-16 text-center">
            <h2 className="promo-title text-4xl md:text-5xl font-extrabold text-amber-900">Craving More?</h2>
            <p className="promo-title text-lg text-gray-700 mt-2">Discover our flaky, buttery, and utterly irresistible pastries.</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">
                <Link to="/pastries" className="promo-image block overflow-hidden rounded-2xl shadow-lg group"><img src="https://images.pexels.com/photos/2067576/pexels-photo-2067576.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Assorted Pastries" className="w-full h-64 object-cover transform transition-transform duration-500 group-hover:scale-110"/></Link>
                <Link to="/pastries" className="promo-image block overflow-hidden rounded-2xl shadow-lg group"><img src="https://images.pexels.com/photos/1721932/pexels-photo-1721932.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Glazed Croissant" className="w-full h-64 object-cover transform transition-transform duration-500 group-hover:scale-110"/></Link>
                <Link to="/pastries" className="promo-image block overflow-hidden rounded-2xl shadow-lg group"><img src="https://images.pexels.com/photos/267308/pexels-photo-267308.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Fruit Tart" className="w-full h-64 object-cover transform transition-transform duration-500 group-hover:scale-110"/></Link>
            </div>
            <div className="mt-12">
                <Link to="/pastries"><button className="promo-button px-8 py-4 rounded-full bg-pink-500 text-white font-semibold transition-all duration-300 transform hover:scale-105 hover:bg-pink-600 shadow-lg">See Our Delicious Pastries</button></Link>
            </div>
        </section>

        {/* 2. Cakes Section */}
        <section className="cakes-promo-section container mx-auto px-4 py-16 text-center bg-rose-50/50 rounded-3xl my-12">
            <h2 className="promo-title text-4xl md:text-5xl font-extrabold text-rose-900">For Every Celebration</h2>
            <p className="promo-title text-lg text-gray-700 mt-2">From birthdays to anniversaries, find the perfect cake.</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">
                <Link to="/cake" className="promo-image block overflow-hidden rounded-2xl shadow-lg group"><img src="https://images.pexels.com/photos/1854652/pexels-photo-1854652.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Chocolate Cake Slice" className="w-full h-64 object-cover transform transition-transform duration-500 group-hover:scale-110"/></Link>
                <Link to="/cake" className="promo-image block overflow-hidden rounded-2xl shadow-lg group"><img src="https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Berry Chocolate Cake" className="w-full h-64 object-cover transform transition-transform duration-500 group-hover:scale-110"/></Link>
                <Link to="/cake" className="promo-image block overflow-hidden rounded-2xl shadow-lg group"><img src="https://images.pexels.com/photos/1027811/pexels-photo-1027811.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Cheesecake" className="w-full h-64 object-cover transform transition-transform duration-500 group-hover:scale-110"/></Link>
            </div>
            <div className="mt-12">
                <Link to="/cake"><button className="promo-button px-8 py-4 rounded-full bg-rose-500 text-white font-semibold transition-all duration-300 transform hover:scale-105 hover:bg-rose-600 shadow-lg">Explore Our Cakes</button></Link>
            </div>
        </section>

        {/* 3. Breads Section */}
        <section className="breads-promo-section container mx-auto px-4 py-16 text-center">
            <h2 className="promo-title text-4xl md:text-5xl font-extrabold text-amber-900">Our Daily Bread</h2>
            <p className="promo-title text-lg text-gray-700 mt-2">Artisan loaves, baked fresh every morning.</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">
                <Link to="/breads" className="promo-image block overflow-hidden rounded-2xl shadow-lg group"><img src="https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Sourdough Loaf" className="w-full h-64 object-cover transform transition-transform duration-500 group-hover:scale-110"/></Link>
                <Link to="/breads" className="promo-image block overflow-hidden rounded-2xl shadow-lg group"><img src="https://images.pexels.com/photos/209196/pexels-photo-209196.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Baguettes" className="w-full h-64 object-cover transform transition-transform duration-500 group-hover:scale-110"/></Link>
                <Link to="/breads" className="promo-image block overflow-hidden rounded-2xl shadow-lg group"><img src="https://hips.hearstapps.com/hmg-prod/images/types-of-bread-1666723473.jpg?crop=0.663xw:1.00xh;0.169xw,0&resize=1200:*" alt="Assorted Breads" className="w-full h-64 object-cover transform transition-transform duration-500 group-hover:scale-110"/></Link>
            </div>
            <div className="mt-12">
                <Link to="/breads"><button className="promo-button px-8 py-4 rounded-full bg-yellow-800 text-white font-semibold transition-all duration-300 transform hover:scale-105 hover:bg-yellow-900 shadow-lg">Browse Fresh Breads</button></Link>
            </div>
        </section>

        {/* 4. Ice Cream Section */}
        <section className="icecream-promo-section container mx-auto px-4 py-16 text-center bg-sky-50/50 rounded-3xl my-12">
            <h2 className="promo-title text-4xl md:text-5xl font-extrabold text-sky-900">Cool Down in Style</h2>
            <p className="promo-title text-lg text-gray-700 mt-2">Hand-churned ice cream, the perfect sweet escape.</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">
                <Link to="/icecream" className="promo-image block overflow-hidden rounded-2xl shadow-lg group"><img src="https://images.pexels.com/photos/1343504/pexels-photo-1343504.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Ice Cream Scoops" className="w-full h-64 object-cover transform transition-transform duration-500 group-hover:scale-110"/></Link>
                <Link to="/icecream" className="promo-image block overflow-hidden rounded-2xl shadow-lg group"><img src="https://berryworld.imgix.net/assets/ice-cream-straw.jpeg?auto=format&crop=focalpoint&fit=crop&fp-x=0.5&fp-y=0.5&h=1500&ixlib=php-3.1.0&q=60&v=1724332437&w=2300" alt="Strawberry Ice Cream Cone" className="w-full h-64 object-cover transform transition-transform duration-500 group-hover:scale-110"/></Link>
                <Link to="/icecream" className="promo-image block overflow-hidden rounded-2xl shadow-lg group"><img src="https://aplantifulpath.com/wp-content/uploads/2019/08/Strawberry-Ice-Cream-1.jpg" alt="Chocolate Ice Cream" className="w-full h-64 object-cover transform transition-transform duration-500 group-hover:scale-110"/></Link>
            </div>
            <div className="mt-12">
                <Link to="/icecream"><button className="promo-button px-8 py-4 rounded-full bg-sky-500 text-white font-semibold transition-all duration-300 transform hover:scale-105 hover:bg-sky-600 shadow-lg">Discover Our Ice Creams</button></Link>
            </div>
        </section>
        
        <BottomSection />
      </div>
    </div>
  );
};

export default BakeryOrderPage;