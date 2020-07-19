import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";

import  Home from './pages/Home';
import  UserModal from './components/UserModal'
import  Account from './pages/Account';
import  Shop  from './pages/Shop';
import  ShoppingCart from './pages/ShoppingCart';
import  Blog  from './pages/Blog';
import  Contact from './pages/Contact';
import  About from './pages/About';
import  NotFoundPage  from './pages/NotFoundPage';
import  NavBar  from './components/NavigationBar';
import  Footer  from './pages/layouts/Footer';

const App = () => {
  const [show, setShow] = useState(false); // show or not show modal
  const [user, setUser] = useState({});
  const [cart, setCart] = useState({}); // keys: products: [{product, quantity},{product, quantity}], grandTotal: float 
  const [products, setProducts] = useState([{}]); // array of products
  const [orders, setOrder] = useState([{}]) // array of orders (for logged in users)
  const [isLoggedIn, setIsLoggedIn] = useState('');

    return (
        <div className ="container">
          <UserModal show={show} setShow = { setShow } /> {/* for closing modal */ }
          <NavBar setShow = { setShow } /> {/* for opening modal */ }
           <Switch>
              <Route exact path = "/" component ={Home} />
              <Route path = "/account" render = {() => ( <Account isLogin={isLoggedIn}  setIsLoggedIn={setIsLoggedIn} /> )} />
              <Route path = "/shop" render ={() => ( <Shop cart={cart}  setCart={setCart} user={user} products={products} /> )} />
              <Route path = "/cart" render ={() => ( <ShoppingCart cart={cart}  setCart={setCart} user={user} /> )} />
              <Route path = "/payment" render ={() => ( <Checkout cart={cart} /> )} />
              <Route path = "/blog" component ={Blog} />
              <Route path = "/about" component ={About} />
              <Route path = "/contact" component ={Contact} />
              <Route path="*" component={NotFoundPage} />
          </Switch>
          <Footer />
        </div>
    );
  };

export default App;