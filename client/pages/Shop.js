import React from "react";
import { Form, FormControl, Button, CardDeck, Card } from 'react-bootstrap';

import Nav from 'react-bootstrap/Nav'
import FeaturedCarousel from "../components/FeaturedCarousel"
import ProductCard from "../components/ProductCard";
import ProductView from "../components/ProductView";



import "./Shop.css";

const Shop = () => {

  const handleSubmit = () => { }
  const handleInputChange = () => { }

    return (

        
      <div className= "shopCarousel">

        <Card>
          <Card.Title>Featured Products</Card.Title>
        </Card>
        
        <FeaturedCarousel />
      
          <div className= "shopNav">
              <Nav className="justify-content-center margin-top-2rem " activeKey="/home">
              <Nav.Item>
                <Nav.Link href="link-all">All Products</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="link-1">Clothing</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="link-2">Shoes</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="link-3">Skateboards
                </Nav.Link>
              </Nav.Item>
              </Nav>
          </div>


     
      </div>

      
    );
  }

const shopPage = () =>{
  return( <h5>Welcome to AFC Skate!</h5>
  )
  }

export default Shop;
 shopPage;