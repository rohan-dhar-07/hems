  import React, { useState, useRef } from 'react';
  import { useGSAP } from '@gsap/react';
  import gsap from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';

  import BottomSection from '../components/projects/BottomSection';
  import MiddleContent from '../components/projects/MiddleContent';
  import TopBar from '../components/projects/TopBar';

  // Register GSAP plugins
  gsap.registerPlugin(ScrollTrigger);

  const BakeryOrderPage = () => {
    const [productQuantities, setProductQuantities] = useState({});
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

    useGSAP(() => {
      if (flyingItem) {
        const flyer = document.querySelector('.flying-item');
        gsap.fromTo(flyer, 
          { left: flyingItem.startX, top: flyingItem.startY, opacity: 1, scale: 0.5, zIndex: 100 }, 
          { left: flyingItem.endX, top: flyingItem.endY, opacity: 0, scale: 0, duration: 0.8, ease: 'power1.in', onComplete: () => setFlyingItem(null) 
        });
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

    const totalCartItems = Object.values(productQuantities).reduce((total, quantity) => total + quantity, 0);

    return (
      <div 
        ref={container} 
        className="relative min-h-screen font-[sans-serif] pb-24 
                  bg-fixed bg-cover bg-center"
        style={{ backgroundImage: `url('/logo/image44.webp')` }}
      >
        {/* Overlay for the light effect and text readability */}
        <div className="absolute inset-0 bg-white opacity-60 pointer-events-none z-0"></div> 
        
        {/* Content will be above the overlay */}
        <div className="relative z-10">
          <TopBar totalCartItems={totalCartItems} cartRef={cartRef} />
          {flyingItem && (
              <img src={flyingItem.src} className="flying-item fixed block w-12 h-12 rounded-full z-[100] object-cover" alt="product" style={{ left: flyingItem.startX, top: flyingItem.startY }} />
          )}
          <MiddleContent 
            bakeryProducts={bakeryProducts} 
            handleUpdateCart={handleUpdateCart} 
            productQuantities={productQuantities}
          />
          <BottomSection />
        </div>
      </div>
    );
  };

  export default BakeryOrderPage;