  import React, { useState, useRef } from 'react';
  import { Link } from 'react-router-dom';
  import { useGSAP } from '@gsap/react';
  import gsap from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  import Topbar from '../components/projects/Topbar'; 
  import BottomSection from '../components/projects/BottomSection'; 
  import Navbar from '../components/home/Navbar';
  import Cart from '../components/home/Cart';

  // Register GSAP plugins
  gsap.registerPlugin(ScrollTrigger);

  const allPastryProducts = [
    { id: 1, name: "Classic Croissant", price: 199.00, description: "Experience the art of lamination with 81 delicate, buttery layers.", image: "https://www.midwestliving.com/thmb/6pcQdksgUlwW2rA_S7qrzeopQT8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/CD_R315020_Buttery-Croissant_8998_preview-b9cb4afd77df47978601ec2438b95ce6.jpg" },
    { id: 2, name: "Pain au Chocolat", price: 249.00, description: "Our classic croissant embracing two batons of rich, dark chocolate.", image: "https://www.giallozafferano.com/images/295-29543/pain-au-chocolat_650x433_wm.jpg" },
    { id: 3, name: "Almond Croissant", price: 299.00, description: "Filled with a sweet almond frangipane and topped with toasted almonds.", image: "https://www.simplyrecipes.com/thmb/UijSGX9q71RpSUkS3yfOloFL27I=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Simply-Recipes-Almond-Croissant-LEAD-8-07f51557bda7499aa6d1ccb4d079ea52.jpg" },
    { id: 4, name: "Cinnamon Roll", price: 279.00, description: "A soft, gooey roll with a swirl of cinnamon and a decadent cream cheese glaze.", image: "https://horizon.com/wp-content/uploads/recipe-cin-roll-hero.jpg" },
    { id: 5, name: "Raspberry Danish", price: 229.00, description: "Flaky pastry filled with raspberry jam and a light cream cheese filling.", image: "https://storcpdkenticomedia.blob.core.windows.net/media/recipemanagementsystem/media/recipe-media-files/recipes/retail/hd/1769-raspberry-danish-760x580.jpg?ext=.jpg" },
    { id: 6, name: "Éclair", price: 259.00, description: "A delicate choux pastry filled with a smooth, vanilla cream and glazed with chocolate.", image: "https://www.mashed.com/img/gallery/the-untold-truth-of-eclairs/l-intro-1632766023.jpg" },
    { id: 7, name: "Macarons (Box of 6)", price: 499.00, description: "A colorful assortment of delicate almond meringue cookies with a soft ganache filling.", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6sJ5_u-iKj2hF8S3O6g2D2YfN1yU7_R3-g&s" },
    { id: 8, name: "Blueberry Scone", price: 189.00, description: "Buttery, crumbly scone bursting with fresh blueberries and a hint of lemon zest.", image: "https://cdn.loveandlemons.com/wp-content/uploads/2023/07/blueberry-scones-recipe-500x500.jpg" },
  ];

  const PastriesPage = () => {
    const [cartItems, setCartItems] = useState([]);
    const [flyingItem, setFlyingItem] = useState(null);
    const [wishlistItems, setWishlistItems] = useState([]);
    const [sortOrder, setSortOrder] = useState('lowToHigh');
    const container = useRef(null);
    const cartRef = useRef(null);
    const preloaderRef = useRef(null);
    const pastryGridRef = useRef(null);

    const handleAddToWishlist = (product, e) => {
      e.preventDefault();
      e.stopPropagation();
      setWishlistItems(prev => {
        const isPresent = prev.some(item => item.id === product.id);
        if (isPresent) {
          return prev.filter(item => item.id !== product.id);
        } else {
          return [...prev, product];
        }
      });
    };

    const handleAddToCart = (product, e) => {
      e.preventDefault(); 
      e.stopPropagation();
      gsap.to(e.currentTarget, { scale: 1.1, yoyo: true, repeat: 1, duration: 0.15, ease: 'power1.inOut' });
      setCartItems(prev => {
        const exist = prev.find(item => item.id === product.id);
        if (exist) return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
        return [...prev, { ...product, quantity: 1 }];
      });

      const img = e.currentTarget.closest('.pastry-card').querySelector('.pastry-image-in-card');
      const startRect = img.getBoundingClientRect();
      const endRect = cartRef.current.getBoundingClientRect();
      setFlyingItem({ src: product.image, startX: startRect.left + startRect.width / 2, startY: startRect.top + startRect.height / 2, endX: endRect.left + endRect.width / 2, endY: endRect.top + endRect.height / 2 });
    };
    
    const increaseQuantity = (id) => setCartItems(p => p.map(i => i.id === id ? {...i, quantity: i.quantity + 1} : i));
    const decreaseQuantity = (id) => setCartItems(p => {
        const item = p.find(i => i.id === id);
        if (item.quantity === 1) return p.filter(i => i.id !== id);
        return p.map(i => i.id === id ? {...i, quantity: i.quantity - 1} : i);
    });

    const sortedProducts = [...allPastryProducts].sort((a, b) => {
      if (sortOrder === 'lowToHigh') {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });

    useGSAP(() => {
      if (flyingItem) {
        gsap.fromTo('.flying-item', { left: flyingItem.startX, top: flyingItem.startY, opacity: 1, scale: 0.5 }, { left: flyingItem.endX, top: flyingItem.endY, opacity: 0, scale: 0, duration: 0.8, ease: 'power1.in', onComplete: () => setFlyingItem(null) });
      }
    }, [flyingItem]);

    useGSAP(() => {
      // Preloader animation
      const preloaderTl = gsap.timeline({
        onComplete: () => gsap.set(preloaderRef.current, { display: 'none' })
      });
      preloaderTl
        .to('.preloader-panel', { scaleY: 0, stagger: 0.2, duration: 1, ease: 'power3.inOut' })
        .from('.anim-hero-char', { y: 100, opacity: 0, stagger: 0.05, duration: 1, ease: 'power3.out' }, "-=0.5");

      // Hero subtitle animation
      gsap.from('.hero-subtitle .char', { opacity: 0, stagger: 0.03, duration: 1, ease: 'power2.inOut', delay: 1 });

      // Featured Pastry animation
      gsap.from('.featured-pastry-image', {
          scrollTrigger: {
              trigger: '.featured-pastry-section',
              start: 'top 80%',
              end: 'bottom 20%',
              scrub: true,
          },
          y: 100,
          scale: 0.9,
          ease: 'none'
      });

      // Product grid animation
      gsap.from(gsap.utils.toArray('.pastry-card'), {
        y: 50,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: pastryGridRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
        }
      });

      // Process section animation
      const processTl = gsap.timeline({ scrollTrigger: { trigger: '.process-section', start: 'top center', end: 'bottom bottom', scrub: 1.5 } });
      processTl.from('.process-line', { scaleY: 0, transformOrigin: 'top center' })
              .from('.process-step', { opacity: 0, y: 50, stagger: 0.5 });
              
      // Testimonials and CTA
      gsap.from('.testimonial-card', {
          scrollTrigger: { trigger: '.testimonials-section', start: 'top 70%' },
          y: 100, opacity: 0, stagger: 0.2, duration: 1, ease: 'power3.out'
      });
      gsap.from('.cta-content > *', { scrollTrigger: { trigger: '.cta-section', start: 'top 80%' }, y: 50, opacity: 0, stagger: 0.2, duration: 1, ease: 'power3.out' });

    }, { scope: container });

    return (
      <div ref={container} className="bg-stone-900 text-stone-100 font-sans relative overflow-hidden">
        <div ref={preloaderRef} className="preloader fixed top-0 left-0 w-full h-screen flex z-[101]">
            {[...Array(5)].map((_,i) => <div key={i} className="preloader-panel w-1/5 h-full bg-[#1b0724]"/>)}
        </div>
        
        <Topbar />
        <Navbar />
        <Cart ref={cartRef} cartItems={cartItems} onIncrease={increaseQuantity} onDecrease={decreaseQuantity} />
        {flyingItem && <img src={flyingItem.src} className="flying-item fixed w-24 h-24 object-cover rounded-full z-[999] pointer-events-none" alt="" />}

        <section className="h-screen flex flex-col justify-center items-center text-center p-8 bg-black/50">
          <h1 className="hero-title text-6xl md:text-9xl font-['font1'] font-bold overflow-hidden text-rose-400">
              {"Pastry".split("").map((char, i) => <span key={i} className="char inline-block">{char}</span>)}
          </h1>
          <p className="hero-subtitle text-xl md:text-2xl mt-4 text-stone-300 font-['font2'] max-w-lg">
              {"A delicate dance of flour, butter, and artistry.".split("").map((char, i) => <span key={i} className="char inline-block">{char === " " ? "\u00A0" : char}</span>)}
          </p>
        </section>

        {/* Featured Pastry Section */}
        <section className="featured-pastry-section py-24 bg-stone-900 relative z-10 overflow-hidden">
          <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
              <div className="md:w-1/2">
                  <img src="https://www.giallozafferano.com/images/295-29543/pain-au-chocolat_650x433_wm.jpg" alt="Featured Pain au Chocolat" className="featured-pastry-image w-full object-contain drop-shadow-2xl rounded-lg" />
              </div>
              <div className="md:w-1/2 text-center md:text-left">
                  <h2 className="text-5xl font-['font1'] font-bold text-rose-400">The Chocolate Masterpiece</h2>
                  <p className="text-lg mt-4 max-w-md mx-auto md:mx-0 text-stone-300">Our signature Pain au Chocolat is a testament to timeless French baking. We encase two batons of rich, dark Belgian chocolate within our flaky, buttery croissant dough. A perfect balance of crispiness and indulgence.</p>
                  <div className="mt-8">
                      <button onClick={(e) => handleAddToCart(allPastryProducts[1], e)} className="bg-rose-500 hover:bg-rose-600 text-white font-bold py-4 px-12 rounded-full shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                          Add to Cart
                      </button>
                  </div>
              </div>
          </div>
        </section>

        {/* Our Collection Grid */}
        <section className="py-16 bg-stone-800">
          <div className="container mx-auto px-4">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-10">
              <h2 className="text-4xl md:text-5xl font-bold font-['font1'] mb-4 sm:mb-0 text-rose-400">Our Collection</h2>
              <div className="flex items-center space-x-2">
                <label htmlFor="sort-by" className="text-lg text-stone-300">Sort By:</label>
                <select 
                  id="sort-by"
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="bg-stone-900 text-white p-2 rounded-md border border-stone-700 focus:outline-none focus:ring-2 focus:ring-rose-500"
                >
                  <option value="lowToHigh">Price: Low to High</option>
                  <option value="highToLow">Price: High to Low</option>
                </select>
              </div>
            </div>
            <div ref={pastryGridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {sortedProducts.map(product => {
                  const isWished = wishlistItems.some(item => item.id === product.id);
                  return (
                    <div key={product.id} className="pastry-card bg-stone-700/50 border border-stone-600 p-6 rounded-2xl shadow-xl backdrop-blur-sm transition-transform duration-300 hover:scale-105 hover:shadow-2xl hover:border-rose-400">
                      <Link to={`/product/${product.id}`} className="block">
                        <div className="overflow-hidden rounded-xl mb-4 relative group">
                          <img src={product.image} alt={product.name} className="pastry-image-in-card w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"/>
                        </div>
                        <h3 className="text-xl font-bold text-stone-100 font-['font1']">{product.name}</h3>
                        <p className="text-sm text-stone-300 mt-1 mb-3">{product.description}</p>
                        <span className="text-2xl font-bold text-rose-400">₹{product.price.toFixed(2)}</span>
                      </Link>
                      <div className="flex justify-between items-center mt-4">
                        <button onClick={(e) => handleAddToWishlist(product, e)} className={`text-2xl transition-all duration-300 transform hover:scale-125 ${isWished ? 'text-rose-500' : 'text-stone-300'}`}>
                          ❤️
                        </button>
                        <button onClick={(e) => handleAddToCart(product, e)} className="bg-rose-500 hover:bg-rose-600 text-white font-bold py-2 px-6 rounded-full shadow-lg transition-all duration-300">Add to Cart</button>
                      </div>
                    </div>
                  );
              })}
            </div>
          </div>
        </section>

        {/* The Process Section */}
        <section className="process-section bg-black/20 py-16 md:py-32 relative">
          <div className="container mx-auto px-4 text-center max-w-2xl relative">
              <div className="process-line absolute top-0 left-1/2 w-0.5 h-full bg-rose-400/30 -translate-x-1/2"></div>
              <h2 className="text-5xl font-bold font-['font1'] mb-16 text-rose-400">The Process</h2>
              <div className="space-y-16">
                  <div className="process-step">
                      <h3 className="text-3xl font-bold text-stone-200">Lamination</h3>
                      <p className="text-lg mt-2 text-stone-300">It begins with the patient layering of French butter and dough, folded meticulously to create hundreds of paper-thin layers.</p>
                  </div>
                  <div className="process-step">
                      <h3 className="text-3xl font-bold text-stone-200">Proofing</h3>
                      <p className="text-lg mt-2 text-stone-300">We allow our pastries to rest and rise slowly, developing the deep, complex flavors that define a truly majestic eat.</p>
                  </div>
                  <div className="process-step">
                      <h3 className="text-3xl font-bold text-stone-200">The Bake</h3>
                      <p className="text-lg mt-2 text-stone-300">Baked at the perfect temperature until golden and crisp, revealing a tender, airy interior that melts in your mouth.</p>
                  </div>
              </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="testimonials-section bg-stone-900/50 py-16 md:py-24 relative z-10">
          <div className="container mx-auto px-4 text-center">
              <h2 className="text-4xl md:text-5xl font-bold font-['font1'] text-rose-400 mb-12">From Our Patrons</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="testimonial-card bg-stone-800/50 border border-stone-700 p-8 rounded-2xl shadow-xl">
                      <p className="text-lg italic text-stone-300">"The croissants here are a little piece of Paris in Kolkata. The best I've ever had!"</p>
                      <p className="mt-4 font-bold text-stone-200">- Rohan K.</p>
                  </div>
                  <div className="testimonial-card bg-stone-800/50 border border-stone-700 p-8 rounded-2xl shadow-xl">
                      <p className="text-lg italic text-stone-300">"The cinnamon rolls are pure comfort. I can't leave without buying one for the road."</p>
                      <p className="mt-4 font-bold text-stone-200">- Priya S.</p>
                  </div>
                  <div className="testimonial-card bg-stone-800/50 border border-stone-700 p-8 rounded-2xl shadow-xl">
                      <p className="text-lg italic text-stone-300">"Their macarons are works of art. Beautiful and absolutely delicious."</p>
                      <p className="mt-4 font-bold text-stone-200">- Anjali M.</p>
                  </div>
              </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta-section h-screen w-screen flex items-center justify-center text-center bg-gradient-to-br from-stone-900 to-rose-900/40 relative z-10">
          <div className="container mx-auto px-4 cta-content">
              <h2 className="text-4xl md:text-5xl font-bold font-['font1'] text-rose-400 mb-6">Dreaming of a Pastry Feast?</h2>
              <p className="text-xl text-stone-300 mb-8 max-w-2xl mx-auto">From weddings to birthdays, our artisans can bring your vision to life. Let's create something majestic together.</p>
              <Link to="/custom-order">
                  <button className="bg-rose-500 hover:bg-rose-600 text-white font-bold py-4 px-10 rounded-full shadow-lg transition-all duration-300 transform hover:-translate-y-1">Explore More</button>
              </Link>
          </div>
        </section>
        
        <BottomSection />
      </div>
    );
  };

  export default PastriesPage;