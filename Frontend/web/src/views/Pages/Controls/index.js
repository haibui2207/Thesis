import React, { Component } from "react";

class Controls extends Component {
  render() {
    return (
      <div className="app flex-row align-items-center">
        <ul>
          <li>Lights</li>
          <li>Door</li>
        </ul>
      </div>
    );
  }
}

export default Controls;
