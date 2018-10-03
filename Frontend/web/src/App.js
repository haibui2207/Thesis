import React, { Component } from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
// Styles
// CoreUI Icons Set
import '@coreui/icons/css/coreui-icons.min.css';
// Import Flag Icons Set
import 'flag-icon-css/css/flag-icon.min.css';
// Import Font Awesome Icons Set
import 'font-awesome/css/font-awesome.min.css';
// Import Simple Line Icons Set
import 'simple-line-icons/css/simple-line-icons.css';
// Import Main styles for this application
import './scss/style.css';

// Containers
import { DefaultLayout } from './containers';
// Pages
import Login from './views/Pages/Login';
import Register from './views/Pages/Register';
import Page404 from './views/Pages/Page404';
import Page500 from './views/Pages/Page500';

// import { renderRoutes } from 'react-router-config';

class App extends Component {
	render() {
		return (
			<HashRouter>
				<Switch>
					<Route path="/login" name="Login Page" component={Login} />
					<Route path="/register" name="Register Page" component={Register} />
					<Route path="/404" name="Page 404" component={Page404} />
					<Route path="/500" name="Page 500" component={Page500} />
					<Route path="/dashboard" name="Home" component={DefaultLayout} />
					<Redirect from="/" to="/login" />
				</Switch>
			</HashRouter>
		);
	}
}

export default App;
