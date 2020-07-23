import React from 'react';
import Carousel from 'react-bootstrap/Carousel'

import ProductCard from '../components/ProductCard'


const Featured = ({ featuredArray }) => (
    
     <Carousel>
        {
          featuredArray.map(featProd => (

            <Carousel.Item key = { featProd.id }>                     
              <ProductCard 
                  name = { featProd.name } 
                  price = { featProd.price }
                  thumbnail = { featProd.thumbnail }
                  stock = { featProd.stock }
              />
            </Carousel.Item>
          ))
   }  
      </Carousel>
      
   
);

export default Featured;