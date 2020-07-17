import React from "react";
import { Form, Button } from 'react-bootstrap';
import Iframe from 'react-iframe'

import "./Contact.css";

const Contact = () => {
 
  handleSubmit = (event) => {

    event.preventDefault();

    // axios call

  }

  return (

      <div className="container">
        <div className="row">
       
          <div className="col-md-6 mx-auto">
          <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="email" placeholder="Enter name" />
              </Form.Group>

              <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group controlId="formMessage">
                <Form.Label>Message</Form.Label>
                <Form.Control as="textarea" rows="3" />
              </Form.Group>
  
              <Button variant="primary" type="submit">
              Submit
              </Button>
            </Form>
          </div>

          <div className="col-md-6 mx-auto">
              <Iframe url="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d52857.09345128385!2d-118.32954332166383!3d34.10619700768564!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2c75ddc27da13%3A0xe22fdf6f254608f4!2sLos%20Angeles%2C%20CA!5e0!3m2!1sen!2sus!4v1594911645342!5m2!1sen!2sus"
                width="450px"
                height="350px"
                id="myId"
                frameborder="0"
                style="border:none;padding:0;margin:0;overflow:hidden;"
                className="myClassname"
                position="relative"/>
          </div>
      </div>
    </div>

  );
}

export default Contact;