import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Cart from '../components/home/Cart';
import Navbar from '../components/home/Navbar';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const BreadsPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [flyingItem, setFlyingItem] = useState(null);
  const container = useRef(null);
  const cartRef = useRef(null);

  const breadProducts = [
    { id: 13, name: "Artisan Sourdough", price: 349.00, description: "Our signature loaf, naturally leavened over 48 hours for a complex flavor and a perfectly crisp crust.", image: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?q=80&w=2070" },
    { id: 14, name: "Classic Baguette", price: 299.00, description: "A taste of Paris. Light, airy, and perfect for any occasion, from sandwiches to sharing with cheese.", image: "https://images.unsplash.com/photo-1598373182133-5b65b5334369?q=80&w=1964" },
    { id: 15, name: "Whole Wheat Country Loaf", price: 399.00, description: "A hearty and wholesome loaf made with stone-ground whole wheat for a rich, nutty flavor.", image: "https://images.unsplash.com/photo-1534620808146-d33bb39128b2?q=80&w=1974" },
    { id: 16, name: "Rosemary & Sea Salt Focaccia", price: 449.00, description: "Soft, chewy, and dimpled with fragrant rosemary and flaky sea salt. Perfect for dipping.", image: "https://images.unsplash.com/photo-1621324142142-2339c59505f9?q=80&w=1974" },
    { id: 17, name: "Rich Brioche Loaf", price: 499.00, description: "An enriched, tender loaf with a soft crumb and golden crust. Perfect for French toast or enjoying on its own.", image: "https://images.unsplash.com/photo-1589112836284-8d820932c0f4?q=80&w=1974" },
    { id: 18, name: "Multigrain Seeded Bread", price: 429.00, description: "A nutritious blend of whole grains and seeds, offering a complex texture and deep, earthy flavor.", image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=1974" }
  ];

  const handleAddToCart = (product, e) => {
    gsap.to(e.currentTarget, { scale: 1.1, yoyo: true, repeat: 1, duration: 0.15, ease: 'power1.inOut' });
    setCartItems(prev => {
      const exist = prev.find(item => item.id === product.id);
      if (exist) return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      return [...prev, { ...product, quantity: 1 }];
    });
    const img = e.currentTarget.closest('.bread-card').querySelector('img');
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
    const heroTl = gsap.timeline({delay: 0.5});
    heroTl
      .from('.hero-char', { y: 100, opacity: 0, stagger: 0.05, duration: 1, ease: 'power3.out' })
      .from('.hero-line', { scaleX: 0, transformOrigin: 'center', duration: 1, ease: 'power2.out' }, "-=0.8");

    // Animate bakery elements
    gsap.from('.oven-glow', {
      scrollTrigger: { trigger: '.hero-section', start: 'top center' },
      scale: 0.8,
      opacity: 0,
      duration: 2,
      ease: 'power2.out'
    });

    gsap.from('.bread-card', {
      scrollTrigger: { trigger: '.bread-showcase-section', start: 'top 80%' },
      y: 100,
      opacity: 0,
      stagger: 0.2,
      duration: 1,
      ease: 'power3.out'
    });

    gsap.from('.ingredient-icon', {
      scrollTrigger: { trigger: '.ingredients-section', start: 'top 70%' },
      y: 50,
      opacity: 0,
      stagger: 0.1,
      duration: 0.8,
      ease: 'back.out(1.7)'
    });

    gsap.from('.baker-icon', {
      scrollTrigger: { trigger: '.process-section', start: 'top 70%' },
      y: 50,
      opacity: 0,
      stagger: 0.2,
      duration: 1,
      ease: 'power3.out'
    });

  }, { scope: container });

  return (
    <div ref={container} className="bg-[#F9F5F0] text-[#4E4234] font-serif overflow-hidden">
      <Navbar />
      <Cart ref={cartRef} cartItems={cartItems} onIncrease={increaseQuantity} onDecrease={decreaseQuantity} />
      {flyingItem && <img src={flyingItem.src} className="flying-item fixed w-24 h-24 object-cover rounded-full z-[999] pointer-events-none" alt="" />}

      {/* Hero Section with Bakery Ambiance */}
      <section className="hero-section relative h-screen flex flex-col justify-center items-center text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-900/40 to-amber-700/30 z-0"></div>
        
        {/* Animated Bakery Background Elements */}
        <div className="absolute top-1/2 left-1/4 w-24 h-24 rounded-full oven-glow bg-amber-200/30 filter blur-xl"></div>
        <div className="absolute top-1/3 right-1/4 w-16 h-16 rounded-full oven-glow bg-amber-200/40 filter blur-xl"></div>
        
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute top-10 left-10 text-8xl">🥖</div>
          <div className="absolute top-1/3 right-20 text-6xl">🥐</div>
          <div className="absolute bottom-20 left-1/4 text-7xl">🍞</div>
        </div>

        <div className="relative z-10 text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            {"Artisan Breads".split("").map((char, i) => 
              <span key={i} className="hero-char inline-block">{char === " " ? "\u00A0" : char}</span>)}
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto hero-char">
            Crafted with time-honored techniques and the finest ingredients
          </p>
          <div className="hero-line h-px w-1/3 max-w-sm mx-auto mt-6 bg-amber-200/50"></div>
        </div>

        {/* Decorative flour dust */}
        <div className="absolute bottom-0 w-full h-24 bg-pattern">
          <div className="absolute -top-12 w-full h-24 bg-[url('https://img.icons8.com/ios/100/ffffff/flour.png')] bg-repeat-x opacity-10 bg-auto"></div>
        </div>
      </section>

      {/* Bread Showcase with Bakery Display Concept */}
      <section className="bread-showcase-section py-16 md:py-24 bg-[#F3EFEA] relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Our Daily Bread</h2>
            <p className="text-xl max-w-2xl mx-auto">Fresh from our oven to your table</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {breadProducts.map((product) => (
              <div key={product.id} className="bread-card bg-white rounded-2xl overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105">
                <div className="relative h-64 overflow-hidden">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover"/>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                  <div className="absolute top-4 right-4 bg-amber-500 text-white py-1 px-3 rounded-full text-sm font-bold">Fresh</div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2">{product.name}</h3>
                  <p className="text-stone-600 mb-4">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold">₹{product.price.toFixed(2)}</span>
                    <button onClick={(e) => handleAddToCart(product, e)} className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 px-6 rounded-full flex items-center">
                      <span className="mr-2">Add</span>
                      <span>🥖</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Decorative bakery elements */}
        <div className="absolute -bottom-10 left-10 text-6xl opacity-10">🥖</div>
        <div className="absolute top-20 right-5 text-5xl opacity-10">🥐</div>
      </section>

      {/* Baking Process Section */}
      <section className="process-section py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">The Art of Baking</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="text-center">
              <div className="baker-icon text-6xl mb-6">👨‍🍳</div>
              <h3 className="text-2xl font-bold mb-4">Handcrafted</h3>
              <p className="text-stone-600">Each loaf is carefully shaped by our skilled bakers using traditional techniques.</p>
            </div>
            
            <div className="text-center">
              <div className="baker-icon text-6xl mb-6">🔥</div>
              <h3 className="text-2xl font-bold mb-4">Stone Hearth Oven</h3>
              <p className="text-stone-600">Baked in our traditional stone hearth oven for the perfect crust and crumb.</p>
            </div>
            
            <div className="text-center">
              <div className="baker-icon text-6xl mb-6">⏱️</div>
              <h3 className="text-2xl font-bold mb-4">Slow Fermentation</h3>
              <p className="text-stone-600">Our doughs ferment slowly to develop complex flavors and better digestibility.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Ingredients Section */}
      <section className="ingredients-section py-16 md:py-24 bg-amber-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Simple Ingredients</h2>
          <p className="text-xl mb-12 max-w-2xl mx-auto">We believe great bread requires only the finest, simplest ingredients</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="ingredient-card">
              <div className="ingredient-icon text-5xl mb-4">🌾</div>
              <h3 className="text-xl font-bold text-amber-800">Organic Flour</h3>
              <p className="mt-2 text-stone-600">Locally milled, stone-ground flour for unparalleled flavor.</p>
            </div>
            
            <div className="ingredient-card">
              <div className="ingredient-icon text-5xl mb-4">💧</div>
              <h3 className="text-xl font-bold text-amber-800">Pure Water</h3>
              <p className="mt-2 text-stone-600">Filtered water to awaken natural yeasts in the dough.</p>
            </div>
            
            <div className="ingredient-card">
              <div className="ingredient-icon text-5xl mb-4">🧂</div>
              <h3 className="text-xl font-bold text-amber-800">Sea Salt</h3>
              <p className="mt-2 text-stone-600">Natural sea salt to enhance the wheat's inherent sweetness.</p>
            </div>
            
            <div className="ingredient-card">
              <div className="ingredient-icon text-5xl mb-4">🕒</div>
              <h3 className="text-xl font-bold text-amber-800">Time</h3>
              <p className="mt-2 text-stone-600">Slow fermentation develops deep, complex flavors naturally.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="cta-section py-20 md:py-32 text-center bg-amber-100 relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-10 left-1/4 text-8xl">🥖</div>
          <div className="absolute bottom-20 right-1/4 text-7xl">🍞</div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Fresh Bread Daily</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">Experience the difference that traditional baking methods make</p>
          <Link to="/order">
            <button className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-4 px-10 rounded-full shadow-lg flex items-center mx-auto">
              <span className="mr-2">Order Now</span>
              <span>→</span>
            </button>
          </Link>
        </div>
      </section>

      {/* Footer with Bakery Details */}
      <footer className="bg-amber-900 text-amber-100 py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="text-4xl mb-6">🥖</div>
          <h3 className="text-2xl font-bold mb-4">The Artisan Bakery</h3>
          <p className="mb-6">Open daily from 7am until we sell out</p>
          <p>123 Bread Street • Bakery District</p>
        </div>
      </footer>
    </div>
  );
};

export default BreadsPage;