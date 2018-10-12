import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';
import { connect } from "react-redux";
import { ADMIN, USER } from "../../constants"

import {
  AppAside,
  AppBreadcrumb,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav,
} from '@coreui/react';
// sidebar nav config
import navigation from '../../_nav';
// routes config
import routes from '../../routes';
import DefaultAside from './DefaultAside';
import DefaultFooter from './DefaultFooter';
import DefaultHeader from './DefaultHeader';

class DefaultLayout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      navigation: {},
      routes: []
    }
  }

  componentWillMount() {
    const tempNavs = { };
    tempNavs.items = [...navigation.items];
    const tempRoutes = [...routes];
    if (this.props.loginResponse.data.role === USER) {
      const newNavs = { };
      newNavs.items = [...navigation.items];
      const newRoutes = [...routes];
      if (!(newNavs.items.findIndex(item => item.name === "Users") === -1)) {
        newNavs.items.splice(newNavs.items.findIndex(item => item.name === "Users"), 1);
        newRoutes.splice(newRoutes.findIndex(item => item.name === "Users"))
        this.setState({
          navigation: newNavs,
          routes: newRoutes
        })
      }
    } else {
      this.setState({
        navigation: tempNavs,
        routes: tempRoutes
      })
    }
  }

  render() {
    return (
      <div className="app">
        <AppHeader fixed>
          <DefaultHeader />
        </AppHeader>
        <div className="app-body">
          <AppSidebar fixed display="lg">
            <AppSidebarHeader />
            <AppSidebarForm />
            <AppSidebarNav navConfig={this.state.navigation} {...this.props} />
            <AppSidebarFooter />
            <AppSidebarMinimizer />
          </AppSidebar>
          <main className="main">
            <AppBreadcrumb appRoutes={this.state.routes} />
            <Container fluid>
              <Switch>
                {this.state.routes.map((route, idx) => {
                  return route.component ? (<Route key={idx} path={route.path} exact={route.exact} name={route.name} render={props => (
                    <route.component {...props} />
                  )} />)
                    : (null);
                },
                )}
                <Redirect from="/" to="/dashboard" />
              </Switch>
            </Container>
          </main>
          <AppAside fixed hidden>
            <DefaultAside />
          </AppAside>
        </div>
        <AppFooter>
          <DefaultFooter />
        </AppFooter>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loginResponse: state.login
  };
};

export default connect(mapStateToProps)(DefaultLayout);
