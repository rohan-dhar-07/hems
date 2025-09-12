import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './Navbar';

// It's best practice to register plugins once, but for a standalone component, this is fine.
gsap.registerPlugin(ScrollTrigger);

// A decorative SVG for the background
const FlourishIcon = () => (
  <svg className="w-24 h-24 text-amber-100/10" viewBox="0 0 100 100" fill="currentColor">
    <path d="M50,0 C60,20 80,30 100,50 C80,60 60,80 50,100 C40,80 20,60 0,50 C20,30 40,20 50,0 Z" />
  </svg>
);

const HomeHeroText = () => {
  const container = useRef(null);
  
  useGSAP(() => {
    // --- INITIAL ENTRANCE ANIMATION ---
    const tl = gsap.timeline();
    tl.from(".anim-letter", {
      yPercent: 100, opacity: 0, rotationZ: 25, duration: 1, ease: "power3.out", stagger: 0.1
    })
    .from(".anim-tagline", {
      y: 30, opacity: 0, duration: 0.8, ease: "power2.out"
    }, "-=0.7")
    .from(".anim-order-button", {
      scale: 0.5, opacity: 0, duration: 0.7, ease: "back.out(1.7)"
    }, "-=0.5")
    .from(".anim-bottom-text", {
      y: 50, opacity: 0, duration: 0.8, ease: "power3.out"
    }, "-=0.4")
    .from(".scroll-indicator", {
      opacity: 0, y: 20, duration: 1, ease: "power2.out"
    }, "-=0.5");

    // --- NEW: MOUSE PARALLAX EFFECT ---
    const parallaxHandler = (e) => {
      // Calculate mouse position from -1 to 1
      const xPercent = (e.clientX / window.innerWidth - 0.5) * 2;
      const yPercent = (e.clientY / window.innerHeight - 0.5) * 2;

      // Animate elements based on mouse position
      gsap.to(".parallax-layer", {
        x: (i) => (i + 1) * 10 * xPercent, // Different layers move by different amounts
        y: (i) => (i + 1) * 10 * yPercent,
        duration: 0.8,
        ease: "power2.out"
      });
    };
    window.addEventListener('mousemove', parallaxHandler);

    // --- NEW: CONTINUOUS ANIMATIONS ---
    // Floating for decorative items
    gsap.to(".floating-item", {
        y: "random(-20, 20)", rotation: "random(-15, 15)", duration: 5, repeat: -1, yoyo: true, ease: 'sine.inOut'
    });
    // Bouncing for scroll indicator
    gsap.to(".scroll-indicator", {
        y: -10, repeat: -1, yoyo: true, duration: 1.5, ease: "sine.inOut"
    });

    // --- NEW: SCROLL-OUT ANIMATION ---
    gsap.to(".hero-content", {
      opacity: 0,
      scale: 0.9,
      y: -100,
      scrollTrigger: {
        trigger: container.current,
        start: "top top",
        end: "bottom center",
        scrub: true, // Animation progress is tied to scroll position
      }
    });
    
    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener('mousemove', parallaxHandler);
    };

  }, { scope: container });

  return (
    <div ref={container} className='font-["font1"] relative min-h-screen w-full flex flex-col justify-center items-center text-amber-50 overflow-hidden' style={{ textShadow: '2px 2px 8px rgba(0, 0, 0, 0.5)' }}>
      
      {/* Your Navbar can float on top */}
      <div className="absolute top-0 left-0 w-full z-20">
        <Navbar />
      </div>

      {/* NEW: Decorative background items for parallax */}
      <div className="absolute inset-0 z-0">
        <div className="parallax-layer floating-item absolute top-[20%] left-[15%]"><FlourishIcon/></div>
        <div className="parallax-layer floating-item absolute bottom-[15%] right-[20%] opacity-50"><FlourishIcon/></div>
      </div>
      
      {/* The main content that will animate on scroll */}
      <div className="hero-content relative z-10 flex flex-col items-center justify-center w-full">
        {/* Hero Text */}
        <div className="text-center parallax-layer">
          <h1 className="text-[18vw] md:text-[15vw] font-bold tracking-tighter uppercase leading-none overflow-hidden py-4 md:py-8">
            <span className="inline-block anim-letter">H</span>
            <span className="inline-block anim-letter">E</span>
            <span className="inline-block anim-letter">M</span>
            <span className="inline-block anim-letter">S</span>
          </h1>
          <p className="anim-tagline text-2xl md:text-3xl font-['font2'] -mt-6 md:-mt-8 tracking-wide">
            Humble Eats, Majestic Servings
          </p>
        </div>
        
        {/* Call to Action Button */}
        <div className="anim-order-button mt-12 flex justify-center parallax-layer">
          <Link to="/order">
            <button className="bg-rose-500 hover:bg-rose-600 text-white font-bold py-4 px-10 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-rose-300">
              Shop Now
            </button>
          </Link>
        </div>

        {/* About Company Section */}
        <div className='anim-bottom-text mt-16 font-["font2"] text-center parallax-layer'>
          <p className="text-lg md:text-xl tracking-wider px-4">
            Baked daily with the finest ingredients and a touch of love.
          </p>
        </div>
      </div>

      {/* NEW: Animated scroll down indicator */}
      <div className="scroll-indicator absolute bottom-8 z-10">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
      </div>
    </div>
  );
};

export default HomeHeroText;