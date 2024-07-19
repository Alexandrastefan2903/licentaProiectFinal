import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './CelebritiesCarousel.css';

const CelebritiesCarousel = ({ celebrities }) => {
  return (
    <Carousel showThumbs={false} infiniteLoop={true} showStatus={false} showArrows={false}>
      {celebrities.map((celebrity, index) => (
        <div key={index} className="carousel-item">
          <img src={celebrity.image} alt={celebrity.name} className="carousel-image" />
          <p className="carousel-name">{celebrity.name}</p>
        </div>
      ))}
    </Carousel>
  );
};

export default CelebritiesCarousel;
