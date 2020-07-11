import React from "react";
import { Link } from 'react-router-dom';

//import "./NotFoundPage.css";

const NotFoundPage = () => {
    return (
      <>
        <h2>404</h2>
        <Link to="/">Go to Home </Link>
      </>
    );
  };


export default NotFoundPage;