import React from "react";
import { Form, Button } from 'react-bootstrap';

const Product = () => {

    const handleSubmit = (event) => {
        event.preventDefault()
    }



        return (
            <div className="container">
        <div className="row">
       
          <div className="col-md-6 mx-auto">
          <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formName">
                  <Form.Label>Product Name</Form.Label>
                  <Form.Control type="email" placeholder="Enter Name" />
              </Form.Group>

              <Form.Group controlId="formDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control type="email" placeholder="Enter Description" />
                <Form.Text className="text-muted">
                  Enter a product description.
                </Form.Text>
              </Form.Group>

              <Form.Group controlId="formPrice">
                <Form.Label>Price</Form.Label>
                <Form.Control as="textarea" rows="3" />
              </Form.Group>
  
              <Button variant="primary" type="submit">
              Submit
              </Button>
            </Form>
            </div>
          </div>
        </div>
    );

};

export default Product;