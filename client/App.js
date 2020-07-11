import React, { useEffect, useState } from "react";
import {  Route, Switch } from "react-router-dom";
import  Home  from './pages/Home';
import  Shop  from './pages/Shop';
import  Blog  from './pages/Blog';
import  Contact  from './pages/Contact';
import  About  from './pages/About';
import  Header  from './pages/layouts/Header'

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
              <Route path = "/shop" component ={Shop} />
              <Route path = "/blog" component ={Blog} />
              <Route path = "/about" component ={About} />
              <Route path = "/contact" component ={Contact} />
          </Switch>
        </div>
    );
  };

export default App;