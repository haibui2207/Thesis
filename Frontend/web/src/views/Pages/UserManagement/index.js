import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Row, Table, } from 'reactstrap';
import { getAllUsers } from "../../../httpRequest";
import { SUCCESSFUL } from "../../../constants"

class UserManagement extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [
        {
          name: "test",
          username: "test",
          national: "Viet Nam",
          gender: "male"
        }
      ]
    }
  }

  componentWillMount() {
    this.props.getAllUsers();
  }

  componentWillReceiveProps(newProps) {
    if (newProps.getUsers.status === SUCCESSFUL) {
      this.setState({
        users: newProps.getUsers.data
      })
    }
  }

  render() {
    const tableBody = this.state.users.map(user =>
      <tr>
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
          <i class="icons font-2xl d-block cui-user"></i>
        </td>

        <td className="text-center">
          <i className="flag-icon flag-icon-vn h4 mb-0" title="vn" id="vn"></i>
        </td>

        <td className="text-center">
          <a role="button" style={{ cursor: "pointer", color: "#20a8d8" }}>
            <i class="icons font-2xl d-block cui-brush"></i>
          </a>
        </td>
      </tr>)

    return <div className="animated fadeIn">
      <Row>
        <Table hover responsive className="table-outline mb-0 d-none d-sm-table">
          <thead className="thead-light">
            <tr>
              <th className="text-center"><i className="icon-people"></i></th>
              <th className="text-center">Name</th>
              <th className="text-center">Username</th>
              <th className="text-center">Gender</th>
              <th className="text-center">National</th>
              <th className="text-center">Edit</th>
            </tr>
          </thead>
          <tbody>
            {tableBody}
          </tbody>
        </Table>
      </Row>
    </div>;
  }
}

const mapStateToProps = state => {
  return {
    getUsers: state.getUsers
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getAllUsers
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserManagement);
