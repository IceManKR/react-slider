import React, { useState, useRef, useEffect } from 'react';
import '../styles/Slider.css';

const Slider = () => {
  const sliderRef = useRef(null);
  const sliderInnerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(0);
  
  // Array of image paths (replace with your actual paths)
  const images = [
    '/images/image-1.jpg',
    '/images/image-2.jpg',
    '/images/image-3.jpg',
    '/images/image-4.jpg',
    '/images/image-5.jpg',
  ];

  const slideWidth = 600; // Adjust the width for your images
  const slideHeight = 400; // Adjust the height for your images

  // Mouse event handlers
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.clientX);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const moveX = e.clientX - startX;
    setSliderPosition(sliderPosition + moveX);
    setStartX(e.clientX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Handle infinite scroll (reset position after scrolling through all images)
  const handleInfiniteScroll = () => {
    const endOfScroll = sliderPosition <= -(images.length * slideWidth);
    if (endOfScroll) {
      setSliderPosition(0); // Reset position to create the loop effect
    }
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    }

    // Handle infinite scroll when dragging
    handleInfiniteScroll();

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, startX, sliderPosition]);

  return (
    <div
      ref={sliderRef}
      className="slider"
      onMouseDown={handleMouseDown}
      style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
    >
      <div
        ref={sliderInnerRef}
        className="slider__inner"
        style={{
          transform: `translateX(${sliderPosition}px)`,
          transition: isDragging ? 'none' : 'transform 0.3s ease-out',
        }}
      >
        {images.concat(images).map((image, index) => (
          <div className="slide" key={index}>
            <img className="slide__img" src={image} alt={`Image ${index + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
