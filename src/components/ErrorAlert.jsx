import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'reactstrap';

const ErrorAlert = ({ message }) => (
  <Alert className="mb-0" color="warning">
    <h5 className="alert-heading">
      Oh Snap!
    </h5>
    <hr />
    <p className="mb-0">
      {message}
    </p>
  </Alert>
);

ErrorAlert.defaultProps = {
  message: 'An unknown, fatal error occurred.',
};

ErrorAlert.propTypes = {
  message: PropTypes.string,
};

export default ErrorAlert;
