import React from 'react';
import PropTypes from 'prop-types';
import Navbar from './Navbar';

const PageWrapper = props => (
  <div>
    <Navbar />
    <section>
      {props.children}
    </section>
  </div>
);

PageWrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,

};

export default PageWrapper;
