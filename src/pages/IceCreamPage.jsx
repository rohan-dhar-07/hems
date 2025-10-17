import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Cart from '../components/home/Cart';
import Navbar from '../components/home/Navbar';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const IceCreamPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [flyingItem, setFlyingItem] = useState(null);
  const container = useRef(null);
  const cartRef = useRef(null);

  const iceCreamProducts = [
    { id: 19, name: "Himalayan Salted Caramel", price: 299.00, description: "Sweet cream base with ribbons of house-made salted caramel.", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZVOEPtJ54zWBMQKQJA4aSrRQiGB45tuYVdw&s", color: "#fde68a" },
    { id: 20, name: "Kolkata Meetha Paan", price: 349.00, description: "An adventurous flavor capturing the essence of the classic Indian treat.", image: "https://indulgecreamery.com/cdn/shop/files/DSC00159.jpg?v=1752150534&width=4096", color: "#a7f3d0" },
    { id: 21, name: "Darjeeling Tea Infusion", price: 329.00, description: "Aromatic Darjeeling tea infused into a delicate, creamy base.", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdl4wbJf2HYdsPtIlntfcK5y0vsJ9AuzSMvg&s", color: "#f3e8d9" },
    { id: 22, name: "Mango Lassi Sorbet", price: 279.00, description: "A refreshing, dairy-free sorbet bursting with the taste of ripe mangoes.", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTp95An5uGm1QXcitybRWf3CT6UedubflaylA&s", color: "#fecaca" },
  ];

  const handleAddToCart = (product, e) => {
    gsap.to(e.currentTarget, { scale: 1.1, yoyo: true, repeat: 1, duration: 0.15, ease: 'power1.inOut' });
    setCartItems(prev => {
      const exist = prev.find(item => item.id === product.id);
      if (exist) return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      return [...prev, { ...product, quantity: 1 }];
    });
    const img = e.currentTarget.closest('.flavor-scoop').querySelector('img');
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
    // --- Hero Animation ---
    const heroTl = gsap.timeline({
        scrollTrigger: {
            trigger: ".hero-section",
            start: "top top",
            end: "bottom top",
            scrub: true,
        }
    });
    heroTl.to('.hero-bg', { scale: 1.2, opacity: 0.7 })
          .to('.hero-content', { y: -150, opacity: 0.3 }, 0);

    gsap.from('.anim-hero-char', { y: 100, opacity: 0, stagger: 0.08, duration: 1.2, ease: 'back.out(1.7)', delay: 0.3 });
    gsap.from('.hero-subtitle', { y: 50, opacity: 0, duration: 1, ease: 'power2.out', delay: 1.2 });
    
    // --- Flavor Cards Animation ---
    gsap.from('.flavor-scoop', {
        scrollTrigger: { trigger: '.flavors-section', start: 'top 70%' },
        y: 120, opacity: 0, rotation: 5, stagger: 0.2, duration: 1.2, ease: 'back.out(1.7)'
    });

    // --- Stats Counter Animation ---
    gsap.from('.stat-item', {
        scrollTrigger: { trigger: '.stats-section', start: 'top 80%' },
        scale: 0, opacity: 0, stagger: 0.1, duration: 0.8, ease: 'back.out(1.7)'
    });

    // --- Floating Ingredients ---
    gsap.to('.floating-ingredient', { 
        y: -20, 
        rotation: 360, 
        duration: 4, 
        ease: 'power1.inOut', 
        repeat: -1, 
        yoyo: true,
        stagger: 0.5
    });
    
    // --- Promise Cards Animation ---
    gsap.from('.promise-card', {
        scrollTrigger: { trigger: '.promise-section', start: 'top 70%' },
        y: 80, opacity: 0, stagger: 0.15, duration: 1, ease: 'power3.out'
    });

  }, { scope: container });

  return (
    <div ref={container} className="bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50 text-gray-800 font-sans min-h-screen">
      <Navbar />
      <Cart ref={cartRef} cartItems={cartItems} onIncrease={increaseQuantity} onDecrease={decreaseQuantity} />
      {flyingItem && <img src={flyingItem.src} className="flying-item fixed w-16 h-16 object-cover rounded-full z-[999] pointer-events-none shadow-2xl border-4 border-white" alt="" />}

      {/* --- Hero Section --- */}
      <section className="hero-section h-screen relative flex justify-center items-center text-center overflow-hidden">
        <div className="hero-bg absolute inset-0 bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-600"></div>
        <div className="absolute inset-0 bg-black/20"></div>
        
        {/* Floating Elements */}
        <div className="floating-ingredient absolute top-20 left-10 text-6xl">🍓</div>
        <div className="floating-ingredient absolute top-32 right-20 text-5xl">🍫</div>
        <div className="floating-ingredient absolute bottom-40 left-20 text-4xl">🥜</div>
        <div className="floating-ingredient absolute bottom-32 right-16 text-6xl">🍒</div>
        
        <div className="hero-content z-10 max-w-4xl px-6">
          <h1 className="text-7xl md:text-9xl font-black text-white mb-6 tracking-tight">
              {"GELATO BLISS".split("").map((char, i) => (
                <span key={i} className="anim-hero-char inline-block drop-shadow-2xl">
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
          </h1>
          <p className="hero-subtitle text-2xl md:text-3xl text-white/90 font-light max-w-2xl mx-auto leading-relaxed">
            Artisan crafted flavors that transport you to pure happiness
          </p>
        </div>
      </section>

      {/* --- Stats Section --- */}
      <section className="stats-section py-16 bg-white/70 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="stat-item">
              <div className="text-4xl font-black text-pink-600 mb-2">50+</div>
              <div className="text-gray-600 font-medium">Unique Flavors</div>
            </div>
            <div className="stat-item">
              <div className="text-4xl font-black text-purple-600 mb-2">1M+</div>
              <div className="text-gray-600 font-medium">Happy Customers</div>
            </div>
            <div className="stat-item">
              <div className="text-4xl font-black text-indigo-600 mb-2">25</div>
              <div className="text-gray-600 font-medium">Locations</div>
            </div>
            <div className="stat-item">
              <div className="text-4xl font-black text-yellow-600 mb-2">100%</div>
              <div className="text-gray-600 font-medium">Natural</div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Flavors Section --- */}
      <section className="flavors-section py-20 relative">
        <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-black mb-4 bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Signature Collection
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Each scoop tells a story of passion, creativity, and the finest ingredients
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
                {iceCreamProducts.map(product => (
                    <div key={product.id} className="flavor-scoop group">
                        <div className="relative bg-white rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                          {/* Image Container */}
                          <div className="relative w-full aspect-square mb-6 rounded-2xl overflow-hidden">
                            <div className="absolute inset-0 z-10 rounded-2xl bg-gradient-to-t from-black/20 to-transparent"></div>
                            <img 
                              src={product.image} 
                              alt={product.name} 
                              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" 
                            />
                            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                              <span className="text-sm font-bold text-gray-800">₹{product.price}</span>
                            </div>
                          </div>
                          
                          {/* Content */}
                          <div className="text-center">
                            <h3 className="text-xl font-bold mb-3 text-gray-800 group-hover:text-pink-600 transition-colors">
                              {product.name}
                            </h3>
                            <p className="text-gray-600 text-sm leading-relaxed mb-6 h-12">
                              {product.description}
                            </p>
                            
                            <button 
                              onClick={(e) => handleAddToCart(product, e)} 
                              className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform active:scale-95"
                            >
                              Add to Cart
                            </button>
                          </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </section>
      
      {/* --- Ingredients Showcase --- */}
      <section className="py-16 bg-gradient-to-r from-yellow-100 via-pink-100 to-purple-100">
        <div className="container mx-auto px-6 text-center">
            <h3 className="text-3xl font-bold mb-8 text-gray-800">Premium Ingredients</h3>
            <div className="flex flex-wrap justify-center items-center gap-8 text-4xl md:text-6xl">
                <span className="hover:scale-110 transition-transform cursor-pointer">🥛</span>
                <span className="hover:scale-110 transition-transform cursor-pointer">🍓</span>
                <span className="hover:scale-110 transition-transform cursor-pointer">🍫</span>
                <span className="hover:scale-110 transition-transform cursor-pointer">🥜</span>
                <span className="hover:scale-110 transition-transform cursor-pointer">🍒</span>
                <span className="hover:scale-110 transition-transform cursor-pointer">🥥</span>
                <span className="hover:scale-110 transition-transform cursor-pointer">🍑</span>
                <span className="hover:scale-110 transition-transform cursor-pointer">🫐</span>
            </div>
        </div>
      </section>

      {/* --- Our Promise Section --- */}
      <section className="promise-section py-20 bg-white">
        <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-black mb-4 text-gray-800">The Gelato Bliss Promise</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Every scoop is a commitment to excellence, quality, and pure indulgence
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                <div className="promise-card text-center group">
                    <div className="bg-gradient-to-br from-pink-100 to-purple-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                      <span className="text-3xl">🥛</span>
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-gray-800">Farm Fresh Cream</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Sourced directly from local organic farms, our cream is churned within 24 hours for unmatched freshness and richness.
                    </p>
                </div>
                
                <div className="promise-card text-center group">
                    <div className="bg-gradient-to-br from-yellow-100 to-orange-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                      <span className="text-3xl">🌱</span>
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-gray-800">100% Natural</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Zero artificial flavors, colors, or preservatives. Only pure, natural ingredients make it into our gelato.
                    </p>
                </div>
                
                <div className="promise-card text-center group">
                    <div className="bg-gradient-to-br from-green-100 to-teal-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                      <span className="text-3xl">👨‍🍳</span>
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-gray-800">Artisan Crafted</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Each batch is lovingly crafted by our master gelato makers using traditional Italian techniques.
                    </p>
                </div>
            </div>
        </div>
      </section>

      {/* --- Call to Action --- */}
      <section className="py-20 bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
            Ready for Bliss?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Visit our store today or order online for the ultimate gelato experience
          </p>
          <button className="bg-white text-purple-600 font-bold py-4 px-8 rounded-2xl text-lg hover:bg-gray-100 transition-colors transform hover:scale-105">
            Find Locations
          </button>
        </div>
      </section>
    </div>
  );
};

export default IceCreamPage;