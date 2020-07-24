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

/*     useEffect(() => {
        if (user && cart.products && cart.products.length > 0){
            setCartProducts(cart.products)
        } else {
            setCartEmpty(true)
        }
    }, [cart]) */

    useEffect(() => {
        if (cart.products && cart.products.length === 0){
            setCartProducts(cart.products);
            setCartEmpty(true)
        } else {
            setCartProducts(cart.products);
        }
    }, [cart])

    useEffect(() => {
        const calculateTotal = () => {
            const priceArr = cartProducts.map((prod) => prod.purchasePrice * prod.quantity);
            const val = (priceArr.reduce((sum, currentVal) => sum + currentVal));
            setTotal(val);
        }
        if (cartProducts && cartProducts.length > 0){
            calculateTotal()
        }
    }, [cartProducts])

    function money_round(num) {
        return Math.ceil(num * 100) / 100;
    }

    const handleCheckout = () => {

    }

    const handleClear = async () => {
        try {
            const res = await clearCart({token});
            if (res.success) {
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
        <Container className='w-100' sm={12}>
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