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
const GoogleTagManager = ({ accountKey, googleTagManagerId }) => {
  let html = '';
  if (googleTagManagerId) {
    html = `${html}
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','${googleTagManagerId}');

      // Set global GTM variables.
      // Values set here will be sent with _all_ GTM events.
      window.dataLayer.push({
        account_key: '${accountKey}'
      });
    `;
  }

  /**
   * Global Site Tag (gtag.js) - Google Analytics
   *
   */
  return (
    <Fragment>
      <script
        dangerouslySetInnerHTML={{ // eslint-disable-line react/no-danger
          __html: html,
        }}
      />
    </Fragment>
  );
};

GoogleTagManager.defaultProps = {
  googleTagManagerId: '',
};

GoogleTagManager.propTypes = {
  googleTagManagerId: PropTypes.string,
  accountKey: PropTypes.string.isRequired,
};

export default GoogleTagManager;
