import React, { useState, useEffect } from "react";
import {
    Row,
    Button,
    Col,
} from 'react-bootstrap'

import { clearCart } from "../api"
import CartItem from "../components/CartItem"
import { Link, useRouteMatch } from "react-router-dom";

const ItemView = ({
    cart,
    setCart,
    user,
    token,
    products,
    setCartEmpty,
    cartEmpty
}) => {
    const {path, url} = useRouteMatch();

    return (
    <>
        {
            cartEmpty === false
            ? (
                cartProducts.map(cartProduct => (
                    <Row key={cartProduct.id} sm="auto" className="justify-content-stretch d-flex align-items-center">
                        <CartItem 
                            cartProduct={cartProduct}
                            products={products}
                            user={user}
                            token={token}
                            setCart={setCart}
                            setTotal={setTotal}
                        />
                    </Row>
                ))
            )
            : <Row className='w-100'><span>Your cart is empty!</span></Row>
        }
        <Row sm="auto" className="justify-content-stretch d-flex align-items-center">
            <Col sm={6} className="d-flex justify-content-center">
                <Button
                className="m-1 align-self-left"
                variant="danger"
                onClick={handleClear}
                disabled={cartEmpty}
                >Clear Cart</Button>
            </Col>
            <Col sm={2} className="d-flex justify-content-center align-items-center">
                <h5>Grand Total: </h5>
            </Col>
            <Col sm={2} className="d-flex justify-content-center align-items-center">
                <h5>${money_round(total)}</h5>
            </Col>
            <Col sm={2} className="d-flex justify-content-center">
            <Link to={`${url}/address`}>
                <Button
                className="m-1"
                variant="primary"
                onClick={handleCheckout}
                disabled={cartEmpty}
                >Checkout</Button>
            </Link>
            </Col>
        </Row>
    </>
    )
};

export default ItemView;