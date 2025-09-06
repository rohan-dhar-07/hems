import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Cart from '../components/home/Cart';
import Navbar from '../components/home/Navbar';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const CakesPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [flyingItem, setFlyingItem] = useState(null);
  const container = useRef(null);
  const cartRef = useRef(null);
  const preloaderRef = useRef(null); // 1. Add a ref for the preloader

  const cakeProducts = [
    { id: 1, name: "Velvet Dream Cake", price: 1599.00, description: "A classic red velvet with a rich cream cheese frosting.", image: "https://cdn.igp.com/f_auto,q_auto,t_pnopt19prodlp/products/p-red-velvet-dream-cake-1-kg--201757-m.jpg", bgColor: "#4a0e0e" },
    { id: 2, name: "Chocolate Decadence", price: 1799.00, description: "Layers of dark chocolate sponge and silky truffle ganache.", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=1974&auto=format&fit=crop", bgColor: "#2d1b0b" },
    { id: 3, name: "Lemon & Elderflower", price: 1699.00, description: "A light sponge infused with floral notes and zesty lemon curd.", image: "https://ichef.bbci.co.uk/food/ic/food_16x9_1600/recipes/lemon_and_elderflower_15737_16x9.jpg", bgColor: "#f0e68c" },
    { id: 4, name: "Salted Caramel Crunch", price: 1899.00, description: "Caramel sponge with crunchy praline and buttercream.", image: "https://www.mashed.com/img/gallery/easy-salted-caramel-vanilla-crunch-cake-recipe/l-intro-1623682796.jpg", bgColor: "#8c5a2b" },
    { id: 5, name: "Berry Chantilly", price: 1799.00, description: "Vanilla bean cake layered with light cream and fresh berries.", image: "https://www.foodnetwork.com/content/dam/images/food/fullset/2024/03/20/COPYCAT_BERRY_CHANTILLY_CAKE_H_f.jpg", bgColor: "#a35d6a" },
  ];
  
  const handleAddToCart = (product, e) => {
    gsap.to(e.currentTarget, { scale: 1.1, yoyo: true, repeat: 1, duration: 0.15, ease: 'power1.inOut' });
    setCartItems(prev => {
      const exist = prev.find(item => item.id === product.id);
      if (exist) return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      return [...prev, { ...product, quantity: 1 }];
    });
    const img = e.currentTarget.closest('.cake-section').querySelector('.cake-image');
    const startRect = img.getBoundingClientRect();
    const endRect = cartRef.current.getBoundingClientRect();
    setFlyingItem({ src: product.image, startX: startRect.left + startRect.width / 2, startY: startRect.top + startRect.height / 2, endX: endRect.left + endRect.width / 2, endY: endRect.top + endRect.height / 2 });
  };
  
  const increaseQuantity = (id) => setCartItems(p => p.map(i => i.id === id ? {...i, quantity: i.quantity + 1} : i));
  const decreaseQuantity = (id) => setCartItems(p => {
      const item = p.find(i => i.id === id);
      if (item.quantity === 1) return p.filter(i => i.id !== id);
      return p.map(i => i.id === id ? {...i, quantity: i.quantity - 1} : i);
  });

  useGSAP(() => {
    if (flyingItem) {
      gsap.fromTo('.flying-item', { left: flyingItem.startX, top: flyingItem.startY, opacity: 1, scale: 0.5 }, { left: flyingItem.endX, top: flyingItem.endY, opacity: 0, scale: 0, duration: 0.8, ease: 'power1.in', onComplete: () => setFlyingItem(null) });
    }
  }, [flyingItem]);

  useGSAP(() => {
    // 2. Add an onComplete callback to the timeline
    const preloaderTl = gsap.timeline({
      onComplete: () => {
        // This will hide the preloader after the animation finishes
        gsap.set(preloaderRef.current, { display: 'none' });
      }
    });

    preloaderTl
      .to('.preloader-panel', { scaleY: 0, stagger: 0.2, duration: 1, ease: 'power3.inOut' })
      .from('.anim-hero-char', { y: 100, opacity: 0, stagger: 0.05, duration: 1, ease: 'power3.out' }, "-=0.5");

    gsap.utils.toArray('.cake-section').forEach((section, i) => {
        gsap.to(container.current, {
            backgroundColor: cakeProducts[i].bgColor, ease: 'none',
            scrollTrigger: { trigger: section, start: 'top bottom', end: 'top top', scrub: true }
        });
    });

    gsap.utils.toArray('.cake-section').forEach(section => {
        gsap.from(section.querySelector('.cake-image'), {
            scrollTrigger: { trigger: section, start: 'top 80%', end: 'bottom 20%', scrub: 1 },
            x: -200, opacity: 0, scale: 0.8, ease: 'power2.out'
        });
        gsap.from(section.querySelectorAll('.anim-text'), {
            scrollTrigger: { trigger: section, start: 'top 70%', end: 'bottom 30%', scrub: 1 },
            x: 200, opacity: 0, stagger: 0.2, ease: 'power2.out'
        });
    });
    
    gsap.from(".philosophy-text span", {
        scrollTrigger: { trigger: ".philosophy-section", start: "top 60%", end: "bottom 80%", scrub: 1.5 },
        opacity: 0.1,
        stagger: 0.2
    });
    
    gsap.from('.testimonial-card', {
        scrollTrigger: { trigger: '.testimonials-section', start: 'top 70%' },
        y: 100, opacity: 0, stagger: 0.2, duration: 1, ease: 'power3.out'
    });

    gsap.from('.cta-content > *', { scrollTrigger: { trigger: '.cta-section', start: 'top 80%' }, y: 50, opacity: 0, stagger: 0.2, duration: 1, ease: 'power3.out' });

  }, { scope: container });

  return (
    <div ref={container} className="bg-amber-400 text-white font-[sans-serif] transition-colors duration-500">
      {/* 3. Attach the ref to the preloader container */}
      <div ref={preloaderRef} className="preloader fixed top-0 left-0 w-full h-screen flex z-[101]">
          {[...Array(5)].map((_,i) => <div key={i} className="preloader-panel w-1/5 h-full bg-red-800"/>)}
      </div>
      
      <Navbar />
      <Cart ref={cartRef} cartItems={cartItems} onIncrease={increaseQuantity} onDecrease={decreaseQuantity} />
      {flyingItem && <img src={flyingItem.src} className="flying-item fixed w-24 h-24 object-cover rounded-full z-[999] pointer-events-none" alt="" />}

      <section className="h-screen flex justify-center items-center text-center">
        <h1 className="text-6xl md:text-8xl font-['font1'] font-bold max-w-4xl mx-auto">
          {"Where Every Slice is a Majestic Serving".split("").map((char, i) => <span key={i} className="inline-block anim-hero-char">{char === " " ? "\u00A0" : char}</span>)}
        </h1>
      </section>
      
      <section className="philosophy-section h-screen flex justify-center items-center text-center">
        <p className="philosophy-text text-4xl md:text-5xl font-['font2'] max-w-3xl mx-auto leading-relaxed">
            {"We believe a cake is more than a dessert; it is a centerpiece of celebration, a symbol of joy, crafted with humble hands and the finest ingredients.".split(" ").map((word, i) => <span key={i}>{word} </span>)}
        </p>
      </section>

      {cakeProducts.map(product => (
          <section key={product.id} className="cake-section h-screen w-screen flex items-center justify-center p-8 overflow-hidden">
              <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                  <div className="cake-image w-full h-auto">
                      <img src={product.image} alt={product.name} className="w-full h-full object-contain max-h-[60vh] drop-shadow-2xl"/>
                  </div>
                  <div className="text-center md:text-left">
                      <h2 className="text-5xl md:text-6xl font-['font1'] font-bold anim-text" style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.5)' }}>{product.name}</h2>
                      <p className="text-xl mt-4 max-w-md anim-text" style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.5)' }}>{product.description}</p>
                      <div className="mt-8">
                          <span className="text-4xl font-bold anim-text" style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.5)' }}>₹{product.price.toFixed(2)}</span>
                          <button onClick={(e) => handleAddToCart(product, e)} className="ml-6 bg-rose-500 hover:bg-rose-600 font-bold py-4 px-10 rounded-full shadow-lg anim-text">Add to Cart</button>
                      </div>
                  </div>
              </div>
          </section>
      ))}
      
      <section className="testimonials-section bg-gray-900/50 py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-12">From Our Patrons</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="testimonial-card bg-black/20 p-8 rounded-2xl">
                    <p className="text-lg italic">"The Velvet Dream Cake was the star of our anniversary. Absolutely divine!"</p>
                    <p className="mt-4 font-bold">- Anjali S.</p>
                </div>
                <div className="testimonial-card bg-black/20 p-8 rounded-2xl">
                    <p className="text-lg italic">"HEMS created the most beautiful custom cake for my daughter's birthday. It tasted even better than it looked!"</p>
                    <p className="mt-4 font-bold">- Vikram R.</p>
                </div>
                <div className="testimonial-card bg-black/20 p-8 rounded-2xl">
                    <p className="text-lg italic">"The best Black Forest cake in North Dumdum, without a doubt. Pure perfection."</p>
                    <p className="mt-4 font-bold">- Priya M.</p>
                </div>
            </div>
        </div>
      </section>

      <section className="cta-section h-screen w-screen flex items-center justify-center text-center bg-gray-900">
        <div className="container mx-auto px-4 relative z-10 cta-content">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Dreaming of a Custom Cake?</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">From weddings to birthdays, our artisans can bring your vision to life. Let's create something majestic together.</p>
            <Link to="/custom-order">
                <button className="bg-amber-800 hover:bg-amber-900 text-white font-bold py-4 px-10 rounded-full shadow-lg">Design Your Cake</button>
            </Link>
        </div>
      </section>
    </div>
  );
};

export default CakesPage;

