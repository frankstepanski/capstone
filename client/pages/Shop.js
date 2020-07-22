import React, { useState } from "react";
import { Form, FormControl, Button, CardDeck, Card } from 'react-bootstrap';

import { getAllProducts } from "../api"

import Nav from 'react-bootstrap/Nav'
import Featured from "../components/Featured"
import ProductCard from "../components/ProductCard";
import ProductView from "../components/ProductView";



import "./Shop.css";


const Shop = ( {products} ) => {
  const featuredArray = products.filter(product => {
    console.log("<<<<<", product.featured)
    return product.featured
  })

   return (

        
      <div className= "shopPage">

        <Card>
          <Card.Title>Featured Products</Card.Title>
        </Card>
        
        <Featured featuredArray = {featuredArray} />
      
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

          <div className= "shopProducts">
          
          {
            products.map(prod => (

              <ProductCard 
                key = { prod.id}
                  name = { prod.name } 
                  price = { prod.price }
                  thumbnail = { prod.thumbnail }
                  stock = { prod.stock }
              />
            
            ))
          }  
          </div>
     
      </div>

      
    );
  }


export default Shop;
 