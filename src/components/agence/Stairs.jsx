import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useLocation } from 'react-router-dom';

const Stairs = (props) => {
  const transitionRef = useRef(null);
  const pageRef = useRef(null);
  const location = useLocation();

  useGSAP(() => {
    const tl = gsap.timeline();

    // --- Transition OUT (Cover the old page) ---
    // 1. Set the initial state: overlay is visible, panels are off-screen
    tl.set(transitionRef.current, { display: 'block' });
    tl.fromTo('.transition-panel', 
      { yPercent: 100 }, // Start below the screen
      { 
        yPercent: 0, 
        duration: 0.3, 
        stagger: 0.1, 
        ease: 'power2.inOut' 
      }
    );

    // --- Transition IN (Reveal the new page) ---
    // 2. Animate the panels sliding away to the top
    tl.to('.transition-panel', {
      yPercent: -100,
      duration: 0.3,
      stagger: 0.1,
      ease: 'power2.inOut'
    }, '+=0.3'); // A brief pause before revealing

    // 3. Hide the overlay completely after the animation
    tl.set(transitionRef.current, { display: 'none' });

    // --- Animate the new page content into view ---
    // This starts as the panels begin to reveal the new page
    gsap.from(pageRef.current, {
      opacity: 0,
      duration: 0.3,
      delay: 0.8, // Delay to match the transition timing
      ease: 'power1.inOut',
    });

  }, [location.pathname]); // The animation re-runs on every route change

  return (
    <div className="page-wrapper">
      {/* The transition overlay is fixed and will not affect page layout */}
      <div
        ref={transitionRef}
        className="h-screen w-full fixed z-50 top-0 left-0 pointer-events-none hidden"
      >
        <div className='h-full w-full flex'>
          {/* These divs create a "venetian blind" or "stair" effect */}
          <div className='transition-panel h-full w-1/5 bg-amber-200'></div>
          <div className='transition-panel h-full w-1/5 bg-amber-300'></div>
          <div className='transition-panel h-full w-1/5 bg-amber-400'></div>
          <div className='transition-panel h-full w-1/5 bg-amber-500'></div>
          <div className='transition-panel h-full w-1/5 bg-amber-600'></div>
        </div>
      </div>

      {/* The page content. The 'key' is essential for re-triggering animations on route change. */}
      <div ref={pageRef} key={location.pathname}>
        {props.children}
      </div>
    </div>
  );
};

export default Stairs;