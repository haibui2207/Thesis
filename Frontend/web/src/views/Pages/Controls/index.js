import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getAllPins, updatePinNumber, resetAllPin } from "../../../httpRequest";
import { SUCCESSFUL } from "../../../constants"

import { Card, CardBody, CardHeader, Col, Table, Row } from 'reactstrap';
import { AppSwitch } from '@coreui/react'
import { kitKey002 } from "../../../httpRequest/config"

class Controls extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      intervalId: 0,
      pinsUsed: [
        { pin: 1, key: kitKey002, label: "Enable Automation" },
        { pin: 2, key: kitKey002, label: "Door" },
        { pin: 5, key: kitKey002, label: "Light bedroom stage 1" },
        { pin: 4, key: kitKey002, label: "Light living rom stage 1" },
        { pin: 12, key: kitKey002, label: "Light bedroom stage 2" },
        // { pin: 13, key: kitKey002, label: "Light gate" },
        { pin: 14, key: kitKey002, label: "Light living room stage 2" },
        { pin: 15, key: kitKey002, label: "Bell" }
      ],
      pins: [
        { pin: 2, key: kitKey002, state: 0 },
        { pin: 3, key: kitKey002, state: 1 },
        { pin: 4, key: kitKey002, state: 0 },
        { pin: 5, key: kitKey002, state: 1 },
        { pin: 9, key: kitKey002, state: 0 },
        { pin: 10, key: kitKey002, state: 1 },
      ]
    }
  }

  componentWillMount() {
    this.props.getAllPins();
  }

  componentDidMount() {
    let intervalId = setInterval(() => this.props.getAllPins(), 5000);
    this.setState({
      intervalId: intervalId
    })
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state === nextState ? false : true;
  }

  componentWillReceiveProps(newProps) {
    if (newProps.getPins.status === SUCCESSFUL) {
      this.setState({ pins: newProps.getPins.data });
    }
    if (newProps.resetPins.status === SUCCESSFUL) {
      this.setState({ loading: false });
    }
  }

  renderPin = () => {
    let result = [];

    this.state.pinsUsed.map(a => {
      this.state.pins.forEach(b => {
        if (Number(a.pin) === Number(b.pin) && a.key === b.key) {
          result.push({
            pin: a.pin,
            key: a.key,
            label: a.label,
            state: b.state
          });
        }
      });
    })

    return result;
  }

  handleToggle = async ({ pin, key, state }) => {
    await this.props.updatePinNumber({ pin, key, state: state === 0 ? 1 : 0 });
    this.props.getAllPins();
  }

  handleReset = async () => {
    this.setState({ loading: true });
    await this.props.resetAllPin();
    this.props.getAllPins();
  }

  render() {
    const tableBody = this.renderPin() && this.renderPin().map((item, index) =>
      <tr key={index}>
        <td className="text-center">
          {
            Number(item.state) === 1
              ? <i className="far fa-lightbulb fa-lg" style={{ color: "green" }}></i>
              : <i className="fas fa-lightbulb fa-lg" style={{ color: "#a2adb6" }}></i>
          }
        </td>
        <td className="text-center">
          <AppSwitch
            className={'mx-1'}
            variant={'3d'}
            color={'primary'}
            onChange={() => this.handleToggle({ pin: item.pin, key: item.key, state: item.state })}
            checked={Number(item.state) === 1 ? true : false}
          />
        </td>
        <td className="text-center">
          {item.label}
        </td>
      </tr>);

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12">
            <Card>
              <CardHeader>
                Monitoring
                <div className="card-header-actions">
                  <a
                    style={{ cursor: "pointer" }}
                    className="card-header-action btn btn-setting"
                    onClick={this.handleReset}
                  >
                    {
                      this.state.loading === true
                        ? <i className="fa fa-spinner fa-spin fa-1x fa-fw"></i>
                        : <i className="fas fa-sync-alt fa-lg"></i>
                    }
                  </a>
                </div>
              </CardHeader>
              <CardBody className="p-0">
                <Table hover striped className="table-align-middle mb-0">
                  <thead>
                    <tr>
                      <th className="text-center">Status</th>
                      <th className="text-center">Control</th>
                      <th className="text-center">Device</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableBody}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    getPins: state.getPins,
    resetPins: state.resetPins
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getAllPins,
      updatePinNumber,
      resetAllPin
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Controls);
