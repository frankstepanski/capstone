import React from "react";
import FrontPageCarousel from "../components/FrontPageCarousel"
import "./Home.css";
import Featured from "../components/Featured";



import {CardDeck, Card} from "react-bootstrap"

const Home = ({ products  }) => {
    const featuredArray = products.filter(product => {
      console.log("<<<<<", product.featured)
      return product.featured
    })

    return (
      <div className="home">
        <FrontPageCarousel />
        <Card>
          <Card.Title>Featured Products</Card.Title>
        </Card>
        
       <Featured featuredArray = { featuredArray } />
        
      </div>
    );
  };


export default Home;