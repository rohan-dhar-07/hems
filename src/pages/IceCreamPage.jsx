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
    { id: 19, name: "Himalayan Salted Caramel", price: 299.00, description: "Sweet cream base with ribbons of house-made salted caramel.", image: "https://images.unsplash.com/photo-1580982547524-6316886567b5?q=80&w=1974", color: "#fde68a" },
    { id: 20, name: "Kolkata Meetha Paan", price: 349.00, description: "An adventurous flavor capturing the essence of the classic Indian treat.", image: "https://images.unsplash.com/photo-1567197785232-a74c4a705b93?q=80&w=1974", color: "#a7f3d0" },
    { id: 21, name: "Darjeeling Tea Infusion", price: 329.00, description: "Aromatic Darjeeling tea infused into a delicate, creamy base.", image: "https://images.unsplash.com/photo-1626081048489-3c815e16572e?q=80&w=1974", color: "#f3e8d9" },
    { id: 22, name: "Mango Lassi Sorbet", price: 279.00, description: "A refreshing, dairy-free sorbet bursting with the taste of ripe mangoes.", image: "https://images.unsplash.com/photo-1625862145398-6341f2351b8c?q=80&w=1974", color: "#fecaca" },
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
    // --- Hero "Melting" Animation ---
    const heroTl = gsap.timeline({
        scrollTrigger: {
            trigger: ".hero-section",
            start: "top top",
            end: "bottom top",
            scrub: true,
        }
    });
    heroTl.to('.hero-content', { yPercent: -50, opacity: 0 })
          .to('.melting-svg', { yPercent: -100, ease: 'power1.in' }, 0);

    gsap.from('.anim-hero-char', { y: 100, opacity: 0, stagger: 0.05, duration: 1, ease: 'power3.out', delay: 0.5 });
    
    // --- Flavor Scoops Animation ---
    gsap.from('.flavor-scoop', {
        scrollTrigger: { trigger: '.flavors-section', start: 'top 70%' },
        y: 100, opacity: 0, stagger: 0.15, duration: 1, ease: 'power3.out'
    });

    // --- Toppings Marquee ---
    gsap.to('.toppings-marquee-inner', { xPercent: -50, repeat: -1, duration: 20, ease: 'linear' });
    
    // --- Promise Section Animation ---
    gsap.from('.promise-card', {
        scrollTrigger: { trigger: '.promise-section', start: 'top 70%' },
        y: 100, opacity: 0, stagger: 0.2, duration: 1, ease: 'power3.out'
    });

  }, { scope: container });

  return (
    <div ref={container} className="bg-rose-50 text-stone-800 font-sans">
      <Navbar />
      <Cart ref={cartRef} cartItems={cartItems} onIncrease={increaseQuantity} onDecrease={decreaseQuantity} />
      {flyingItem && <img src={flyingItem.src} className="flying-item fixed w-24 h-24 object-cover rounded-full z-[999] pointer-events-none" alt="" />}

      {/* --- Hero Section --- */}
      <section className="hero-section h-screen relative flex justify-center items-center text-center bg-rose-200 overflow-hidden">
        <div className="hero-content z-10">
          <h1 className="text-6xl md:text-8xl font-['font1'] font-bold text-white" style={{textShadow: '3px 3px 10px rgba(0,0,0,0.3)'}}>
              {"Majestic Scoops".split("").map((char, i) => <span key={i} className="anim-hero-char inline-block">{char === " " ? "\u00A0" : char}</span>)}
          </h1>
        </div>
        <div className="melting-svg absolute bottom-0 left-0 w-full z-20">
            <svg viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg"><path fill="#fef2f2" fillOpacity="1" d="M0,160L48,181.3C96,203,192,245,288,240C384,235,480,181,576,138.7C672,96,768,64,864,85.3C960,107,1056,181,1152,192C1248,203,1344,149,1392,122.7L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>
        </div>
      </section>

      {/* --- Flavors Section --- */}
      <section className="flavors-section bg-rose-50 py-16 md:py-24 relative -mt-1">
        <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-12">Our Artisanal Flavors</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {iceCreamProducts.map(product => (
                    <div key={product.id} className="flavor-scoop group">
                        <div className="relative w-48 h-48 mx-auto rounded-full overflow-hidden shadow-lg transition-transform transform group-hover:scale-110">
                            <div className="absolute inset-0 z-10 rounded-full" style={{background: `linear-gradient(to top, ${product.color}, transparent)`}}></div>
                            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                        </div>
                        <h3 className="text-2xl font-bold mt-6">{product.name}</h3>
                        <p className="mt-2 text-stone-600 h-16">{product.description}</p>
                        <span className="text-3xl font-bold mt-4 block">₹{product.price.toFixed(2)}</span>
                        <button onClick={(e) => handleAddToCart(product, e)} className="mt-4 bg-rose-500 hover:bg-rose-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-opacity opacity-0 group-hover:opacity-100">Add to Cart</button>
                    </div>
                ))}
            </div>
        </div>
      </section>
      
      {/* --- Toppings Marquee Section --- */}
      <section className="toppings-section py-12 bg-white overflow-hidden">
        <div className="toppings-marquee whitespace-nowrap">
            <div className="toppings-marquee-inner inline-block">
                <span className="text-2xl font-bold mx-8">Hot Fudge</span><span className="text-2xl text-rose-400 mx-8">•</span>
                <span className="text-2xl font-bold mx-8">Sprinkles</span><span className="text-2xl text-rose-400 mx-8">•</span>
                <span className="text-2xl font-bold mx-8">Caramel Drizzle</span><span className="text-2xl text-rose-400 mx-8">•</span>
                <span className="text-2xl font-bold mx-8">Whipped Cream</span><span className="text-2xl text-rose-400 mx-8">•</span>
                <span className="text-2xl font-bold mx-8">Chopped Nuts</span><span className="text-2xl text-rose-400 mx-8">•</span>
                <span className="text-2xl font-bold mx-8">Fresh Berries</span><span className="text-2xl text-rose-400 mx-8">•</span>
            </div>
             <div className="toppings-marquee-inner inline-block">
                <span className="text-2xl font-bold mx-8">Hot Fudge</span><span className="text-2xl text-rose-400 mx-8">•</span>
                <span className="text-2xl font-bold mx-8">Sprinkles</span><span className="text-2xl text-rose-400 mx-8">•</span>
                <span className="text-2xl font-bold mx-8">Caramel Drizzle</span><span className="text-2xl text-rose-400 mx-8">•</span>
                <span className="text-2xl font-bold mx-8">Whipped Cream</span><span className="text-2xl text-rose-400 mx-8">•</span>
                <span className="text-2xl font-bold mx-8">Chopped Nuts</span><span className="text-2xl text-rose-400 mx-8">•</span>
                <span className="text-2xl font-bold mx-8">Fresh Berries</span><span className="text-2xl text-rose-400 mx-8">•</span>
            </div>
        </div>
      </section>

      {/* --- Our Promise Section --- */}
      <section className="promise-section bg-rose-50 py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-12">The HEMS Difference</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="promise-card">
                    <h3 className="text-2xl font-bold">Fresh Cream</h3>
                    <p className="mt-2 text-stone-600">Our ice cream is churned daily using the freshest cream from local dairies for a rich, unparalleled taste.</p>
                </div>
                <div className="promise-card">
                    <h3 className="text-2xl font-bold">Real Ingredients</h3>
                    <p className="mt-2 text-stone-600">We use only real fruit, premium chocolate, and natural flavors. No artificial shortcuts, ever.</p>
                </div>
                <div className="promise-card">
                    <h3 className="text-2xl font-bold">Small Batches</h3>
                    <p className="mt-2 text-stone-600">Every flavor is crafted in small batches, ensuring maximum quality, freshness, and attention to detail.</p>
                </div>
            </div>
        </div>
      </section>

    </div>
  );
};

export default IceCreamPage;
