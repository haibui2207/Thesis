import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getAllPins, updatePinNumber } from "../../../httpRequest";
import { SUCCESSFUL } from "../../../constants"

import { Card, CardBody, CardHeader, Col, Table, Row } from 'reactstrap';
import { AppSwitch } from '@coreui/react'
import { kitKey002 } from "../../../httpRequest/config"

class Controls extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pinsUsed: [
        { pin: 2, key: kitKey002, label: "Door" },
        { pin: 4, key: kitKey002, label: "Light bath room" },
        { pin: 5, key: kitKey002, label: "Light living room" },
        { pin: 12, key: kitKey002, label: "Light kitchen" },
        { pin: 13, key: kitKey002, label: "Light gate" },
        { pin: 14, key: kitKey002, label: "Light bedroom" }
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
    setInterval(() => this.props.getAllPins(), 5000);
  }

  componentWillUnmount() {
    clearInterval();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.pins === nextProps.getPins.data ? false : true;
  }

  componentWillReceiveProps(newProps) {
    if (newProps.getPins.status === SUCCESSFUL) {
      this.setState({ pins: newProps.getPins.data });
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

  render() {
    const tableBody = this.renderPin() && this.renderPin().map((item, index) =>
      <tr key={index}>
        <td className="text-center">
          {
            Number(item.state) === 1
              ? <i className="fa fa-lightbulb-o fa-lg" style={{ color: "green" }}></i>
              : <i className="fa fa-lightbulb-o fa-lg" style={{ color: "#a2adb6" }}></i>
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
    getPins: state.getPins
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getAllPins,
      updatePinNumber
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Controls);
