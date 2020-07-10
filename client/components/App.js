import React, { useEffect, useState } from "react";
import { Route, Redirect, Switch } from "react-router-dom";

import { Jumbotron } from "react-bootstrap";

const App = () => {
    // useState
    // useQueryParams
    
    // other functions
    // useEffect
    
    return (
      <>
        <Header />
        <Switch>
           <Route exact path = "/" component ={Home} />
           <Route path = "/shop" component ={Shop} />
           <Route path = "/shop" component ={Blog} />
           <Route path = "/about" component ={About} />
           <Route path = "/contact" component ={Contact} />
           <Route component ={NoMatch} />
        </Switch>
      </>
    );
  };

export default App;