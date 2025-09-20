import React from 'react';
import { Link } from 'react-router-dom';

const CategoryLinks = () => {
  const categories = [
    {
      name: 'Cakes',
      image: 'https://t4.ftcdn.net/jpg/03/31/10/17/360_F_331101745_iJ3F7GUwZQKIeFCUCUtFZ51EWRAD0gjZ.jpg',
      path: '/cake',
    },
    {
      name: 'Pastries',
      image: 'https://j6e2i8c9.delivery.rocketcdn.me/wp-content/uploads/2021/05/Eggless-Black-forest-Pastry-recipe-1.jpg',
      path: '/pastries',
    },
    {
      name: 'Breads',
      image: 'https://hips.hearstapps.com/hmg-prod/images/types-of-bread-1666723473.jpg',
      path: '/breads',
    },
    {
      name: 'Ice Cream',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjsO76hL4tNLp6ZN_j2m-CyGSpXmf88nzO0Q&s',
      path: '/icecream',
    }
  ];

  return (
    // --- CHANGE: Transparent background has been removed ---
    <div>
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-center sm:justify-around items-center gap-4 sm:gap-6 flex-wrap">
          {categories.map((category) => (
            <Link to={category.path} key={category.name} className="group">
              <div className="flex flex-col items-center text-center p-4 w-28 h-36 bg-pink-50/70 rounded-2xl shadow-lg transition-all duration-300 ease-in-out hover:shadow-2xl hover:bg-pink-100/80 hover:-translate-y-2">
                {/* --- NEW: Circular frame for the image --- */}
                <div className="w-20 h-20 mb-2 rounded-full overflow-hidden bg-white shadow-inner">
                  <img 
                    src={category.image} 
                    alt={category.name} 
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" 
                  />
                </div>
                <span className="text-sm font-bold text-pink-900">{category.name}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryLinks;
