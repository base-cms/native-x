import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

const Nav = ({ url, imgSrc, brandName }) => (
  <nav className="navbar navbar-expand-lg bg-light sticky-top z-depth-half">
    <a className="navbar-brand" href={url} target="_blank" rel="noopener noreferrer">
      <img src={imgSrc} height="40px" alt={brandName} />
    </a>
    <ul className="navbar-nav mr-auto">
      <li className="nav-item">
        <NavLink className="nav-link" activeClassName="active" exact to="/">Home</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" activeClassName="active" to="/story">Bad Route</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" activeClassName="active" to="/20868284">Sample Story</NavLink>
      </li>
    </ul>
  </nav>
);

Nav.propTypes = {
  url: PropTypes.string.isRequired,
  imgSrc: PropTypes.string.isRequired,
  brandName: PropTypes.string.isRequired,
};

export default Nav;

