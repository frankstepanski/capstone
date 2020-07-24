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

              <Form.Group controlId="formPrice">
                <Form.Label>Price</Form.Label>
                <Form.Control type="email" placeholder="Enter Price" />
               </Form.Group>

              <Form.Group controlId="formDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows="3" />
                <Form.Text className="text-muted">
                  Enter product description.
                </Form.Text>
              </Form.Group>

              <Form.Group controlId="formStock">
                <Form.Label>Stock</Form.Label>
                <Form.Control type="email" placeholder="Enter # Of Items In Stock" />
               </Form.Group>

               
              {['checkbox'].map((type) => (
                <div key={`inline-${type}`} className="mb-3">
                  <Form.Label>Active</Form.Label>
                  <Form.Check inline label="True" type={type} id={`inline-${type}-1`} />
                  <Form.Check inline label="False" type={type} id={`inline-${type}-2`} />
                </div>
              ))}

              {['checkbox'].map((type) => (
                <div key={`inline-${type}`} className="mb-3">
                  <Form.Label>Featured</Form.Label>
                  <Form.Check inline label="True" type={type} id={`inline-${type}-1`} />
                  <Form.Check inline label="False" type={type} id={`inline-${type}-2`} />
                </div>
              ))}

                <Form>
                  <Form.Label>Select Thumbnail Image</Form.Label>
                  <Form.File 
                    id="thumbnailFile"
                    label="Select Thumbnail Img"
                    custom
                  />
                </Form>

                <Form>
                  <Form.Label>Select Image</Form.Label>
                  <Form.File 
                    id="imageFile"
                    label="Select Product Image"
                    custom
                  />
                </Form>
  
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