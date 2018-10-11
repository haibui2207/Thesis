import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody } from 'reactstrap';
import classNames from 'classnames';
import { mapToCssModules } from 'reactstrap/lib/utils';

const propTypes = {
  header: PropTypes.string,
  mainText: PropTypes.string,
  state: PropTypes.number,
  color: PropTypes.string,
  icon: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  cssModule: PropTypes.object,
  variant: PropTypes.string,
  toggle: PropTypes.func,
  isClicked: PropTypes.bool
};

const defaultProps = {
  header: '89.9%',
  mainText: 'Lorem ipsum...',
  state: 0,
  color: '',
  icon: 'far fa-lightbulb',
  variant: '',
  isClicked: false,
  toggle: () => { }
};

class Widget01 extends Component {
  renderSmallText = (mainText, state) => {
    switch (mainText) {
      case "Motion": return <small className="text-muted">{`Current state: ${state === 1 ? 'Have motion' : 'Normal'}`}</small>
      case "Fire": return <small className="text-muted">{`Current state: ${state === 1 ? 'Have fired' : 'Normal'}`}</small>
      case "Door": return <small className="text-muted">{`Current state: ${state === 1 ? 'Opened' : 'Closed'}`}</small>
      default: return <small className="text-muted">{`Current state: ${state === 0 ? 'OFF' : 'ON'}`}</small>
    }
  }

  render() {
    const { className, cssModule, header, mainText, state, color, icon, children, variant, isClicked, toggle, ...attributes } = this.props;

    const card = { style: '', bgColor: '' };

    if (variant === 'inverse') {
      card.style = 'text-white';
      card.bgColor = 'bg-' + color;
    }

    const classes = mapToCssModules(classNames(className, card.style, card.bgColor), cssModule);

    return (
      <Card className={classes} {...attributes}>
        <CardBody className="text-center">
          <div className="h4 m-0">{header}</div>
          <div>{mainText}</div>
          {
            isClicked
              ?
              <a style={{ display: "block", margin: "10px", cursor: "pointer" }} onClick={toggle}>
                <i className={`${icon} fa-5x`}></i>
              </a>
              :
              <a style={{ display: "block", margin: "10px" }}>
                <i className={`${icon} fa-5x`}></i>
              </a>
          }
          {this.renderSmallText(mainText, state)}
          <div>{children}</div>
        </CardBody>
      </Card>
    );
  }
}

Widget01.propTypes = propTypes;
Widget01.defaultProps = defaultProps;

export default Widget01;
