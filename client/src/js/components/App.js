import React, { Component } from "react";
import { BrowserRouter, Route, Switch} from "react-router-dom";
import * as actions from "../actions";
import "../../css/App.css";
import "primereact/resources/themes/nova-light/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

import Homepage from "./Homepage/Homepage";
import Register from "./Register/Register";
import Login from "./Login/Login";
import PrivateRoute from "./private-route/PrivateRoute";
import Dashboard from "./Dashboard/Dashboard";
import ProductList from "./Products/ProductList";

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Route exact path="/" component={Homepage} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/products" component={ProductList} />
            <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
