import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { Nav, Navbar, Form, Button } from 'react-bootstrap';

const NavigationBar = ({ setShow, isUserLoggedIn, setIsUserLoggedIn, user, setUser }) => {

  const handleShow = (event) => {
    
    event.preventDefault();

    if (isUserLoggedIn) {
         // logout user, not showing modal
         setIsUserLoggedIn(false);
         setUser({});
    } else {
      setShow(true);
    }
  }

  return (
    <>
    <Navbar expand ="lg" bg="light" variant="light">
    <Navbar.Brand href="/">afc Skate</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            { isUserLoggedIn             
            ? <Nav.Link as = {Link} to="/account">Account</Nav.Link>
            : ''
            }
            <Nav.Link as = {Link} to="/cart">Cart</Nav.Link>
            <Nav.Link as = {Link} to="/shop">Shop</Nav.Link>
            <Nav.Link as = {Link} to="/blog">Blog</Nav.Link>
            <Nav.Link as = {Link} to="/about">About</Nav.Link>
            <Nav.Link as = {Link} to="/contact">Contact</Nav.Link>
          </Nav>
            
            <Form inline>
            <Form.Label className="mr-sm-5 text-uppercase">{ isUserLoggedIn && `Welcome ${user.name}` }</Form.Label>
              <Button variant="outline-success" onClick={handleShow}>
                { isUserLoggedIn
                ? 'Logout'
                : 'Login/Register'
                }
                </Button>
              </Form>
        </Navbar.Collapse>
    </Navbar>

    </>
  );
};

export default NavigationBar;
