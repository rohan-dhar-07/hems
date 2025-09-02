import React from 'react'
import Video from './Video'

const HomeHeroText = () => {
  return (
    <div className='font-[font1]'>
      <div className='flex items-baseline text-[9.5vw] uppercase leading-[10vw]'>Humble Eats </div> 
      <div className='flex items-baseline text-[9.5vw] uppercase leading-[8vw] '>
         Majesti
        <div className='h-[7vw] w-[10vw] rounded-3xl overflow-hidden '>
          <Video />
        </div>
      </div>
      <div className='text-[9.5vw] uppercase leading-[8vw]'>Servings</div>
    </div>
  )
}

export default HomeHeroText
