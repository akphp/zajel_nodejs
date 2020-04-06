import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import './style.css';

const Header = ({ title, Icon }) => (
  <Fragment>
    <div className="header">
      <div className="icon">{Icon}</div>
      <h2>{title}</h2>
    </div>
  </Fragment>
);

Header.propTypes = {
  Icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired
};
export default Header;
