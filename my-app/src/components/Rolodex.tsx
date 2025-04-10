'use client';

import Image from 'next/image';
import { useState } from 'react';

const images = [
  '/images/Graphic1.png',
  '/images/Graphic2.png',
  '/images/Graphic3.png',
];

const Rolodex = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () =>
    setCurrentIndex((prev) => (prev + 1) % images.length);
  const prevImage = () =>
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="relative w-full flex justify-center items-center py-10 overflow-hidden">
      {/* Arrows */}
      <button
        onClick={prevImage}
        className="absolute left-4 z-10 text-white text-3xl hover:scale-110 transition"
      >
        ‹
      </button>

      <div className="relative w-[600px] h-[400px]">
        {images.map((src, index) => {
          const isActive = index === currentIndex;
          const isPrev = index === (currentIndex - 1 + images.length) % images.length;
          const isNext = index === (currentIndex + 1) % images.length;

          return (
            <Image
              key={src}
              src={src}
              alt={`Study Graphic ${index + 1}`}
              width={600}
              height={400}
              className={`absolute top-0 left-0 rounded-lg shadow-lg transition-all duration-500
                ${isActive ? 'z-20 scale-100 opacity-100' : ''}
                ${isPrev ? 'z-10 -translate-x-32 scale-90 opacity-60' : ''}
                ${isNext ? 'z-10 translate-x-32 scale-90 opacity-60' : ''}
                ${!isActive && !isPrev && !isNext ? 'hidden' : ''}
              `}
            />
          );
        })}
      </div>

      {/* Arrows */}
      <button
        onClick={nextImage}
        className="absolute right-4 z-10 text-white text-3xl hover:scale-110 transition"
      >
        ›
      </button>
    </div>
  );
};

export default Rolodex;

