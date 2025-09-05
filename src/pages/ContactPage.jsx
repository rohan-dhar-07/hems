import React, { useState, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// 1. Correct the import to use the actual component name, "Video2"
import Video2 from '../components/home/video2'; 

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const ContactPage = () => {
  const container = useRef(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    alert("Thank you for your message! We'll get back to you soon.");
    setFormData({ name: '', email: '', message: '' }); // Reset form
  };

  useGSAP(() => {
    const heroTl = gsap.timeline();
    heroTl
      .from('.anim-letter', { yPercent: 100, opacity: 0, rotationZ: 15, stagger: 0.05, duration: 0.8, ease: 'power3.out' })
      .from('.anim-underline', { scaleX: 0, transformOrigin: 'left center', duration: 0.7, ease: 'power2.out' }, "-=0.5")
      .from('.anim-word', { y: 30, opacity: 0, stagger: 0.1, duration: 0.6, ease: 'power2.out' }, "-=0.5");

    const formTl = gsap.timeline({ scrollTrigger: { trigger: '.contact-form-section', start: 'top 70%' } });
    formTl.from('.form-title', { y: 50, opacity: 0, duration: 0.8, ease: 'power3.out' })
          .from('.form-field', { x: -50, opacity: 0, duration: 0.6, stagger: 0.2, ease: 'power2.out' }, "-=0.5")
          .from('.form-button', { scale: 0.5, opacity: 0, duration: 0.7, ease: 'back.out(1.7)' });

    gsap.from('.location-details', { scrollTrigger: { trigger: '.location-section', start: 'top 70%' }, x: -100, opacity: 0, duration: 1, ease: 'power3.out' });
    gsap.from('.map-embed', { scrollTrigger: { trigger: '.location-section', start: 'top 70%' }, x: 100, opacity: 0, duration: 1, ease: 'power3.out' });
    gsap.from('.social-icon', { scrollTrigger: { trigger: '.socials-section', start: 'top 80%' }, y: 50, scale: 0.5, opacity: 0, stagger: 0.15, duration: 0.6, ease: 'back.out(1.7)' });

  }, { scope: container });

  return (
    <div ref={container} className="bg-amber-50 text-amber-900 font-[sans-serif]">
      <section className="relative h-screen flex justify-center items-center text-center text-white overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full -z-10">
          {/* 2. Use the correctly imported component name, "Video2" */}
          <Video2 />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        <div>
          <h1 className="text-6xl md:text-8xl font-['font1'] font-bold">
            {"Get in Touch".split("").map((letter, index) => (
              <span key={index} className="inline-block overflow-hidden">
                <span className="inline-block anim-letter" style={{ whiteSpace: 'pre' }}>{letter}</span>
              </span>
            ))}
          </h1>
          <div className="anim-underline h-1 w-3/4 max-w-lg mx-auto mt-4 bg-rose-400"></div>
          <p className="text-xl md:text-2xl mt-6 font-['font2']">
            {"We’d love to hear from you!".split(" ").map((word, index) => (
              <span key={index} className="inline-block overflow-hidden mr-2">
                <span className="inline-block anim-word">{word}</span>
              </span>
            ))}
          </p>
        </div>
      </section>

      {/* ... rest of your page code ... */}
      <section className="contact-form-section container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-2xl mx-auto">
          <h2 className="form-title text-4xl font-bold text-center mb-12">Send Us a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-field"><label htmlFor="name" className="block text-lg font-semibold mb-2">Your Name</label><input type="text" name="name" value={formData.name} onChange={handleInputChange} required className="w-full px-4 py-3 bg-white rounded-lg border-2 border-amber-200 focus:outline-none focus:border-rose-400" /></div>
            <div className="form-field"><label htmlFor="email" className="block text-lg font-semibold mb-2">Your Email</label><input type="email" name="email" value={formData.email} onChange={handleInputChange} required className="w-full px-4 py-3 bg-white rounded-lg border-2 border-amber-200 focus:outline-none focus:border-rose-400" /></div>
            <div className="form-field"><label htmlFor="message" className="block text-lg font-semibold mb-2">Your Message</label><textarea name="message" value={formData.message} onChange={handleInputChange} required rows="5" className="w-full px-4 py-3 bg-white rounded-lg border-2 border-amber-200 focus:outline-none focus:border-rose-400"></textarea></div>
            <div className="text-center"><button type="submit" className="form-button bg-rose-500 hover:bg-rose-600 text-white font-bold py-4 px-10 rounded-full shadow-lg">Send Message</button></div>
          </form>
        </div>
      </section>

      <section className="location-section bg-white py-16 md:py-24">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="location-details text-center md:text-left">
            <h2 className="text-4xl font-bold mb-6">Visit Our Bakery</h2>
            <p className="text-xl mb-2">123 Sweet Street, Pastry Plaza</p><p className="text-xl mb-6">North Dumdum, WB 700001</p>
            <p className="text-lg mb-2"><span className="font-semibold">Hours:</span> Mon - Sat, 8 AM - 6 PM</p><p className="text-lg"><span className="font-semibold">Phone:</span> (123) 456-7890</p>
          </div>
          <div className="map-embed h-80 md:h-96 rounded-2xl overflow-hidden shadow-lg">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117861.92683955631!2d88.35336735596489!3d22.62473852033878!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f89e47f719b78d%3A0x135ae36f6d502f2a!2sNorth%20Dumdum%2C%20West%20Bengal!5e0!3m2!1sen!2sin!4v1725513365825!5m2!1sen!2sin" width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
          </div>
        </div>
      </section>

      <section className="socials-section bg-amber-100 py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-8">Find Us on Socials</h2>
          <div className="flex justify-center space-x-6 md:space-x-8">
            <a href="#" className="social-icon text-amber-800 hover:text-rose-500"><svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.584-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011-3.584.069-4.85c.149-3.225 1.664-4.771 4.919 4.919C8.416 2.175 8.796 2.163 12 2.163zm0 1.802c-3.116 0-3.483.011-4.71.069-2.734.124-3.958 1.344-4.082 4.082-.058 1.227-.069 1.593-.069 4.71s.011 3.483.069 4.71c.124 2.734 1.348 3.958 4.082 4.082 1.227.058 1.593.069 4.71.069s3.483-.011 4.71-.069c2.734-.124 3.958-1.348 4.082-4.082.058-1.227.069-1.593.069-4.71s-.011-3.483-.069-4.71c-.124-2.734-1.348-3.958-4.082-4.082-1.227-.058-1.593-.069-4.71-.069zm0 3.067a5.169 5.169 0 100 10.338 5.169 5.169 0 000-10.338zm0 1.802a3.367 3.367 0 110 6.734 3.367 3.367 0 010-6.734zM16.949 5.358a1.242 1.242 0 100 2.484 1.242 1.242 0 000-2.484z" /></svg></a>
            <a href="#" className="social-icon text-amber-800 hover:text-rose-500"><svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35C.59 0 0 .59 0 1.325v21.35C0 23.41.59 24 1.325 24H12.82v-9.29H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h5.698C23.41 24 24 23.41 24 22.675V1.325C24 .59 23.41 0 22.675 0z" /></svg></a>
            <a href="#" className="social-icon text-amber-800 hover:text-rose-500"><svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" /></svg></a>
          </div>
        </div>
      </section>

    </div>
  );
};

export default ContactPage;

