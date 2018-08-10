import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { withRouter } from 'next/router';
import { trackPageView } from '../lib/gtag';

class TrackPageView extends React.Component {
  componentDidMount() {
    const { router, params } = this.props;
    const { asPath } = router;
    trackPageView({ page_path: asPath, ...params });
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
  router: PropTypes.object.isRequired,
  params: PropTypes.object,
};

export default withRouter(TrackPageView);
