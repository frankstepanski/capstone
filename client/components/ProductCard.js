import React, { useState , useEffect } from "react"
import { CardDeck, Card , Button, Pagination } from 'react-bootstrap'

import CardPopover from '../components/Popover'
import { addToCart } from "../api"

const ProductCard = ({
    name,
    price,
    thumbnail,
    stock,
    setCart,
    token,
    productId
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
    
    
    
    return (
    <CardDeck>
        <Card style ={{
           
            "maxWidth":"15rem",
            "margin": "2rem"

        }} >
        
        <Card.Img variant="top" src= { thumbnail } />

            <Card.Body style = {{
                "maxHeight" : "34rem",
                "maxWidth": "15rem",
                
            }}>
                <Card.Title style ={{
                    "textAlign": "center"
                }} >{ name }</Card.Title>

                <Card.Subtitle className="mb-2 text-muted text-italic" style ={{ 
                    
                    "textAlign":"center"
                
                }}> Price: { price }
                
                    <Card.Subtitle className="mb-2 text-muted text-italic"> Stock: { stock }</Card.Subtitle>
                
                </Card.Subtitle>

                

                <Button style ={{
                    "textAlign": "center"
                }}
                onClick = {handleAddToCart}
                >Add to Cart</Button>
                <Pagination>
                    <Pagination.Prev disabled={itemQuantity <= 0 ? true : false} onClick={handleStockDecrement}/>
                    <Pagination.Item disabled>{itemQuantity}</Pagination.Item>
                    <Pagination.Next disabled={itemQuantity >= stock ? true : false} onClick={handleStockIncrement}/>
                </Pagination>

                <CardPopover />
                
                
                
            </Card.Body>
        </Card>

        
        
    </CardDeck>

   )
}

export default ProductCard;