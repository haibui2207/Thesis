import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
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
} from "reactstrap";
import { login } from "../../../httpRequest";
import { SUCCESSFUL } from "../../../constants"

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      showError: false,
      message: ""
    };
  }

  componentWillMount() {
    this.props.login({
      username: this.state.username,
      password: this.state.password
    });
  }

  componentWillReceiveProps(newProps) {
    if (newProps.loginResponse.status === SUCCESSFUL && newProps.loginResponse.isLoggedIn) {
      this.setState({
        showError: false,
        message: ""
      });
      this.props.history.push("/dashboard");
    } else {
      this.setState({
        showError: true,
        message: "Login Failed!"
      });
    }
  }

  handleInputChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  onClickLogin = event => {
    event.preventDefault();
    if (!this.state.username || !this.state.password) {
      this.setState({
        showError: true,
        message: "Please fill fully field above"
      });
      return;
    }

    this.props.login({
      username: this.state.username,
      password: this.state.password
    });
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
                        style={{ "display": this.state.showError ? 'block' : 'none' }}
                      >
                        {this.state.message}
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


const mapStateToProps = state => {
  return {
    loginResponse: state.login
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      login
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
