import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getAllPins, updatePinNumber, getLastestRecordDHT, deleteAllDHTData } from "../../../httpRequest";
import { SUCCESSFUL } from "../../../constants";
import { Row, Col, Card, CardHeader, CardBody, ListGroup, ListGroupItem } from 'reactstrap';
import Widget01 from './Widget01';
import { kitKey002 } from "../../../httpRequest/config"
import { reset } from "../../../redux/actions/apiActions/dhtAPIActions"

class Monitoring extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      intervalId: 0,
      data: [
        { temperature: 39, humidity: 40 },
        { temperature: 40, humidity: 80 },
        { temperature: 28, humidity: 49 },
        { temperature: 20, humidity: 65 },
        { temperature: 37, humidity: 49 },
      ],
      pinsUsed: [
        // { pin: 13, key: kitKey002, header: "Light", mainText: "Gate", color: "success", iconOff: 'far fa-lightbulb', iconOn: 'fas fa-lightbulb', isClicked: true },
        { pin: 4, key: kitKey002, header: "Light", mainText: "Living room stage 1", color: "success", iconOff: 'far fa-lightbulb', iconOn: 'fas fa-lightbulb', isClicked: true },
        { pin: 5, key: kitKey002, header: "Light", mainText: "Bedroom stage 1", color: "success", iconOff: 'far fa-lightbulb', iconOn: 'fas fa-lightbulb', isClicked: true },
        { pin: 14, key: kitKey002, header: "Light", mainText: "Living room stage 2", color: "success", iconOff: 'far fa-lightbulb', iconOn: 'fas fa-lightbulb', isClicked: true },
        { pin: 12, key: kitKey002, header: "Light", mainText: "Bedroom stage 2", color: "success", iconOff: 'far fa-lightbulb', iconOn: 'fas fa-lightbulb', isClicked: true },
        { pin: 2, key: kitKey002, header: "Others", mainText: "Door", color: "warning", iconOn: 'fas fa-door-open', iconOff: 'fas fa-door-closed', isClicked: true },
        { pin: 3, key: kitKey002, header: "Others", mainText: "Fire", color: "danger", iconOn: 'fab fa-gripfire', iconOff: 'fas fa-fire-extinguisher', isClicked: false },
        { pin: 9, key: kitKey002, header: "Others", mainText: "Motion", color: "info", iconOn: 'fas fa-walking', iconOff: 'fas fa-male', isClicked: false },
      ],
      pins: [
        { pin: 2, key: kitKey002, state: 0 }
      ]
    }
  }

  componentWillMount() {
    this.props.getLastestRecordDHT();
    this.props.getAllPins();
  }

  componentDidMount() {
    let intervalId = setInterval(() => {
      this.props.getLastestRecordDHT();
      this.props.getAllPins();
    }, 10000);
    this.setState({
      intervalId: intervalId
    })
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.getLastestDHTData.status === SUCCESSFUL && newProps.getLastestDHTData.data) {
      let newData = this.state.data;
      newData.unshift(newProps.getLastestDHTData.data)
      this.setState({
        data: newData
      });
      this.props.reset();
    }
    if (newProps.deleteDHTData.status === SUCCESSFUL) {
      this.setState({ loading: false });
    }
    if (newProps.getPins.status === SUCCESSFUL) {
      this.setState({ pins: newProps.getPins.data });
    }
  }

  removeAllDHTData = async () => {
    this.setState({ loading: true });
    await this.props.deleteAllDHTData();
    this.setState({
      data: []
    });
  }

  renderPin = () => {
    let result = [];

    this.state.pinsUsed.map(a => {
      this.state.pins.forEach(b => {
        if (Number(a.pin) === Number(b.pin) && a.key === b.key) {
          result.push({
            pin: a.pin,
            key: a.key,
            header: a.header,
            state: b.state,
            iconOn: a.iconOn,
            iconOff: a.iconOff,
            mainText: a.mainText,
            color: a.color,
            isClicked: a.isClicked
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
    let temps = [], humis = [], widgets = [];
    this.state.data && this.state.data.map((item, index) => {
      if (Number(item.temperature >= 35)) {
        temps.push(
          <ListGroupItem action color="danger" key={index}>
            {item.temperature}&deg;C
            <span style={{ float: "right" }}><i className="fa fa-thumbs-down fa-lg"></i></span>
          </ListGroupItem>);
      } else if (Number(item.temperature >= 30)) {
        temps.push(
          <ListGroupItem action color="warning" key={index}>
            {item.temperature}&deg;C
            <span style={{ float: "right" }}><i className="fa fa-thumbs-o-down fa-lg"></i></span>
          </ListGroupItem>);
      } else {
        temps.push(
          <ListGroupItem action color="info" key={index}>
            {item.temperature}&deg;C
            <span style={{ float: "right" }}><i className="fa fa-thumbs-o-up fa-lg"></i></span>
          </ListGroupItem>);
      }

      if (Number(item.humidity >= 70)) {
        humis.push(
          <ListGroupItem action color="primary" key={index}>
            {item.humidity}%
            <span style={{ float: "right" }}><i className="fa fa-thumbs-o-down fa-lg"></i></span>
          </ListGroupItem>);
      } else if (Number(item.humidity >= 55)) {
        humis.push(
          <ListGroupItem action color="success" key={index}>
            {item.humidity}%
            <span style={{ float: "right" }}><i className="fa fa-thumbs-o-up fa-lg"></i></span>
          </ListGroupItem>);
      } else {
        humis.push(
          <ListGroupItem action color="warning" key={index}>
            {item.humidity}%
            <span style={{ float: "right" }}><i className="fa fa-thumbs-o-down fa-lg"></i></span>
          </ListGroupItem>);
      }
    })

    this.renderPin() && this.renderPin().map((item, index) => {
      if (item.isClicked) {
        widgets.push(
          <Col xs="6" sm="3" key={index}>
            <Widget01
              color={item.color}
              variant="inverse"
              header={item.header}
              icon={item.state === 0 ? item.iconOff : item.iconOn}
              mainText={item.mainText}
              state={item.state}
              isClicked
              smallText={item.smallText}
              toggle={() => this.handleToggle({ pin: item.pin, key: item.key, state: item.state})}
            />
          </Col>
        )
      } else {
        widgets.push(
          <Col xs="6" sm="3" key={index}>
            <Widget01
              color={item.color}
              variant="inverse"
              header={item.header}
              icon={item.state === 0 ? item.iconOff : item.iconOn}
              mainText={item.mainText}
              state={item.state}
            />
          </Col>
        )
      }
    })

    return (
      <div className="animated fadeIn">
        <Row>
          <Col sm="6">
            <Card>
              <CardHeader>
                <i className="fas fa-thermometer fa-2x"></i><strong>Temperature</strong>
                {
                  ((this.state.data.length > 0) && (this.state.data[0].temperature >= 35 || this.state.data[0].temperature <= 20)) &&
                  <span className="badge badge-danger">Warning</span>
                }
                <a
                  style={{ cursor: "pointer", float: "right" }}
                  className="card-header-action btn btn-setting"
                  onClick={this.removeAllDHTData}
                >
                  {
                    this.state.loading === true
                      ? <i className="fa fa-spinner fa-spin fa-1x fa-fw"></i>
                      : <i className="fas fa-trash-alt fa-2x"></i>
                  }
                </a>
              </CardHeader>
              <CardBody style={{ maxHeight: "300px", overflow: "overlay" }}>
                <ListGroup>
                  {temps}
                </ListGroup>
              </CardBody>
            </Card>
          </Col>
          <Col sm="6">
            <Card>
              <CardHeader>
                <i className="fab fa-cloudversify fa-2x"></i><strong>Humidity</strong>
                {
                  ((this.state.data.length > 0) && (this.state.data[0].humidity >= 75 || this.state.data[0].humidity <= 50)) &&
                  <span className="badge badge-danger">Warning</span>
                }
                <a
                  style={{ cursor: "pointer", float: "right" }}
                  className="card-header-action btn btn-setting"
                  onClick={this.removeAllDHTData}
                >
                  {
                    this.state.loading === true
                      ? <i className="fa fa-spinner fa-spin fa-1x fa-fw"></i>
                      : <i className="fas fa-trash-alt fa-2x"></i>
                  }
                </a>
              </CardHeader>
              <CardBody style={{ maxHeight: "300px", overflow: "overlay" }}>
                <ListGroup>
                  {humis}
                </ListGroup>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          {widgets}
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    getLastestDHTData: state.getLastestDHTData,
    deleteDHTData: state.deleteDHTData,
    getPins: state.getPins,
    resetPins: state.resetPins
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getLastestRecordDHT,
      deleteAllDHTData,
      getAllPins,
      updatePinNumber,
      reset
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Monitoring);
