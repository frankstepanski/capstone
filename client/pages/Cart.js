import React, { useState, useEffect } from "react";
import {
    useRouteMatch,
    Switch,
    Route,
    Link,
} from 'react-router-dom'
import {
    Container, 
} from 'react-bootstrap'

import ItemView from "../components/ItemView"
import AddressView from "../components/AddressView";
import CheckoutView from '../components/CheckoutView';

const Cart = ({
    cart,
    setCart,
    user,
    token,
    products,
    setCartEmpty,
    cartEmpty,
}) => {
    const {path, url} = useRouteMatch();
    const [shippingAddress, setShippingAddress] = useState('')



    return (
    <Container>
        <Switch>
            <Route exact path={path} render={() => (
                <Container className='w-100' sm={12}>
                    <ItemView
                    cart={cart}
                    setCart={setCart}
                    user={user}
                    token={token}
                    products={products}
                    setCartEmpty={setCartEmpty}
                    cartEmpty={cartEmpty} />
                </Container>
            )}>
            </Route>
            <Route exact path={`${path}/address`} render={() => (
                <Container className='w-100' sm={12}>
                    <AddressView
                    user={user}
                    />
                </Container>
            )}>
            </Route>
            <Route exact path={`${path}/checkout`} render={() => (
                <Container className='w-100' sm={12}>
                    <CheckoutView 
                    setShippingAddress={setShippingAddress}
                    user={user}
                    error={error}
                    setError={setError}
                    />
                </Container>
            )}>
            </Route>
        </Switch>
    </Container>
    )
};

export default Cart;