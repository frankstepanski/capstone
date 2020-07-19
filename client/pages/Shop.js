import React from "react";
import { Form, FormControl, Button } from 'react-bootstrap';
import ProductCard from "../components/ProductCard";
import ProductView from "../components/ProductView";

import "./Shop.css";

const Shop = () => {

  const handleSubmit = () => { }
  const handleInputChange = () => { }

    return (
      <>
      <Form inline onSubmit={handleSubmit}>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" onChange={handleInputChange}/>
              <Button variant="outline-primary">Search</Button>
      </Form>

     </>
    );
  }

export default Shop;