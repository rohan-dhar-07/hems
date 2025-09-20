import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Topbar from '../components/projects/Topbar'; 
import BottomSection from '../components/projects/BottomSection'; 

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const allCakeProducts = [
  { id: 1, name: "Velvet Dream Cake", price: 1599.00, description: "Classic red velvet with cream cheese frosting.", image: "https://assets.winni.in/product/primary/2023/8/88014.jpeg?dpr=2&w=220" },
  { id: 2, name: "Chocolate Decadence", price: 1799.00, description: "Layers of dark chocolate sponge and silky truffle ganache.", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=1974&auto=format&fit=crop" },
  { id: 3, name: "Lemon & Elderflower", price: 1699.00, description: "Light sponge with floral notes and zesty lemon curd.", image: "https://ichef.bbci.co.uk/food/ic/food_16x9_1600/recipes/lemon_and_elderflower_15737_16x9.jpg" },
  { id: 4, name: "Salted Caramel Crunch", price: 1899.00, description: "Caramel sponge with crunchy praline and buttercream.", image: "https://www.mashed.com/img/gallery/easy-salted-caramel-vanilla-crunch-cake-recipe/l-intro-1623682796.jpg" },
  { id: 5, name: "Berry Chantilly", price: 1799.00, description: "Vanilla bean cake layered with light cream and fresh berries.", image: "https://www.foodnetwork.com/content/dam/images/food/fullset/2024/03/20/COPYCAT_BERRY_CHANTILLY_CAKE_H_f.jpg" },
  { id: 6, name: "Classic Vanilla Bean", price: 1299.00, description: "Simple and elegant vanilla cake for all occasions.", image: "https://www.foodandwine.com/thmb/cUck29eCdcIEjx_r5Q5ReugKoNM=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Fraiser-cake-FT-RECIPES0624-e9972b38ccb54d3ca8edbbb9a5bb1642.jpeg" },
  { id: 7, name: "Pistachio Rose Cake", price: 1999.00, description: "A unique blend of nutty pistachio and fragrant rose.", image: "https://kreamz.in/wp-content/uploads/2024/02/chocolate-rectangle-cake.webp" },
  { id: 8, name: "Mango Passionfruit", price: 1649.00, description: "Tangy passionfruit mousse on a mango-infused sponge.", image: "https://flouringkitchen.com/wp-content/uploads/2023/07/BW1A4089-2.jpg" },
  { id: 9, name: "Oreo Cheesecake", price: 2099.00, description: "Rich, creamy cheesecake with a crunchy Oreo crust.", image: "https://www.cakeskart.com/web/image/product.template/344/image_1024?unique=898f111" },
  { id: 10, name: "Butterscotch Caramel", price: 1499.00, description: "Classic butterscotch with a smooth caramel drizzle.", image: "https://www.onceuponachef.com/images/2012/11/Vanilla-Birthday-Cake-18-1200x1480.jpg" },
  { id: 11, name: "Strawberry Delight", price: 1549.00, description: "Light and fruity cake with fresh strawberries.", image: "https://theovenchef.com/wp-content/uploads/2023/08/WhatsApp-Image-2023-11-01-at-5.39.28-PM-1-scaled-e1698841246352.jpeg" },
  { id: 12, name: "Black Forest Classic", price: 1399.00, description: "Layers of chocolate, cherries, and whipped cream.", image: "https://www.fnp.com/images/pr/m/v20250701155846/choco-truffle-birthday-cake.jpg" },
];

const CakesPage = () => {
  const [sortOrder, setSortOrder] = useState('lowToHigh');
  const container = useRef(null);
  const preloaderRef = useRef(null);
  const cakeGridRef = useRef(null);

  // You can keep the handleAddToCart function if you move the cart logic to a context or a higher-level component.
  // For now, I've simplified it since Cart component is removed.
  const handleAddToCart = (product, e) => {
    e.preventDefault(); 
    e.stopPropagation();
    gsap.to(e.currentTarget, { scale: 1.1, yoyo: true, repeat: 1, duration: 0.15, ease: 'power1.inOut' });
    console.log(`Adding ${product.name} to cart.`);
  };
  
  const sortedProducts = [...allCakeProducts].sort((a, b) => {
    if (sortOrder === 'lowToHigh') {
      return a.price - b.price;
    } else {
      return b.price - a.price;
    }
  });

  useGSAP(() => {
    // Preloader animation
    const preloaderTl = gsap.timeline({
      onComplete: () => gsap.set(preloaderRef.current, { display: 'none' })
    });
    preloaderTl
      .to('.preloader-panel', { scaleY: 0, stagger: 0.2, duration: 1, ease: 'power3.inOut' })
      .from('.anim-hero-char', { y: 100, opacity: 0, stagger: 0.05, duration: 1, ease: 'power3.out' }, "-=0.5");

    // Philosophy section animation
    gsap.from(".philosophy-text span", {
        scrollTrigger: { trigger: ".philosophy-section", start: "top 60%", end: "bottom 80%", scrub: 1.5 },
        opacity: 0.1,
        stagger: 0.2
    });

    // Featured Cake section animation
    gsap.from('.featured-cake-image', {
        scrollTrigger: {
            trigger: '.featured-cake-section',
            start: 'top 80%',
            end: 'bottom 20%',
            scrub: true,
        },
        y: 100,
        scale: 0.9,
        ease: 'none'
    });

    // Product grid animation
    gsap.from(gsap.utils.toArray('.cake-card'), {
      y: 50,
      opacity: 0,
      stagger: 0.1,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: cakeGridRef.current,
        start: 'top 80%',
        end: 'bottom 20%',
      }
    });

    // Testimonials and CTA
    gsap.from('.testimonial-card', {
        scrollTrigger: { trigger: '.testimonials-section', start: 'top 70%' },
        y: 100, opacity: 0, stagger: 0.2, duration: 1, ease: 'power3.out'
    });
    gsap.from('.cta-content > *', { scrollTrigger: { trigger: '.cta-section', start: 'top 80%' }, y: 50, opacity: 0, stagger: 0.2, duration: 1, ease: 'power3.out' });

  }, { scope: container });

  return (
    <div ref={container} className="bg-[#2a0a3a] text-white font-[sans-serif] transition-colors duration-500 overflow-x-hidden">
      <div ref={preloaderRef} className="preloader fixed top-0 left-0 w-full h-screen flex z-[101]">
          {[...Array(5)].map((_,i) => <div key={i} className="preloader-panel w-1/5 h-full bg-[#1b0724]"/>)}
      </div>
      
      {/* Render the Topbar component */}
      <Topbar />

      {/* Hero Section */}
      <section className="h-screen flex justify-center items-center text-center bg-gradient-to-br from-[#1b0724] to-[#3a0c4f] relative z-10">
        <h1 className="text-6xl md:text-8xl font-['font1'] font-bold max-w-4xl mx-auto text-white">
          {"Where Every Slice is a Majestic Serving".split("").map((char, i) => <span key={i} className="inline-block anim-hero-char" style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.5)' }}>{char === " " ? "\u00A0" : char}</span>)}
        </h1>
      </section>
      
      {/* Philosophy Section with Video Background */}
      <section className="philosophy-section py-24 flex justify-center items-center text-center relative overflow-hidden">
        {/* Video Background */}
        <video 
          className="absolute inset-0 w-full h-full object-cover" 
          autoPlay 
          loop 
          muted 
          playsInline
        >
          <source src="/videos/intro3.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Video Overlay for better text readability */}
        <div className="absolute inset-0 bg-black opacity-60"></div>
        
        {/* Philosophy Text on top of the video */}
        <div className="relative z-10">
          <p className="philosophy-text text-4xl md:text-5xl font-['font2'] max-w-3xl mx-auto leading-relaxed text-gray-300">
            {"We believe a cake is more than a dessert; it is a centerpiece of celebration, a symbol of joy, crafted with humble hands and the finest ingredients.".split(" ").map((word, i) => <span key={i} className="inline-block">{word} </span>)}
          </p>
        </div>
      </section>

      {/* Featured Cake Section */}
      <section className="featured-cake-section py-24 bg-[#1b0724] relative z-10 overflow-hidden">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
                <img src="https://cakebee.in/cdn/shop/files/DSC06157_dc2bc3fe-0b76-4402-bb20-a48dfc5ea2a4.jpg?v=1703588115" alt="Featured Chocolate Cake" className="featured-cake-image w-full object-contain drop-shadow-2xl rounded-lg" />
            </div>
            <div className="md:w-1/2 text-center md:text-left">
                <h2 className="text-5xl font-['font1'] font-bold text-[#ffcc00]">The Gold Standard</h2>
                <p className="text-lg mt-4 max-w-md mx-auto md:mx-0">Experience our signature **Chocolate Decadence** with an exclusive gold-dusted finish. It’s not just a cake, it’s a masterpiece. Each layer tells a story of rich cocoa and creamy ganache, designed for moments that deserve a touch of luxury.</p>
                <div className="mt-8">
                    <button onClick={(e) => handleAddToCart({ id: 2, name: "Chocolate Decadence", price: 1799.00, image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=1974&auto=format&fit=crop" }, e)} className="bg-[#ffcc00] hover:bg-[#e6b800] text-[#2a0a3a] font-bold py-4 px-12 rounded-full shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
      </section>

      {/* Cakes Product Section */}
      <section className="py-16 bg-[#2a0a3a] relative z-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-10">
            <h2 className="text-4xl md:text-5xl font-bold font-['font1'] mb-4 sm:mb-0">Our Collection</h2>
            <div className="flex items-center space-x-2">
              <label htmlFor="sort-by" className="text-lg text-gray-300">Sort By:</label>
              <select 
                id="sort-by"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="bg-[#1b0724] text-white p-2 rounded-md border border-[#3a0c4f] focus:outline-none focus:ring-2 focus:ring-[#ffcc00]"
              >
                <option value="lowToHigh">Price: Low to High</option>
                <option value="highToLow">Price: High to Low</option>
              </select>
            </div>
          </div>
          <div ref={cakeGridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {sortedProducts.map(product => (
              <div key={product.id} className="cake-card bg-white/5 border border-white/10 p-6 rounded-2xl shadow-xl backdrop-blur-sm transition-transform duration-300 hover:scale-105 hover:shadow-2xl hover:border-[#ffcc00]">
                <Link to={`/product/${product.id}`} className="block">
                  <div className="overflow-hidden rounded-xl mb-4 relative group">
                    <img src={product.image} alt={product.name} className="cake-image-in-card w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"/>
                  </div>
                  <h3 className="text-xl font-bold text-gray-100 font-['font1']">{product.name}</h3>
                  <p className="text-sm text-gray-400 mt-1 mb-3">{product.description}</p>
                  <span className="text-2xl font-bold text-[#ffcc00]">₹{product.price.toFixed(2)}</span>
                </Link>
                <div className="flex justify-between items-center mt-4">
                  <button onClick={(e) => handleAddToCart(product, e)} className="bg-[#ffcc00] hover:bg-[#e6b800] text-[#2a0a3a] font-bold py-2 px-6 rounded-full shadow-lg transition-all duration-300">Add to Cart</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="testimonials-section bg-[#1b0724] py-16 md:py-24 relative z-10">
        <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-bold font-['font1'] text-[#ffcc00] mb-12">From Our Patrons</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="testimonial-card bg-white/5 border border-white/10 p-8 rounded-2xl shadow-xl">
                    <p className="text-lg italic text-gray-300">"The Velvet Dream Cake was the star of our anniversary. Absolutely divine!"</p>
                    <p className="mt-4 font-bold text-gray-100">- Anjali S.</p>
                </div>
                <div className="testimonial-card bg-white/5 border border-white/10 p-8 rounded-2xl shadow-xl">
                    <p className="text-lg italic text-gray-300">"HEMS created the most beautiful custom cake for my daughter's birthday. It tasted even better than it looked!"</p>
                    <p className="mt-4 font-bold text-gray-100">- Vikram R.</p>
                </div>
                <div className="testimonial-card bg-white/5 border border-white/10 p-8 rounded-2xl shadow-xl">
                    <p className="text-lg italic text-gray-300">"The best Black Forest cake in North Dumdum, without a doubt. Pure perfection."</p>
                    <p className="mt-4 font-bold text-gray-100">- Priya M.</p>
                </div>
            </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section h-screen w-screen flex items-center justify-center text-center bg-gradient-to-br from-[#2a0a3a] to-[#1b0724] relative z-10">
        <div className="container mx-auto px-4 cta-content">
            <h2 className="text-4xl md:text-5xl font-bold font-['font1'] text-[#ffcc00] mb-6">Dreaming of a Custom Cake?</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">From weddings to birthdays, our artisans can bring your vision to life. Let's create something majestic together.</p>
            <Link to="/custom-order">
                <button className="bg-[#ffcc00] hover:bg-[#e6b800] text-[#2a0a3a] font-bold py-4 px-10 rounded-full shadow-lg transition-all duration-300 transform hover:-translate-y-1">Design Your Cake</button>
            </Link>
        </div>
      </section>
      
      <BottomSection />
    </div>
  );
};

export default CakesPage;