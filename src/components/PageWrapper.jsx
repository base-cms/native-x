import React from 'react';
import PropTypes from 'prop-types';
import { AccountProvider } from './AccountProvider';
import Navbar from './Navbar';

const PageWrapper = props => (
  <AccountProvider>
    <Navbar />
    <section>
      {props.children}
    </section>
  </AccountProvider>
);

PageWrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,

};

export default PageWrapper;
