import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getLastestRecordDHT, deleteAllDHTData } from "../../../httpRequest";
import { SUCCESSFUL } from "../../../constants";
import { Row, Col, Card, CardHeader, CardBody, ListGroup, ListGroupItem } from 'reactstrap';

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
        { temperature: 39, humidity: 40 },
        { temperature: 40, humidity: 80 },
        { temperature: 28, humidity: 49 },
        { temperature: 20, humidity: 65 },
        { temperature: 37, humidity: 49 }
      ]
    }
  }

  componentWillMount() {
    clearInterval();
  }

  componentDidMount() {
    let intervalId = setInterval(() => {
      this.props.getLastestRecordDHT();
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
    }
    if (newProps.deleteDHTData.status === SUCCESSFUL) {
      this.setState({ loading: false });
    }
  }

  removeAll = async () => {
    this.setState({ loading: true });
    await this.props.deleteAllDHTData();
    this.setState({
      data: []
    });
  }

  render() {
    let temps = [], humis = [];
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

    return (
      <div className="animated fadeIn">
        <Row>
          <Col sm="6">
            <Card>
              <CardHeader>
                <i className="fa fa-thermometer0 fa-lg"></i><strong>Temperature</strong>
                {
                  ((this.state.data.length > 0) && (this.state.data[0].temperature >= 35 || this.state.data[0].temperature <= 20)) &&
                  <span className="badge badge-danger">Warning</span>
                }
                <a
                  style={{ cursor: "pointer", float: "right" }}
                  className="card-header-action btn btn-setting"
                  onClick={this.removeAll}
                >
                  {
                    this.state.loading === true
                      ? <i className="fa fa-spinner fa-spin fa-1x fa-fw"></i>
                      : <i className="icons font-2xl d-block cui-trash"></i>
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
                <i className="fa fa-skyatlas fa-lg"></i><strong>Humidity</strong>
                {
                  ((this.state.data.length > 0) && (this.state.data[0].humidity >= 75 || this.state.data[0].humidity <= 50)) &&
                  <span className="badge badge-danger">Warning</span>
                }
                <a
                  style={{ cursor: "pointer", float: "right" }}
                  className="card-header-action btn btn-setting"
                  onClick={this.removeAll}
                >
                  {
                    this.state.loading === true
                      ? <i className="fa fa-spinner fa-spin fa-1x fa-fw"></i>
                      : <i className="icons font-2xl d-block cui-trash"></i>
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
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    getLastestDHTData: state.getLastestDHTData,
    deleteDHTData: state.deleteDHTData
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getLastestRecordDHT,
      deleteAllDHTData
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Monitoring);
