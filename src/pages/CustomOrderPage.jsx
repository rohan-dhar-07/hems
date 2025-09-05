import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const CustomOrderPage = () => {
  const container = useRef(null);
  const [step, setStep] = useState(1);
  const [order, setOrder] = useState({
    type: '',
    flavor: '',
    size: '',
    details: ''
  });

  const handleSelect = (field, value) => {
    gsap.to(`.step-${step}`, { autoAlpha: 0, y: -50, duration: 0.5, onComplete: () => {
      setOrder(prev => ({ ...prev, [field]: value }));
      setStep(prev => prev + 1);
    }});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Custom Order Submitted:", order);
    alert("Thank you for your inquiry! Our team will contact you shortly to finalize the details.");
    setOrder({ type: '', flavor: '', size: '', details: '' });
    setStep(1);
  };
  
  // Animate the steps changing
  useGSAP(() => {
    gsap.fromTo(`.step-${step}`, { autoAlpha: 0, y: 50 }, { autoAlpha: 1, y: 0, duration: 0.5, delay: 0.5 });
  }, [step]);

  useGSAP(() => {
    // --- Hero Animation ---
    gsap.from('.anim-hero-char', { y: 100, opacity: 0, stagger: 0.05, duration: 1, ease: 'power3.out' });

    // --- Wizard Animation ---
    gsap.from('.wizard-container', {
      scrollTrigger: { trigger: '.wizard-section', start: 'top 70%' },
      y: 100, opacity: 0, duration: 1, ease: 'power3.out'
    });
    
  }, { scope: container });

  return (
    <div ref={container} className="bg-amber-50 text-amber-900 font-[sans-serif]">
      {/* --- Hero Section --- */}
      <section className="relative h-screen flex justify-center items-center text-center text-white overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full -z-10">
          <video src="https://assets.mixkit.co/videos/preview/mixkit-a-baker-sifting-flour-in-a-kitchen-4238-large.mp4" className="w-full h-full object-cover" autoPlay loop muted playsInline />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        <div className="z-10">
          <h1 className="text-6xl md:text-8xl font-['font1'] font-bold tracking-tighter">
            {"Your Vision, Our Creation".split("").map((char, i) => <span key={i} className="inline-block anim-hero-char">{char}</span>)}
          </h1>
        </div>
      </section>

      {/* --- Custom Order Wizard Section --- */}
      <section className="wizard-section container mx-auto px-4 py-16 md:py-24">
        <div className="wizard-container grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Left Side: Steps */}
          <div className="lg:col-span-2">
            <h2 className="text-4xl font-bold mb-8">Create Your Majestic Serving</h2>
            
            {/* Step 1: Choose Type */}
            {step === 1 && (
              <div className="step-1">
                <h3 className="text-2xl font-semibold mb-6">Step 1: What are we baking?</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div onClick={() => handleSelect('type', 'Cake')} className="option-card cursor-pointer bg-white p-6 rounded-2xl shadow-lg text-center transition-transform transform hover:scale-105">
                    <img src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=2070" alt="Cake" className="w-full h-40 object-cover rounded-lg mb-4"/>
                    <span className="text-xl font-bold">Cake</span>
                  </div>
                  <div onClick={() => handleSelect('type', 'Cupcakes')} className="option-card cursor-pointer bg-white p-6 rounded-2xl shadow-lg text-center transition-transform transform hover:scale-105">
                     <img src="https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?q=80&w=1974" alt="Cupcakes" className="w-full h-40 object-cover rounded-lg mb-4"/>
                    <span className="text-xl font-bold">Cupcakes</span>
                  </div>
                   <div onClick={() => handleSelect('type', 'Cookies')} className="option-card cursor-pointer bg-white p-6 rounded-2xl shadow-lg text-center transition-transform transform hover:scale-105">
                     <img src="https://images.unsplash.com/photo-1590080874088-eec64895b423?q=80&w=2070" alt="Cookies" className="w-full h-40 object-cover rounded-lg mb-4"/>
                    <span className="text-xl font-bold">Cookies</span>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Choose Flavor */}
            {step === 2 && (
              <div className="step-2">
                <h3 className="text-2xl font-semibold mb-6">Step 2: Choose a flavor</h3>
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div onClick={() => handleSelect('flavor', 'Chocolate')} className="flavor-card cursor-pointer bg-white p-4 rounded-2xl shadow text-center hover:shadow-xl transition-shadow">Chocolate</div>
                  <div onClick={() => handleSelect('flavor', 'Vanilla')} className="flavor-card cursor-pointer bg-white p-4 rounded-2xl shadow text-center hover:shadow-xl transition-shadow">Vanilla</div>
                  <div onClick={() => handleSelect('flavor', 'Red Velvet')} className="flavor-card cursor-pointer bg-white p-4 rounded-2xl shadow text-center hover:shadow-xl transition-shadow">Red Velvet</div>
                  <div onClick={() => handleSelect('flavor', 'Lemon')} className="flavor-card cursor-pointer bg-white p-4 rounded-2xl shadow text-center hover:shadow-xl transition-shadow">Lemon</div>
                </div>
              </div>
            )}

            {/* Step 3: Size & Details */}
            {step === 3 && (
              <form onSubmit={handleSubmit} className="step-3">
                <h3 className="text-2xl font-semibold mb-6">Step 3: Final Details</h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-lg font-semibold mb-2">Serving Size / Quantity</label>
                    <input type="text" value={order.size} onChange={(e) => setOrder({...order, size: e.target.value})} required placeholder="e.g., '12 people' or '2 dozen'" className="w-full px-4 py-3 bg-white rounded-lg border-2 border-amber-200 focus:outline-none focus:border-rose-400"/>
                  </div>
                   <div>
                    <label className="block text-lg font-semibold mb-2">Special Instructions</label>
                    <textarea value={order.details} onChange={(e) => setOrder({...order, details: e.target.value})} rows="4" placeholder="e.g., 'Happy Birthday, Rohan!' inscription, color scheme..." className="w-full px-4 py-3 bg-white rounded-lg border-2 border-amber-200 focus:outline-none focus:border-rose-400"></textarea>
                  </div>
                  <div className="text-center pt-4">
                    <button type="submit" className="bg-rose-500 hover:bg-rose-600 text-white font-bold py-4 px-10 rounded-full shadow-lg">Submit Inquiry</button>
                  </div>
                </div>
              </form>
            )}

          </div>

          {/* Right Side: Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-8 sticky top-24">
              <h3 className="text-2xl font-bold mb-6 border-b pb-4">Your Custom Creation</h3>
              <div className="space-y-4">
                <div>
                  <span className="font-semibold block">Type:</span>
                  <p className="text-rose-500">{order.type || '...'}</p>
                </div>
                <div>
                  <span className="font-semibold block">Flavor:</span>
                  <p className="text-rose-500">{order.flavor || '...'}</p>
                </div>
                <div>
                  <span className="font-semibold block">Size:</span>
                  <p className="text-rose-500">{order.size || '...'}</p>
                </div>
                 <div>
                  <span className="font-semibold block">Details:</span>
                  <p className="text-rose-500 truncate">{order.details || '...'}</p>
                </div>
              </div>
              <p className="text-sm mt-8 text-gray-500">This is an inquiry form. Our team will contact you to confirm pricing and finalize your order.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CustomOrderPage;
