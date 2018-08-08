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
const GoogleAnalytics = ({ trackingId, accountKey }) => {
  if (!trackingId) return null;
  /**
   * Global Site Tag (gtag.js) - Google Analytics
   *
   */
  return (
    <Fragment>
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${trackingId}`} />
      <script
        dangerouslySetInnerHTML={{ // eslint-disable-line react/no-danger
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            window.gtag('config', '${trackingId}', {
              send_page_view: false,
              custom_map: {
                dimension1: 'accountKey',
                dimension2: 'storyId'
              },
              accountKey: '${accountKey}'
            });
          `,
        }}
      />
    </Fragment>
  );
};

GoogleAnalytics.defaultProps = {
  trackingId: '',
};

GoogleAnalytics.propTypes = {
  trackingId: PropTypes.string,
  accountKey: PropTypes.string.isRequired,
};

export default GoogleAnalytics;
