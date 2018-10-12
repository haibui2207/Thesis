import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Row, Table, Modal, ModalHeader, ModalBody, ModalFooter, Alert, Col, Card, CardBody, FormGroup, Label, Input, Button, InputGroup, InputGroupAddon } from 'reactstrap';
import { getAllUsers, updateUserInfo, deleteUser } from "../../../httpRequest";
import { resetUpdateUserInfoStatus } from "../../../redux/actions/apiActions/userAPIActions"
import { SUCCESSFUL, FAILED, MALE, FEMALE } from "../../../constants"

class UserManagement extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [
        {
          id: 1,
          name: "test",
          username: "test",
          email: "test@gmail.com",
          gender: MALE,
          password: "test",
          rfid: "",
          role: "User"
        }
      ],
      chosenUser: 0,
      isShownModal: false,
      isShownNestedModal: false,
      confirmPassword: '',
      showError: false,
      message: '',
      isChangePassword: false,
      isShowRfid: false,
      isUpdateSuccess: false,
      loading: false,
      deleteLoading: false
    }
  }

  componentWillMount() {
    this.props.getAllUsers();
  }

  componentWillReceiveProps(newProps) {
    console.log(newProps)
    if (newProps.getUsers.status === SUCCESSFUL) {
      this.setState({
        users: newProps.getUsers.data
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
    } else {
      this.setState({
        isUpdateSuccess: false,
        showError: false,
        message: ""
      })
    }

    if (newProps.deleteUserResponse.status === SUCCESSFUL) {
      this.setState({
        deleteLoading: false,
        isShownModal: false,
        isShownNestedModal: false,
      });
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
    let updatedUsers = this.state.users;
    updatedUsers[this.state.chosenUser][event.target.name] = event.target.value;
    this.setState({
      users: updatedUsers
    });
  };

  handleGender = event => {
    let updatedUsers = this.state.users;
    updatedUsers[this.state.chosenUser][event.target.name] = event.target.value;
    this.setState({
      isUpdateSuccess: false,
      showError: false,
      users: updatedUsers
    });
  }

  handleChangeRfid = () => {
    this.setState({
      isShowRfid: true
    });
  }

  updateProfile = async () => {
    const filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!this.state.users[this.state.chosenUser].name || !this.state.users[this.state.chosenUser].email) {
      this.setState({
        showError: true,
        message: "Name or Email must not empty."
      })
    } else if (!filter.test(this.state.users[this.state.chosenUser].email)) {
      this.setState({
        showError: true,
        message: "Email invalid."
      })
    } else if (this.state.confirmPassword && this.state.users[this.state.chosenUser].password !== this.state.confirmPassword) {
      this.setState({
        showError: true,
        message: "Password not match."
      })
    } else {
      this.setState({
        loading: true
      })
      await this.props.updateUserInfo(this.state.users[this.state.chosenUser]);
    }
  }

  removeError = () => {
    this.setState({
      isUpdateSuccess: false,
      showError: false
    });
  };

  openModal = index => {
    this.props.resetUpdateUserInfoStatus();
    index = Number(index) ? index : 0;
    this.setState({
      chosenUser: index,
      isShownModal: !this.state.isShownModal
    });
  }

  closeModal = () => {
    this.setState({
      isShownModal: !this.state.isShownModal,
      isShowRfid: false,
      isChangePassword: false,
      showError: false
    });
  }

  openNestedModal = () => {
    this.setState({
      isShownNestedModal: !this.state.isShownNestedModal,
    });
  }

  closeNestedModal = () => {
    this.setState({
      isShownNestedModal: !this.state.isShownNestedModal,
    });
  }

  closeAllModal = async userId => {
    this.setState({
      deleteLoading: true
    })
    await this.props.deleteUser(userId)
    await this.props.getAllUsers()
  }

  render() {
    const tableBody = this.state.users.map((user, index) => {
      return user.id !== this.props.loginResponse.data.id && (
        <tr key={index} style={{ cursor: "pointer" }} onClick={() => this.openModal(index)}>
          <td className="text-center">
            <div className="avatar">
              <img src={'assets/img/avatars/user-avatar-default.png'} className="img-avatar" alt="admin@bootstrapmaster.com" />
              <span className="avatar-status badge-success"></span>
            </div>
          </td>

          <td className="text-center">
            <div>{user.name}</div>
          </td>

          <td className="text-center">
            <div>{user.username}</div>
          </td>

          <td className="text-center">
            {
              user.gender === MALE
                ? <i className="fas fa-mars fa-2x"></i>
                : <i className="fas fa-venus fa-2x"></i>
            }
          </td>

          <td className="text-center">
            {user.email}
          </td>

          <td className="text-center">
            <a role="button" style={{ cursor: "pointer", color: "#20a8d8" }} onClick={() => this.openModal(index)}>
              <i className="fas fa-user-edit fa-2x"></i>
            </a>
          </td>
        </tr>
      )
    }
    );

    return (
      <div className="animated fadeIn">
        <Row>
          <Table
            hover
            responsive
            className="table-outline mb-0 d-sm-table"
            style={{ minWidth: "300px", overflow: "auto" }}>
            <thead className="thead-light">
              <tr>
                <th className="text-center"><i className="icon-people"></i></th>
                <th className="text-center">Name</th>
                <th className="text-center">Username</th>
                <th className="text-center">Gender</th>
                <th className="text-center">Email</th>
                <th className="text-center">Edit</th>
              </tr>
            </thead>
            <tbody>
              {tableBody}
            </tbody>
          </Table>
        </Row>
        <Modal isOpen={this.state.isShownModal} toggle={this.openModal} className={this.props.className} size="lg">
          <ModalHeader
            toggle={this.openModal}
            close={<a className="close" style={{ cursor: "pointer" }} onClick={this.closeModal}><i className="fas fa-times-circle"></i></a>}
          >
            <strong><span style={{ textTransform: "capitalize" }}>{this.state.users[this.state.chosenUser].name}</span>'s Profile</strong>
          </ModalHeader>
          <ModalBody>
            <Row>
              <Col xs="12" style={{ margin: "auto" }}>
                <Card>
                  <CardBody>
                    <FormGroup>
                      <Label htmlFor="company">Name</Label>
                      <Input type="text" name="name" value={this.state.users[this.state.chosenUser].name} onChange={this.handleInputChange} onFocus={this.removeError} />
                    </FormGroup>
                    <FormGroup>
                      <Label htmlFor="vat">UserName</Label>
                      <Input type="text" name="username" value={this.state.users[this.state.chosenUser].username} readOnly disabled />
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
                      <Input type="email" name="email" value={this.state.users[this.state.chosenUser].email} onChange={this.handleInputChange} onFocus={this.removeError} />
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
                            value={this.state.isShowRfid ? this.state.users[this.state.chosenUser].rfid : "********"}
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
                                <Input type="radio" checked={this.state.users[this.state.chosenUser].gender === MALE ? true : false} name="gender" value={MALE} onChange={this.handleGender} />
                                {MALE}
                              </Label>
                            </FormGroup>
                          </Col>
                          <Col xs="6">
                            <FormGroup check>
                              <Label check>
                                <Input type="radio" checked={this.state.users[this.state.chosenUser].gender === FEMALE ? true : false} name="gender" value={FEMALE} onChange={this.handleGender} />
                                {FEMALE} </Label>
                            </FormGroup>
                          </Col>
                        </FormGroup>
                      </Col>
                    </FormGroup>
                  </CardBody>
                </Card>
                <Col xs="12">
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
              </Col>

              <Modal isOpen={this.state.isShownNestedModal} toggle={this.openNestedModal} style={{ top: "20%" }}>
                <ModalHeader>Warning</ModalHeader>
                <ModalBody><h3 style={{ color: "red" }}><b>Do you know what you are doing?</b></h3></ModalBody>
                <ModalFooter>
                  <Button type="button" color="primary" onClick={this.closeNestedModal}>
                    <i className="fas fa-times"></i> Not Sure
                </Button>
                  <Button type="button" color="danger" onClick={() => this.closeAllModal(this.state.users[this.state.chosenUser].id)}>
                    {
                      this.state.deleteLoading
                        ? <i className="fa fa-spinner fa-spin fa-1x fa-fw"></i>
                        : <i className="fas fa-check" ></i>
                    } Yes
                </Button>
                </ModalFooter>
              </Modal>
            </Row>
          </ModalBody>
          <ModalFooter className="text-right">
            <Button type="button" color="primary" onClick={this.updateProfile} style={{ marginRight: "20px" }}>
              {
                this.state.loading
                  ? <i className="fa fa-spinner fa-spin fa-1x fa-fw"></i>
                  : <i className="fas fa-save"></i>
              } Update
              </Button>
            <Button type="button" color="danger" onClick={this.openNestedModal}>
              <i className="fas fa-trash"></i> Remove
              </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loginResponse: state.login,
    getUsers: state.getUsers,
    userProfile: state.getProfile,
    updateUser: state.updateUser,
    deleteUserResponse: state.deleteUser
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getAllUsers,
      updateUserInfo,
      resetUpdateUserInfoStatus,
      deleteUser
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserManagement);
