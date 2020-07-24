import React from 'react';
import Carousel from 'react-bootstrap/Carousel'

import FeaturedCard from '../components/FeaturedCard'
import { CardDeck } from 'react-bootstrap';


const Featured = ({ featuredArray }) => (
    
     <Carousel>
       
        {
          featuredArray.map(featProd => (

            <Carousel.Item key = { featProd.id }> 
                              
              <FeaturedCard 
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