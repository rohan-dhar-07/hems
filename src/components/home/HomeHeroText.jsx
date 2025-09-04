import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

import Video from './Video';
import Navbar from './Navbar';
import Cart from './Cart';

const HomeHeroText = () => {
  const container = useRef(null);
  
  // GSAP Animation Hook for the entrance animation
  useGSAP(() => {
    const tl = gsap.timeline();
    tl.from(".anim-hero-text", { y: 100, opacity: 0, duration: 1, stagger: 0.2, ease: "power4.out" })
      .from(".anim-order-button", { scale: 0.5, opacity: 0, duration: 0.7, ease: "back.out(1.7)" }, "-=0.5")
      .from(".anim-bottom-links > div", { y: 50, opacity: 0, duration: 0.8, stagger: 0.15, ease: "power3.out" }, "-=0.4");
  }, { scope: container });

  return (
    <div ref={container} className='font-["font1"] relative flex-grow flex flex-col justify-center items-center'>
      
      <Navbar />
      <Cart />

      {/* Hero Text */}
      <div className="text-center">
        <div className='flex items-baseline text-[9.5vw] uppercase leading-[10vw] font-bold'>Humble Eats </div> 
        <div className='flex items-baseline text-[9.5vw] uppercase leading-[8vw] font-bold justify-center'>
           Majesti
          <div className='h-[7vw] w-[10vw] rounded-3xl overflow-hidden mx-2'>
            <Video />
          </div>
        </div>
        <div className='text-[9.5vw] uppercase leading-[8vw] font-bold'>Servings</div>
      </div>
      
      {/* Call to Action Button */}
      <div className="anim-order-button mt-8 flex justify-center">
        <Link to="/order">
          <button className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-4 px-8 rounded-full shadow-lg">
            Order Now
          </button>
        </Link>
      </div>

      {/* Bottom Links */}
      <div className='anim-bottom-links mt-20 font-["font2"] flex item-center justify-center gap-20'>
        <div className='text-[5vw] leading-[4vw] text-amber-800 hover:text-rose-400 transition-colors px-5 pt-2 pb-0 uppercase'>
          <Link to='/agence'>Cookies</Link>
        </div>
        <div className='text-[5vw] leading-[4vw] text-amber-800 hover:text-rose-400 transition-colors px-5 pt-2 pb-0 uppercase'> 
          <Link to='/projects'>Cakes</Link>
        </div>
      </div>
    </div>
  );
};

export default HomeHeroText;

