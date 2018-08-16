import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { trackPageView } from '../lib/gtag';

class TrackPageView extends React.Component {
  componentDidMount() {
    const { params } = this.props;
    trackPageView(params);
  }

  render() {
    return (
      <Fragment />
    );
  }
}

TrackPageView.defaultProps = {
  params: {},
};

/* eslint-disable react/forbid-prop-types */
TrackPageView.propTypes = {
  params: PropTypes.object,
};

export default TrackPageView;
