import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import React, { useRef } from 'react'

const Agence = () => {

  
  gsap.registerPlugin(ScrollTrigger)

  const imageDivRef = useRef(null)
  const imageRef = useRef(null)

  const imageArray = [
    'https://images.unsplash.com/photo-1590080874088-eec64895b423?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29va2llc3xlbnwwfHwwfHx8MA%3D%3D',
    'https://bakewithshivesh.com/wp-content/uploads/2020/05/151F814A-2749-4978-BA53-3AD2A962C933-scaled.jpg',
    'https://sallysbakingaddiction.com/wp-content/uploads/2013/05/classic-chocolate-chip-cookies.jpg',
    'https://cdn.loveandlemons.com/wp-content/uploads/2024/08/chocolate-chip-cookie-recipe.jpg',
    'https://www.bhg.com/thmb/ARwlwRFvxK4g-TYSKLiuDy3y8T4=/4000x0/filters:no_upscale():strip_icc()/bhg-recipe-cookies-food-processor-chocolate-chip-cookies-Hero-01-5b0c046d2a3d4328b52b28f2a5135c8b.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6JuGRrFBh10vJofqYrpP89u9_TgZUlnqvJA&s',
    'https://assets.epicurious.com/photos/65d50d9e4094d3acc9ab24e0/1:1/w_4206,h_4206,c_limit/Italian-Butter-Cookies_RECIPE.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQX9kBCXp-yqxv4jmHNXYpFNe98SFjw-vTTkQ&s',
    'https://www.modernhoney.com/wp-content/uploads/2022/08/Milk-Chocolate-Chip-Cookies-22-scaled.jpg'

  ]

  useGSAP(function(){
    gsap.to(imageDivRef.current,{
      scrollTrigger:{
        trigger:imageDivRef.current,
        markers:true,
        start:'top 28%',
        end:'top -40%',
        scrub:true,
        pin:true,
        onUpdate:(elem)=>{
          const imageIndex = Math.floor(elem.progress * imageArray.length)

          imageRef.current.src = imageArray[imageIndex]
        }

      }
    })
  })

  return (
    <div>
      <div className='section1'>
      <div ref={imageDivRef} className='absolute overflow-hidden h-[17vw] w-[13vw] rounded-full top-[16vw] left-[35vw] bg-red-500'>
        <img ref={imageRef} className='h-full object-cover w-full'src="https://static.toiimg.com/thumb/61591637.cms?imgsize=434020&width=800&height=800"/>
      </div>
      <div className='relative font-[font2]'>
      <div className='mt-[28vw]'>
        <h1 className='text-[10vw] text-center uppercase leading-[12vw]'>The Crumble & <br />
        Wish Cookie Co.</h1>
      </div>
      <div className='pl-[50%] mt-20'>
      <p className='text-1xl'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; The Crumble & Wish Cookie Co. was born. We're not just bakers; we're dreamers, flavour-chasers, and architects of joy. We believe in cookies so loaded with chocolate chunks they defy gravity, and in flavours so imaginative they transport you somewhere wonderful. Ever tried a lavender-white chocolate cookie that tastes like a sunset? Or a cardamom-spiced chai cookie that feels like a warm blanket?Each box we ship is more than just an order. It’s a little parcel of delight, sent out into the world with a simple wish: that for the few moments it takes you to enjoy it, your day becomes a little brighter.</p>
      </div>
        cokies
    </div>
    </div>
    <div className='section2'>
      
    </div>
    </div>
  )
}

export default Agence
