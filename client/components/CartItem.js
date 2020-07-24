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
import Product from '../pages/ProductForm';

const CartItem = ({
    cartProduct,
    products,
    user,
    token,
    setCart,
}) => {
    let [itemQuantity, setItemQuantity] = useState(0)
    const [product, setProduct] = useState({}) //contains prodDetails
    const [item, setItem ] = useState({}) //contains info from cart_products

    useEffect(() => {
        if (cartProduct) {
            setItem(cartProduct)
            setItemQuantity(cartProduct.quantity)
            setProduct(products.find(prod => prod.id === cartProduct.productId))
        }
    }, [cartProduct, products])

    const handleQuantityChange = async (itemQuantity) => {
        try {
            const res = await updateCartProductQuantity({token, cartProductId: item.id, quantity: itemQuantity});
            if (res.success) { setCart(res.updatedCart) };
        } catch (e) {
            console.error(e);
        }
    }

    const handleItemRemoval = async () => {
        try {
            const res = await removeFromCart({token, cartProductId: item.id});
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
        <Col className='d-flex justify-content-center' sm={2}><Image src={product.thumbnail} fluid rounded/></Col>
        <Col className='d-flex justify-content-stretch' sm={4}>
            <Container className="w-100 justify-content-space-between h-100" style={{
            'flexWrap': 'nowrap'
            }}>
                <Row className='justify-content-stretch'><h3>{product.name}</h3></Row>
                <Row className='d-flex align-items-stretch justify-content-stretch h-100'>
                    <Col className='d-flex align-items-center w-45 h-100'>
                        <Pagination className='align-middle'>
                            <Pagination.Prev disabled={itemQuantity <= 1 ? true : false} onClick={handleStockDecrement}/>
                            <Pagination.Item disabled>{itemQuantity}</Pagination.Item>
                            <Pagination.Next disabled={itemQuantity >= product.stock ? true : false} onClick={handleStockIncrement}/>
                        </Pagination>
                    </Col>
                    <Col className='justify-content-center w-45 h-100'>
                        <span className='align-middle'>X ${item.purchasePrice}</span>
                    </Col>
                </Row>
            </Container>
        </Col>
        {
            <Col sm={2} className='d-flex justify-content-center w-10'>
                {product.stock > itemQuantity ? <span className="text-success">IN STOCK</span> : <span className="text-danger">OUT OF STOCK</span>}
            </Col>
        }
        <Col sm={2} className='d-flex justify-content-center w-10'>
            <h5 className="align-middle">$ {money_round(item.purchasePrice * itemQuantity)}</h5>
        </Col>
        <Col sm={2} 
        className='d-flex justify-content-center w-10'>
            <Button 
            variant="outline-danger"
            onClick={handleItemRemoval}
            >Remove</Button>
        </Col>
    </>
    )
};
    
export default CartItem;