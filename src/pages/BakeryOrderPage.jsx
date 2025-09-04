import React, { useState, useRef, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Cart from '../components/home/Cart';
import Navbar from '../components/home/Navbar';

// Register plugins
gsap.registerPlugin(ScrollTrigger);

const BakeryOrderPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [flyingItem, setFlyingItem] = useState(null); // State for the flying image
  const container = useRef(null);
  const cartRef = useRef(null); // Ref to get the cart icon's position

  const bakeryProducts = [
    { id: 1, name: "Chocolate Cake", price: 1499.00, description: "Rich chocolate cake with creamy frosting", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1089&q=80" },
    { id: 2, name: "Blueberry Muffin", price: 249.00, description: "Fresh blueberries in a soft muffin", image: "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1160&q=80" },
    { id: 3, name: "Croissant", price: 199.00, description: "Buttery, flaky French croissant", image: "https://images.unsplash.com/photo-1555507036-ab794f24d8c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" },
    { id: 4, name: "Apple Pie", price: 999.00, description: "Homemade apple pie with cinnamon", image: "https://images.unsplash.com/photo-1535920527002-b35e967e61f2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" },
    { id: 5, name: "Cupcakes (Pack of 4)", price: 599.00, description: "Assorted flavored cupcakes", image: "https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80" },
    { id: 6, name: "Bread Loaf", price: 349.00, description: "Freshly baked artisan bread", image: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" }
  ];

  const handleAddToCart = (product, e) => {
    // 1. Add item to the cart state
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });

    // 2. Trigger the "fly to cart" animation
    const productImg = e.currentTarget.closest('.product-card').querySelector('img');
    const startRect = productImg.getBoundingClientRect();
    const endRect = cartRef.current.getBoundingClientRect();

    setFlyingItem({
      src: product.image,
      startX: startRect.left + startRect.width / 2,
      startY: startRect.top + startRect.height / 2,
      endX: endRect.left + endRect.width / 2,
      endY: endRect.top + endRect.height / 2,
    });
  };

  // Effect to run the flying animation when `flyingItem` state is set
  useEffect(() => {
    if (flyingItem) {
      const flyer = document.querySelector('.flying-item');
      gsap.fromTo(flyer,
        {
          left: flyingItem.startX,
          top: flyingItem.startY,
          opacity: 1,
          scale: 0.5,
        },
        {
          left: flyingItem.endX,
          top: flyingItem.endY,
          opacity: 0,
          scale: 0,
          duration: 0.8,
          ease: 'power1.in',
          onComplete: () => setFlyingItem(null),
        }
      );
    }
  }, [flyingItem]);

  useGSAP(() => {
    // --- Album Scroll Animation ---
    const sections = gsap.utils.toArray(".album-page");
    gsap.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: ".album-container",
        pin: true,
        scrub: 1,
        snap: 1 / (sections.length - 1),
        end: () => "+=" + document.querySelector(".album-container").offsetWidth,
      },
    });

    // --- Standard Animations (unchanged) ---
    gsap.from(".hero-text", { y: 100, opacity: 0, duration: 1, stagger: 0.3, ease: "power3.out" });
    gsap.from(".category-btn", { scrollTrigger: { trigger: ".categories", start: "top 85%" }, y: 30, opacity: 0, duration: 0.7, stagger: 0.15, ease: "power2.out" });
    gsap.to(".featured-product", { y: -10, duration: 2, repeat: -1, yoyo: true, ease: "sine.inOut" });

  }, { scope: container });

  return (
    <div ref={container} className="min-h-screen bg-gradient-to-br from-amber-50 to-pink-50 overflow-x-hidden">
      <Navbar />
      <Cart ref={cartRef} cartItems={cartItems} />
      
      {/* Flying image for "Add to Cart" effect */}
      {flyingItem && (
        <img
          src={flyingItem.src}
          className="flying-item fixed w-24 h-24 object-cover rounded-full z-[999] pointer-events-none"
          alt=""
        />
      )}

      {/* Hero Section */}
      <div className="relative min-h-[70vh] flex flex-col justify-center items-center px-4 overflow-hidden">
        <div className="text-center mb-12">
          <h1 className="hero-text text-6xl md:text-8xl font-bold text-amber-900 mb-4">Order Delicious</h1>
          <h2 className="hero-text text-5xl md:text-7xl font-bold text-pink-700 mb-8">Bakery Treats</h2>
          <p className="hero-text text-xl md:text-2xl text-amber-800 max-w-2xl mx-auto">Freshly baked goods delivered to your doorstep</p>
        </div>
        <div className="absolute top-1/4 left-10 w-20 h-20 bg-amber-300 rounded-full opacity-20 featured-product"></div>
        <div className="absolute bottom-1/4 right-10 w-24 h-24 bg-pink-300 rounded-full opacity-20 featured-product"></div>
        <div className="absolute top-1/3 right-1/4 w-16 h-16 bg-yellow-200 rounded-full opacity-30 featured-product"></div>
      </div>

      {/* Categories */}
      <div className="categories py-12 bg-white bg-opacity-80">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-amber-900 mb-12">Our Bakery Items</h2>
          <div className="flex flex-wrap justify-center gap-6">
            <button className="category-btn bg-amber-500 hover:bg-amber-600 text-white font-bold py-4 px-8 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105">Cakes</button>
            <button className="category-btn bg-pink-500 hover:bg-pink-600 text-white font-bold py-4 px-8 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105">Pastries</button>
            <button className="category-btn bg-amber-700 hover:bg-amber-800 text-white font-bold py-4 px-8 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105">Breads</button>
            <button className="category-btn bg-pink-700 hover:bg-pink-800 text-white font-bold py-4 px-8 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105">Cookies</button>
          </div>
        </div>
      </div>
      
      {/* NEW Album-style Products Section */}
      <div className="album-container h-screen w-screen overflow-hidden flex items-center relative">
        <div className="flex w-[190vw]"> {/* Width = 100vw * number of pages */}
          {/* Page 1 */}
          <section className="album-page w-screen h-screen flex items-center justify-center p-8">
            <div className="products-grid grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
              {bakeryProducts.slice(0, 2).map(product => (
                <div key={product.id} className="product-card bg-white rounded-2xl overflow-hidden shadow-lg">
                  <div className="h-56 overflow-hidden"><img src={product.image} alt={product.name} className="w-full h-full object-cover"/></div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-amber-900 mb-2">{product.name}</h3>
                    <p className="text-gray-600 mb-4">{product.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-pink-700">₹{product.price.toFixed(2)}</span>
                      <button onClick={(e) => handleAddToCart(product, e)} className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-6 rounded-full">Add to Cart</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
          {/* Page 2 */}
          <section className="album-page w-screen h-screen flex items-center justify-center p-8">
            <div className="products-grid grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
              {bakeryProducts.slice(2, 4).map(product => (
                 <div key={product.id} className="product-card bg-white rounded-2xl overflow-hidden shadow-lg">
                  <div className="h-56 overflow-hidden"><img src={product.image} alt={product.name} className="w-full h-full object-cover"/></div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-amber-900 mb-2">{product.name}</h3>
                    <p className="text-gray-600 mb-4">{product.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-pink-700">₹{product.price.toFixed(2)}</span>
                      <button onClick={(e) => handleAddToCart(product, e)} className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-6 rounded-full">Add to Cart</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
          {/* Page 3 */}
          <section className="album-page w-screen h-screen flex items-center justify-center p-8">
            <div className="products-grid grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
              {bakeryProducts.slice(4, 6).map(product => (
                <div key={product.id} className="product-card bg-white rounded-2xl overflow-hidden shadow-lg">
                  <div className="h-56 overflow-hidden"><img src={product.image} alt={product.name} className="w-full h-full object-cover"/></div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-amber-900 mb-2">{product.name}</h3>
                    <p className="text-gray-600 mb-4">{product.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-pink-700">₹{product.price.toFixed(2)}</span>
                      <button onClick={(e) => handleAddToCart(product, e)} className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-6 rounded-full">Add to Cart</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* Special Offers & Footer */}
      <div className="relative bg-gradient-to-br from-amber-50 to-pink-50">
        <div className="bg-amber-100 py-16">
            <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold text-amber-900 mb-6">Special Offer</h2>
            <p className="text-xl text-amber-800 mb-8">Get 15% off your first order with code: BAKERY15</p>
            <button className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-4 px-8 rounded-full shadow-lg">Order Now</button>
            </div>
        </div>
        <footer className="bg-amber-900 text-amber-50 py-12">
            <div className="container mx-auto px-4 text-center">
            <p className="text-xl mb-4">Humble Bakery</p>
            <p className="mb-6">Fresh baked goods made with love</p>
            <div className="flex justify-center space-x-6">
                <a href="#" className="text-amber-200 hover:text-white">Instagram</a>
                <a href="#" className="text-amber-200 hover:text-white">Facebook</a>
                <a href="#" className="text-amber-200 hover:text-white">Twitter</a>
            </div>
            </div>
        </footer>
      </div>
    </div>
  );
};

export default BakeryOrderPage;