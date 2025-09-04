import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

import Video from './Video';
import Navbar from './Navbar';
import Cart from './Cart';

const HomeHeroText = () => {
  const container = useRef(null);
  
  // GSAP animation for a dramatic entrance
  useGSAP(() => {
    const tl = gsap.timeline();

    // 1. Animate each letter of "HEMS" with a staggered roll-in effect
    tl.from(".anim-letter", {
      yPercent: 100,
      opacity: 0,
      rotationZ: 25,
      duration: 1,
      ease: "power3.out",
      stagger: 0.1
    })
    // 2. Fade in the tagline after the main title
    .from(".anim-tagline", {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.7")
    // 3. Animate the order button with a satisfying pop
    .from(".anim-order-button", {
      scale: 0.5,
      opacity: 0,
      duration: 0.7,
      ease: "back.out(1.7)"
    }, "-=0.5")
    // 4. Stagger in the bottom text
    .from(".anim-bottom-text", {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out"
    }, "-=0.4");

  }, { scope: container });

  return (
    // The main container is transparent, allowing the background video to show through
    <div ref={container} className='font-["font1"] relative flex-grow flex flex-col justify-center items-center text-amber-50' style={{ textShadow: '2px 2px 8px rgba(0, 0, 0, 0.5)' }}>
      
      <Navbar />
      <Cart />

      {/* Hero Text */}
      <div className="text-center">
        {/* Main Title: HEMS */}
        <h1 className="text-[18vw] md:text-[15vw] font-bold tracking-tighter uppercase leading-none overflow-hidden py-2">
          {/* Each letter is wrapped in a span for individual animation */}
          <span className="inline-block anim-letter">H</span>
          <span className="inline-block anim-letter">E</span>
          <span className="inline-block anim-letter">M</span>
          <span className="inline-block anim-letter">S</span>
        </h1>
        {/* Tagline */}
        <p className="anim-tagline text-2xl md:text-3xl font-['font2'] -mt-4 md:-mt-6 tracking-wide">
          Humble Eats, Majestic Servings
        </p>
      </div>
      
      {/* Call to Action Button */}
      <div className="anim-order-button mt-12 flex justify-center">
        <Link to="/order">
          <button className="bg-rose-500 hover:bg-rose-600 text-white font-bold py-4 px-10 rounded-full shadow-lg transition-transform transform hover:scale-105">
            Shop Now
          </button>
        </Link>
      </div>

      {/* About Company Section */}
      <div className='anim-bottom-text mt-16 font-["font2"] text-center'>
        <p className="text-lg md:text-xl tracking-wider px-4">
          Baked daily with the finest ingredients and a touch of love.
        </p>
      </div>
    </div>
  );
};

export default HomeHeroText;