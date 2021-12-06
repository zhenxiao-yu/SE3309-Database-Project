import React from "react";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import App from "views/App";
import Login from "views/Login";
import InvalidPath from "views/InvalidPath";
import Orders from "views/Orders"

//router component for switching between pages (views)
const Router = () => (
  <BrowserRouter>
    <Switch>
      {/* redirect to home page */}
      <Route path="/" exact component={App} />

      {/* redirect to login page */}
      <Route path="/login" component={Login} />

      {/* redirect to new user register page */}
      {/* <Route path="/register" component={Register} /> */}

      {/* redirect to shopping cart page */}
      {/* <Route path="/cart" component={Cart} /> */}

      {/* redirect to orders page */}
      <Route path="/orders" component={Orders} />

      {/* redirect to NO MATCH page */}
      <Route component={InvalidPath} />
      
    </Switch>
  </BrowserRouter>
);

export default Router;
