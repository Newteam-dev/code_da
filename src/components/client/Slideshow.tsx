// src/components/Slideshow.tsx
import React, { useState, useEffect } from 'react';

const Slideshow: React.FC = () => {
  const images = [
    'https://file.hstatic.net/1000253775/file/banner_pc_36d8676b85444d9289b33e0059a7331b.jpg',
    'https://file.hstatic.net/1000253775/file/banner_kv_pc_sao_chep.jpg',
    'https://file.hstatic.net/1000253775/file/ngang-_2048x813__1_.jpg',
    'https://file.hstatic.net/1000253775/file/new_banner_pc_copy_3be13f0b4b0d4ad19455f1eb05b7b22f.jpg',
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Chuyển ảnh sau mỗi 5 giây
    return () => clearInterval(interval); // Dọn dẹp interval khi component unmount
  }, [images.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="relative w-full overflow-hidden">
      <div
        className="flex transition-transform duration-1000 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <div key={index} className="w-full flex-shrink-0">
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              className="w-full h-64 md:h-96 object-cover"
            />
          </div>
        ))}
      </div>
      {/* Điểm điều hướng */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full ${currentIndex === index ? 'bg-white' : 'bg-gray-400'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Slideshow;