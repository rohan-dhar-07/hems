import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const AboutPage = () => {
  const container = useRef(null);

  useGSAP(() => {
    // --- Hero Animation ---
    const heroTl = gsap.timeline();
    heroTl
      .from('.anim-hero-word', { yPercent: 100, opacity: 0, stagger: 0.1, duration: 1, ease: 'power3.out' })
      .from('.anim-hero-line', { scaleX: 0, transformOrigin: 'center', duration: 0.8, ease: 'power2.out' }, "-=0.5");

    // --- Story Section Animation ---
    gsap.from('.story-image', {
      scrollTrigger: { trigger: '.story-section', start: 'top 70%' },
      x: -100, opacity: 0, duration: 1, ease: 'power3.out'
    });
    gsap.from('.story-content > *', {
      scrollTrigger: { trigger: '.story-section', start: 'top 70%' },
      x: 100, opacity: 0, stagger: 0.2, duration: 1, ease: 'power3.out'
    });

    // --- Founders Section Animation ---
    gsap.from('.founder-card', {
      scrollTrigger: { trigger: '.founders-section', start: 'top 70%' },
      y: 100, opacity: 0, stagger: 0.2, duration: 0.8, ease: 'power2.out'
    });

    // --- Philosophy Section 3D Card Animation ---
    gsap.utils.toArray('.philosophy-card').forEach(card => {
      gsap.from(card, {
        scrollTrigger: { trigger: card, start: "top 80%" },
        opacity: 0, scale: 0.8, rotateX: -60, transformOrigin: "center top",
        duration: 1, ease: 'expo.out'
      });
    });
    
    // --- CTA Section Animation ---
    gsap.from('.cta-content > *', {
        scrollTrigger: { trigger: '.cta-section', start: 'top 70%' },
        y: 50, opacity: 0, stagger: 0.2, duration: 1, ease: 'power3.out'
    });
    gsap.to('.cta-bg', {
        scale: 1.1,
        ease: 'none',
        scrollTrigger: {
            trigger: '.cta-section',
            scrub: true,
        }
    });


  }, { scope: container });

  return (
    <div ref={container} className="bg-amber-50 text-amber-900 font-[sans-serif]">
      {/* --- Hero Section --- */}
      <section className="relative h-screen flex justify-center items-center text-center text-white overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full -z-10">
          <video
            src="https://assets.mixkit.co/videos/preview/mixkit-pastries-with-icing-sugar-on-a-black-table-4235-large.mp4"
            className="w-full h-full object-cover"
            autoPlay loop muted playsInline
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        <div className="z-10">
            <h1 className="text-5xl md:text-7xl font-['font1'] font-bold tracking-wide">
                {"Humble Eats, Majestic Servings".split(" ").map((word, index) => (
                    <span key={index} className="inline-block overflow-hidden mr-3">
                        <span className="inline-block anim-hero-word">{word}</span>
                    </span>
                ))}
            </h1>
            <div className="anim-hero-line h-1 w-1/2 max-w-sm mx-auto mt-6 bg-rose-400"></div>
        </div>
      </section>

      {/* --- Our Story Section --- */}
      <section className="story-section bg-white py-16 md:py-24">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="story-image rounded-2xl overflow-hidden shadow-lg">
            <img src="https://images.unsplash.com/photo-1555507036-ab794f24d8c7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Inside the HEMS Bakery kitchen" className="w-full h-full object-cover" />
          </div>
          <div className="story-content text-center md:text-left">
            <h2 className="text-4xl font-bold mb-6">Our Journey of Flavor</h2>
            <p className="text-lg mb-4">HEMS — Humble Eats, Majestic Servings — was born from a simple idea: that the most memorable flavors come from the heart. We started in a small kitchen in North Dumdum, armed with family recipes and a passion for baking. Our dream was to create treats that were not just delicious, but also comforting—a reminder of home, crafted with the care and quality of a majestic feast.</p>
            <p className="text-lg">Today, that dream is baked into every loaf of bread and every delicate pastry. We still believe in the magic of simple, honest ingredients, transformed by skill and passion into something truly special for you.</p>
          </div>
        </div>
      </section>

      {/* --- Our Philosophy Section --- */}
      <section className="philosophy-section bg-amber-100 py-16 md:py-24 [perspective:1000px]">
        <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12">The HEMS Promise</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="philosophy-card bg-white p-8 rounded-2xl shadow-lg text-center">
                    <h3 className="text-2xl font-bold mb-4 text-rose-500">Uncompromising Quality</h3>
                    <p>We source the finest local ingredients, because we believe fresh, high-quality components are the foundation of exceptional taste.</p>
                </div>
                <div className="philosophy-card bg-white p-8 rounded-2xl shadow-lg text-center">
                    <h3 className="text-2xl font-bold mb-4 text-rose-500">Baked with Passion</h3>
                    <p>Every item on our menu is a labor of love, crafted by skilled bakers who pour their heart and soul into their work, every single day.</p>
                </div>
                <div className="philosophy-card bg-white p-8 rounded-2xl shadow-lg text-center">
                    <h3 className="text-2xl font-bold mb-4 text-rose-500">Community at Heart</h3>
                    <p>We're more than a bakery; we're a neighborhood hub. We cherish our community and strive to create a warm, welcoming space for all.</p>
                </div>
            </div>
        </div>
      </section>

      {/* --- Founders Section --- */}
      <section className="founders-section bg-white py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-12">Meet the Founders</h2>
            <div className="flex flex-wrap justify-center gap-12">
                <div className="founder-card text-center max-w-xs">
                    <img src="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Founder Jane Doe" className="w-40 h-40 rounded-full mx-auto mb-4 object-cover shadow-lg" />
                    <h3 className="text-2xl font-bold">Jane Doe</h3>
                    <p className="text-rose-500">Head Pâtissier</p>
                    <p className="mt-2 text-gray-600">The creative force behind our most beloved pastries and cakes.</p>
                </div>
                <div className="founder-card text-center max-w-xs">
                    <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Founder John Smith" className="w-40 h-40 rounded-full mx-auto mb-4 object-cover shadow-lg" />
                    <h3 className="text-2xl font-bold">John Smith</h3>
                    <p className="text-rose-500">Master Baker</p>
                    <p className="mt-2 text-gray-600">The heart of our bakery, ensuring every loaf of bread is perfect.</p>
                </div>
            </div>
        </div>
      </section>

      {/* --- Call to Action Section --- */}
      <section className="cta-section relative py-20 md:py-32 text-center text-white overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full">
            <img src="https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="A spread of delicious bakery items" className="cta-bg w-full h-full object-cover"/>
            <div className="absolute inset-0 bg-black/50"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10 cta-content">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready for a Taste of Heaven?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">Explore our full menu of cakes, cookies, and pastries, all available for you to enjoy.</p>
            <Link to="/order">
                <button className="bg-rose-500 hover:bg-rose-600 font-bold py-4 px-10 rounded-full shadow-lg transition-transform transform hover:scale-105">
                    View Our Bakes
                </button>
            </Link>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;

