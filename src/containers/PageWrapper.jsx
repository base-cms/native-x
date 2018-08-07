import React from 'react';
import PropTypes from 'prop-types';
import { AccountProvider } from '../providers/AccountProvider';

const PageWrapper = ({ children }) => (
  <AccountProvider>
    {children}
  </AccountProvider>
);

PageWrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default PageWrapper;
