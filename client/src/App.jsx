import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Customers from "./Components/Layouts/Customers/index";
import Login from "./Components/Layouts/Login";
import Home from "./Components/Layouts/Home";
import OrdersManagement from "./Components/Layouts/Ordersmanagement";
import SingleCaptain from "./Components/Layouts/SingleCaptains";
import SingleCastomer from "./Components/Layouts/SingleCustomer";
import Captains from "./Components/Layouts/Captains";
import NotFound from "./Components/Layouts/NotFound";
import InProgress from "./Components/Layouts/ToBuildLater";

import "./App.css";

class App extends Component {
  state = {};
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route path="/login" component={Login} exact />
            <Route path="/" component={Home} exact />
            <Route path="/orders" component={OrdersManagement} exact />
            <Route exact path="/customers" component={Customers} />
            <Route exact path="/captains" component={Captains} />
            <Route
              exact
              path="/captains/profile/:id"
              component={SingleCaptain}
            />
            <Route
              exact
              path="/customers/profile/:id"
              component={SingleCastomer}
            />
            <Route exact path="/in-progress" component={InProgress} />
            <Route exact path="/not-found" component={NotFound} />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
