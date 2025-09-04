import React, { useState, useRef, useEffect, forwardRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

// A single cart item component with quantity controls
const CartItem = ({ item, onIncrease, onDecrease }) => (
  <li className="cart-item flex items-center space-x-4 py-4 border-b border-amber-200">
    <img src={item.image} alt={item.name} className="w-16 h-16 rounded-md object-cover" />
    <div className="flex-grow">
      <h4 className="font-bold text-amber-900">{item.name}</h4>
      {/* Quantity Controls */}
      <div className="flex items-center space-x-2 mt-1">
        <button 
          onClick={onDecrease} 
          className="w-6 h-6 rounded-full bg-amber-200 text-amber-800 font-bold hover:bg-amber-300 transition-colors"
        >
          -
        </button>
        <span className="text-sm text-amber-800 w-5 text-center">{item.quantity}</span>
        <button 
          onClick={onIncrease} 
          className="w-6 h-6 rounded-full bg-amber-200 text-amber-800 font-bold hover:bg-amber-300 transition-colors"
        >
          +
        </button>
      </div>
    </div>
    <p className="font-semibold text-amber-900">₹{(item.price * item.quantity).toFixed(2)}</p>
  </li>
);

// The main Cart component, wrapped in forwardRef to accept a ref
const Cart = forwardRef(({ cartItems = [], onIncrease, onDecrease }, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const container = useRef(null);
  const timeline = useRef(null);

  useGSAP(() => {
    timeline.current = gsap.timeline({ paused: true });
    timeline.current
      .to(".cart-overlay", { opacity: 1, pointerEvents: 'auto', duration: 0.5, ease: 'power3.inOut' })
      .to(".cart-panel", { x: "0%", duration: 0.6, ease: "power3.inOut" }, "<")
      .fromTo(".cart-item", { x: "50%", opacity: 0 }, { x: "0%", opacity: 1, stagger: 0.1, duration: 0.4, ease: 'power2.out' }, "-=0.3")
      .fromTo(".cart-footer > *", { y: 20, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.1, duration: 0.5, ease: 'power2.out' }, "-=0.3");
  }, { scope: container });

  useEffect(() => {
    if (isOpen) {
      timeline.current.play();
    } else {
      timeline.current.reverse();
    }
  }, [isOpen]);

  const toggleCart = () => setIsOpen(!isOpen);
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div ref={container}>
      {/* Background Overlay */}
      <div onClick={toggleCart} className="cart-overlay fixed inset-0 bg-black/40 opacity-0 pointer-events-none z-40"></div>

      {/* Cart Side Panel */}
      <div className="cart-panel fixed top-0 right-0 h-full w-full max-w-md bg-amber-50 shadow-2xl transform translate-x-full z-50 flex flex-col">
        <div className="flex justify-between items-center p-6 border-b border-amber-200">
          <h2 className="text-2xl font-bold font-[font2] text-amber-900">Your Cart</h2>
          <button onClick={toggleCart} className="p-2 rounded-full hover:bg-amber-100">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-800" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        
        <ul className="flex-grow p-6 overflow-y-auto">
          {cartItems.length > 0 ? (
            cartItems.map(item => 
              <CartItem 
                key={item.id} 
                item={item} 
                onIncrease={() => onIncrease(item.id)} 
                onDecrease={() => onDecrease(item.id)} 
              />
            )
          ) : (
            <p className="text-center text-amber-700 mt-8">Your cart is empty!</p>
          )}
        </ul>

        {cartItems.length > 0 && (
          <div className="cart-footer p-6 border-t border-amber-200 bg-amber-100 space-y-4">
            <div className="flex justify-between text-lg font-bold text-amber-900">
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <button className="w-full bg-rose-500 text-white font-bold py-3 rounded-lg shadow-md hover:bg-rose-600 transition-colors">
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>

      {/* Cart Icon Button (The Trigger) */}
      <div ref={ref} className="absolute top-4 right-4 z-30">
        <div className="relative">
          <button onClick={toggleCart} className="bg-amber-50 p-3 rounded-full shadow-lg hover:bg-amber-100 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-amber-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
                {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
});

export default Cart;