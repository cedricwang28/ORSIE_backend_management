import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import "antd/dist/antd.css";
import {HashRouter as Router, Switch,Route,Redirect} from "react-router-dom";
import Login from "./pages/Login"
import Dashboard from "./pages/admin/dashboard"

ReactDOM.render(
  
    <Router>
      <Switch>
        
        <Route path="/login" component={Login} />
        <Route path="/admin" component={Dashboard} />
        <Redirect to="/admin" from="/" />
        
      </Switch>
    </Router>
  ,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

