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
    // useState
    // useQueryParams
    
    // other functions
    // useEffect
    
    return (
        <div className ="container">
          <Header />
           <Switch>
              <Route exact path = "/" component ={Home} />
              <Route path = "/account" component ={Account} />
              <Route path = "/cart" component ={ShoppingCart} />
              <Route path = "/shop" component ={Shop} />
              <Route path = "/blog" component ={Blog} />
              <Route path = "/about" component ={About} />
              <Route path = "/contact" component ={Contact} />
              <Route path = "/search" component ={SearchResults} />
              <Route path="*" component={NotFoundPage} />
          </Switch>
          <Footer />
        </div>
    );
  };

export default App;