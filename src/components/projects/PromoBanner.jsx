import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
// REMOVED: 'swiper/css/navigation';
import 'swiper/css/autoplay';

// import required modules
// REMOVED: Navigation from modules
import { Pagination, Autoplay } from 'swiper/modules';
import { Link } from 'react-router-dom';

const PromoBanner = () => {
  const slides = [
    {
      image: 'https://images.pexels.com/photos/808941/pexels-photo-808941.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      title: 'Celebrate with Sweetness',
      subtitle: 'Up to 25% Off on Custom Cakes',
      link: '/cake',
      bgColor: 'from-pink-500/70 to-purple-600/70'
    },
    {
      image: 'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      title: 'Your Daily Dose of Fresh',
      subtitle: 'New Artisan Breads Baked Daily',
      link: '/breads',
      bgColor: 'from-amber-500/70 to-orange-600/70'
    },
    {
      image: 'https://images.pexels.com/photos/2067576/pexels-photo-2067576.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      title: 'A Pastry for Every Palate',
      subtitle: 'Explore Our Seasonal Collection',
      link: '/pastries',
      bgColor: 'from-rose-500/70 to-red-600/70'
    }
  ];

  return (
    <div className="container mx-auto p-4">
      <Swiper
        // REMOVED: Navigation module
        modules={[Pagination, Autoplay]}
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        // REMOVED: The navigation prop to hide the arrows
        // navigation={true}
        loop={true}
        className="mySwiper rounded-2xl"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <Link to={slide.link}>
              <div
                className="relative w-full h-56 md:h-72 bg-cover bg-center rounded-2xl flex items-center justify-start text-white"
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${slide.bgColor}`}></div>
                <div className="relative z-10 p-8 md:p-12">
                  <h2 className="text-3xl md:text-4xl font-extrabold drop-shadow-lg">{slide.title}</h2>
                  <p className="text-lg mt-2 drop-shadow-md">{slide.subtitle}</p>
                  <button className="mt-4 px-5 py-2.5 rounded-full bg-white text-pink-600 font-bold transition-transform duration-300 hover:scale-105">
                    Shop Now
                  </button>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default PromoBanner;