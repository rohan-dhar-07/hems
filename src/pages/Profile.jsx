import React, { useState, useEffect } from 'react';
import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js';
import { getAuth, onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js';
import { getFirestore, doc, getDoc } from 'https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js';
import { gsap } from 'https://cdn.skypack.dev/gsap';

// Global variables provided by the environment
const __firebase_config = '{}';
const __app_id = 'default-app-id';
const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
const firebaseConfig = JSON.parse(typeof __firebase_config !== 'undefined' ? __firebase_config : '{}');

const auth = firebaseConfig && Object.keys(firebaseConfig).length > 0 ? getAuth(initializeApp(firebaseConfig)) : null;
const db = firebaseConfig && Object.keys(firebaseConfig).length > 0 ? getFirestore(initializeApp(firebaseConfig)) : null;

const Profile = () => {
    const [user, setUser] = useState(null);
    const [userData, setUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // Mock data for demonstration
    const mockOrders = [
        { id: '1', date: '2023-10-26', total: '$45.50', status: 'Delivered', items: 'Birthday Cake, 6 Cupcakes' },
        { id: '2', date: '2023-10-15', total: '$20.00', status: 'Delivered', items: '2 Sourdough Breads' },
    ];

    const mockAddresses = [
        { id: '1', street: '123 Baker Street', city: 'Springfield', state: 'IL', zip: '62704' },
    ];

    const mockCoupons = [
        { id: '1', code: 'HEMS20OFF', description: '20% off your next order' },
        { id: '2', code: 'FREESHIP', description: 'Free shipping on orders over $50' },
    ];

    useEffect(() => {
        if (auth) {
            const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
                if (currentUser) {
                    setUser(currentUser);
                    const userDocRef = doc(db, `artifacts/${appId}/users/${currentUser.uid}/profile`);
                    const userDocSnap = await getDoc(userDocRef);
                    if (userDocSnap.exists()) {
                        setUserData(userDocSnap.data());
                    }
                } else {
                    setUser(null);
                    setUserData(null);
                }
                setIsLoading(false);
            });

            // GSAP animation
            gsap.fromTo(".profile-container", 
                { opacity: 0, y: 50 }, 
                { opacity: 1, y: 0, duration: 1.0, ease: "power3.out", delay: 0.2 }
            );

            return () => unsubscribe();
        } else {
            setIsLoading(false);
        }
    }, []);

    const handleSignOut = async () => {
        if (auth) {
            try {
                await signOut(auth);
                // Redirect to homepage or login page
                // window.location.href = '/login';
            } catch (error) {
                console.error("Logout failed:", error);
            }
        }
    };

    if (isLoading) {
        return <div className="bg-gray-100 flex items-center justify-center min-h-screen p-4 text-gray-700">Loading...</div>;
    }

    if (!user) {
        return (
            <div className="bg-gray-100 flex items-center justify-center min-h-screen p-4 text-gray-700 text-center">
                <div className="bg-white p-8 rounded-xl shadow-lg border-b-4 border-yellow-500">
                    <p className="text-xl mb-4">Please log in to view your profile.</p>
                    <a href="/login" className="font-semibold text-yellow-600 hover:underline">Go to Login Page</a>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-100 flex items-center justify-center min-h-screen p-4">
            <div className="profile-container w-full max-w-2xl bg-white p-8 rounded-3xl shadow-2xl border-b-4 border-yellow-500 transform scale-100 transition-all duration-300">
                <div className="text-center mb-6">
                    <h1 className="text-3xl font-extrabold text-gray-900 mb-2">My Profile</h1>
                    <p className="text-gray-500">Welcome, {userData?.username || 'Guest'}!</p>
                </div>

                <div className="space-y-8">
                    {/* Profile Details */}
                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">Account Information</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600">
                            <div><span className="font-semibold">Username:</span> {userData?.username}</div>
                            <div><span className="font-semibold">Email:</span> {userData?.email}</div>
                        </div>
                    </div>

                    {/* My Orders */}
                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">My Orders</h2>
                        {mockOrders.length > 0 ? (
                            <div className="space-y-4">
                                {mockOrders.map(order => (
                                    <div key={order.id} className="p-4 rounded-lg border border-gray-300 shadow-sm bg-white">
                                        <div className="font-semibold text-gray-800">Order ID: #{order.id}</div>
                                        <div className="text-sm text-gray-500 mt-1">Date: {order.date}</div>
                                        <div className="text-sm text-gray-500">Total: {order.total}</div>
                                        <div className="text-sm font-medium text-green-600">Status: {order.status}</div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500">You have no past orders.</p>
                        )}
                    </div>

                    {/* My Addresses */}
                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">My Addresses</h2>
                        {mockAddresses.length > 0 ? (
                            <div className="space-y-4">
                                {mockAddresses.map(address => (
                                    <div key={address.id} className="p-4 rounded-lg border border-gray-300 shadow-sm bg-white">
                                        <p>{address.street}</p>
                                        <p>{address.city}, {address.state} {address.zip}</p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500">You have no saved addresses.</p>
                        )}
                    </div>

                    {/* My Coupons */}
                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">My Coupons</h2>
                        {mockCoupons.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {mockCoupons.map(coupon => (
                                    <div key={coupon.id} className="bg-yellow-100 p-4 rounded-xl border border-yellow-200 shadow-sm">
                                        <div className="font-bold text-yellow-800">{coupon.code}</div>
                                        <div className="text-sm text-yellow-700 mt-1">{coupon.description}</div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500">You have no available coupons.</p>
                        )}
                    </div>

                    {/* Log Out */}
                    <div className="text-center mt-8">
                        <button onClick={handleSignOut} className="w-full max-w-xs bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 px-4 rounded-xl transition-colors duration-200 shadow-md transform hover:scale-105">
                            Log Out
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
