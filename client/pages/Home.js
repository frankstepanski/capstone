import React from "react";
import Jumbotron from "../components/Jumbotron";
import FrontPageCarousel from "../components/Carousel"
import "./Home.css";
import FeaturedCarousel from "../components/FeaturedCarousel";

import {CardDeck, Card} from "react-bootstrap"

const Home = () => {
    return (
      <div className="home">
        <FrontPageCarousel />
        <Card>
          <Card.Title>Featured Products</Card.Title>
        </Card>
        
       <FeaturedCarousel />
        
      </div>
    );
  };


export default Home;