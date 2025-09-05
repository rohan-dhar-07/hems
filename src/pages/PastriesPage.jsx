import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Cart from '../components/home/Cart';
import Navbar from '../components/home/Navbar';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const PastriesPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [flyingItem, setFlyingItem] = useState(null);
  const container = useRef(null);
  const cartRef = useRef(null);

  const pastryProducts = [
    { id: 7, name: "Classic Croissant", price: 199.00, description: "Experience the art of lamination with 81 delicate, buttery layers.", image: "https://images.unsplash.com/photo-1555507036-ab794f24d8c7?q=80&w=2070" },
    { id: 8, name: "Pain au Chocolat", price: 249.00, description: "Our classic croissant embracing two batons of rich, dark chocolate.", image: "https://images.unsplash.com/photo-1621939512532-6a87752d5a02?q=80&w=1964" },
    { id: 9, name: "Almond Croissant", price: 299.00, description: "Filled with a sweet almond frangipane and topped with toasted almonds.", image: "https://images.unsplash.com/photo-1591949111400-1533b6a68257?q=80&w=1974" },
    { id: 10, name: "Cinnamon Roll", price: 279.00, description: "A soft, gooey roll with a swirl of cinnamon and a decadent cream cheese glaze.", image: "https://images.unsplash.com/photo-1552318997-740809313fe9?q=80&w=1974" },
  ];

  const handleAddToCart = (product, e) => {
    gsap.to(e.currentTarget, { scale: 1.1, yoyo: true, repeat: 1, duration: 0.15, ease: 'power1.inOut' });
    setCartItems(prev => {
      const exist = prev.find(item => item.id === product.id);
      if (exist) return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      return [...prev, { ...product, quantity: 1 }];
    });
    const img = e.currentTarget.closest('.pastry-showcase').querySelector('img');
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
    // --- Interactive Background Gradient ---
    const xTo = gsap.quickTo(".background-gradient", "x", { duration: 0.8, ease: "power3" });
    const yTo = gsap.quickTo(".background-gradient", "y", { duration: 0.8, ease: "power3" });
    const handleMouseMove = (e) => {
        xTo(e.clientX);
        yTo(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    
    // --- Hero Animation ---
    const heroTl = gsap.timeline({delay: 0.5});
    heroTl
      .from('.hero-title .char', { y: 120, opacity: 0, stagger: 0.05, duration: 1.2, ease: 'expo.out' })
      .from('.hero-subtitle .char', { opacity: 0, stagger: 0.03, duration: 1, ease: 'power2.inOut' }, "-=1");

    // --- Pastry Showcase Pin & Animate ---
    gsap.utils.toArray('.pastry-showcase').forEach(section => {
        const image = section.querySelector('img');
        const texts = section.querySelectorAll('.anim-text');

        const sectionTl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: 'top top',
                pin: true,
                pinSpacing: false,
                end: '+=100%',
                scrub: 1,
            }
        });
        sectionTl
            .from(image, { scale: 0.8, opacity: 0, ease: 'power2.out' })
            .from(texts, { y: 50, opacity: 0, stagger: 0.1, ease: 'power2.out' }, '<0.2')
            .to([image, ...texts], { opacity: 0, y: -50, ease: 'power2.in' }, '+=1');
    });

    // --- "The Process" Timeline Animation ---
    const processTl = gsap.timeline({ scrollTrigger: { trigger: '.process-section', start: 'top center', end: 'bottom bottom', scrub: 1.5 } });
    processTl.from('.process-line', { scaleY: 0, transformOrigin: 'top center' })
             .from('.process-step', { opacity: 0, y: 50, stagger: 0.5 });
             
    return () => window.removeEventListener("mousemove", handleMouseMove);

  }, { scope: container });

  return (
    <div ref={container} className="bg-stone-900 text-stone-100 font-sans relative overflow-hidden">
      <div className="background-gradient fixed top-0 left-0 w-[150vw] h-[150vh] -translate-x-1/2 -translate-y-1/2 bg-radial-gradient from-rose-900/40 via-stone-900 to-stone-900 -z-10"
           style={{ filter: 'blur(100px)' }}></div>
      
      <Navbar />
      <Cart ref={cartRef} cartItems={cartItems} onIncrease={increaseQuantity} onDecrease={decreaseQuantity} />
      {flyingItem && <img src={flyingItem.src} className="flying-item fixed w-24 h-24 object-cover rounded-full z-[999] pointer-events-none" alt="" />}

      <section className="h-screen flex flex-col justify-center items-center text-center p-8">
        <h1 className="hero-title text-6xl md:text-9xl font-['font1'] font-bold overflow-hidden">
            {"Pastry".split("").map((char, i) => <span key={i} className="char inline-block">{char}</span>)}
        </h1>
        <p className="hero-subtitle text-xl md:text-2xl mt-4 text-stone-400 font-['font2'] max-w-lg">
            {"A delicate dance of flour, butter, and artistry.".split("").map((char, i) => <span key={i} className="char inline-block">{char === " " ? "\u00A0" : char}</span>)}
        </p>
      </section>
      
      {pastryProducts.map(pastry => (
        <section key={pastry.id} className="pastry-showcase h-screen w-screen flex items-center justify-center p-8">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="w-full h-auto [perspective:1000px]">
                    <img src={pastry.image} alt={pastry.name} className="w-full h-full object-cover rounded-2xl drop-shadow-2xl"/>
                </div>
                <div className="text-center md:text-left">
                    <h2 className="text-5xl md:text-6xl font-['font1'] font-bold anim-text">{pastry.name}</h2>
                    <p className="text-xl mt-4 max-w-md text-stone-300 anim-text">{pastry.description}</p>
                    <div className="mt-8">
                        <span className="text-4xl font-bold anim-text">₹{pastry.price.toFixed(2)}</span>
                        <button onClick={(e) => handleAddToCart(pastry, e)} className="ml-6 bg-rose-500 hover:bg-rose-600 text-white font-bold py-4 px-10 rounded-full shadow-lg anim-text">Add to Cart</button>
                    </div>
                </div>
            </div>
        </section>
      ))}

       <section className="process-section bg-black/20 py-16 md:py-32 relative">
        <div className="container mx-auto px-4 text-center max-w-2xl relative">
            <div className="process-line absolute top-0 left-1/2 w-0.5 h-full bg-rose-400/30 -translate-x-1/2"></div>
            <h2 className="text-5xl font-bold font-['font1'] mb-16">The Process</h2>
            <div className="space-y-16">
                <div className="process-step">
                    <h3 className="text-3xl font-bold text-rose-400">Lamination</h3>
                    <p className="text-lg mt-2 text-stone-300">It begins with the patient layering of French butter and dough, folded meticulously to create hundreds of paper-thin layers.</p>
                </div>
                <div className="process-step">
                    <h3 className="text-3xl font-bold text-rose-400">Proofing</h3>
                    <p className="text-lg mt-2 text-stone-300">We allow our pastries to rest and rise slowly, developing the deep, complex flavors that define a truly majestic eat.</p>
                </div>
                <div className="process-step">
                    <h3 className="text-3xl font-bold text-rose-400">The Bake</h3>
                    <p className="text-lg mt-2 text-stone-300">Baked at the perfect temperature until golden and crisp, revealing a tender, airy interior that melts in your mouth.</p>
                </div>
            </div>
        </div>
       </section>

    </div>
  );
};

export default PastriesPage;