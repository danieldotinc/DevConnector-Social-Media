import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ProtectedRoute from "./components/common/protectedRoute";
import { Provider } from "react-redux";
import Navbar from "./components/layout/navbar";
import Landing from "./components/layout/landing";
import Dashboard from "./components/dashboard/dashboard";
import Register from "./components/auth/register";
import Login from "./components/auth/login";
import Logout from "./components/auth/logout";
import Footer from "./components/layout/footer";
import store from "./state/store";
import "./App.css";
import CreateProfile from "./components/profile/createProfile";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Navbar />
          <Switch>
            <ProtectedRoute path="/Dashboard" component={Dashboard} />
            <ProtectedRoute path="/Create-Profile" component={CreateProfile} />
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
