import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import Video from './Video'
import Navbar from './Navbar'
import Cart from './Cart';

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
      <Cart />
      

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