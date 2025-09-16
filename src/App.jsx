import React, { useState } from 'react';
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
  const [wishlistItems, setWishlistItems] = useState([]);

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
          
          <Route 
            path='/order' 
            element={
              <BakeryOrderPage 
                wishlistItems={wishlistItems} 
                onToggleWishlist={handleToggleWishlist} 
              />
            } 
          />

          {/* --- CHANGE: Pass the handler function instead of the raw setter --- */}
          <Route 
            path='/wishlist' 
            element={
              <WishlistPage 
                wishlistItems={wishlistItems} 
                onToggleWishlist={handleToggleWishlist} // This is more consistent and safer
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