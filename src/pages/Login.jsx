import React, { useState, useEffect } from 'react';
import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js';
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js';
import { getFirestore, getDoc, doc } from 'https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js';
import { gsap } from 'https://cdn.skypack.dev/gsap';

// Global variables provided by the environment
const __firebase_config = '{}';
const __app_id = 'default-app-id';
const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
const firebaseConfig = JSON.parse(typeof __firebase_config !== 'undefined' ? __firebase_config : '{}');

const auth = firebaseConfig && Object.keys(firebaseConfig).length > 0 ? getAuth(initializeApp(firebaseConfig)) : null;
const db = firebaseConfig && Object.keys(firebaseConfig).length > 0 ? getFirestore(initializeApp(firebaseConfig)) : null;

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState({ text: '', type: '' });

    useEffect(() => {
        gsap.fromTo(".login-container", 
            { opacity: 0, y: 50 }, 
            { opacity: 1, y: 0, duration: 1.0, ease: "power3.out" }
        );
        gsap.fromTo(".form-element", 
            { opacity: 0, y: 20 }, 
            { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: "power2.out", delay: 0.5 }
        );
    }, []);

    const showMessage = (text, type = 'error') => {
        setMessage({ text, type });
        gsap.fromTo("#message-container",
            { opacity: 0, scale: 0.9 },
            { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.7)" }
        );
    };

    const loginWithEmail = async (e) => {
        e.preventDefault();
        if (!auth) {
            showMessage("Firebase is not configured.");
            return;
        }

        if (!email.trim() || !password.trim()) {
            showMessage("Email and password are required.");
            return;
        }

        try {
            await signInWithEmailAndPassword(auth, email, password);
            showMessage("Login successful!", 'success');
            // Redirect the user after successful login
            // window.location.href = '/'; 
        } catch (error) {
            console.error("Login error:", error.code);
            let errorMessage = "An unknown error occurred.";
            if (error.code === 'auth/invalid-credential') {
                errorMessage = "Invalid email or password. Please try again.";
            } else if (error.code === 'auth/user-not-found') {
                errorMessage = "No account found with this email. Please register.";
            } else if (error.code === 'auth/wrong-password') {
                 errorMessage = "Invalid password. Please try again.";
            }
            showMessage(errorMessage);
        }
    };

    const signInWithGoogle = async () => {
        if (!auth) {
            showMessage("Firebase is not configured.");
            return;
        }

        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
            showMessage("Successfully signed in with Google!", 'success');
            // Redirect the user after successful login
            // window.location.href = '/'; 
        } catch (error) {
            console.error("Google sign-in error:", error.code);
            showMessage("Google sign-in failed. Please try again.");
        }
    };

    return (
        <div className="bg-gray-100 flex items-center justify-center min-h-screen p-4">
            <div className="login-container w-full max-w-md bg-white p-8 rounded-3xl shadow-2xl border-b-4 border-yellow-500 transform scale-100 transition-all duration-300">
                <div className="text-center mb-6">
                    <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Welcome Back!</h1>
                    <p className="text-gray-500">Log in to your Hems Bakery account.</p>
                </div>

                {message.text && (
                    <div id="message-container" className={`p-3 rounded-xl text-sm mb-4 ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {message.text}
                    </div>
                )}

                <form className="space-y-4" onSubmit={loginWithEmail}>
                    <div className="form-element">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:border-yellow-500 focus:ring focus:ring-yellow-200 focus:ring-opacity-50" placeholder="you@example.com" />
                    </div>
                    <div className="form-element">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:border-yellow-500 focus:ring focus:ring-yellow-200 focus:ring-opacity-50" placeholder="••••••••" />
                    </div>
                    <button type="submit" className="form-element w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-4 rounded-xl transition-colors duration-200 shadow-md transform hover:scale-105">
                        Log In
                    </button>
                </form>

                <div className="mt-6 flex items-center justify-between form-element">
                    <span className="w-1/4 border-b border-gray-300"></span>
                    <span className="text-sm font-medium text-gray-500 uppercase">Or</span>
                    <span className="w-1/4 border-b border-gray-300"></span>
                </div>

                <div className="mt-6 form-element">
                    <button type="button" onClick={signInWithGoogle} className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-xl transition-colors duration-200 shadow-md flex items-center justify-center space-x-2 transform hover:scale-105">
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M22.56 12.25c0-.78-.07-1.5-.2-2.21H12v4.51h6.3c-.28 1.4-1.12 2.59-2.29 3.42l-.08.05 3.51 2.72.24.19c2.09-1.92 3.32-4.75 3.32-8.68z" fill="#4285F4"/>
                            <path d="M12 23c2.97 0 5.48-.97 7.3-2.61l-3.6-2.81c-1.04.69-2.38 1.12-3.79 1.12-2.91 0-5.38-1.98-6.26-4.63H2.94v2.85C4.7 20.91 8.1 23 12 23z" fill="#34A853"/>
                            <path d="M5.74 14.15c-.17-.55-.27-1.14-.27-1.74s.1-.19.27-.74V9.61H2.94c-.66.86-1.04 1.94-1.04 3.35s.38 2.49 1.04 3.35l2.8-.75z" fill="#FBBC05"/>
                            <path d="M12 7.76c1.61 0 3.06.56 4.22 1.6l3.14-3.08C17.47 3.39 15.01 2 12 2c-3.9 0-7.3 2.09-9.06 5.23l2.8 2.1c.88-2.65 3.35-4.63 6.26-4.63z" fill="#EA4335"/>
                        </svg>
                        <span>Sign In with Google</span>
                    </button>
                </div>

                <div className="text-center text-sm text-gray-500 mt-6 form-element">
                    Don't have an account? <a href="/register" className="font-semibold text-yellow-600 hover:underline">Sign Up</a>
                </div>
            </div>
        </div>
    );
};

export default Login;
