import React, { useState } from "react";
import {
    Container, 
    Row,
    Button
} from 'react-bootstrap'

import { clearCart } from "../api"
import CartItem from "../components/CartItem"

const Cart = ({
    cart,
    setCart,
    user,
    token,
    products,
    setCartEmpty,
    cartEmpty
}) => {
    console.log("CE(cart): ", cartEmpty)
    const handleCheckout = () => {}

    const handleClear = async () => {
        try {
            const res = await clearCart({token});
            console.log(`Clearing cart`, res)
            if (res.status) {
                setCart(res.emptyCart)
                setCartEmpty(true)
            }
        } catch (e) {
            console.error(error)
        }
    }

    const cartProducts = cart.products;

    return (
    <>
        <h1>My Cart</h1>
        <Container fluid>
            <Row sm={12}>
                {
                    cartEmpty === false
                    ? (
                        cartProducts.map(cartProduct => (
                            <CartItem 
                                key={cartProduct.id}
                                cartProduct={cartProduct}
                                products={products}
                                user={user}
                                token={token}
                                setCart={setCart}
                            />
                        ))
                    )
                    : <span>Your cart is empty!</span>
                }
            </Row>

            <Row sm="auto">
                <Button
                variant="danger"
                onClick={handleClear}
                disabled={cartEmpty}
                >Clear Cart</Button>
                <Button
                variant="primary"
                onClick={handleCheckout}
                disabled={cartEmpty}
                >Checkout</Button>
            </Row>
        </Container>
    </>
    )
};

export default Cart;