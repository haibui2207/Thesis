import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody } from 'reactstrap';
import classNames from 'classnames';
import { mapToCssModules } from 'reactstrap/lib/utils';

const propTypes = {
  header: PropTypes.string,
  mainText: PropTypes.string,
  state: PropTypes.string,
  color: PropTypes.string,
  icon: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  cssModule: PropTypes.object,
  variant: PropTypes.string,
};

const defaultProps = {
  header: '89.9%',
  mainText: 'Lorem ipsum...',
  state: 'ON',
  // color: '',
  icon: 'far fa-lightbulb',
  variant: '',
};

class Widget01 extends Component {
  render() {
    const { className, cssModule, header, mainText, state, color, icon, children, variant, ...attributes } = this.props;

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
          <a style={{display: "block", margin: "10px"}}>
            <i className={`${icon} fa-5x`}></i>
          </a>
          <small className="text-muted">{`Current state: ${state}`}</small>
          <div>{children}</div>
        </CardBody>
      </Card>
    );
  }
}

Widget01.propTypes = propTypes;
Widget01.defaultProps = defaultProps;

export default Widget01;
