import React from "react";
import { Link } from 'react-router-dom';
import { Nav, Navbar } from 'react-bootstrap';

const NavigationBar= () => (

    <Navbar expand="lg">
      <Navbar.Brand href="/">afc Skate</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Item>
            <Nav.Link as = {Link} to="/">Home</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as = {Link} to="/account">Account</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as = {Link} to="/shop">Shop</Nav.Link>
          </Nav.Item>
          <Nav.Item>
             <Nav.Link as = {Link} to="/blog">Blog</Nav.Link>
          </Nav.Item>
          <Nav.Item>
             <Nav.Link as = {Link} to="/about">About</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as = {Link} to="/contact">Contact</Nav.Link>
          </Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
);

export default NavigationBar;
