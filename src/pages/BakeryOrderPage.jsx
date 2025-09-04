import React, { useState, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
// Corrected import paths
import Cart from '../components/home/Cart'
import Navbar from '../components/home/Navbar'

// Register plugins
gsap.registerPlugin(ScrollTrigger)

const BakeryOrderPage = () => {
  const [cartItems, setCartItems] = useState([])
  const container = useRef(null)
  
  // Sample bakery products
  const bakeryProducts = [
    {
      id: 1,
      name: "Chocolate Cake",
      price: 1499.00,
      description: "Rich chocolate cake with creamy frosting",
      image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1089&q=80"
    },
    {
      id: 2,
      name: "Blueberry Muffin",
      price: 249.00,
      description: "Fresh blueberries in a soft muffin",
      image: "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1160&q=80"
    },
    {
      id: 3,
      name: "Croissant",
      price: 199.00,
      description: "Buttery, flaky French croissant",
      image: "https://images.unsplash.com/photo-1555507036-ab794f24d8c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    },
    {
      id: 4,
      name: "Apple Pie",
      price: 999.00,
      description: "Homemade apple pie with cinnamon",
      image: "https://images.unsplash.com/photo-1535920527002-b35e967e61f2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    },
    {
      id: 5,
      name: "Cupcakes (Pack of 4)",
      price: 599.00,
      description: "Assorted flavored cupcakes",
      image: "https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80"
    },
    {
      id: 6,
      name: "Bread Loaf",
      price: 349.00,
      description: "Freshly baked artisan bread",
      image: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    }
  ]

  // Add to cart function
  const addToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id)
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prevItems, { ...product, quantity: 1 }]
    })
  }

  // GSAP Animations
  useGSAP(() => {
    // Hero text animation
    gsap.from(".hero-text", {
      y: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.3,
      ease: "power3.out"
    })

    // Product cards animation
    gsap.from(".product-card", {
      scrollTrigger: {
        trigger: ".products-grid",
        start: "top 80%",
        toggleActions: "play none none none"
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "power2.out"
    })

    // Category buttons animation
    gsap.from(".category-btn", {
      scrollTrigger: {
        trigger: ".categories",
        start: "top 85%",
        toggleActions: "play none none none"
      },
      y: 30,
      opacity: 0,
      duration: 0.7,
      stagger: 0.15,
      ease: "power2.out"
    })

    // Floating animation for featured items
    gsap.to(".featured-product", {
      y: -10,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    })

  }, { scope: container })

  return (
    <div ref={container} className="min-h-screen bg-gradient-to-br from-amber-50 to-pink-50">
      {/* Navigation */}
      <Navbar />
      
      {/* Cart */}
      <Cart cartItems={cartItems} />

      {/* Hero Section */}
      <div className="relative min-h-[70vh] flex flex-col justify-center items-center px-4 overflow-hidden">
        <div className="text-center mb-12">
          <h1 className="hero-text text-6xl md:text-8xl font-bold text-amber-900 mb-4">
            Order Delicious
          </h1>
          <h2 className="hero-text text-5xl md:text-7xl font-bold text-pink-700 mb-8">
            Bakery Treats
          </h2>
          <p className="hero-text text-xl md:text-2xl text-amber-800 max-w-2xl mx-auto">
            Freshly baked goods delivered to your doorstep
          </p>
        </div>

        {/* Animated floating elements */}
        <div className="absolute top-1/4 left-10 w-20 h-20 bg-amber-300 rounded-full opacity-20 featured-product"></div>
        <div className="absolute bottom-1/4 right-10 w-24 h-24 bg-pink-300 rounded-full opacity-20 featured-product"></div>
        <div className="absolute top-1/3 right-1/4 w-16 h-16 bg-yellow-200 rounded-full opacity-30 featured-product"></div>
      </div>

      {/* Categories */}
      <div className="categories py-12 bg-white bg-opacity-80">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-amber-900 mb-12">Our Categories</h2>
          <div className="flex flex-wrap justify-center gap-6">
            <button className="category-btn bg-amber-500 hover:bg-amber-600 text-white font-bold py-4 px-8 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105">
              Cakes
            </button>
            <button className="category-btn bg-pink-500 hover:bg-pink-600 text-white font-bold py-4 px-8 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105">
              Pastries
            </button>
            <button className="category-btn bg-amber-700 hover:bg-amber-800 text-white font-bold py-4 px-8 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105">
              Breads
            </button>
            <button className="category-btn bg-pink-700 hover:bg-pink-800 text-white font-bold py-4 px-8 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105">
              Cookies
            </button>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-center text-amber-900 mb-12">Our Bakery Items</h2>
        <div className="products-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {bakeryProducts.map(product => (
            <div key={product.id} className="product-card bg-white rounded-2xl overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105">
              <div className="h-56 overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-amber-900 mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-pink-700">₹{product.price.toFixed(2)}</span>
                  <button 
                    onClick={() => addToCart(product)}
                    className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-6 rounded-full transition-colors duration-300"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Special Offers */}
      <div className="bg-amber-100 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-amber-900 mb-6">Special Offer</h2>
          <p className="text-xl text-amber-800 mb-8">Get 15% off your first order with code: BAKERY15</p>
          <button className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-4 px-8 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105">
            Order Now
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-amber-900 text-amber-50 py-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-xl mb-4">Humble Bakery</p>
          <p className="mb-6">Fresh baked goods made with love</p>
          <div className="flex justify-center space-x-6">
            <a href="#" className="text-amber-200 hover:text-white transition-colors duration-300">
             Instagram
            </a>
            <a href="#" className="text-amber-200 hover:text-white transition-colors duration-300">
              Facebook
            </a>
            <a href="#" className="text-amber-200 hover:text-white transition-colors duration-300">
              Twitter
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default BakeryOrderPage

