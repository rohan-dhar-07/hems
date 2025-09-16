import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const Navbar = () => (
  <header className="bg-white/90 backdrop-blur-sm sticky top-0 z-40 shadow-sm">
    <div className="container mx-auto px-4 flex justify-between items-center h-20">
      <Link to="/" className="text-3xl font-bold text-amber-900">HEMS</Link>
      <div>
        <Link to="/order" className="text-gray-600 hover:text-pink-600 font-medium transition-colors">Order Now</Link>
      </div>
    </div>
  </header>
);

const FloatingSprinkles = () => {
  useGSAP(() => {
    gsap.to(".sprinkle", {
      x: "random(-20, 20, 5)",
      y: "random(-20, 20, 5)",
      duration: "random(2, 4)",
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    });
  });

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <div className="sprinkle absolute top-[20%] left-[10%] w-3 h-3 bg-pink-300 rounded-full opacity-50"></div>
      <div className="sprinkle absolute top-[50%] left-[80%] w-2 h-2 bg-amber-300 rounded-full opacity-50"></div>
      <div className="sprinkle absolute top-[80%] left-[30%] w-3 h-3 bg-sky-300 rounded-full opacity-50"></div>
      <div className="sprinkle absolute top-[30%] left-[90%] w-2 h-2 bg-pink-300 rounded-full opacity-50"></div>
      <div className="sprinkle absolute top-[70%] left-[5%] w-2 h-2 bg-amber-300 rounded-full opacity-50"></div>
    </div>
  );
};

const WishlistPage = ({ wishlistItems, setWishlistItems }) => {
  const container = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline();
    tl.from(".wishlist-title-char", {
      y: 100,
      opacity: 0,
      stagger: 0.05,
      ease: 'back.out(1.7)',
      duration: 0.8
    })
    .from(".wishlist-subtitle", {
      y: 30,
      opacity: 0,
      ease: 'power3.out',
      duration: 0.8
    }, "-=0.6");

    // --- FIX: Changed the card animation to a more reliable .fromTo() ---
    if (wishlistItems.length > 0) {
      tl.fromTo(".wishlist-card", 
        { // FROM state
          clipPath: 'circle(0% at 50% 50%)',
          opacity: 0,
          y: 50,
        },
        { // TO state
          clipPath: 'circle(150% at 50% 50%)',
          opacity: 1,
          y: 0,
          stagger: 0.2,
          ease: 'power3.out',
          duration: 1,
        }, 
        "-=0.5"
      );
    } else {
        // Animation for the empty state card
        gsap.from(".wishlist-card-empty", {
            opacity: 0,
            y: 50,
            ease: 'power3.out',
            duration: 1,
        });
    }

  }, { scope: container, dependencies: [wishlistItems] });

  const handleRemoveItem = (idToRemove) => {
    const cardToRemove = document.querySelector(`[data-id='${idToRemove}']`);
    if (cardToRemove) {
      gsap.to(cardToRemove, {
        duration: 0.5,
        scale: 0.8,
        opacity: 0,
        x: 100,
        ease: 'power2.in',
        onComplete: () => {
          setWishlistItems(prevItems => prevItems.filter(item => item.id !== idToRemove));
        }
      });
    }
  };
  
  const handleMoveToCart = (idToMove) => {
    console.log(`Moving item ${idToMove} to cart!`);
    handleRemoveItem(idToMove);
  };

  return (
    <div ref={container} className="relative min-h-screen bg-gradient-to-br from-amber-50 to-pink-50 font-[sans-serif] overflow-x-hidden">
      <FloatingSprinkles />
      <Navbar />
      <main className="container mx-auto px-4 py-12 md:py-16 relative z-10">
        <div className="text-center mb-16">
          <h1 className="wishlist-title text-5xl md:text-7xl font-bold text-amber-900 leading-tight">
            {'Your Cravings List'.split('').map((char, index) => (
              <span key={index} className="inline-block wishlist-title-char">{char === ' ' ? '\u00A0' : char}</span>
            ))}
          </h1>
          <p className="wishlist-subtitle text-lg text-amber-800 mt-4 max-w-2xl mx-auto">
            A delightful collection of treats you've saved for later. Go on, you deserve something sweet!
          </p>
        </div>

        {wishlistItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {wishlistItems.map((item) => (
              <div
                key={item.id}
                data-id={item.id}
                // --- FIX: Removed the inline style for clipPath ---
                className="wishlist-card bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg overflow-hidden group transition-all duration-300 hover:shadow-2xl hover:!scale-105"
              >
                <div className="h-64 overflow-hidden relative">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transform transition-transform duration-500 ease-in-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-2xl font-bold text-amber-900 mb-2 truncate">{item.name}</h3>
                  <p className="text-3xl font-bold text-pink-700 mb-6">₹{item.price.toFixed(2)}</p>
                  <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                    <button 
                      onClick={() => handleMoveToCart(item.id)}
                      className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105 shadow-md"
                    >
                      Move to Cart
                    </button>
                    <button 
                      onClick={() => handleRemoveItem(item.id)}
                      className="w-full flex items-center justify-center bg-gray-200 hover:bg-red-100 text-gray-700 hover:text-red-600 font-bold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105"
                    >
                       <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                       Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // --- FIX: Added a different class for the empty card to animate it separately ---
          <div className="text-center py-16 wishlist-card-empty">
            <h2 className="text-3xl font-bold text-amber-900 mb-4">Your Wishlist is Empty!</h2>
            <p className="text-lg text-amber-800 mb-8">Let's find something sweet to dream about.</p>
            <Link to="/order">
              <button className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-4 px-10 rounded-full shadow-lg transform transition-transform duration-300 hover:scale-110">
                Browse Our Bakes
              </button>
            </Link>
          </div>
        )}
      </main>
    </div>
  );
};

export default WishlistPage;