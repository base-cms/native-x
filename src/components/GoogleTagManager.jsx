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
const GoogleTagManager = ({ settings, accountKey }) => {
  if (!settings.googleAnalyticsId) return null;
  if (!settings.googleTagManagerId) return null;

  const { googleAnalyticsId, googleTagManagerId } = settings;
  /**
   * Global Site Tag (gtag.js) - Google Analytics
   *
   */
  return (
    <Fragment>
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`} />
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${googleTagManagerId}`} />
      <script
        dangerouslySetInnerHTML={{ // eslint-disable-line react/no-danger
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            window.gtag('config', '${googleAnalyticsId}', {
              send_page_view: false,
              custom_map: {
                dimension1: 'account_key',
                dimension2: 'story_id',
                dimension3: 'publisher_id',
                dimension4: 'advertiser_id',
                metric1: 'social_shares',
              },
              account_key: '${accountKey}'
            });
          `,
        }}
      />
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
