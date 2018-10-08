import React, { Component } from 'react';
import { Button, Card, CardBody, CardFooter, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row, Alert } from 'reactstrap';
import { createNewUser } from '../../../httpRequest';

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      username: '',
      password: '',
      confirmPassword: '',
      showError: false,
      message: ''
    };
  }

  handleInputChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  onSubmit = async event => {
    event.preventDefault();
    if (!this.state.name || !this.state.username || !this.state.password || !this.state.confirmPassword) {
      this.setState({
        showError: true,
        message: 'Please fill fully field above'
      })
      return;
    }
    if (this.state.password !== this.state.confirmPassword) {
      this.setState({
        showError: true,
        message: 'Password not match.'
      })
      return;
    }

    const response = await createNewUser(this.state.name, this.state.username, this.state.password);
    if (response.status && response.status === 200) {
      this.props.history.push('/dashboard');
    } else {
      this.setState({ showError: true });
    }
  }

  onKeyDown = async event => {
    this.setState({ showError: false });
    if (event.keyCode === 13) {
      this.onSubmit(event);
    }
  };


  goLoginPage = () => {
    this.props.history.push('/login');
  }

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <Form>
                    <h1>Register</h1>
                    <p className="text-muted">Create your account</p>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" name="name" onChange={this.handleInputChange} onKeyDown={this.onKeyDown} placeholder="name" autoComplete="name" />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" name="username" onChange={this.handleInputChange} onKeyDown={this.onKeyDown} placeholder="Username" autoComplete="username" />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password" name="password" placeholder="Password" onChange={this.handleInputChange} onKeyDown={this.onKeyDown} autoComplete="new-password" />
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password" name="confirmPassword" onChange={this.handleInputChange} onKeyDown={this.onKeyDown} placeholder="Repeat password" autoComplete="new-password" />
                    </InputGroup>
                    <Alert
                      color="danger"
                      style={{ "display": this.state.showError ? 'block' : 'none' }}
                    >
                      {this.state.message}
                    </Alert>
                    <Button color="success" onClick={this.onSubmit} block>Create Account</Button>
                  </Form>
                </CardBody>
                <CardFooter className="p-4">
                  <Row>
                    <Col xs="12">
                      <Button className="btn-twitter" onClick={this.goLoginPage} block><span>Already have account</span></Button>
                    </Col>
                  </Row>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Register;
