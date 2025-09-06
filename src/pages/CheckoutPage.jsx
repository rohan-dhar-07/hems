import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '../components/home/Navbar';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Mock data for the order summary (in a real app, this would come from a global state)
const mockCartItems = [
    { id: 1, name: "Velvet Dream Cake", price: 1599.00, quantity: 1, image: "https://images.unsplash.com/photo-1606313564200-e85b94de43ee?q=80&w=1974&auto=format&fit=crop" },
    { id: 7, name: "Classic Croissant", price: 199.00, quantity: 2, image: "https://images.unsplash.com/photo-1555507036-ab794f24d8c7?q=80&w=2070" },
];

const CheckoutPage = () => {
    const container = useRef(null);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsProcessing(true);

        // Simulate an API call
        gsap.timeline()
            .to('.form-button', { innerText: 'Processing...', duration: 1, ease: 'none' })
            .to('.form-button', { 
                innerText: 'Order Placed!', 
                backgroundColor: '#22c55e', 
                duration: 0.5,
                onComplete: () => {
                    // In a real app, you would redirect or show a success message
                    setTimeout(() => alert("Thank you for your order!"), 200);
                }
            });
    };

    useGSAP(() => {
        // --- Hero Animation ---
        gsap.from('.hero-mask-content', { yPercent: 100, duration: 1.2, ease: 'power3.out', delay: 0.5 });
        
        // --- Animate sections on scroll ---
        gsap.utils.toArray('.anim-section').forEach(section => {
            gsap.from(section.querySelectorAll('.anim-title .char'), {
                scrollTrigger: { trigger: section, start: 'top 80%' },
                y: 100, opacity: 0, stagger: 0.05, duration: 1, ease: 'power3.out'
            });
            gsap.from(section.querySelectorAll('.anim-field'), {
                scrollTrigger: { trigger: section, start: 'top 70%' },
                y: 50, opacity: 0, stagger: 0.15, duration: 0.8, ease: 'power2.out'
            });
        });

        // --- Sticky Order Summary ---
        ScrollTrigger.create({
            trigger: '.summary-container',
            start: 'top 10%',
            endTrigger: '.checkout-form',
            end: 'bottom 80%',
            pin: true,
            pinSpacing: false,
        });

    }, { scope: container });

    const subtotal = mockCartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const shipping = 50.00;
    const total = subtotal + shipping;

    return (
        <div ref={container} className="bg-[#F3EFEA] text-[#4E4234] font-sans">
            <Navbar />
            
            {/* --- Hero Section --- */}
            <section className="h-[60vh] flex flex-col justify-center items-center text-center relative">
                <div className="hero-mask overflow-hidden">
                    <h1 className="hero-mask-content text-6xl md:text-8xl font-['font1'] font-bold">The Final Flourish</h1>
                </div>
                <div className="hero-mask overflow-hidden mt-4">
                    <p className="hero-mask-content text-xl md:text-2xl text-stone-600">Please review your order and provide your details below.</p>
                </div>
            </section>

            {/* --- Checkout Section --- */}
            <div className="container mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-5 gap-12">
                {/* Left Side: Form */}
                <form onSubmit={handleSubmit} className="checkout-form lg:col-span-3 space-y-12">
                    {/* Shipping Details */}
                    <div className="anim-section">
                        <h2 className="anim-title text-3xl font-bold mb-6 overflow-hidden">
                            {"Shipping Details".split("").map((c,i) => <span key={i} className="char inline-block">{c === " " ? "\u00A0" : c}</span>)}
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="anim-field"><label className="block mb-1">Full Name</label><input type="text" required className="w-full p-3 bg-white border rounded-md"/></div>
                            <div className="anim-field"><label className="block mb-1">Email</label><input type="email" required className="w-full p-3 bg-white border rounded-md"/></div>
                            <div className="anim-field md:col-span-2"><label className="block mb-1">Address</label><input type="text" required className="w-full p-3 bg-white border rounded-md"/></div>
                            <div className="anim-field"><label className="block mb-1">City</label><input type="text" required className="w-full p-3 bg-white border rounded-md"/></div>
                            <div className="anim-field"><label className="block mb-1">PIN Code</label><input type="text" required className="w-full p-3 bg-white border rounded-md"/></div>
                        </div>
                    </div>
                    
                    {/* Payment Information */}
                    <div className="anim-section">
                         <h2 className="anim-title text-3xl font-bold mb-6 overflow-hidden">
                            {"Payment Information".split("").map((c,i) => <span key={i} className="char inline-block">{c === " " ? "\u00A0" : c}</span>)}
                        </h2>
                        <div className="space-y-6">
                            <div className="anim-field"><label className="block mb-1">Card Number</label><input type="text" required placeholder="•••• •••• •••• ••••" className="w-full p-3 bg-white border rounded-md"/></div>
                            <div className="grid grid-cols-2 gap-6">
                               <div className="anim-field"><label className="block mb-1">Expiry Date</label><input type="text" required placeholder="MM / YY" className="w-full p-3 bg-white border rounded-md"/></div>
                               <div className="anim-field"><label className="block mb-1">CVC</label><input type="text" required placeholder="•••" className="w-full p-3 bg-white border rounded-md"/></div>
                            </div>
                        </div>
                    </div>

                    <div className="pt-8">
                        <button type="submit" disabled={isProcessing} className="form-button w-full bg-stone-800 hover:bg-rose-600 text-white font-bold py-4 px-10 rounded-full shadow-lg text-xl">
                            Place Order
                        </button>
                    </div>
                </form>

                {/* Right Side: Order Summary */}
                <div className="lg:col-span-2">
                    <div className="summary-container bg-white rounded-2xl shadow-lg p-8">
                        <h2 className="text-3xl font-bold mb-6 border-b pb-4">Order Summary</h2>
                        <div className="space-y-4">
                            {mockCartItems.map(item => (
                                <div key={item.id} className="flex justify-between items-center">
                                    <div>
                                        <p className="font-bold">{item.name}</p>
                                        <p className="text-sm text-stone-600">Quantity: {item.quantity}</p>
                                    </div>
                                    <p className="font-semibold">₹{(item.price * item.quantity).toFixed(2)}</p>
                                </div>
                            ))}
                        </div>
                        <div className="mt-8 border-t pt-4 space-y-2">
                            <div className="flex justify-between text-lg"><p>Subtotal</p><p>₹{subtotal.toFixed(2)}</p></div>
                            <div className="flex justify-between text-lg"><p>Shipping</p><p>₹{shipping.toFixed(2)}</p></div>
                            <div className="flex justify-between text-2xl font-bold mt-4"><p>Total</p><p>₹{total.toFixed(2)}</p></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
