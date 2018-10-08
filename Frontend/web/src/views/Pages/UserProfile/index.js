import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Row, Col, Card, CardBody, CardHeader, CardFooter, FormGroup, Label, Input, Button, InputGroup, InputGroupAddon } from 'reactstrap';
import { updateUserInfo } from "../../../httpRequest";
import { SUCCESSFUL, MALE, FEMALE } from "../../../constants"

class UserProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      username: '',
      password: '',
      confirmPassword: '',
      gender: MALE,
      email: "",
      rfid: "",
      showError: false,
      message: '',
      isChangePassword: false
    }
  }

  componentWillMount() {
    // this.setState({})
  }

  componentWillReceiveProps(newProps) {
    console.log(newProps);
  }

  changePassword = () => {
    this.setState({
      isChangePassword: true
    })
  }

  handleInputChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleGender = event => {
    this.setState({
      gender: event.currentTarget.value
    });
  }

  updateProfile = () => {
    console.log(this.state);
  }

  render() {
    return <div className="animated fadeIn" >
      <Row>
        <Col xs="12" sm="8" style={{ margin: "auto" }}>
          <Card>
            <CardHeader>
              <strong>My Profile</strong>
            </CardHeader>
            <CardBody>
              <FormGroup>
                <Label htmlFor="company">Name</Label>
                <Input type="text" name="name" value={this.state.name} onChange={this.handleInputChange} />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="vat">UserName</Label>
                <Input type="text" name="username" value={this.state.username} onChange={this.handleInputChange} />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="street">Password</Label>
                <div className="controls">
                  <InputGroup>
                    <Input size="16" type="text" disabled readOnly />
                    <InputGroupAddon addonType="append">
                      <Button color="secondary" onClick={this.changePassword}>
                        <i class="fa fa-pencil"></i>
                      </Button>
                    </InputGroupAddon>
                  </InputGroup>
                </div>
              </FormGroup>
              <FormGroup row className="my-0" style={{ display: this.state.isChangePassword ? "flex" : "none" }}>
                <Col xs="6">
                  <FormGroup>
                    <Label htmlFor="city">New Password</Label>
                    <Input type="text" name="password" placeholder="New password" onChange={this.handleInputChange} />
                  </FormGroup>
                </Col>
                <Col xs="6">
                  <FormGroup>
                    <Label htmlFor="postal-code">Confirm New Password</Label>
                    <Input type="text" name="confirmPassword" placeholder="Confirm new password" onChange={this.handleInputChange} />
                  </FormGroup>
                </Col>
              </FormGroup>
              <FormGroup>
                <Label htmlFor="street">Email</Label>
                <Input type="email" name="email" value={this.state.email} onChange={this.handleInputChange} />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="country">RFID Number</Label>
                <Input type="text" name="rfid" value={this.state.rfid} onChange={this.handleInputChange} />
              </FormGroup>
              <FormGroup row className="my-0 text-center">
                <Col xs="6">
                  <FormGroup check>
                    <Label check>
                      <Input type="radio" checked name="gender" value={MALE} onChange={this.handleGender} />
                      {MALE}
                    </Label>
                  </FormGroup>
                </Col>
                <Col xs="6">
                  <FormGroup check>
                    <Label check>
                      <Input type="radio" name="gender" value={FEMALE} onChange={this.handleGender} />
                      {FEMALE} </Label>
                  </FormGroup>
                </Col>
              </FormGroup>
            </CardBody>
            <CardFooter className="text-right">
              <Button type="submit" color="primary" onClick={this.updateProfile}>
                <i className="fa fa-dot-circle-o"></i> Update
              </Button>
              <Button type="button" color="danger" onClick={() => this.props.history.push('/dashboard')}>
                <i className="fa fa-ban"></i> Cancel
              </Button>
            </CardFooter>
          </Card>
        </Col>
      </Row>
    </div >;
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      updateUserInfo
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserProfile);
