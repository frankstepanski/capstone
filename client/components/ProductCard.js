import React, { useState } from "react"
import { CardDeck, Card , Button, Pagination  } from 'react-bootstrap'

// const handleStockDecrement = () => setItemQuantity(--itemQuantity);
// const handleStockIncrement = () => {
//     setItemQuantity(++itemQuantity)
// }

const ProductCard = ({
    name,
    price,
    thumbnail,
    stock
}) => {

   return (
    <CardDeck>
        <Card style ={{
           
            "maxWidth":"15rem",
            "margin": "2rem"

        }} >
        
        <Card.Img variant="top" src= { thumbnail } />

            <Card.Body style = {{
                "maxHeight" : "34rem",
                "maxWidth": "15rem",
                
            }}>
                <Card.Title style ={{
                    "textAlign": "center"
                }} >{ name }</Card.Title>

                <Card.Subtitle className="mb-2 text-muted text-italic" style ={{ 
                    
                    "textAlign":"center"
                
                }}> Price: { price }
                
                    <Card.Subtitle className="mb-2 text-muted text-italic"> Stock: { stock }</Card.Subtitle>
                
                </Card.Subtitle>

                

                <Button style ={{
                    "textAlign": "center"
                }}>Add to Cart</Button>
                {/* <Pagination>
                    <Pagination.Prev disabled={itemQuantity <= 1 ? true : false} onClick={handleStockDecrement}/>
                    <Pagination.Item disabled>{itemQuantity}</Pagination.Item>
                    <Pagination.Next disabled={itemQuantity >= stock ? true : false} onClick={handleStockIncrement}/>
                </Pagination> */}
                
            </Card.Body>
        </Card>

        
        
    </CardDeck>

   )
}

export default ProductCard;