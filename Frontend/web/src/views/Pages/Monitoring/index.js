import React, { Component } from "react";

class Monitoring extends Component {
  render() {
    return (
      <div className="app flex-row align-items-center">
        <ul>
          <li>Temperature</li>
          <li>Humidity</li>
          <li>Soil Moisture</li>
          <li>Fire sensor</li>
          <li>Motion Sensor</li>
          <li>Camera</li>
        </ul>
      </div>
    );
  }
}

export default Monitoring;
