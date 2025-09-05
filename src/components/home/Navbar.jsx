import React, { useState, useRef, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Link } from 'react-router-dom';

// A single link item component for clean animation
const MenuLink = ({ children }) => (
  <li className="font-[font2] text-5xl md:text-6xl text-amber-900 overflow-hidden py-2">
    <div className="menu-link-inner transform transition-transform duration-300 hover:scale-110 hover:text-rose-500 cursor-pointer">
      {children}
    </div>
  </li>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const container = useRef(null);
  const timeline = useRef(null);

  // Refs for the hamburger icon lines
  const lineOne = useRef(null);
  const lineTwo = useRef(null);
  const lineThree = useRef(null);

  // This hook sets up the animation timeline once
  useGSAP(() => {
    // Create a GSAP timeline, initially paused
    timeline.current = gsap.timeline({ paused: true });

    timeline.current
      // 1. Animate the menu panel sliding in from the left
      .to(".menu-panel", {
        x: "0%",
        duration: 0.6,
        ease: "power3.inOut",
      })
      // 2. Animate the menu links sliding up and fading in, one by one (stagger)
      .fromTo(".menu-link-inner", {
        y: "100%", // Start below the visible area
        opacity: 0
      }, {
        y: "0%",
        opacity: 1,
        duration: 0.5,
        stagger: 0.1, // Animate each link 0.1s after the previous one
        ease: "power2.out",
      }, "-=0.3") // Overlap with the panel animation for a smoother feel
      // 3. Animate the hamburger icon morphing into an "X" at the same time
      .to(lineOne.current, { y: 8, rotate: 45, duration: 0.3 }, "<")
      .to(lineTwo.current, { opacity: 0, duration: 0.3 }, "<")
      .to(lineThree.current, { y: -8, rotate: -45, duration: 0.3 }, "<");

  }, { scope: container });

  // This effect plays or reverses the animation when `isOpen` state changes
  useEffect(() => {
    if (isOpen) {
      timeline.current.play();
    } else {
      timeline.current.reverse();
    }
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div ref={container}>
      {/* Navigation Menu Panel */}
      <div className="menu-panel fixed top-0 left-0 h-full w-full bg-amber-100/95 backdrop-blur-sm -translate-x-full z-40 flex items-center justify-center">
        <ul className="text-center space-y-4">
          {/* Added the Home link here */}
          <Link to="/" onClick={toggleMenu}>
            <MenuLink>Home</MenuLink>
          </Link>
          <Link to="/order" onClick={toggleMenu}>
            <MenuLink>Our Bakes</MenuLink>
          </Link>
          <Link to="/custom" onClick={toggleMenu}>
            <MenuLink>Custom Orders</MenuLink>
          </Link>
          <Link to="/gift" onClick={toggleMenu}>
            <MenuLink>Gifting & Events</MenuLink>
          </Link>
          <Link to="/about" onClick={toggleMenu}>
            <MenuLink>About Us</MenuLink>
          </Link>
          <Link to="/contact" onClick={toggleMenu}>
            <MenuLink>Contact</MenuLink>
          </Link>
        </ul>
      </div>

      {/* Navigation Button */}
      <nav className="absolute top-4 left-4 z-50">
        <button
          onClick={toggleMenu}
          className="bg-amber-50 p-3 rounded-full shadow-lg w-16 h-16 flex flex-col justify-center items-center space-y-1.5"
        >
          {/* We use simple divs for the lines to easily animate them */}
          <div ref={lineOne} className="w-8 h-0.5 bg-amber-800 rounded-full"></div>
          <div ref={lineTwo} className="w-8 h-0.5 bg-amber-800 rounded-full"></div>
          <div ref={lineThree} className="w-8 h-0.5 bg-amber-800 rounded-full"></div>
        </button>
      </nav>
    </div>
  );
};

export default Navbar;

