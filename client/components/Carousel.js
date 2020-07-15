import React from 'react';
import { Carousel as Caro} from 'react-bootstrap';

const Carousel = () => (

    <>
    <Caro>
    <Caro.Item>
      <img
        className="d-block w-100"
        src={'/assets/images/hero.jpg'}
        alt="First slide"
      />
    </Caro.Item>
    <Caro.Item>
      <img
        className="d-block w-100"
        src={'/assets/images/carousel_img4.jpeg'}
        alt="Third slide"
      />
    </Caro.Item>
    <Caro.Item>
      <img
        className="d-block w-100"
        src={'/assets/images/carousel_img2.jpeg'}
        alt="Third slide"
      />
    </Caro.Item>
    <Caro.Item>
      <img
        className="d-block w-100"
        src={'/assets/images/carousel_img3.jpeg'}
        alt="Fourth slide"
      />
    </Caro.Item>
  </Caro>
  </>
  );

export default Carousel;