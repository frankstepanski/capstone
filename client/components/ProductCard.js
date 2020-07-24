import React, { useState , useEffect } from "react"
import { CardDeck, Card , Button, Pagination, Container, Col, Row, Popover,  PopoverContent, Overlay, OverlayTrigger } from 'react-bootstrap'

// import CardPopover from '../components/Popover'
import ProductView from './ProductView'
import { addToCart } from "../api"

const ProductCard = ({
    name,
    price,
    thumbnail,
    stock,
    setCart,
    token,
    productId,
    product
}) => {
    let [itemQuantity, setItemQuantity] = useState(0)
    const [prodId, setProdId] = useState(0)
    

    const handleAddToCart = async () => {
        try {
            const res = await addToCart({token, productId:prodId , quantity: itemQuantity});
            if (res.success) { setCart(res.updatedCart) };
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        if (productId) {
            setProdId(productId)
        }
    }, [productId])
    
    const handleStockDecrement = () => {
        const newQuantity = itemQuantity-1
        setItemQuantity(newQuantity); 

    }

    const handleStockIncrement = async () => {
        const newQuantity = itemQuantity+1
        setItemQuantity(newQuantity)
    }
    
     const popover = (   

        <Popover id="popover-basic" style ={{
            "minHeight":"10rem",
            "minWidth":"25rem"
        }}>
        <Popover.Title as="h3"></Popover.Title>
        <Popover.Content>
            <ProductView product ={ product } />
        </Popover.Content>
        </Popover>

    )
    
    return (
    <CardDeck role="button">
        <OverlayTrigger trigger="click" placement="right" overlay={popover}>
            <Card style ={{
           
            
            "margin": "2rem"

        }} >
        
        <Card.Img variant="top" src= { thumbnail }  style ={{
            "maxWidth":"10vw",
            "height":"auto",
            "alignSelf":"center"
        }}/>

            <Card.Body style = {{
                "maxHeight" : "34rem",
                
                
            }}>
                <Card.Title style ={{
                    "textAlign": "center"
                }} >{ name }</Card.Title>

                <Card.Subtitle className="mb-2 text-muted text-italic" style ={{ 
                    
                    "textAlign":"center"
                
                }}> Price: { price }
                
                    <Card.Subtitle className="mb-2 text-muted text-italic"> Stock: { stock }</Card.Subtitle>
                
                </Card.Subtitle>

            <Container>
                <Row>
                    <Col className="d-flex justify-content-center">
                    <Button   
                        onClick = {handleAddToCart}
                        >Add to Cart</Button>
                    </Col>
                    <Col>
                        <Pagination>
                            <Pagination.Prev disabled={itemQuantity <= 0 ? true : false} onClick={handleStockDecrement}/>
                            <Pagination.Item disabled>{itemQuantity}</Pagination.Item>
                            <Pagination.Next disabled={itemQuantity >= stock ? true : false} onClick={handleStockIncrement}/>
                        </Pagination>
                    </Col>
                </Row>
                
                
               
               
            </Container> 

                {/* <CardPopover product = {product} /> */}
                
                
               
                </Card.Body>
            </Card>
        </OverlayTrigger>
        
        
    </CardDeck>

   )
}

export default ProductCard;