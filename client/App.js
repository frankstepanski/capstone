import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";

import  Home from './pages/Home';
import  Account from './pages/Account';
import  Shop  from './pages/Shop';
import  ShoppingCart from './pages/ShoppingCart';
import  Blog  from './pages/Blog';
import  Contact from './pages/Contact';
import  About from './pages/About';
import  SearchResults from './pages/SearchResults';
import  NotFoundPage  from './pages/NotFoundPage';
import  Header  from './pages/layouts/Header';
import  Footer  from './pages/layouts/Footer';

const App = () => {
  const [user, setUser] = useState({});
  const [results, setResults] = useState([]);
  const [cart, setCart] = useState({}); // keys: products: [{product, quantity},{product, quantity}], grandTotal: float 
  const [products, setProducts] = useState([{}]); // array of products
  const [show, setShow] = useState(false); // show or not show modal
  const [orders, setOrder] = useState([{}]) // array of orders (for logged in users)

    return (
        <div className ="container">
          <Header setResults = {setResults} />
          {/* modal for user login??? */}
           <Switch>
              <Route exact path = "/" component ={Home} />
              <Route path = "/search" render ={() => ( <SearchResults results = {results} /> )} />
              <Route path = "/account" render = {() => ( <Account isLogin={isLoggedIn}  setIsLoggedIn={setIsLoggedIn} /> )} />
              <Route path = "/shop" render ={() => ( <Shop cart={cart}  setCart={setCart} user={user} products={products} /> )} />
              <Route path = "/cart" render ={() => ( <ShoppingCart cart={cart}  setCart={setCart} user={user} /> )} />
              <Route path = "/checkout" render ={() => ( <Checkout cart={cart} /> )} />
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