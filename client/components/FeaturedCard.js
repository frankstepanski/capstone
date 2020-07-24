import React, { useState } from "react"
import { CardDeck, Card , Button } from 'react-bootstrap'

import CardPopover from '../components/Popover'

const FeaturedCard = ({
    name,
    price,
    thumbnail,
    stock
}) => {

   return (
    <CardDeck>
         <Card style ={{
                    "maxHeight":"30rem",
                    "maxWidth":"15rem",
                    "marginTop":"2rem"
                }} >
             <Card.Img variant="top" style = {{
                    "maxHeight": "26rem",
                    "maxWidth" : "12rem",
                }} src= "/assets/images/Shoes/Vans.jpg" />
            <Card.Body style = {{
                        "maxHeight" : "30rem",
                        "maxWidth": "15rem",
                        
                    }}>
                <Card.Title style ={{
                            "textAlign": "center"
                        }} >Vans Retro Stripes Authentic SF </Card.Title>

                <Card.Subtitle className="mb-2 text-muted text-italic"> Price: 49.99 </Card.Subtitle>

                <Card.Subtitle className="mb-2 text-muted text-italic"> Stock: 10 </Card.Subtitle>
                
                < CardPopover />

            </Card.Body>
        </Card>

        <Card style ={{
                    "maxHeight":"30rem",
                    "maxWidth":"15rem",
                    "marginTop":"2rem"
                }} >
             <Card.Img variant="top" style = {{
                    "maxHeight": "26rem",
                    "maxWidth" : "12rem",
                }} src= "/assets/images/Skateboards/believeFullRed.jpg" />
            <Card.Body style = {{
                        "maxHeight" : "30rem",
                        "maxWidth": "15rem",
                        
                    }}>
                <Card.Title style ={{
                            "textAlign": "center"
                        }} >Believe Full Red </Card.Title>

                <Card.Subtitle className="mb-2 text-muted text-italic"> Price: 59.99 </Card.Subtitle>

                <Card.Subtitle className="mb-2 text-muted text-italic"> Stock: 12 </Card.Subtitle>

                < CardPopover />
            </Card.Body>
        </Card>

        <Card style ={{
                    "maxHeight":"30rem",
                    "maxWidth":"15rem",
                    "marginTop":"2rem"
                }} >
             <Card.Img variant="top" style = {{
                    "maxHeight": "26rem",
                    "maxWidth" : "12rem",
                }} src= "/assets/images/shoes/cambridge.jpg" />
            <Card.Body style = {{
                        "maxHeight" : "30rem",
                        "maxWidth": "15rem",
                        
                    }}>
                <Card.Title style ={{
                            "textAlign": "center"
                        }} >Lakai Cambridge </Card.Title>

                <Card.Subtitle className="mb-2 text-muted text-italic"> Price: 64.99 </Card.Subtitle>

                <Card.Subtitle className="mb-2 text-muted text-italic"> Stock: 13 </Card.Subtitle>

                < CardPopover />
            </Card.Body>
        </Card>

        <Card style ={{
                    "maxHeight":"30rem",
                    "maxWidth":"15rem",
                    "marginTop":"2rem"
                }} >
             <Card.Img variant="top" style = {{
                    "maxHeight": "26rem",
                    "maxWidth" : "12rem",
                }} src= "/assets/images/Clothing/stussySproutTeeThumb2.jpg" />
            <Card.Body style = {{
                        "maxHeight" : "30rem",
                        "maxWidth": "15rem",
                        
                    }}>
                <Card.Title style ={{
                            "textAlign": "center"
                        }} >Stüssy Sprout Tee </Card.Title>

                <Card.Subtitle className="mb-2 text-muted text-italic"> Price: 29.99 </Card.Subtitle>

                <Card.Subtitle className="mb-2 text-muted text-italic"> Stock: 16 </Card.Subtitle>

                < CardPopover />
            </Card.Body>
        </Card>


     </CardDeck>


   )
}

export default FeaturedCard;