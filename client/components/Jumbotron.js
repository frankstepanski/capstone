import React from 'react';
import { Image } from 'react-bootstrap';

const Jumbotron = () => {
   
   // note: not in state because needs to re-render each time
    const heroImages = [
      { image: '/assets/images/hero1.jpg' },
      { image: '/assets/images/hero2.jpg' },
      { image: '/assets/images/hero3.jpg' },
      { image: '/assets/images/hero4.jpg' },
      { image: '/assets/images/hero5.jpg' },
      { image: '/assets/images/hero6.jpg' }
    ];

  return (

    
    <Image 
      style={{ height: 'auto'}}
      src={heroImages[Math.floor(Math.random() * Math.floor(heroImages.length))].image} fluid 
    />
   
  );
};

export default Jumbotron;