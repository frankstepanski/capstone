import React from 'react';
import { Carousel as Caro} from 'react-bootstrap';

//import Slider1 from '../assets/carousel_img1.jpeg';
//import Slider2 from '../assets/carousel_img2.jpeg';
//import Slider3 from '../assets/carousel_img3.jpeg';
//import Slider4 from '../assets/carousel_img4.jpeg';

const Carousel = () => (

    <>

    <Caro>
    <Caro.Item>
      <img
        className="d-block w-100"
        src={'/assets/hero.jpg'}
        alt="First slide"
      />
    </Caro.Item>
    <Caro.Item>
      <img
        className="d-block w-100"
        src={'/assets/carousel_img4.jpeg'}
        alt="Third slide"
      />
    </Caro.Item>
    <Caro.Item>
      <img
        className="d-block w-100"
        src={'/assets/carousel_img2.jpeg'}
        alt="Third slide"
      />
    </Caro.Item>
    <Caro.Item>
      <img
        className="d-block w-100"
        src={'/assets/carousel_img3.jpeg'}
        alt="Fourth slide"
      />
    </Caro.Item>
  </Caro>
  </>
  );

export default Carousel;