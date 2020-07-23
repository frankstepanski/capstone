import React, {useState, useEffect} from 'react';
import {
    Row, 
    Col, 
    Container,
    Image,
    Pagination,
    Button
} from 'react-bootstrap';

import {updateCartProductQuantity, removeFromCart} from '../api'

const CartItem = ({
    cartProduct,
    products,
    user,
    token
}) => {

    const {id: cartProductId, productId, purchasePrice, quantity} = cartProduct;
    const { description, image, name, stock, thumbnail } = products.find(product => product.id = cartProductId);

    let [itemQuantity, setItemQuantity] = useState(quantity)

    const handleQuantityChange = () => {
        try {
            
        } catch (e) {
            console.error(e);
        }
    }

    const handleItemRemoval = async () => {
        try {
            const res = await removeFromCart({token, cartProductId});

            if (res.success) {
                
            }
            
        } catch (e) {
            console.error(e);
        }
    }

    const handleStockDecrement = () => setItemQuantity(--itemQuantity);

    const handleStockIncrement = () => {
        
        setItemQuantity(++itemQuantity)
    }

    return (
    <>
        <Row className='justify-content-around'>
            <Col sm={2} className='align-self-center'><Image src={thumbnail}/></Col>
            <Col sm={6} className='align-self-center'>
                <Container style={{
                'flexWrap': 'nowrap',
                'width': '100%'
                }}>
                    <Row ><h3>{name}</h3></Row>
                    <Row >
                        <Col sm={1} className='align-self-center'>
                            <Pagination>
                                <Pagination.Prev disabled={itemQuantity <= 1 ? true : false} onClick={handleStockDecrement}/>
                                <Pagination.Item disabled>{itemQuantity}</Pagination.Item>
                                <Pagination.Next disabled={itemQuantity >= stock ? true : false} onClick={handleStockIncrement}/>
                            </Pagination>
                        </Col>
                        <Col sm={1} className='align-self-center'>X ${purchasePrice}</Col>
                    </Row>
                </Container>
            {
                <Col sm={1} className='align-self-center'>{stock > quantity ? 'IN STOCK' : 'OUT OF STOCK'}</Col>
            }
            </Col>
            <Col sm={2} className='align-self-center'>
                <h4>$ {purchasePrice * quantity}</h4>
            </Col>
            <Col sm={2} 
            className='align-self-center'>
                <Button 
                variant="outline-danger"
                onClick={removeFromCart}
                >Remove</Button>
            </Col>
        </Row>
    </>
    )
};
    
export default CartItem;