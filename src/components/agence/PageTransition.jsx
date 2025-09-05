import React, { useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const PageTransition = () => {
  const overlay = useRef(null);
  const location = useLocation();
  const prevLocation = useRef(location);

  // This hook uses GSAP to animate the overlay
  useGSAP(() => {
    // Check if the location has actually changed
    if (location.pathname !== prevLocation.current.pathname) {
      // Create a timeline for the in-and-out animation
      const tl = gsap.timeline();
      
      // Animate the overlay IN (e.g., sliding down from the top)
      tl.set(overlay.current, { yPercent: -100, autoAlpha: 1 })
        .to(overlay.current, {
          yPercent: 0,
          duration: 0.5,
          ease: 'power2.inOut',
        })
        // Animate the overlay OUT (e.g., sliding down to the bottom)
        .to(overlay.current, {
          yPercent: 100,
          duration: 0.5,
          ease: 'power2.inOut',
          delay: 0.2, // A brief pause on the new page
        });
    }
    // Update the previous location ref for the next navigation
    prevLocation.current = location;
  }, [location]); // This animation runs every time the location changes

  return (
    <div
      ref={overlay}
      className="fixed top-0 left-0 w-full h-screen bg-amber-100 z-[100] pointer-events-none invisible"
    >
      {/* You can add a logo or loading animation here if you like */}
    </div>
  );
};

export default PageTransition;

