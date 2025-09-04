import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Agence from './pages/Agence'
import Projects from './pages/Projects';
import BakeryOrderPage from './pages/BakeryOrderPage';


const App = () => {
  return (
    <div className='text-white'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/agence' element={<Agence />} />
        <Route path='/projects' element={<Projects />} />
        <Route path='/order' element={<BakeryOrderPage />} />
      </Routes>
    </div>
  )
}

export default App
