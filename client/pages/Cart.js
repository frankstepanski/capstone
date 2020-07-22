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
    token
}) => {

    //const [] = useState()

    const handleCheckout = () => {}

    const handleClear = async () => {
        try {
            const res = await clearCart({token});
            if (res.status) {
                setCart(res.emptyCart)
            }
        } catch (e) {
            console.error(error)
        }
    }

    const cartProducts = cart.products;
    const disabled = !Boolean(cartProducts.length)

    return (
    <>
        <h1>Shopping Cart</h1>
        <Container>
            <Row>
                {
                    cartProducts.length > 0 
                    ? (
                        cartProducts.map(cartProd => (
                            <CartItem 
                                key={cartProd.id}
                                productId={cartProd.productId}
                                purchasePrice={cartProd.purchasePrice}
                                quantity={cartProd.quantity}
                                user={user}
                                token={token}
                                setCart={setCart}
                            />
                        ))
                    )
                    : <span>Your cart is empty!</span>
                }
            </Row>

            <Row>
                <Button
                variant="danger"
                onClick={handleClear}
                {...disabled ? disabled : ""}
                >Clear Cart</Button>
                <Button
                variant="primary"
                onClick={handleCheckout}
                {...disabled ? disabled : ""}
                >Checkout</Button>)
            </Row>
        </Container>
    </>
    )
};

export default Cart;