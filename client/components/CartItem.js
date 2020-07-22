import React, {useState, useEffect} from 'react';
import {} from 'react-bootstrap';

import {updateCartProductQuantity, removeFromCart} from '../api'

const CartItem = ({
    key,
    productId,
    purchasePrice,
    quantity,
    user,
    token
}) => {

    const handleQuantityChange = () => {
        try {
            
        } catch (e) {
            console.error(e);
        }
    }

    const handleItemRemoval = async () => {
        try {
            const cartProductId = key;

            const res = await removeFromCart({token, cartProductId});

            if (res.success) {
                
            }
            
        } catch (e) {
            console.error(e);
        }
    }

    return (
    <>

    </>
    )
};
    
export default CartItem;