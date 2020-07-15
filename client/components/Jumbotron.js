import React from 'react';
import { Jumbotron as Jumbo, Container } from 'react-bootstrap';

const Jumbotron = () => (
   
      <Jumbo fluid className="jumbo">
        <div className="overlay"></div>
        <Container>
          <p>Skate or die!</p>
        </Container>
      </Jumbo>
);

export default Jumbotron;