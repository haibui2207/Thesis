import React, { Component } from "react";
import PropTypes from "prop-types";

import { AppNavbarBrand, AppSidebarToggler } from "@coreui/react";
import logo from "../../assets/img/logo.png";
import subLogo from "../../assets/img/sub-logo.png";

const propTypes = {
  children: PropTypes.node
};

const defaultProps = {};

class DefaultHeader extends Component {
  render() {
    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <div style={{display: 'flex'}}>
          <AppNavbarBrand
            full={{ src: logo, height: 50, alt: "Logo" }}
            minimized={{
              src: subLogo,
              width: 30,
              height: 30,
              alt: "Logo"
            }}
          />
          <AppSidebarToggler className="d-md-down-none" display="lg" />
        </div>
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
