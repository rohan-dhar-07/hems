// src/App.jsx

import React, { useState } from 'react'; // <-- Import useState
import { Routes, Route } from 'react-router-dom';

// Import your pages
import Home from './pages/Home';
import Agence from './pages/Agence';
import Projects from './pages/Projects';
import BakeryOrderPage from './pages/BakeryOrderPage';
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';
import GiftingPage from './pages/GiftingPage';
import CustomOrderPage from './pages/CustomOrderPage';
import Stairs from './components/agence/Stairs';
import CakesPage from './pages/CakePage';
import PastriesPage from './pages/PastriesPage';
import BreadsPage from './pages/BreadsPage';
import IceCreamPage from './pages/IceCreamPage';
import CheckoutPage from './pages/CheckoutPage';
import Auth from './components/Auth';
import ProfilePage from './pages/ProfilePage';
import WishlistPage from './pages/WishlistPage';

const App = () => {
  // --- NEW: Manage wishlist state here ---
  const [wishlistItems, setWishlistItems] = useState([]);

  // --- NEW: Function to add/remove items from the wishlist ---
  const handleToggleWishlist = (product) => {
    setWishlistItems(prevItems => {
      const isWishlisted = prevItems.some(item => item.id === product.id);
      if (isWishlisted) {
        return prevItems.filter(item => item.id !== product.id);
      } else {
        return [...prevItems, product];
      }
    });
  };

  return (
    <div className='text-white'>
      <Stairs>
        <Routes>
          <Route path='/' element={<Home />} />
          {/* ... other routes ... */}
          
          {/* --- NEW: Pass wishlist props to BakeryOrderPage --- */}
          <Route 
            path='/order' 
            element={
              <BakeryOrderPage 
                wishlistItems={wishlistItems} 
                onToggleWishlist={handleToggleWishlist} 
              />
            } 
          />

          {/* --- NEW: Pass wishlist props to WishlistPage --- */}
          <Route 
            path='/wishlist' 
            element={
              <WishlistPage 
                wishlistItems={wishlistItems} 
                setWishlistItems={setWishlistItems} // Pass the setter function
              />
            } 
          />
          
          <Route path='/contact' element={<ContactPage />} />
          <Route path='/about' element={<AboutPage />} />
          <Route path='/gift' element={<GiftingPage />} />
          <Route path='/custom' element={<CustomOrderPage />} />
          <Route path='/cake' element={<CakesPage/>} />
          <Route path='/pastries' element={<PastriesPage/>} />
          <Route path='/breads' element={<BreadsPage/>} />
          <Route path='/icecream' element={<IceCreamPage/>} />
          <Route path='/checkout' element={<CheckoutPage />}/>
          <Route path='/auth' element={<Auth />}/>
          <Route path='/profilepage' element={<ProfilePage />} />
        </Routes>
      </Stairs>
    </div>
  );
};

export default App;