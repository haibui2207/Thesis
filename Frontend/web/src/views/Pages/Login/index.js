import React, { Component } from 'react';
import {
	Button,
	Card,
	CardBody,
	CardGroup,
	Col,
	Container,
	Form,
	Input,
	InputGroup,
	InputGroupAddon,
	InputGroupText,
	Row,
	Alert
} from 'reactstrap';
import * as api from '../../../httpRequest';

class Login extends Component {
	constructor(props) {
		super(props);

		this.state = {
			username: '',
			password: '',
			showError: false
		};
	}

	handleInputChange = event => {
		this.setState({
			[event.target.name]: event.target.value
		});
	};

	onClickLogin = async event => {
		event.preventDefault();
		var response = await api.login(this.state.username, this.state.password);
		if (response.status === 200) {
			this.props.history.push('/dashboard');
		} else {
			this.setState({ showError: true });
		}
	};

	onKeyDown = async event => {
		this.setState({ showError: false });
		if (event.keyCode === 13) {
			this.onClickLogin(event);
		}
	};

	render() {
		return (
			<div className="app flex-row align-items-center">
				<Container>
					<Row className="justify-content-center">
						<Col md="8">
							<CardGroup>
								<Card className="p-4">
									<CardBody>
										<Form>
											<h1>Login</h1>
											<p className="text-muted">Sign In to your account</p>
											<InputGroup className="mb-3">
												<InputGroupAddon addonType="prepend">
													<InputGroupText>
														<i className="icon-user" />
													</InputGroupText>
												</InputGroupAddon>
												<Input
													type="text"
													name="username"
													placeholder="Username"
													autoComplete="username"
													onChange={this.handleInputChange}
													onKeyDown={this.onKeyDown}
												/>
											</InputGroup>
											<InputGroup className="mb-4">
												<InputGroupAddon addonType="prepend">
													<InputGroupText>
														<i className="icon-lock" />
													</InputGroupText>
												</InputGroupAddon>
												<Input
													type="password"
													name="password"
													placeholder="Password"
													autoComplete="current-password"
													onChange={this.handleInputChange}
													onKeyDown={this.onKeyDown}
												/>
											</InputGroup>
											<Alert
												color="danger"
												style={{"display": this.state.showError ? 'block' : 'none'}}
											>
												Login Failed!
											</Alert>
											<Row>
												<Col xs="6">
													<Button
														color="primary"
														className="px-4"
														onClick={this.onClickLogin}
													>
														Login
													</Button>
												</Col>
												<Col xs="6" className="text-right">
													<Button color="link" className="px-0">
														Forgot password?
													</Button>
												</Col>
											</Row>
										</Form>
									</CardBody>
								</Card>
								<Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: 44 + '%' }}>
									<CardBody className="text-center">
										<div>
											<h2>Sign up</h2>
											<p>Create New Account</p>
											<Button
												color="primary"
												className="mt-3"
												active
												onClick={() => this.props.history.push('/register')}
											>
												Register Now!
											</Button>
										</div>
									</CardBody>
								</Card>
							</CardGroup>
						</Col>
					</Row>
				</Container>
			</div>
		);
	}
}

export default Login;
