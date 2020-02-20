import React from 'react';
import PropTypes from 'prop-types';
import { Progress } from 'reactstrap';

const LoadingBar = ({ label }) => (
  <div>
    <small className="text-muted">
      {label}
    </small>
    <Progress animated color="info" value={100} />
  </div>
);

LoadingBar.defaultProps = {
  label: 'Loading...',
};

LoadingBar.propTypes = {
  label: PropTypes.string,
};

export default LoadingBar;
