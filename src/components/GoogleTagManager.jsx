import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

/**
 * Renders the global site script tag for gtag.js with Google Analytics.
 *
 * If no tracking ID is present, no script will be inserted.
 * Also sets the accountKey globally.
 *
 * @see https://github.com/zeit/next.js/blob/master/examples/with-google-analytics
 */
const GoogleTagManager = ({ trackingId, accountKey }) => {
  if (!trackingId) return null;
  /**
   * Global Site Tag (gtag.js) - Google Analytics
   *
   */
  return (
    <Fragment>
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${trackingId}`} />
    </Fragment>
  );
};

GoogleTagManager.defaultProps = {
  trackingId: '',
};

GoogleTagManager.propTypes = {
  trackingId: PropTypes.string,
  accountKey: PropTypes.string.isRequired,
};

export default GoogleTagManager;
