import React from 'react';
import { CardDeck, Card } from 'react-bootstrap';

const Carousel = () => (
  
     <CardDeck>
      <Card>
        <Card.Img variant="top" src="/assets/images/board2.jpg" />
          <Card.Body>
          <Card.Title>Product Name and Price</Card.Title>
            <Card.Text>
              Short desciption
            </Card.Text>
          </Card.Body>
     </Card>
    <Card>
      <Card.Img variant="top" src="/assets/images/hat2.jpg" />
      <Card.Body>
        <Card.Title>Product Name and Price</Card.Title>
        <Card.Text>
        Short desciption
        </Card.Text>
      </Card.Body>
    </Card>
    <Card>
      <Card.Img variant="top" src="/assets/images/shoes3.jpg" />
      <Card.Body>
        <Card.Title>Product Name and Price</Card.Title>
        <Card.Text>
        Short desciption
        </Card.Text>
      </Card.Body>
    </Card>
  </CardDeck>

);

export default Carousel;