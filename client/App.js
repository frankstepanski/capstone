import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";

import  Home from './pages/Home';
import  UserModal from './components/UserModal';
import  Account from './pages/Account';
import  Shop  from './pages/Shop';
import  Blog  from './pages/Blog';
import  Contact from './pages/Contact';
import  About from './pages/About';
import  NotFoundPage  from './pages/NotFoundPage';
import  NavBar  from './components/NavigationBar';
import  Footer  from './pages/layouts/Footer';
import  Product from './pages/ProductForm';
import  Cart from './pages/Cart';

import { getCart, checkToken } from "./api";


import { getAllProducts } from "./api"

const App = () => {
  const [show, setShow] = useState(false); 
  const [user, setUser] = useState({});
  const [cart, setCart] = useState({}); 
  const [products, setProducts] = useState([{}]); 
  const [token, setToken] = useState(localStorage.token) 
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  
  useEffect ( () => {
      const fetchProducts = async () => {
        const getProd = await getAllProducts()
        setProducts(getProd)
      }
        fetchProducts()
  }, []);


  useEffect( ()=> {
    const authenticateToken = async () => {
      try {
        const res = await checkToken(token)
        if (res.success) {
          setUser(res.user);
          setIsUserLoggedIn(true);
        } else {
          localStorage.removeItem("token");
        }
      } catch (e) {
        console.log(e);
      }
    }

    const fetchCurrentCart = async () => {
      try {
        const { cart: currCart} = await getCart({token});
        setCart(currCart)
      } catch (e) {
        console.log(e)
      }
    };
    authenticateToken();
    fetchCurrentCart();
  }, [token]);

    return (
        <div className = "container">
          <UserModal 
            show = {show} 
            setShow = { setShow } 
            setIsUserLoggedIn = { setIsUserLoggedIn } 
            user = { user }
            setUser = {setUser} 
            setToken = {setToken}
          /> 
          <NavBar 
            setShow = { setShow } 
            isUserLoggedIn = { isUserLoggedIn } 
            setIsUserLoggedIn = { setIsUserLoggedIn } 
            user = { user }
            setUser = { setUser } 
          /> 
           <Switch>
              <Route exact path = "/" render = {() => (
                 < Home products = {products} />
              )}
                 />
              
              { 
              
              isUserLoggedIn && <Route path = "/account" render = {() => ( 
                          <Account 
                            user = { user } 
                          /> )} 
                       /> 
              }
              <Route path = "/shop" render ={() => ( 
                  <Shop 
                    cart={cart}  
                    setCart={setCart} 
                    user={user} 
                    products={products} 
                  /> )}
              />
              <Route path = "/cart" render ={() => ( 
                  <Cart
                    token={token}
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
              <Route path = "/product" component ={Product} />
              <Route path="*" component={NotFoundPage} />
          </Switch>
          <Footer />
        </div>
    );
  };

export default App;