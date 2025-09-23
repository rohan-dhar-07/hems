import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const BottomSection = () => {
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const categoriesRef = useRef(null);
  const menuRef = useRef(null);

  const categoryItems = [
    { name: 'Cakes', path: '/cake', color: 'bg-pink-500', hoverColor: 'hover:bg-pink-600' },
    { name: 'Pastries', path: '/pastries', color: 'bg-rose-500', hoverColor: 'hover:bg-rose-600' },
    { name: 'Breads', path: '/breads', color: 'bg-amber-500', hoverColor: 'hover:bg-amber-600' },
    { name: 'Ice Cream', path: '/icecream', color: 'bg-sky-500', hoverColor: 'hover:bg-sky-600' }
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (categoriesRef.current && !categoriesRef.current.contains(event.target)) {
        setIsCategoriesOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useGSAP(() => {
    if (isCategoriesOpen) {
      gsap.fromTo(menuRef.current,
        { clipPath: 'circle(0% at 50% 100%)' },
        { clipPath: 'circle(150% at 50% 100%)', duration: 0.5, ease: 'power3.out' }
      );
    }
  }, [isCategoriesOpen]);

  const handleCategoryLinkClick = () => {
    setIsCategoriesOpen(false);
  };

  return (
    <>
      {/* --- NEW EXPANDED FOOTER --- */}
      <footer className="bg-pink-900 text-pink-100">

        {/* 1. PROMOTIONAL BANNER */}
        <div 
          className="py-16 bg-cover bg-center bg-no-repeat" 
          style={{ backgroundImage: `linear-gradient(rgba(131, 24, 67, 0.8), rgba(131, 24, 67, 0.8)), url('https://images.pexels.com/photos/1702373/pexels-photo-1702373.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')` }}
        >
          <div className="container mx-auto px-4 text-center">
            <h3 className="text-3xl font-bold text-white mb-4">Plan Your Next Event With Us!</h3>
            <p className="text-pink-200 mb-8 max-w-2xl mx-auto">From custom cakes to corporate gifting, we make every occasion sweeter with handcrafted delights tailored to your needs.</p>
            <Link to="/gifting">
              <button className="bg-white text-pink-800 font-bold py-3 px-8 rounded-full transition-transform duration-300 transform hover:scale-105 shadow-lg">
                Explore Gifting & Events
              </button>
            </Link>
          </div>
        </div>

        {/* 2. MAIN FOOTER GRID */}
        <div className="container mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-center md:text-left">
          
          {/* Column 1: Brand & Social */}
          <div>
            <h4 className="text-2xl font-bold text-white mb-4">HEMS Bakery</h4>
            <p className="text-pink-200 mb-6">Baked with love, served with joy.</p>
            <div className="flex justify-center md:justify-start space-x-4">
              <a href="#" aria-label="Instagram" className="text-pink-200 hover:text-white transition-colors"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.584-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011-3.584.069-4.85c.149-3.225 1.664 4.771 4.919-4.919C8.416 2.175 8.796 2.163 12 2.163zm0 1.442c-3.141 0-3.504.012-4.724.068-2.697.123-3.993 1.423-4.116 4.116-.056 1.22-.067 1.58-.067 4.724s.011 3.504.067 4.724c.123 2.693 1.419 3.993 4.116 4.116 1.22.056 1.583.068 4.724.068s3.504-.012 4.724-.068c2.697-.123 3.993-1.423 4.116-4.116.056-1.22.067-1.58.067-4.724s-.011-3.504-.067-4.724c-.123-2.693-1.419-3.993-4.116-4.116-1.22-.056-1.583-.068-4.724-.068zM12 8.25a3.75 3.75 0 100 7.5 3.75 3.75 0 000-7.5zm0 6c-1.242 0-2.25-1.008-2.25-2.25s1.008-2.25 2.25-2.25 2.25 1.008 2.25 2.25-1.008 2.25-2.25 2.25zm5.12-6.9c-.496 0-.899.403-.899.899s.403.899.899.899.899-.403.899-.899-.403-.899-.899-.899z" /></svg></a>
              <a href="#" aria-label="Facebook" className="text-pink-200 hover:text-white transition-colors"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" /></svg></a>
              <a href="#" aria-label="Twitter" className="text-pink-200 hover:text-white transition-colors"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M22.46 6c-.77.34-1.6.57-2.46.67.88-.53 1.56-1.37 1.88-2.38-.83.49-1.74.85-2.7 1.03A4.29 4.29 0 0016.08 4c-2.38 0-4.3 1.92-4.3 4.3 0 .34.04.67.11.99-3.57-.18-6.74-1.89-8.86-4.49-.37.63-.58 1.37-.58 2.15 0 1.49.76 2.81 1.91 3.58-.7-.02-1.36-.21-1.94-.53v.05c0 2.08 1.48 3.82 3.44 4.21a4.3 4.3 0 01-1.93.07 4.3 4.3 0 004.02 2.98 8.62 8.62 0 01-5.33 1.84c-.35 0-.69-.02-1.03-.06A12.18 12.18 0 008.29 20c7.55 0 11.68-6.25 11.68-11.68l-.01-.53c.8-.58 1.49-1.3 2.04-2.13z" /></svg></a>
            </div>
          </div>
          
          {/* Column 2: Shop Links */}
          <div>
            <h5 className="font-bold text-white mb-4">Shop</h5>
            <ul className="space-y-3">
              <li><Link to="/cake" className="text-pink-200 hover:text-white transition-colors">Cakes</Link></li>
              <li><Link to="/pastries" className="text-pink-200 hover:text-white transition-colors">Pastries</Link></li>
              <li><Link to="/breads" className="text-pink-200 hover:text-white transition-colors">Breads</Link></li>
              <li><Link to="/icecream" className="text-pink-200 hover:text-white transition-colors">Ice Cream</Link></li>
            </ul>
          </div>
          
          {/* Column 3: Company Links */}
          <div>
            <h5 className="font-bold text-white mb-4">Our Company</h5>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-pink-200 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-pink-200 hover:text-white transition-colors">Contact</Link></li>
              <li><Link to="/faq" className="text-pink-200 hover:text-white transition-colors">FAQ</Link></li>
            </ul>
          </div>
          
          {/* Column 4: Newsletter */}
          <div>
            <h5 className="font-bold text-white mb-4">Join Our Newsletter</h5>
            <p className="text-pink-200 mb-4 text-sm">Get exclusive deals and fresh news delivered to your inbox.</p>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="flex">
                <input type="email" placeholder="Your email" className="w-full rounded-l-md border-0 bg-pink-700 text-white px-4 py-2 placeholder-pink-300 focus:ring-2 focus:ring-pink-400 focus:outline-none" />
                <button type="submit" className="bg-pink-500 hover:bg-pink-600 text-white font-bold px-4 rounded-r-md transition-colors">Go</button>
              </div>
            </form>
          </div>
        </div>

        {/* 3. SUB-FOOTER / LEGAL */}
        <div className="container mx-auto mt-8 pt-8 border-t border-pink-700 text-center text-pink-300">
          <p className="text-sm">
            Copyright &copy; {new Date().getFullYear()} HEMS Bakery & Co. All Rights Reserved. HEMS&trade; is a registered trademark.
          </p>
          <div className="mt-4 flex justify-center space-x-4 text-xs">
            <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <span>|</span>
            <Link to="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
          <p className="text-xs mt-4 max-w-3xl mx-auto">
            License Information: This website design and its content are the copyright of HEMS Bakery. Any redistribution or reproduction of part or all of the contents in any form is prohibited other than for personal and non-commercial use.
          </p>
        </div>
      </footer>

      {/* --- BOTTOM NAVIGATION BAR (Restored) --- */}
      <div className="fixed bottom-0 left-0 right-0 bg-pink-50 shadow-[0_-2px_10px_rgba(0,0,0,0.1)] z-50">
        <div className="container mx-auto h-16 flex justify-around items-center">
          <Link to="/" className="flex flex-col items-center justify-center text-center text-pink-800 hover:text-pink-600 transition-colors w-full h-full">
            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
            <span className="text-xs mt-1 font-semibold">Home</span>
          </Link>
          <div 
            ref={categoriesRef}
            onClick={() => setIsCategoriesOpen(!isCategoriesOpen)} 
            className="flex flex-col items-center justify-center text-center text-pink-600 hover:text-pink-800 transition-colors w-full h-full relative cursor-pointer"
          >
            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
            <span className="text-xs mt-1 font-semibold">Categories</span>
            {isCategoriesOpen && (
              <div ref={menuRef} className="absolute bottom-full mb-2 bg-white text-white p-2 rounded-lg shadow-lg w-32 space-y-2">
                  {categoryItems.map((item) => (
                    <Link 
                      key={item.name}
                      to={item.path} 
                      className={`block px-4 py-2 text-center rounded transition-colors ${item.color} ${item.hoverColor}`} 
                      onClick={handleCategoryLinkClick}
                    >
                      {item.name}
                    </Link>
                  ))}
              </div>
            )}
          </div>
          <Link to="/cart" className="flex flex-col items-center justify-center text-center text-pink-600 hover:text-pink-800 transition-colors w-full h-full">
            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
            <span className="text-xs mt-1 font-semibold">Cart</span>
          </Link>
          <Link to="/wishlist" className="flex flex-col items-center justify-center text-center text-pink-600 hover:text-pink-800 transition-colors w-full h-full">
            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
            <span className="text-xs mt-1 font-semibold">Wishlist</span>
          </Link>
          <Link to="/profile" className="flex flex-col items-center justify-center text-center text-pink-600 hover:text-pink-800 transition-colors w-full h-full">
            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
            <span className="text-xs mt-1 font-semibold">Profile</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default BottomSection;