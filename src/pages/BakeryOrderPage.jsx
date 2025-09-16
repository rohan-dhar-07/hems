// src/pages/BakeryOrderPage.jsx

import React, { useState, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import BottomSection from '../components/projects/BottomSection';
import MiddleContent from '../components/projects/MiddleContent';
import TopBar from '../components/projects/TopBar';

gsap.registerPlugin(ScrollTrigger);

// --- FIX: Accept wishlist props from App.jsx here ---
const BakeryOrderPage = ({ wishlistItems, onToggleWishlist }) => {
  const [productQuantities, setProductQuantities] = useState({});
  const [flyingItem, setFlyingItem] = useState(null);
  const container = useRef(null);
  const cartRef = useRef(null);

  // --- The local wishlist state has been correctly removed from this file ---

  const bakeryProducts = [
      { id: 1, name: "Chocolate Decadence", price: 1499.00, description: "Rich chocolate cake with a molten core.", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1089&q=80" },
      { id: 2, name: "Sunrise Blueberry Muffin", price: 249.00, description: "Packed with fresh, juicy blueberries.", image: "https://static.vecteezy.com/system/resources/previews/069/054/159/large_2x/freshly-baked-blueberry-muffins-cooling-on-a-wire-rack-on-the-beach-at-sunset-with-ocean-waves-photo.jpg" },
      { id: 3, name: "Classic Parisian Croissant", price: 199.00, description: "Buttery, flaky, and baked to perfection.", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzqVN1SZJuMBXn2S5Z1NzXHvC0Ua2ipZKj_w&s" },
      { id: 4, name: "Homestyle Apple Pie", price: 999.00, description: "Sweet apples and cinnamon in a golden crust.", image: "https://www.simplyrecipes.com/thmb/SeOrwAcn5dAuazvh-AhlrDbAd24=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Simply-Recipes-Homemade-Apple-Pie-LEAD-04-11db861782aa4ebdb5ef9948125ef0ef.jpg" },
      { id: 5, name: "Celebration Cupcakes", price: 599.00, description: "A delightful pack of four assorted cupcakes.", image: "https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80" },
      { id: 6, name: "Artisan Sourdough Loaf", price: 349.00, description: "Freshly baked with a perfectly crisp crust.", image: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" }
  ];

  const handleUpdateCart = (productId, quantity, e) => {
    setProductQuantities(prevQuantities => ({
      ...prevQuantities,
      [productId]: quantity,
    }));
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

  useGSAP(() => { // ... GSAP logic remains the same ...
  }, { scope: container });

  const totalCartItems = Object.values(productQuantities).reduce((total, quantity) => total + quantity, 0);

  return (
    <div ref={container} className="relative min-h-screen font-[sans-serif] pb-24 bg-fixed bg-cover bg-center" style={{ backgroundImage: `url('/logo/image44.webp')` }}>
      <div className="absolute inset-0 bg-white opacity-60 pointer-events-none z-0"></div>
      <div className="relative z-10">
        <TopBar totalCartItems={totalCartItems} cartRef={cartRef} />
        {flyingItem && ( <img src={flyingItem.src} className="flying-item fixed block w-12 h-12 rounded-full z-[100] object-cover" alt="product" style={{ left: flyingItem.startX, top: flyingItem.startY }} /> )}
        
        {/* Pass the props down to MiddleContent */}
        <MiddleContent 
          bakeryProducts={bakeryProducts} 
          handleUpdateCart={handleUpdateCart} 
          productQuantities={productQuantities}
          wishlistItems={wishlistItems}
          onToggleWishlist={onToggleWishlist}
        />
        
        <BottomSection />
      </div>
    </div>
  );
};

export default BakeryOrderPage;