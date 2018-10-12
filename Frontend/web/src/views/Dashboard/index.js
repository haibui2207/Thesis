import React, { Component } from 'react';
import { Container, Button, Card, CardBody, CardHeader, Col, Row, Jumbotron } from 'reactstrap';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col sm="12">
            <Card>
              <CardBody>
                <Jumbotron>
                  <h1 className="display-3">Welcome</h1>
                  <h3>Chào mừng đến với khóa luận tốt nghiệp</h3>
                  <p className="lead">Đây là giao diện Web điều khiển và giám sát</p>
                  <hr className="my-2" />
                  <p>Bên dưới là một số thông tin về khóa luận bao gồm công nghệ sử dụng, source code và tài liệu tham khảo</p>
                  <p className="lead">
                    <Button color="primary" href="https://github.com/haibui2207/Thesis" target="_blank">Source code</Button>
                  </p>
                </Jumbotron>
              </CardBody>
            </Card>
          </Col>
          <Col sm="6">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i><strong>BackEnd Summary</strong>
              </CardHeader>
              <CardBody>
                <Jumbotron fluid>
                  <Container fluid>
                    <h1>BackEnd</h1>
                    <p className="lead">BackEnd được xây dựng dựa trên</p>
                    <ul>
                      <li><a href="https://docs.microsoft.com/en-us/aspnet/core/getting-started/?view=aspnetcore-2.0&tabs=windows" target="_blank">ASP.NET Core 2.0</a></li>
                      <li>Kết hợp với <a href="https://docs.microsoft.com/en-us/aspnet/core/data/ef-mvc/intro?view=aspnetcore-2.0" target="_blank">EntityFramework</a></li>
                      <li><a href="https://docs.microsoft.com/en-us/aspnet/core/data/ef-mvc/migrations?view=aspnetcore-2.0" target="_blank">Migration</a></li>
                      <li><a href="https://msdn.microsoft.com/en-us/magazine/mt845654.aspx" target="_blank">Restful API</a></li>
                      <li>Sử dụng <a href="https://docs.microsoft.com/en-us/aspnet/core/tutorials/first-mvc-app-xplat/working-with-sql?view=aspnetcore-2.0" target="_blank">Sqlite</a> làm Database</li>
                    </ul>
                    <hr className="my-2" />
                    <p className="lead">
                      <Button color="primary" href="https://github.com/haibui2207/Thesis/tree/master/Backend" target="_blank">Source code</Button>
                    </p>
                  </Container>
                </Jumbotron>
              </CardBody>
            </Card>
          </Col>
          <Col sm="6">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i><strong>FrontEnd Summary</strong>
              </CardHeader>
              <CardBody>
                <Jumbotron fluid>
                  <Container fluid>
                    <h1>FrontEnd</h1>
                    <p className="lead">FrontEnd được xây dựng dựa trên</p>
                    <ul>
                      <li><a href="https://coreui.io/" target="_blank">CoreUI Bootstrap Framework</a></li>
                      <li>Sử dụng thư viện <a href="https://reactjs.org/" target="_blank">ReactJS</a></li>
                      <li>Kết hợp <a href="https://redux.js.org/" target="_blank">Redux</a> để quản lí state</li>
                      <li>Và <a href="https://github.com/axios/axios" target="_blank">Axios</a> - một Opensource hỗ trợ HTTPClient</li>
                    </ul>
                    <hr className="my-2" />
                    <p className="lead">
                      <Button color="primary" href="https://github.com/haibui2207/Thesis/tree/master/Frontend/web" target="_blank">Source code</Button>
                    </p>
                  </Container>
                </Jumbotron>
              </CardBody>
            </Card>
          </Col>
          <Col sm="6">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i><strong>Arduino Board</strong>
              </CardHeader>
              <CardBody>
                <Jumbotron fluid>
                  <Container fluid>
                    <h1>Arduino ESP8266 Wifi Uno</h1>
                    <p className="lead">Sử dụng Arduino ESP8266</p>
                    <ul>
                      <li>Nạp code bằng <a href="https://www.arduino.cc/en/Main/Software" target="_blank">Arduino IDE</a></li>
                      <li>Thiết lập <a href="https://arduino.esp8266.vn/" target="_blank">môi trường</a> để kết nối thiết bị</li>
                      <li>Kết hợp với API từ <a href="https://github.com/haibui2207/Thesis/tree/master/Backend" target="_blank">BackEnd</a></li>
                      <li>Và một số cảm biến
                        <ul>
                          <li>Cảm biến nhiệt độ - độ ẩm</li>
                          <li>Cảm biến cháy</li>
                          <li>Cảm biến chuyển động</li>
                          <li>Cảm biến ánh sáng</li>
                          <li>Cảm biến nhiệt độ - độ ẩm</li>
                        </ul>
                        để thu thập dữ liệu
                      </li>
                    </ul>
                    <hr className="my-2" />
                    <p className="lead">
                      <Button color="primary" href="https://github.com/haibui2207/Thesis/tree/master/Arduino" target="_blank">Source code</Button>
                    </p>
                  </Container>
                </Jumbotron>
              </CardBody>
            </Card>
          </Col>
          <Col sm="6">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i><strong>Raspberry Pi</strong>
              </CardHeader>
              <CardBody>
                <Jumbotron fluid>
                  <Container fluid>
                    <h1>Raspberry Pi</h1>
                  </Container>
                </Jumbotron>
              </CardBody>
            </Card>
          </Col>
          <Col sm="6">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i><strong>Docker</strong>
                <small>Deploy Openstack</small>
              </CardHeader>
              <CardBody>
                <Jumbotron fluid>
                  <Container fluid>
                    <h1>Docker</h1>                
                  </Container>
                </Jumbotron>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Dashboard;
