import React, { useState, useEffect } from "react";
import {
    Container, 
    Row,
    Button,
    Col,
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
    const [total, setTotal] = useState(0)
    const [cartProducts, setCartProducts] = useState([])

    useEffect(() => {
        if (user && cart.products && cart.products.length > 0){
            setCartProducts(cart.products)
        } else {
            setCartEmpty(true)
        }
    }, [user, cart])

    useEffect(() => {
        const calculateTotal = () => {
            const priceArr = cartProducts.map((prod) => prod.purchasePrice * prod.quantity);
            const val = (priceArr.reduce((sum, currentVal) => sum + currentVal));
            setTotal(val);
        }
        if (cartProducts.length > 0){
            calculateTotal()
        }
    }, [cartProducts, cart])

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

    return (
    <>
        <h1>My Cart</h1>
        <Container
        className='w-100'>
            {
                cartEmpty === false
                ? (
                    cartProducts.map(cartProduct => (
                        <Row key={cartProduct.id} className='w-100'>
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
            <Row sm="auto" className="justify-content-stretch">
                <Col sm={2}>
                    <Button
                    className="m-1 align-self-left"
                    variant="danger"
                    onClick={handleClear}
                    disabled={cartEmpty}
                    >Clear Cart</Button>
                </Col>
                <Col sm={2}>
                    <h4>Grand Total: ${total}</h4>
                </Col>
                <Col sm={2}>
                <Button
                    className="m-1"
                    variant="primary"
                    onClick={handleCheckout}
                    disabled={cartEmpty}
                    >Checkout</Button>
                </Col>
            </Row>
        </Container>
    </>
    )
};

export default Cart;