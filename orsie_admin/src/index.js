import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from "react-redux";
import "antd/dist/antd.css";
import {BrowserRouter as Router, Switch,Route,Redirect} from "react-router-dom";
import Login from "./pages/Login"
import Dashboard from "./pages/admin/dashboard"

ReactDOM.render(
  
    <Router>
      <Switch>
        
        <Route path="/login" component={Login} />
        <Route path="/admin" component={Dashboard} />
        
      </Switch>
    </Router>
  ,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
