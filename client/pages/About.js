import React from "react";
import FrontPageCarousel from "../components/FrontPageCarousel"

//import "./About.css";

const About = () => {
    return (
      <div className="about">
        <h2>About Us</h2>


        <FrontPageCarousel/>


        <p>Some info about the company. Maybe add a video and/or pictures.</p>
      </div>
    );
  };


export default About;