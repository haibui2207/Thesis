import React, { Component } from "react";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import "@coreui/icons/css/coreui-icons.min.css";
import "flag-icon-css/css/flag-icon.min.css";
// import "font-awesome/css/font-awesome.min.css";
import "simple-line-icons/css/simple-line-icons.css";
import "./scss/style.css";

import { DefaultLayout } from "./containers";
import Login from "./views/Pages/Login";
import Register from "./views/Pages/Register";
import Page404 from "./views/Pages/Page404";
import Page500 from "./views/Pages/Page500";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false
    };
  }

  componentWillReceiveProps(newProps) {
    this.setState({ isLoggedIn: newProps.isLoggedIn });
  }

  render() {
    return (
      <HashRouter>
        <Switch>
          <Route path="/login" name="Login Page" component={Login} />
          {!this.state.isLoggedIn && <Redirect to="login" />}
          
          {this.state.isLoggedIn && (
            <Route path="/register" name="Register Page" component={Register} />
          )}
          {this.state.isLoggedIn && (
            <Route path="/404" name="Page 404" component={Page404} />
          )}
          {this.state.isLoggedIn && (
            <Route path="/500" name="Page 500" component={Page500} />
          )}
          {this.state.isLoggedIn && (
            <Route path="/" name="Home" component={DefaultLayout} />
          )}
          {this.state.isLoggedIn && <Redirect to="/" />}
        </Switch>
      </HashRouter>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.login.isLoggedIn
  };
};

export default connect(mapStateToProps)(App);
