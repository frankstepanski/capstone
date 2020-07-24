import React from 'react';
import Carousel  from 'react-bootstrap/Carousel';


const FrontPageCarousel  = () => (
  
  <Carousel controls={false} indicators={false} interval={7500} fade={true}>
      <Carousel.Item>
          <img
          className="d-block w-100"
          src="/assets/images/hero1.jpeg"
          alt="First slide"
          />
      </Carousel.Item>
      <Carousel.Item>
          <img
          className="d-block w-100"
          src="/assets/images/hero2.jpeg"
          alt="Third slide"
          />
      </Carousel.Item>
      <Carousel.Item>
          <img
          className="d-block w-100"
          src="/assets/images/hero3.jpg"
          alt="Third slide"
          />
      </Carousel.Item>
      <Carousel.Item>
          <img
          className="d-block w-100"
          src="/assets/images/hero4.jpg"
          alt="Third slide"
          />
      </Carousel.Item>
      <Carousel.Item>
          <img
          className="d-block w-100"
          src="/assets/images/hero5.jpg"
          alt="Third slide"
          />
      </Carousel.Item>

</Carousel>
      );    



export default FrontPageCarousel;




