import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const GiftingPage = () => {
  const container = useRef(null);
  const galleryContainer = useRef(null);

  useGSAP(() => {
    // --- Hero Animation ---
    gsap.timeline()
      .from('.anim-hero-char', { y: 100, opacity: 0, stagger: 0.05, duration: 1, ease: 'power3.out' })
      .from('.anim-hero-subtitle', { y: 50, opacity: 0, duration: 0.8, ease: 'power2.out' }, "-=0.6");

    // --- Horizontal Gallery Animation ---
    const sections = gsap.utils.toArray(".gallery-panel");
    if (sections.length > 0) {
      gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: galleryContainer.current,
          pin: true,
          scrub: 1,
          snap: 1 / (sections.length - 1),
          end: () => "+=" + galleryContainer.current.offsetWidth,
        },
      });
    }

    // --- Event Cards Animation ---
    gsap.from('.event-card', {
      scrollTrigger: { trigger: '.events-section', start: 'top 70%' },
      y: 100, opacity: 0, stagger: 0.2, duration: 1, ease: 'power3.out'
    });
    
    // --- "How It Works" Step Animation ---
    gsap.from('.step-item', {
        scrollTrigger: { trigger: '.steps-section', start: 'top 70%' },
        y: 80, opacity: 0, stagger: 0.2, duration: 0.8, ease: 'power2.out'
    });

    // --- CTA Animation ---
     gsap.from('.cta-content > *', {
        scrollTrigger: { trigger: '.cta-section', start: 'top 80%' },
        y: 50, opacity: 0, stagger: 0.2, duration: 1, ease: 'power3.out'
    });

  }, { scope: container });

  return (
    <div ref={container} className="bg-amber-50 text-amber-900 font-[sans-serif]">
      {/* --- Hero Section --- */}
      <section className="relative h-screen flex justify-center items-center text-center text-white overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full -z-10">
          <video
            src="https://assets.mixkit.co/videos/preview/mixkit-decorating-a-cake-with-white-cream-4239-large.mp4"
            className="w-full h-full object-cover"
            autoPlay loop muted playsInline
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        <div className="z-10">
          <h1 className="text-6xl md:text-8xl font-['font1'] font-bold tracking-tighter">
            {"Celebrate".split("").map((char, i) => <span key={i} className="inline-block anim-hero-char">{char}</span>)}
          </h1>
          <h2 className="text-5xl md:text-7xl font-['font1'] font-bold tracking-tighter mt-2">
            {"Majestically".split("").map((char, i) => <span key={i} className="inline-block anim-hero-char" style={{animationDelay: `${i * 0.05}s`}}>{char}</span>)}
          </h2>
          <p className="anim-hero-subtitle text-xl md:text-2xl mt-4 font-['font2']">Bespoke bakes for your most memorable moments.</p>
        </div>
      </section>

      {/* --- Offerings Section --- */}
      <section className="events-section py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-12">For Every Occasion</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="event-card">
                    <div className="overflow-hidden rounded-2xl shadow-lg"><img src="https://images.unsplash.com/photo-1587329245199-1c503c0356c9?q=80&w=1968&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Wedding Cake" className="w-full h-80 object-cover"/></div>
                    <h3 className="text-2xl font-bold mt-6">Weddings</h3>
                    <p className="mt-2 text-gray-600">From grand centerpieces to delicate favors, we craft unforgettable wedding cakes and dessert tables.</p>
                </div>
                <div className="event-card">
                    <div className="overflow-hidden rounded-2xl shadow-lg"><img src="https://images.unsplash.com/photo-1607478913361-b6a15550a234?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Birthday Party" className="w-full h-80 object-cover"/></div>
                    <h3 className="text-2xl font-bold mt-6">Birthdays & Parties</h3>
                    <p className="mt-2 text-gray-600">Celebrate another year with custom cakes, cupcakes, and treats that bring your theme to life.</p>
                </div>
                <div className="event-card">
                    <div className="overflow-hidden rounded-2xl shadow-lg"><img src="https://images.unsplash.com/photo-1554118811-2b475c753545?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Corporate Event" className="w-full h-80 object-cover"/></div>
                    <h3 className="text-2xl font-bold mt-6">Corporate Events</h3>
                    <p className="mt-2 text-gray-600">Impress clients and colleagues with branded desserts, gift boxes, and catering for any business function.</p>
                </div>
            </div>
        </div>
      </section>

      {/* --- Horizontal Gallery Section --- */}
      <section ref={galleryContainer} className="gallery-section h-screen w-screen overflow-hidden relative">
        <div className="flex w-[300vw]">
          <div className="gallery-panel w-screen h-screen flex justify-center items-center p-8 bg-amber-100">
            <div className="text-center max-w-2xl">
                <h2 className="text-4xl font-bold mb-4">A Showcase of Our Craft</h2>
                <p className="text-xl">Scroll to explore a gallery of our signature creations, handcrafted for moments just like yours.</p>
            </div>
          </div>
          <div className="gallery-panel w-screen h-screen bg-cover bg-center" style={{backgroundImage: "url('https://images.unsplash.com/photo-1559620192-032c4bc4674e?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"}}></div>
          <div className="gallery-panel w-screen h-screen bg-cover bg-center" style={{backgroundImage: "url('https://images.unsplash.com/photo-1599785209707-a456fc1337bb?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"}}></div>
        </div>
      </section>

      {/* --- How It Works Section --- */}
      <section className="steps-section py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-12">Your Vision, Our Craft</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                <div className="step-item">
                    <div className="text-4xl font-bold text-rose-400 mb-4">1.</div>
                    <h3 className="text-2xl font-bold mb-2">Consultation</h3>
                    <p className="text-gray-600">Share your vision with us. We’ll discuss themes, flavors, and all the little details that make an event unique.</p>
                </div>
                <div className="step-item">
                    <div className="text-4xl font-bold text-rose-400 mb-4">2.</div>
                    <h3 className="text-2xl font-bold mb-2">Customization</h3>
                    <p className="text-gray-600">Our artisans will design a bespoke menu or a stunning centerpiece cake, tailored perfectly to your occasion.</p>
                </div>
                <div className="step-item">
                    <div className="text-4xl font-bold text-rose-400 mb-4">3.</div>
                    <h3 className="text-2xl font-bold mb-2">Celebration</h3>
                    <p className="text-gray-600">Relax and enjoy as we deliver a majestic serving of sweetness, ready to delight you and your guests.</p>
                </div>
            </div>
        </div>
      </section>

      {/* --- CTA Section --- */}
      <section className="cta-section py-20 md:py-32 text-center bg-amber-100">
        <div className="container mx-auto px-4 relative z-10 cta-content">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Let's Plan Your Perfect Event</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">Contact us today to schedule a complimentary consultation and tasting.</p>
            <Link to="/contact">
                <button className="bg-rose-500 hover:bg-rose-600 text-white font-bold py-4 px-10 rounded-full shadow-lg transition-transform transform hover:scale-105">
                    Inquire Now
                </button>
            </Link>
        </div>
      </section>
    </div>
  );
};

export default GiftingPage;