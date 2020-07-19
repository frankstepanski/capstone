import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";

import  Home from './pages/Home';
import  UserModal from './components/UserModal';
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
  const [show, setShow] = useState(false); 
  const [user, setUser] = useState({});
  const [cart, setCart] = useState({}); 
  const [products, setProducts] = useState([{}]); 
  const [orders, setOrder] = useState([{}]) 
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

    return (
        <div className = "container">
          <UserModal 
            show={show} 
            setShow = { setShow } 
            setIsUserLoggedIn = { setIsUserLoggedIn } 
            setUser = {setUser} 
          /> 
          <NavBar 
            setShow = { setShow } 
            isUserLoggedIn = { isUserLoggedIn } 
            setIsUserLoggedIn = { setIsUserLoggedIn } 
            setUser = {setUser} 
          /> 
           <Switch>
              <Route exact path = "/" component ={Home} />
              <Route path = "/account" render = {() => ( 
                  <Account 
                    user = { user } 
                  /> )} 
              />
              <Route path = "/shop" render ={() => ( 
                  <Shop 
                    cart={cart}  
                    setCart={setCart} 
                    user={user} 
                    products={products} 
                  /> )}
              />
              <Route path = "/cart" render ={() => ( 
                  <ShoppingCart 
                    cart={cart}
                    setCart={setCart}
                    user={user}
                  /> )}
              />
              <Route path = "/payment" render ={() => ( 
                  <Checkout 
                    cart={cart}
                  /> )}
              />
              <Route path = "/blog" component ={Blog} />
              <Route path = "/about" component ={About} />rr
              <Route path = "/contact" component ={Contact} />
              <Route path="*" component={NotFoundPage} />
          </Switch>
          <Footer />
        </div>
    );
  };

export default App;