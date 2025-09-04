import React, { useState, useRef, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

// Mock data for cart items
const initialCartItems = [
  { id: 1, name: 'Red Velvet Slice', price: 8.50, quantity: 1, image: 'https://www.allrecipes.com/thmb/gDJ1S6ETLfWGyyWw_4A_IGhvDYE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/9295_red-velvet-cake_ddmfs_4x3_1129-a8ab17b825e3464a9a53ceeda54ff461.jpg' },
  { id: 2, name: 'Chocolate Chip Cookie', price: 3.00, quantity: 2, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpefGoa32Kxae14xhVsCtuR5rDWs3pAhrA7Q&s' },
  { id: 3, name: 'Caramel Macaron', price: 2.75, quantity: 3, image: 'https://baranbakery.com/wp-content/uploads/2022/01/caramel-macarons-7-683x1024.jpg' },
];

// A single cart item component for clean code and animation
const CartItem = ({ item }) => (
  <li className="cart-item flex items-center space-x-4 py-4 border-b border-amber-200">
    <img src={item.image} alt={item.name} className="w-16 h-16 rounded-md object-cover" />
    <div className="flex-grow">
      <h4 className="font-bold text-amber-900">{item.name}</h4>
      <p className="text-sm text-amber-700">Quantity: {item.quantity}</p>
    </div>
    <p className="font-semibold text-amber-900">₹{(item.price * item.quantity).toFixed(2)}</p>
  </li>
);


const Cart = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState(initialCartItems);
  const container = useRef(null);
  const timeline = useRef(null);

  useGSAP(() => {
    timeline.current = gsap.timeline({ paused: true });

    timeline.current
      // 1. Fade in the background overlay
      .to(".cart-overlay", {
        opacity: 1,
        pointerEvents: 'auto',
        duration: 0.5,
        ease: 'power3.inOut'
      })
      // 2. Slide in the cart panel from the right
      .to(".cart-panel", {
        x: "0%",
        duration: 0.6,
        ease: "power3.inOut",
      }, "<") // Start at the same time as the overlay
      // 3. Animate the cart items sliding in with a stagger effect
      .fromTo(".cart-item", {
        x: "50%",
        opacity: 0,
      },{
        x: "0%",
        opacity: 1,
        stagger: 0.1,
        duration: 0.4,
        ease: 'power2.out'
      }, "-=0.3")
      // 4. Fade in the footer details
      .fromTo(".cart-footer > *", {
        y: 20,
        opacity: 0
      }, {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.5,
        ease: 'power2.out'
      }, "-=0.3");

  }, { scope: container });

  useEffect(() => {
    if (isOpen) {
      timeline.current.play();
    } else {
      timeline.current.reverse();
    }
  }, [isOpen]);

  const toggleCart = () => {
    setIsOpen(!isOpen);
  };
  
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
                cartItems.map(item => <CartItem key={item.id} item={item} />)
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
      <div className="absolute top-4 right-4 z-30">
        <div className="relative">
          <button onClick={toggleCart} className="bg-amber-50 p-3 rounded-full shadow-lg hover:bg-amber-100 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-amber-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
