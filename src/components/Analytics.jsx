import React from 'react';
import PropTypes from 'prop-types';
import { pageview } from '../lib/gtag';

class Analytics extends React.Component {
  componentDidMount() {
    pageview(this.props.accountKey, this.props.storyId);
  }

  render() {
    return (
      <div className="ga-track" />
    );
  }
}

Analytics.defaultProps = {
  storyId: undefined,
};

Analytics.propTypes = {
  accountKey: PropTypes.string.isRequired,
  storyId: PropTypes.string,
};

export default Analytics;
