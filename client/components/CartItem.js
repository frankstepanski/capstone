import React, {useState, useEffect} from 'react';
import {
    Row, 
    Col, 
    Container,
    Image,
    Pagination,
    Button
} from 'react-bootstrap';

import {updateCartProductQuantity, removeFromCart, checkStock, createProducts} from '../api'

const CartItem = ({
    cartProduct,
    products,
    user,
    token,
    setCart,
}) => {
    let [itemQuantity, setItemQuantity] = useState(0)
    const [product, setProduct] = useState({})
    /* const [cartProduct, setCartProduct ] = useState({}) */
    
    useEffect(() => {
        if (cartProduct) {
            setItemQuantity(quantity)
            setProduct(products.find(product => product.id = cartProductId))
        }
    }, [cartProduct])

    const handleQuantityChange = async (itemQuantity) => {
        try {
            const res = await updateCartProductQuantity({token, cartProductId, quantity: itemQuantity});
            if (res.success) setCart(res.updatedCart);
        } catch (e) {
            console.error(e);
        }
    }

    const handleItemRemoval = async () => {
        try {
            const res = await removeFromCart({token, cartProductId});
            if (res.success) setCart(res.updatedCart);
        } catch (e) {
            console.error(e);
        }
    }

    function money_round(num) {
        return Math.ceil(num * 100) / 100;
    }

    const handleStockDecrement = () => {
        setItemQuantity(--itemQuantity);
        handleQuantityChange(itemQuantity);
    }

    const handleStockIncrement = async () => {
        setItemQuantity(++itemQuantity)
        handleQuantityChange(itemQuantity);
    }

    return (
    <>
        <Col className='w-10'className='align-self-center'><Image src={thumbnail}/></Col>
        <Col className='w-40'className='align-self-center'>
            <Container className="w-100" style={{
            'flexWrap': 'nowrap'
            }}>
                <Row ><h3>{name}</h3></Row>
                <Row >
                    <Col sm="auto" className='align-content-center'>
                        <Pagination>
                            <Pagination.Prev disabled={itemQuantity <= 1 ? true : false} onClick={handleStockDecrement}/>
                            <Pagination.Item disabled>{itemQuantity}</Pagination.Item>
                            <Pagination.Next disabled={itemQuantity >= product.stock ? true : false} onClick={handleStockIncrement}/>
                        </Pagination>
                    </Col>
                    <Col sm="auto" className='align-self-center'>X ${purchasePrice}</Col>
                </Row>
            </Container>
        </Col>
        {
            <Col sm={1} className='align-self-center w-10'>{product.stock >= quantity ? 'IN STOCK' : 'OUT OF STOCK'}</Col>
        }
        <Col sm={2} className='align-self-center w-10'>
            <h5>$ {money_round(purchasePrice * itemQuantity)}</h5>
        </Col>
        <Col sm={2} 
        className='align-self-center w-10'>
            <Button 
            variant="outline-danger"
            onClick={handleItemRemoval}
            >Remove</Button>
        </Col>
    </>
    )
};
    
export default CartItem;