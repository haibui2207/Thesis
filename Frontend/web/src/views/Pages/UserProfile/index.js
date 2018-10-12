import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Alert, Row, Col, Card, CardBody, CardHeader, CardFooter, FormGroup, Label, Input, Button, InputGroup, InputGroupAddon } from 'reactstrap';
import { getUserInfo, updateUserInfo } from "../../../httpRequest";
import { resetUpdateUserInfoStatus } from "../../../redux/actions/apiActions/userAPIActions"
import { SUCCESSFUL, FAILED, MALE, FEMALE } from "../../../constants"

class UserProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userInfo: {
        id: 0,
        name: "",
        username: "",
        email: "",
        gender: "",
        password: "",
        rfid: "",
        role: ""
      },
      confirmPassword: '',
      showError: false,
      message: '',
      isChangePassword: false,
      isShowRfid: false,
      isUpdateSuccess: false,
      loading: false
    }
  }

  componentWillMount() {
    const userId = this.props.loginResponse.data.id;
    this.props.getUserInfo(userId);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.userProfile.status === SUCCESSFUL) {
      this.setState({
        userInfo: newProps.userProfile.data
      })
    }

    if (newProps.updateUser.status === SUCCESSFUL) {
      this.setState({
        loading: false,
        isUpdateSuccess: true,
        message: "Update Successful."
      })
    } else if (newProps.updateUser.status === FAILED) {
      this.setState({
        loading: false,
        showError: true,
        message: "Update Failed."
      })
    }
  }

  componentWillUnmount() {
    this.props.resetUpdateUserInfoStatus();
  }

  showNewPasswordInput = () => {
    this.setState({
      isChangePassword: true
    })
  }

  handleInputConfirmPasswordChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleInputChange = event => {
    let newInfo = this.state.userInfo;
    newInfo[event.target.name] = event.target.value;
    this.setState({
      userInfo: newInfo
    });
  };

  handleGender = event => {
    let newInfo = this.state.userInfo;
    newInfo[event.target.name] = event.target.value;
    this.setState({
      isUpdateSuccess: false,
      showError: false,
      userInfo: newInfo
    });
  }

  handleChangeRfid = () => {
    this.setState({
      isShowRfid: true
    });
  }

  updateProfile = async () => {
    const filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!this.state.userInfo.name || !this.state.userInfo.email) {
      this.setState({
        showError: true,
        message: "Name or Email must not empty."
      })
    } else if (!filter.test(this.state.userInfo.email)) {
      this.setState({
        showError: true,
        message: "Email invalid."
      })
    } else if (this.state.confirmPassword && this.state.userInfo.password !== this.state.confirmPassword) {
      this.setState({
        showError: true,
        message: "Password not match."
      })
    } else {
      this.setState({
        loading: true
      })
      await this.props.updateUserInfo(this.state.userInfo);
    }
  }

  removeError = () => {
    this.setState({
      isUpdateSuccess: false,
      showError: false
    });
  };

  render() {
    return (
      <div className="animated fadeIn" >
        <Row>
          <Col xs="12" sm="8" style={{ margin: "auto" }}>
            <Card>
              <CardHeader>
                <strong><span style={{ textTransform: "capitalize" }}>{this.state.userInfo.name}</span>'s Profile</strong>
              </CardHeader>
              <CardBody>
                <FormGroup>
                  <Label htmlFor="company">Name</Label>
                  <Input type="text" name="name" value={this.state.userInfo.name} onChange={this.handleInputChange} onFocus={this.removeError} />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="vat">UserName</Label>
                  <Input type="text" name="username" value={this.state.userInfo.username} readOnly disabled />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="street">Password</Label>
                  <div className="controls">
                    <InputGroup>
                      <Input type="password" size="16" type="text" disabled readOnly value="********" />
                      <InputGroupAddon addonType="append">
                        <Button color="secondary" onClick={this.showNewPasswordInput}>
                          <i className="fas fa-edit"></i>
                        </Button>
                      </InputGroupAddon>
                    </InputGroup>
                  </div>
                </FormGroup>
                <FormGroup row className="my-0" style={{ display: this.state.isChangePassword ? "flex" : "none" }}>
                  <Col xs="12" md="6">
                    <FormGroup>
                      <Label htmlFor="city">New Password</Label>
                      <Input type="password" name="password" placeholder="New password" onChange={this.handleInputChange} onFocus={this.removeError} />
                    </FormGroup>
                  </Col>
                  <Col xs="12" md="6">
                    <FormGroup>
                      <Label htmlFor="postal-code">Confirm New Password</Label>
                      <Input type="password" name="confirmPassword" placeholder="Confirm new password" onChange={this.handleInputConfirmPasswordChange} onFocus={this.removeError} />
                    </FormGroup>
                  </Col>
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="street">Email</Label>
                  <Input type="email" name="email" value={this.state.userInfo.email} onChange={this.handleInputChange} onFocus={this.removeError} />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="street">RFID Number</Label>
                  <div className="controls">
                    <InputGroup>
                      <Input
                        type="text"
                        name="rfid"
                        maxLength="8"
                        size="16"
                        onChange={this.handleInputChange}
                        onFocus={this.removeError}
                        disabled={this.state.isShowRfid ? false : true}
                        readOnly={this.state.isShowRfid ? false : true}
                        value={this.state.isShowRfid ? this.state.userInfo.rfid : "********"}
                      />
                      <InputGroupAddon addonType="append">
                        <Button color="secondary" onClick={this.handleChangeRfid}>
                          <i className="fas fa-edit"></i>
                        </Button>
                      </InputGroupAddon>
                    </InputGroup>
                  </div>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label>Gender</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <FormGroup row className="my-0 text-center">
                      <Col xs="6">
                        <FormGroup check>
                          <Label check>
                            <Input type="radio" checked={this.state.userInfo.gender === MALE ? true : false} name="gender" value={MALE} onChange={this.handleGender} />
                            {MALE}
                          </Label>
                        </FormGroup>
                      </Col>
                      <Col xs="6">
                        <FormGroup check>
                          <Label check>
                            <Input type="radio" checked={this.state.userInfo.gender === FEMALE ? true : false} name="gender" value={FEMALE} onChange={this.handleGender} />
                            {FEMALE} </Label>
                        </FormGroup>
                      </Col>
                    </FormGroup>
                  </Col>
                </FormGroup>

              </CardBody>
              <CardFooter className="text-right">
                <Row style={{ alignItems: "center" }}>
                  <Col xs="12" md="6">
                    <Alert
                      color="success"
                      style={{ display: this.state.isUpdateSuccess ? 'block' : 'none', margin: "0", padding: "0 15px", textAlign: "left" }}
                    >
                      {this.state.message}
                    </Alert>
                    <Alert
                      color="danger"
                      style={{ display: this.state.showError ? 'block' : 'none', margin: "0", padding: "0 15px", textAlign: "left" }}
                    >
                      {this.state.message}
                    </Alert>
                  </Col>
                  <Col xs="12" sm="6">
                    <Button type="submit" color="primary" onClick={this.updateProfile} style={{ marginRight: "20px" }}>
                      {
                        this.state.loading
                          ? <i className="fa fa-spinner fa-spin fa-1x fa-fw"></i>
                          : <i className="fas fa-save"></i>
                      } Update
                    </Button>
                    <Button type="button" color="secondary" onClick={() => this.props.history.push('/dashboard')}>
                      <i className="fa fa-ban"></i> Cancel
                    </Button>
                  </Col>
                </Row>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div >
    );
  }
}

const mapStateToProps = state => {
  return {
    loginResponse: state.login,
    userProfile: state.getProfile,
    updateUser: state.updateUser
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getUserInfo,
      updateUserInfo,
      resetUpdateUserInfoStatus
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserProfile);
