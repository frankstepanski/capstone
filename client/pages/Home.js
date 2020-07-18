import React from "react";
import Jumbotron from "../components/Jumbotron";
import Carousel from "../components/Carousel"
import "./Home.css";

const Home = () => {
    return (
      <div className="home">
        <Jumbotron />
        <Carousel />
      </div>
    );
  };


export default Home;