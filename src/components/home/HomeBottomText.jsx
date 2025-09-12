import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Custom SVG Icon Components
const FlourishIcon = () => (
  <svg className="w-12 h-12 text-amber-300/50" viewBox="0 0 100 100" fill="currentColor">
    <path d="M50,0 C60,20 80,30 100,50 C80,60 60,80 50,100 C40,80 20,60 0,50 C20,30 40,20 50,0 Z" />
  </svg>
);

const CroissantIcon = () => (
    <svg className="w-16 h-16 text-rose-200/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
        <path d="M12.032,8.018c-1.33-1.322-3.481-1.322-4.811,0c-1.33,1.322-1.33,3.456,0,4.778c0.665,0.661,1.538,0.991,2.405,0.991 c0.867,0,1.74-0.33,2.405-0.991C13.362,11.474,13.362,9.34,12.032,8.018z M10.827,11.586c-0.296,0.293-0.686,0.44-1.076,0.44s-0.779-0.146-1.075-0.44c-0.592-0.588-0.592-1.538,0-2.125c0.592-0.588,1.558-0.588,2.15,0 C11.419,10.048,11.419,10.998,10.827,11.586z"/>
        <path d="M21.732,7.588c-1.76-1.746-4.223-2.436-6.6-2.019c-1.281,0.226-2.51,0.739-3.626,1.545 c-1.134,0.82-2.164,1.82-3.14,2.909c-2.316,2.585-3.428,5.83-3.327,9.07c0.047,1.512,0.473,2.983,1.258,4.291 c0.016,0.026,0.034,0.05,0.051,0.074c0.179,0.246,0.469,0.38,0.758,0.38c0.126,0,0.252-0.024,0.373-0.075 c0.372-0.155,0.586-0.537,0.498-0.921c-0.019-0.083-0.038-0.166-0.056-0.25c-0.7-3.171,0.493-6.394,2.998-9.123 c0.91-0.997,1.865-1.92,2.92-2.684c1.136-0.825,2.449-1.365,3.811-1.602c2.165-0.379,4.354,0.209,5.922,1.764 c1.56,1.546,2.268,3.71,1.969,5.836c-0.488,3.48-3.528,6.17-7.05,6.17c-0.414,0-0.75,0.336-0.75,0.75s0.336,0.75,0.75,0.75 c4.35,0,7.994-3.203,8.536-7.469C24.283,11.968,23.491,9.334,21.732,7.588z"/>
    </svg>
);

const HomeBottomText = () => {
  const container = useRef(null);

  useGSAP(() => {
    // --- HERO ANIMATIONS ---
    gsap.from('.hero-title', { y: 100, opacity: 0, duration: 1.2, ease: 'power4.out' });
    gsap.from('.hero-subtitle', { y: 50, opacity: 0, duration: 1, delay: 0.4, ease: 'power4.out' });
    gsap.from('.hero-cta', { scale: 0.8, opacity: 0, duration: 1, delay: 0.8, ease: 'back.out(1.7)' });

    // --- FLOATING BACKGROUND ITEMS ANIMATION ---
    gsap.utils.toArray('.floating-item').forEach(item => {
      gsap.to(item, {
        y: "random(-20, 20)",
        x: "random(-15, 15)",
        rotation: "random(-10, 10)",
        duration: "random(3, 6)",
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    });
    
    // --- SCROLL-TRIGGERED SECTION ANIMATION ---
    gsap.from('.scroll-animate', {
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.scroll-animate',
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      }
    );
    
    // --- SCROLL-TRIGGERED CARD ANIMATION ---
    gsap.from('.product-card', {
      opacity: 0,
      y: 50,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: ".product-grid",
        start: "top 80%",
        toggleActions: 'play none none reverse'
      }
    });

    // --- FOOTER ANIMATIONS ---
    const footerElements = gsap.utils.toArray('.footer-cta, .footer-col');
    gsap.from(footerElements, {
        opacity: 0,
        y: 50,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: ".footer-cta",
            start: "top 90%",
            toggleActions: 'play none none reverse'
        }
    });

  }, { scope: container });

  const products = [
    {
      title: "Artisan Breads",
      description: "Freshly baked daily using traditional methods and organic, locally-sourced ingredients.",
      image: "https://images.unsplash.com/photo-1534620808146-d33bb39128b2?auto=format&fit=crop&q=80",
      bgColor: "bg-amber-50",
      btnColor: "bg-amber-100 hover:bg-amber-200 text-amber-900",
    },
    {
      title: "Decadent Pastries",
      description: "Buttery, flaky pastries filled with seasonal fruits and premium creams.",
      image: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&q=80",
      bgColor: "bg-rose-50",
      btnColor: "bg-rose-100 hover:bg-rose-200 text-rose-900",
    },
    {
      title: "Custom Cakes",
      description: "Bespoke celebration cakes designed to your specifications, tasting as good as they look.",
      image: "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&q=80",
      bgColor: "bg-yellow-50",
      btnColor: "bg-yellow-200 hover:bg-yellow-300 text-yellow-900",
    },
  ];

  return (
    <div ref={container} className="relative w-full overflow-x-hidden bg-stone-50 font-sans text-stone-800">
      
      {/* Background decoration */}
      <div className="fixed inset-0 z-0 opacity-50">
          <div className="absolute top-1/4 left-1/4 floating-item"><CroissantIcon /></div>
          <div className="absolute bottom-1/4 right-1/4 floating-item"><CroissantIcon /></div>
          <div className="absolute top-1/2 right-1/3 floating-item"><FlourishIcon /></div>
          <div className="absolute bottom-1/3 left-1/3 floating-item"><FlourishIcon /></div>
      </div>

      {/* Main content wrapper */}
      <div className="relative z-10">
        
        {/* --- HERO SECTION --- */}
        <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-100 via-rose-50 to-amber-50 z-[-1]"></div>
          <div className="container mx-auto text-center">
            <h1 className="hero-title font-serif text-6xl md:text-8xl font-bold text-amber-900 mb-6">
              Hems Bakery
            </h1>
            <p className="hero-subtitle text-xl md:text-2xl text-amber-800 max-w-2xl mx-auto mb-10">
  Baked fresh daily, with a pinch of love.
</p>
            <div className="hero-cta">
              <a href="#products">
                <button className="glowing-btn bg-rose-600 text-white font-bold py-4 px-10 rounded-full shadow-lg hover:shadow-rose-300 transition-all duration-300">
                  Explore Our Menu
                </button>
              </a>
            </div>
          </div>
        </section>

        {/* --- FEATURED PRODUCTS SECTION --- */}
        <section id="products" className="py-24 px-4 bg-white">
          <div className="container mx-auto">
            <div className="text-center mb-16 scroll-animate">
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-amber-900 mb-4">Our Signature Bakes</h2>
              <p className="text-lg text-stone-600 max-w-2xl mx-auto">Handcrafted with love, baked to perfection just for you.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 product-grid">
              {products.map((product, index) => (
                <div key={index} className="product-card bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group border border-stone-100">
                  <div className="overflow-hidden">
                    <img src={product.image} alt={product.title} className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className={`p-6 text-center ${product.bgColor}`}>
                    <h3 className="font-serif text-2xl font-bold text-amber-900 mb-2">{product.title}</h3>
                    <p className="text-stone-600 mb-4 h-16">{product.description}</p>
                    <button className={`w-full font-bold py-3 rounded-lg transition-colors duration-300 ${product.btnColor}`}>Learn More</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- NEW REDESIGNED FOOTER SECTION --- */}
        <footer className="relative py-20 px-4 bg-stone-800 text-stone-300 overflow-hidden">
          <div className="container mx-auto z-10 relative">
            
            <div className="text-center mb-16 footer-cta">
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-6">Have a Special Occasion?</h2>
              <p className="text-xl text-stone-300 max-w-3xl mx-auto mb-10">
                Let us make it sweeter. Contact us for custom cakes, catering, and special event orders.
              </p>
              <a href="#">
                <button className="glowing-btn bg-rose-600 text-white font-bold py-4 px-10 rounded-full shadow-lg hover:shadow-rose-300 transition-all duration-300">
                  Plan Your Event
                </button>
              </a>
            </div>

            <div className="border-t border-stone-700 my-12"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-center md:text-left">
              
              <div className="footer-col">
                <h3 className="font-serif text-2xl font-bold text-white mb-4">Hems Bakery</h3>
                <p className="text-stone-400">
                  Founded in 2010, we're a family-owned bakery dedicated to creating delicious, healthy baked goods that bring people together.
                </p>
              </div>

              <div className="footer-col">
                <h3 className="font-serif text-xl font-bold text-white mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="hover:text-amber-300 transition-colors">Home</a></li>
                  <li><a href="#products" className="hover:text-amber-300 transition-colors">Our Bakes</a></li>
                  <li><a href="#" className="hover:text-amber-300 transition-colors">Our Story</a></li>
                  <li><a href="#" className="hover:text-amber-300 transition-colors">Contact</a></li>
                </ul>
              </div>

              <div className="footer-col">
                <h3 className="font-serif text-xl font-bold text-white mb-4">Visit Us</h3>
                <p className="text-stone-400">123 Bakery Lane,<br/>North Dumdum, West Bengal<br/>Mon - Sat: 7 AM - 6 PM</p>
              </div>

              <div className="footer-col">
                <h3 className="font-serif text-xl font-bold text-white mb-4">Follow Us</h3>
                <div className="flex justify-center md:justify-start space-x-4">
                  <a href="#" className="p-2 bg-stone-700 rounded-full hover:bg-rose-600 transition-colors" aria-label="Facebook">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
                  </a>
                  <a href="#" className="p-2 bg-stone-700 rounded-full hover:bg-rose-600 transition-colors" aria-label="Instagram">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.584-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011-3.584.069-4.85c.149-3.225 1.664-4.771 4.919-4.919 1.266-.058 1.644-.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.358-.2 6.78-2.618 6.98-6.98.059-1.281.073-1.689.073-4.948s-.014-3.667-.072-4.947c-.2-4.358-2.618-6.78-6.98-6.98-1.281-.059-1.689-.073-4.948-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44 1.441-.645 1.441-1.44-.645-1.44-1.441-1.44z"/></svg>
                  </a>
                </div>
              </div>

            </div>

            <div className="border-t border-stone-700 mt-12 pt-8 text-center text-stone-500">
              <p>&copy; {new Date().getFullYear()} Hems Bakery. All Rights Reserved.</p>
            </div>
          </div>
        </footer>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Inter:wght@400;700&display=swap');
        
        body {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        .font-serif {
          font-family: 'Playfair Display', serif;
        }
        .font-sans {
          font-family: 'Inter', sans-serif;
        }

        .glowing-btn {
          position: relative;
          overflow: hidden;
          z-index: 1;
        }
        
        .glowing-btn:hover {
          transform: translateY(-3px);
        }

        .glowing-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(120deg, transparent, rgba(255, 255, 255, 0.4), transparent);
          transition: left 0.6s ease;
          z-index: -1;
        }
        
        .glowing-btn:hover::before {
          left: 100%;
        }
      `}</style>
    </div>
  );
};

export default HomeBottomText;