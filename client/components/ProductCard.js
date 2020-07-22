import React, { useState } from "react"
import { CardDeck, Card , Button } from 'react-bootstrap'

const ProductCard = ({
    name,
    price,
    thumbnail,
    stock

}) => {

   return (
    <CardDeck>
        <Card>
        <Card.Img variant="top" style = {{
            "maxHeight": "26rem",
            "maxWidth" : "12rem",
            

        }} src= { thumbnail } />
            <Card.Body style = {{
                "maxHeight" : "30rem",
                "maxWidth": "15rem",
                
            }}>
                <Card.Title style ={{
                    "textAlign": "center"
                }} >{ name }</Card.Title>

                <Card.Subtitle className="mb-2 text-muted text-italic"> Price: { price }</Card.Subtitle>

                <Card.Subtitle className="mb-2 text-muted text-italic"> Stock: { stock }</Card.Subtitle>

                <Button>Add to Cart</Button>
                <Button> + </Button>
                <Button> - </Button>
            </Card.Body>
        </Card>
    </CardDeck>

   )
}

export default ProductCard;