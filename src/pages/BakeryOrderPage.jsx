import React, { useState, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';

import BottomSection from '../components/projects/BottomSection';
import MiddleContent from '../components/projects/MiddleContent';
import TopBar from '../components/projects/TopBar';
import PromoBanner from '../components/projects/PromoBanner';
import CategoryLinks from '../components/projects/CategoryLinks'; // <-- 1. IMPORT THE NEW SECTION

gsap.registerPlugin(ScrollTrigger);

const BakeryOrderPage = ({ wishlistItems, onToggleWishlist, cartItems, onUpdateCart }) => {
  const [flyingItem, setFlyingItem] = useState(null);
  const container = useRef(null);
  const cartRef = useRef(null);

  const bakeryProducts = [
      { id: 1, name: "Chocolate Decadence", price: 1499.00, description: "Rich chocolate cake with a molten core.", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1089&q=80" },
      { id: 2, name: "Sunrise Blueberry Muffin", price: 249.00, description: "Packed with fresh, juicy blueberries.", image: "https://static.vecteezy.com/system/resources/previews/069/054/159/large_2x/freshly-baked-blueberry-muffins-cooling-on-a-wire-rack-on-the-beach-at-sunset-with-ocean-waves-photo.jpg" },
      { id: 3, name: "Classic Parisian Croissant", price: 199.00, description: "Buttery, flaky, and baked to perfection.", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzqVN1SZJuMBXn2S5Z1NzXHvC0Ua2ipZKj_w&s" },
      { id: 4, name: "Homestyle Apple Pie", price: 999.00, description: "Sweet apples and cinnamon in a golden crust.", image: "https://www.simplyrecipes.com/thmb/SeOrwAcn5dAuazvh-AhlrDbAd24=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Simply-Recipes-Homemade-Apple-Pie-LEAD-04-11db861782aa4ebdb5ef9948125ef0ef.jpg" },
      { id: 5, name: "Celebration Cupcakes", price: 599.00, description: "A delightful pack of four assorted cupcakes.", image: "https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80" },
      { id: 6, name: "Artisan Sourdough Loaf", price: 349.00, description: "Freshly baked with a perfectly crisp crust.", image: "https://images.unsplash.com/photo-1549931319-a_545dcf3bc73?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" }
  ];

  const handleCartAndUpdateFlyingItem = (productId, quantity, e) => {
    if(onUpdateCart) onUpdateCart(productId, quantity);
    if (quantity === 1 && e && cartRef.current) {
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
    const createPromoAnimation = (selector) => {
      gsap.from(`${selector} .promo-title`, { scrollTrigger: { trigger: selector, start: "top 80%" }, opacity: 0, y: 50, duration: 0.8, ease: 'power3.out' });
      gsap.from(`${selector} .promo-image`, { scrollTrigger: { trigger: selector, start: "top 75%" }, opacity: 0, y: 50, scale: 0.9, stagger: 0.2, duration: 0.7, ease: 'power2.out' });
      gsap.from(`${selector} .promo-button`, { scrollTrigger: { trigger: selector, start: "top 70%" }, opacity: 0, scale: 0.5, duration: 0.8, ease: 'back.out(1.7)' });
    };
    createPromoAnimation(".pastries-promo-section");
    createPromoAnimation(".cakes-promo-section");
    createPromoAnimation(".breads-promo-section");
    createPromoAnimation(".icecream-promo-section");
  }, { scope: container });

  useGSAP(() => {
    if (flyingItem) {
      gsap.to('.flying-item', {
        x: flyingItem.endX - flyingItem.startX,
        y: flyingItem.endY - flyingItem.startY,
        scale: 0.2,
        opacity: 0.7,
        duration: 0.8,
        ease: 'power1.in',
        onComplete: () => {
          gsap.fromTo(cartRef.current, 
            { scale: 1.5 }, 
            { scale: 1, duration: 0.3, ease: 'back.out(1.7)' }
          );
          setFlyingItem(null);
        }
      });
    }
  }, [flyingItem]);

  const totalCartItems = cartItems ? Object.values(cartItems).reduce((total, quantity) => total + quantity, 0) : 0;

  return (
    <div ref={container} className="relative min-h-screen font-[sans-serif] pb-24 bg-fixed bg-cover bg-center" style={{ backgroundImage: `url('/logo/image44.webp')` }}>
      <div className="absolute inset-0 bg-white opacity-60 pointer-events-none z-0"></div> 
      <div className="relative z-10 pt-20"> 
        <PromoBanner />
        <CategoryLinks /> {/* <-- 2. ADD THE NEW SECTION COMPONENT HERE */}
        <TopBar totalCartItems={totalCartItems} ref={cartRef} />
        {flyingItem && ( <img src={flyingItem.src} className="flying-item fixed block w-12 h-12 rounded-full z-[100] object-cover" alt="product" style={{ left: flyingItem.startX, top: flyingItem.startY }} /> )}
        
        <MiddleContent 
          bakeryProducts={bakeryProducts} 
          handleUpdateCart={handleCartAndUpdateFlyingItem} 
          productQuantities={cartItems || {}}
          wishlistItems={wishlistItems}
          onToggleWishlist={onToggleWishlist}
        />
        
        {/* All Promotional Sections */}
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

        <section className="icecream-promo-section container mx-auto px-4 py-16 text-center bg-sky-50/50 rounded-3xl my-12">
            <h2 className="promo-title text-4xl md:text-5xl font-extrabold text-sky-900">Cool Down in Style</h2>
            <p className="promo-title text-lg text-gray-700 mt-2">Hand-churned ice cream, the perfect sweet escape.</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">
                <Link to="/icecream" className="promo-image block overflow-hidden rounded-2xl shadow-lg group"><img src="https://images.pexels.com/photos/1343504/pexels-photo-1343504.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Ice Cream Scoops" className="w-full h-64 object-cover transform transition-transform duration-500 group-hover:scale-110"/></Link>
                <Link to="/icecream" className="promo-image block overflow-hidden rounded-2xl shadow-lg group"><img src="https://berryworld.imgix.net/assets/ice-cream-straw.jpeg?auto=format&crop=focalpoint&fit=crop&fp-x=0.5&fp-y=0.5&h=1500&ixlib=php-3.1.0&q=60&v=1724332437&w=2300" alt="Strawberry Ice Cream Cone" className="w-full h-64 object-cover transform transition-transform duration-500 group-hover:scale-110"/></Link>
                <Link to="/icecream" className="promo-image block overflow-hidden rounded-2xl shadow-lg group"><img src="https://images.pexels.com/photos/108370/pexels-photo-108370.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Chocolate Ice Cream" className="w-full h-64 object-cover transform transition-transform duration-500 group-hover:scale-110"/></Link>
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