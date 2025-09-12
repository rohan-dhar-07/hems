import React, { useState, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const ProfilePage = () => {
    // State to manage which view is active: 'login', 'signup', or 'profile'
    const [view, setView] = useState('login'); 
    
    // State for form inputs
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    // State to hold the logged-in user's data
    const [user, setUser] = useState(null);

    const containerRef = useRef(null);

    // GSAP animations for transitions
    useGSAP(() => {
        if (containerRef.current) {
            gsap.fromTo(containerRef.current, 
                { opacity: 0, scale: 0.98 },
                { opacity: 1, scale: 1, duration: 0.5, ease: 'power3.out' }
            );
        }
    }, { dependencies: [view], scope: containerRef });

    // --- FORM HANDLERS ---

    const handleLogin = (e) => {
        e.preventDefault();
        // Simulate a successful login
        const loggedInUser = {
            name: 'Jane Doe', // Dummy name for login
            email: email,
            loyaltyPoints: 1250,
            recentOrders: [
                { id: 'HB5823', item: 'Dozen Assorted Pastries', date: '2025-09-08' },
                { id: 'HB5791', item: 'Sourdough Loaf', date: '2025-09-01' },
            ]
        };
        setUser(loggedInUser);
        setView('profile');
    };

    const handleSignup = (e) => {
        e.preventDefault();
        // Simulate a successful signup
        const newUser = {
            name: name,
            email: email,
            loyaltyPoints: 100, // Welcome points
            recentOrders: []
        };
        setUser(newUser);
        setView('profile');
    };

    const handleLogout = () => {
        // Reset all states
        setUser(null);
        setEmail('');
        setPassword('');
        setName('');
        setView('login');
    };

    // --- RENDER LOGIC ---

    const renderContent = () => {
        switch (view) {
            case 'signup':
                return (
                    <div className="w-full max-w-md">
                        <h2 className="font-serif text-4xl font-bold text-amber-900 text-center mb-2">Create Account</h2>
                        <p className="text-stone-600 text-center mb-8">Join our family of happy customers.</p>
                        <form onSubmit={handleSignup} className="space-y-6">
                            <div>
                                <label className="block text-sm font-bold text-stone-700 mb-2" htmlFor="name">Full Name</label>
                                <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required className="form-input" placeholder="e.g., Jane Doe" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-stone-700 mb-2" htmlFor="email-signup">Email Address</label>
                                <input type="email" id="email-signup" value={email} onChange={(e) => setEmail(e.target.value)} required className="form-input" placeholder="you@example.com" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-stone-700 mb-2" htmlFor="password-signup">Password</label>
                                <input type="password" id="password-signup" value={password} onChange={(e) => setPassword(e.target.value)} required className="form-input" placeholder="••••••••" />
                            </div>
                            <button type="submit" className="form-button">Sign Up</button>
                        </form>
                        <p className="text-center text-sm text-stone-600 mt-6">
                            Already have an account? <button onClick={() => setView('login')} className="font-bold text-rose-600 hover:underline">Log In</button>
                        </p>
                    </div>
                );
            
            case 'profile':
                if (!user) return null; // Should not happen, but a good safeguard
                return (
                    <div className="w-full max-w-2xl text-center">
                         
                        <h2 className="font-serif text-4xl font-bold text-amber-900 mb-2">Welcome back, {user.name}!</h2>
                        <p className="text-stone-600 mb-8">{user.email}</p>

                        <div className="bg-white/80 border border-amber-100 rounded-2xl shadow-lg p-8 my-8 text-left grid md:grid-cols-2 gap-8">
                            <div className="flex items-center">
                                <div className="p-4 bg-amber-100 rounded-full mr-4">
                                    <svg className="w-8 h-8 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01" /></svg>
                                </div>
                                <div>
                                    <p className="text-stone-500 text-sm">Loyalty Points</p>
                                    <p className="font-bold text-2xl text-amber-800">{user.loyaltyPoints}</p>
                                </div>
                            </div>
                             <div className="flex items-center">
                                <div className="p-4 bg-rose-100 rounded-full mr-4">
                                     <svg className="w-8 h-8 text-rose-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /></svg>
                                </div>
                                <div>
                                    <p className="text-stone-500 text-sm">Lifetime Orders</p>
                                    <p className="font-bold text-2xl text-rose-800">{user.recentOrders.length}</p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="font-serif text-2xl font-bold text-amber-900 mb-4">Recent Orders</h3>
                            {user.recentOrders.length > 0 ? (
                                <ul className="space-y-3">
                                    {user.recentOrders.map(order => (
                                        <li key={order.id} className="bg-white/80 border border-stone-100 rounded-lg p-4 flex justify-between items-center text-left">
                                            <div>
                                                <p className="font-bold text-stone-800">{order.item}</p>
                                                <p className="text-sm text-stone-500">Order #{order.id}</p>
                                            </div>
                                            <p className="text-sm font-medium text-stone-600">{order.date}</p>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="bg-stone-100 p-4 rounded-lg text-stone-600">You haven't placed any orders yet!</p>
                            )}
                        </div>
                        
                        <button onClick={handleLogout} className="form-button bg-stone-600 hover:bg-stone-700 mt-12">Log Out</button>
                    </div>
                );

            case 'login':
            default:
                return (
                    <div className="w-full max-w-md">
                        <h2 className="font-serif text-4xl font-bold text-amber-900 text-center mb-2">Welcome Back!</h2>
                        <p className="text-stone-600 text-center mb-8">Log in to access your profile and orders.</p>
                        <form onSubmit={handleLogin} className="space-y-6">
                            <div>
                                <label className="block text-sm font-bold text-stone-700 mb-2" htmlFor="email-login">Email Address</label>
                                <input type="email" id="email-login" value={email} onChange={(e) => setEmail(e.target.value)} required className="form-input" placeholder="you@example.com" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-stone-700 mb-2" htmlFor="password-login">Password</label>
                                <input type="password" id="password-login" value={password} onChange={(e) => setPassword(e.target.value)} required className="form-input" placeholder="••••••••" />
                            </div>
                            <button type="submit" className="form-button">Log In</button>
                        </form>
                        <p className="text-center text-sm text-stone-600 mt-6">
                            Don't have an account? <button onClick={() => setView('signup')} className="font-bold text-rose-600 hover:underline">Sign up</button>
                        </p>
                    </div>
                );
        }
    };

    return (
        <div className="relative min-h-screen w-full flex items-center justify-center p-4 bg-gradient-to-br from-amber-50 via-rose-50 to-amber-100 font-sans">
             <div className="absolute inset-0 z-0 opacity-50 overflow-hidden">
                <div className="absolute w-64 h-64 bg-rose-200/40 rounded-full top-1/4 left-1/4 animate-pulse"></div>
                <div className="absolute w-48 h-48 bg-amber-200/40 rounded-full bottom-1/4 right-1/4 animate-pulse animation-delay-2000"></div>
            </div>
            <div ref={containerRef} className="relative z-10 w-full max-w-4xl bg-white/60 backdrop-blur-lg p-8 sm:p-12 rounded-2xl shadow-xl border border-white">
               <div className="flex justify-center">
                {renderContent()}
               </div>
            </div>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Inter:wght@400;700&display=swap');
                .font-serif { font-family: 'Playfair Display', serif; }
                .font-sans { font-family: 'Inter', sans-serif; }
                .form-input {
                    width: 100%;
                    padding: 0.75rem 1rem;
                    border-radius: 0.5rem;
                    border: 1px solid #e7e5e4; /* stone-200 */
                    background-color: white;
                    transition: all 0.2s ease;
                }
                .form-input:focus {
                    outline: none;
                    border-color: #f43f5e; /* rose-500 */
                    box-shadow: 0 0 0 2px rgba(244, 63, 94, 0.2);
                }
                .form-button {
                    width: 100%;
                    padding: 0.8rem 1rem;
                    border: none;
                    border-radius: 9999px;
                    background-color: #e11d48; /* rose-600 */
                    color: white;
                    font-weight: bold;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }
                .form-button:hover {
                    background-color: #be123c; /* rose-700 */
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
                }
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
            `}</style>
        </div>
    );
};

export default ProfilePage;
