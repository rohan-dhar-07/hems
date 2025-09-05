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

const App = () => {
  return (
    // The <BrowserRouter> has been removed from this file
    <div className='text-white'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/agence' element={<Agence />} />
        <Route path='/projects' element={<Projects />} />
        <Route path='/order' element={<BakeryOrderPage />} />
        <Route path='/contact' element={<ContactPage />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/gift' element={<GiftingPage />} />
        <Route path='/custom' element={<CustomOrderPage />} />
      </Routes>
    </div>
  );
};

export default App;

