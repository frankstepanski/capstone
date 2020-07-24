import React, { useState , useEffect } from "react"
import { Card , Button } from 'react-bootstrap'

import { addToCart } from "../api"

const ProductView = ({
   product,
   token,
   productId

}) => {
    let [itemQuantity] = useState(0)
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

   return ( 
   
   <div className= "productPop">

        <Card>
        <Card.Img variant="top" src= { product.thumbnail } />
        
        <Card.Body>
            
            <Card.Title style={{
                "textAlign":"center"}}>
                     { product.name } </Card.Title>
            <Card.Text style={{
                "textAlign":"center"}}> { product.description } </Card.Text>
            <Card.Subtitle> Price: { product.price } </Card.Subtitle>
            <Card.Subtitle> Stock: { product.stock } </Card.Subtitle>
            <Card.Subtitle> Rating: { product.rating } </Card.Subtitle>

        </Card.Body>
                
        </Card>


    </div>
   )

   }


export default ProductView;