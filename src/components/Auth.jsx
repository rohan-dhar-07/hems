import React, { useState, useRef, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const Auth = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const container = useRef(null);
  const timeline = useRef(null);
  const toggleIndicator = useRef(null);
  const loginForm = useRef(null);
  const signupForm = useRef(null);

  useGSAP(() => {
    // Timeline for opening/closing the main panel
    timeline.current = gsap.timeline({ paused: true });
    timeline.current
      .to(".auth-overlay", { opacity: 1, pointerEvents: 'auto', duration: 0.5, ease: 'power3.inOut' })
      .to(".auth-panel", { x: "0%", duration: 0.6, ease: "power3.inOut" }, "<")
      .fromTo(".auth-content > *", { y: 30, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.1, duration: 0.5, ease: 'power2.out' }, "-=0.3");
  }, { scope: container });

  useEffect(() => {
    if (isOpen) {
      timeline.current.play();
    } else {
      timeline.current.reverse();
    }
  }, [isOpen]);

  // Animation for toggling between login and signup forms
  useEffect(() => {
    gsap.to(toggleIndicator.current, {
      x: isLogin ? '0%' : '100%',
      duration: 0.4,
      ease: 'power3.inOut'
    });
    
    if (isLogin) {
      gsap.fromTo(loginForm.current, { autoAlpha: 0, x: -50 }, { autoAlpha: 1, x: 0, duration: 0.5, ease: 'power2.out' });
      gsap.to(signupForm.current, { autoAlpha: 0, x: 50, duration: 0.5, ease: 'power2.inOut' });
    } else {
      gsap.to(loginForm.current, { autoAlpha: 0, x: -50, duration: 0.5, ease: 'power2.inOut' });
      gsap.fromTo(signupForm.current, { autoAlpha: 0, x: 50 }, { autoAlpha: 1, x: 0, duration: 0.5, ease: 'power2.out' });
    }
  }, [isLogin]);

  const togglePanel = () => setIsOpen(!isOpen);

  return (
    <div ref={container}>
      {/* --- Trigger Button --- */}
      <button 
        onClick={togglePanel}
        className="fixed top-4 right-24 z-[100] bg-amber-50 text-amber-900 font-['font2'] font-bold py-3 px-6 rounded-full shadow-lg hover:bg-amber-100 transition-colors"
      >
        Account
      </button>

      {/* --- Overlay & Panel --- */}
      <div onClick={togglePanel} className="auth-overlay fixed inset-0 bg-black/40 opacity-0 pointer-events-none z-[99]"></div>
      <div className="auth-panel fixed top-0 right-0 h-full w-full max-w-md bg-white/80 backdrop-blur-lg shadow-2xl transform translate-x-full z-[100] flex flex-col p-8">
        <div className="auth-content">
          <h2 className="text-4xl font-['font1'] font-bold text-stone-800">Welcome</h2>
          <p className="text-stone-600 mt-2">Sign in or create an account to continue.</p>
          
          {/* --- Toggle Bar --- */}
          <div className="relative mt-8 flex border border-stone-200 rounded-full p-1">
            <div ref={toggleIndicator} className="absolute top-1 bottom-1 left-0 w-1/2 bg-rose-500 rounded-full shadow"></div>
            <button onClick={() => setIsLogin(true)} className={`w-1/2 py-2 font-bold relative transition-colors ${isLogin ? 'text-white' : 'text-stone-500'}`}>Sign In</button>
            <button onClick={() => setIsLogin(false)} className={`w-1/2 py-2 font-bold relative transition-colors ${!isLogin ? 'text-white' : 'text-stone-500'}`}>Create Account</button>
          </div>

          <div className="mt-8 relative h-80">
            {/* --- Login Form --- */}
            <form ref={loginForm} className="absolute w-full space-y-4">
              <div><label className="block mb-1">Email</label><input type="email" required className="w-full p-3 border rounded-md"/></div>
              <div><label className="block mb-1">Password</label><input type="password" required className="w-full p-3 border rounded-md"/></div>
              <button type="submit" className="w-full bg-stone-800 hover:bg-rose-600 text-white font-bold py-3 rounded-lg mt-4">Sign In</button>
            </form>

            {/* --- Signup Form --- */}
            <form ref={signupForm} className="absolute w-full space-y-4 opacity-0 invisible">
              <div><label className="block mb-1">Your Name</label><input type="text" required className="w-full p-3 border rounded-md"/></div>
              <div><label className="block mb-1">Email</label><input type="email" required className="w-full p-3 border rounded-md"/></div>
              <div><label className="block mb-1">Create Password</label><input type="password" required className="w-full p-3 border rounded-md"/></div>
              <button type="submit" className="w-full bg-stone-800 hover:bg-rose-600 text-white font-bold py-3 rounded-lg mt-4">Create Account</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
