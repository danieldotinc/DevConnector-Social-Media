import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import Navbar from "./components/layout/navbar";
import Landing from "./components/layout/landing";
import Register from "./components/auth/register";
import Login from "./components/auth/login";
import Logout from "./components/auth/logout";
import Footer from "./components/layout/footer";
import store from "./state/store";
import "./App.css";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Navbar />
          <Switch>
            <Route path="/Register" component={Register} />
            <Route path="/Login" component={Login} />
            <Route path="/Logout" component={Logout} />
            <Route exact path="/" component={Landing} />
          </Switch>
          <Footer />
        </Router>
      </Provider>
    );
  }
}

export default App;
