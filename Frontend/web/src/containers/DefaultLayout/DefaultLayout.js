import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';
import { connect } from 'react-redux';
import { ADMIN, USER } from '../../constants';
import { bindActionCreators } from 'redux';

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
	AppSidebarNav
} from '@coreui/react';
// sidebar nav config
import navigation from '../../_nav';
// routes config
import routes from '../../routes';
import DefaultAside from './DefaultAside';
import DefaultFooter from './DefaultFooter';
import DefaultHeader from './DefaultHeader';
import { reset } from '../../redux/actions/apiActions/userAPIActions';

class DefaultLayout extends Component {
	constructor(props) {
		super(props);

		this.state = {
			navigation: {},
			routes: []
		};
	}

	componentWillMount() {
		const tempNavs = {};
		tempNavs.items = [ ...navigation.items ];
		const tempRoutes = [ ...routes ];
		if (this.props.loginResponse.data.role === USER) {
			const newNavs = {};
			newNavs.items = [ ...navigation.items ];
			const newRoutes = [ ...routes ];
			if (!(newNavs.items.findIndex((item) => item.name === 'Users') === -1)) {
				newNavs.items.splice(newNavs.items.findIndex((item) => item.name === 'Users'), 1);
				newRoutes.splice(newRoutes.findIndex((item) => item.name === 'Users'));
				this.setState({
					navigation: newNavs,
					routes: newRoutes
				});
			}
		} else {
			this.setState({
				navigation: tempNavs,
				routes: tempRoutes
			});
		}
	}

	handleLogout = () => {
		this.props.reset();
		// this.props.history.push('/login');
	};

	render() {
		return (
			<div className="app">
				<AppHeader fixed>
					<DefaultHeader />
				</AppHeader>
				<div className="app-body" style={{ overflow: 'unset' }}>
					<AppSidebar fixed display="lg">
						<AppSidebarHeader />
						<AppSidebarForm />
						<AppSidebarNav navConfig={this.state.navigation} {...this.props}>
							<div className="sidebar">
								<div className="scrollbar-container sidebar-nav ps ps-container">
									<ul className="nav">
										<li className="nav-item">
											<a className="nav-link active" aria-current="page" href="#/dashboard">
												<i className="nav-icon icon-speedometer" />Dashboard<span className="badge badge-info">NEW</span>
											</a>
										</li>
										<li className="nav-title">Managerment </li>{' '}
										<li className="nav-item">
											<a className="nav-link" href="#/profile">
												<i className="nav-icon icon-user" />My profile
											</a>
										</li>
										{this.props.loginResponse.data.role === ADMIN && (
											<li className="nav-item">
												<a className="nav-link" href="#/users">
													<i className="nav-icon icon-people  " />Users
												</a>
											</li>
										)}
										<li className="nav-title">Monitoring </li>
										<li className="nav-item">
											<a className="nav-link" href="#/monitoring">
												<i className="nav-icon icon-eyeglass" />Monitoring
											</a>
										</li>
										<li className="nav-title">Controls </li>
										<li className="nav-item">
											<a className="nav-link" href="#/controls">
												<i className="nav-icon icon-cursor" />Controls
											</a>
										</li>
										<li className="nav-title"> </li>
										<li className="nav-item">
											<a className="nav-link" onClick={this.handleLogout}>
												<i className="nav-icon icon-logout" />Logout
											</a>
										</li>
										<li className="mt-auto nav-item">
											<a
												href="https://github.com/haibui2207/Thesis/tree/master/Frontend/web"
												className="nav-link nav-link-danger nav-link active"
											>
												<i className="nav-icon icon-social-github" />Custom Yourself
											</a>
										</li>
									</ul>
									<div className="ps__rail-x" style={{ left: '0px', bottom: '0px' }}>
										<div
											className="ps__thumb-x"
											tabindex="0"
											style={{ left: '0px', width: '0px;' }}
										/>
									</div>
									<div className="ps__rail-y" style={{ top: '0px', right: '0px' }}>
										<div
											className="ps__thumb-y"
											tabindex="0"
											style={{ top: '0px', height: '0px' }}
										/>
									</div>
								</div>
								<button className="sidebar-minimizer mt-auto" type="button" />
							</div>
						</AppSidebarNav>
						<AppSidebarFooter />
						<AppSidebarMinimizer />
					</AppSidebar>
					<main className="main">
						<AppBreadcrumb appRoutes={this.state.routes} />
						<Container fluid>
							<Switch>
								{this.state.routes.map((route, idx) => {
									return route.component ? (
										<Route
											key={idx}
											path={route.path}
											exact={route.exact}
											name={route.name}
											render={(props) => <route.component {...props} />}
										/>
									) : null;
								})}
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

const mapStateToProps = (state) => {
	return {
		loginResponse: state.login
	};
};

const mapDispatchToProps = (dispatch) =>
	bindActionCreators(
		{
			reset
		},
		dispatch
	);

export default connect(mapStateToProps, mapDispatchToProps)(DefaultLayout);
