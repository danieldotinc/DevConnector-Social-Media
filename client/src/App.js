import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ProtectedRoute from "./components/common/protectedRoute";
import { Provider } from "react-redux";
import Navbar from "./components/layout/navbar";
import Landing from "./components/layout/landing";
import Dashboard from "./components/dashboard/dashboard";
import Profile from "./components/profile/profile";
import Profiles from "./components/profile/profiles";
import Register from "./components/auth/register";
import Login from "./components/auth/login";
import Logout from "./components/auth/logout";
import Footer from "./components/layout/footer";
import store from "./state/store";
import "./App.css";
import CreateProfile from "./components/profile/createProfile";
import EditProfile from "./components/profile/editProfile";
import AddExperience from "./components/profile/addExperience";
import AddEducation from "./components/profile/addEducation";
import NotFound from "./components/profile/notFound";
import Posts from "./components/posts/posts";
import Post from "./components/posts/post";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Navbar />
          <Switch>
            <Route exact path="/Not-Found" component={NotFound} />
            <ProtectedRoute path="/Dashboard" component={Dashboard} />
            <ProtectedRoute path="/Feed" component={Posts} />
            <ProtectedRoute path="/Post/:id" component={Post} />
            <ProtectedRoute path="/Create-Profile" component={CreateProfile} />
            <ProtectedRoute path="/Edit-Profile" component={EditProfile} />
            <ProtectedRoute path="/Add-Experience" component={AddExperience} />
            <ProtectedRoute path="/Add-Education" component={AddEducation} />
            <Route path="/Profile/:handle" component={Profile} />
            <Route path="/Profiles" component={Profiles} />
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
