import React from 'react';
import {CardDeck, Card} from 'react-bootstrap'

const FeaturedCarousel = () => (

    <CardDeck>
    <Card>
      <Card.Img variant="top" src="/assets/images/Clothing/hundredsMalibuThumb.jpg" />
        <Card.Body>
            <Card.Title>The Hundreds Malibu Long Sleeve</Card.Title>
        </Card.Body>
    </Card>
    <Card>
        <Card.Img variant="top" src="/assets/images/Skateboards/SC_FabianaHand.jpg" />
        <Card.Body>
            <Card.Title>Santa Cruz Fabiana Hand Skateboard</Card.Title>
        </Card.Body>
    </Card>

    <Card>
        <Card.Img variant="top" src="/assets/images/Clothing/stussySproutTeeThumb2.jpg" />
        <Card.Body>
            <Card.Title>Stüssy Sprout Tee</Card.Title>
        </Card.Body>
    </Card>
 
    <Card>
        <Card.Img variant="top" src="/assets/images/Shoes/Vans.jpg" />
            <Card.Body>
                <Card.Title>Vans Retro Stripes Authentic SF</Card.Title>
            </Card.Body>
    </Card>
  </CardDeck> 

);

export default FeaturedCarousel;