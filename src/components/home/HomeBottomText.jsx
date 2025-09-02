import React from 'react'
import {Link} from 'react-router-dom'
const HomeBottomText = () => {
  return (
    <div className='font-[font2] flex item-center justify-center gap-2'>
      <div className='text-[5vw] leading-[4vw] border-5 border-white rounded-full px-5 pt-2 pb-0 uppercase'>
      <Link className='mt-6' to='/projects'>Cakes</Link>
      </div>
      <div className='text-[5vw] leading-[4vw] border-5 border-white rounded-full px-5 pt-2 pb-0 uppercase'> 
      <Link className='mt-6 ' to='/agence'>Cookies</Link>
      </div>
    </div>
  )
}

export default HomeBottomText
