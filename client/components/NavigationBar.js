import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { Nav, Navbar, Button } from 'react-bootstrap';

const NavigationBar = ({ setShow }) => {

  const handleShow = (event) => {
  
    event.preventDefault();
    setShow(true);
  }

  return (
    <>
    <Navbar expand ="lg" bg="light" variant="light">
    <Navbar.Brand href="/">afc Skate</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link onClick={ handleShow } >Account</Nav.Link>
            <Nav.Link as = {Link} to="/cart">Cart</Nav.Link>
            <Nav.Link as = {Link} to="/shop">Shop</Nav.Link>
            <Nav.Link as = {Link} to="/blog">Blog</Nav.Link>
            <Nav.Link as = {Link} to="/about">About</Nav.Link>
            <Nav.Link as = {Link} to="/contact">Contact</Nav.Link>
            <Button variant="primary" onClick={handleShow}>Login</Button>
          </Nav>
        </Navbar.Collapse>
    </Navbar>

    </>
  );
};

export default NavigationBar;
