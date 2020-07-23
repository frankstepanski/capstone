import React, { useState } from "react"
import { Card , Button } from 'react-bootstrap'

const ProductView = ({
    name,
    description,
    price,
    stock,
    rating,
    image
}) => {
   return ( 
   
   <div className= "productPop">

        <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src= { image } />
        
        <Card.Body>
            
            <Card.Title> { name } </Card.Title>
            <Card.Text> { description } </Card.Text>
            <Card.Subtitle> { price } </Card.Subtitle>
            <Card.Subtitle> { stock } </Card.Subtitle>
            <Card.Subtitle> { rating } </Card.Subtitle>

        </Card.Body>

        <Button style ={{
                    "textAlign": "center"
                }}>Add to Cart</Button>
                
        </Card>


    </div>
   )

   }


export default ProductView;