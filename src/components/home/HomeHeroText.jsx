import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import Video from './Video'
import Navbar from './Navbar';

const HomeHeroText = () => {
  const [cartItems, setCartItems] = useState(3); // Example cart items count
  const container = useRef(null); // Ref for the main container
  
  // GSAP Animation Hook
  useGSAP(() => {
    // A timeline allows sequencing animations
    const tl = gsap.timeline();

    // 1. Animate Nav Icons
    tl.from(".top-4", {
      y: -50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "power3.out"
    });

    // 2. Animate Hero Text lines
    tl.from(".text-center > div", {
      y: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power4.out"
    }, "-=0.5"); // Overlap with previous animation

    // 3. Animate the "Order Now" button
    tl.from(".bg-amber-500", {
      y: 100,
      scale: 0,
      opacity: 0, // Correct: Starts fully transparent to fade in
      duration: 0.7, // Increased duration for a smoother effect
      ease: "power3.out"
    }, "-=0.5");

    // 4. Animate the bottom links ("Cakes", "Cookies")
    tl.from(".mt-20 > div", {
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: "power3.out"
    }, "-=0.4");

  }, { scope: container }); // Scope the animations to this component

  return (
    // Added the ref to the main container div
    <div ref={container} className='font-[font1] relative min-h-screen flex flex-col justify-center items-center'>
      {/* Cart Icon */}
      <div className="absolute top-4 right-4 z-50">
        <div className="relative">
          <button className="bg-amber-50 p-3 rounded-full shadow-lg hover:bg-amber-100 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-amber-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {cartItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
                {cartItems}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Navigation */}
      <Navbar />

      {/* Hero Text - Centered with adjusted font */}
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
      <div className="mt-8 flex justify-center">
        <button className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-4 px-8 rounded-full shadow-lg">
          Order Now
        </button>
      </div>
      <div className='mt-20 font-[font2] flex item-center justify-center gap-20'>
      <div className='text-[5vw] leading-[4vw] hover:border-pink-200 hover:text-pink-200 border-5 border-white rounded-full px-5 pt-2 pb-0 uppercase'>
      <Link className='mt-6' to='/projects'>Cakes</Link>
      </div>
      <div className='text-[5vw] leading-[4vw] hover:border-pink-200 hover:text-pink-200 border-5 border-white rounded-full px-5 pt-2 pb-0 uppercase'> 
      <Link className='mt-6 ' to='/agence'>Cookies</Link>
      </div>
    </div>
    </div>
    
  )
}

export default HomeHeroText