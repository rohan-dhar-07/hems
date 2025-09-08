import React from 'react';
// The BrowserRouter import is no longer needed here
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
import BottomSection from './components/projects/BottomSection';
import MiddleContent from './components/projects/MiddleContent';
import TopBar from './components/projects/TopBar';

// Import the divided components



const App = () => {
  return (
    // The <BrowserRouter> has been removed from this file
    <div className='text-white'>
      <Stairs>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/agence' element={<Agence />} />
        <Route path='/projects' element={<Projects />} />
        <Route path='/order' element={<BakeryOrderPage />} />
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
        
        {/* Add these routes for the individual components if needed */}
        <Route path='/topbar' element={<TopBar />} />
        <Route path='/middlecontent' element={<MiddleContent />} />
        <Route path='/bottomsection' element={<BottomSection />} />
        
      </Routes>
      </Stairs>
    </div>
  );
};

export default App;