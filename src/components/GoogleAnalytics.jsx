import React, { Fragment } from 'react';

class GoogleAnalytics extends React.Component {
  /**
   *
   */
  constructor(props) {
    super(props);
    const { GA_TRACKING_ID } = process.env;
    this.state = {
      trackingId: GA_TRACKING_ID,
    };
  }

  /**
   * Renders the global site script tag for gtag.js with
   * Google Analytics.
   *
   * If no tracking ID is present, no script will be inserted.
   *
   * @see https://github.com/zeit/next.js/blob/master/examples/with-google-analytics
   */
  render() {
    const { trackingId } = this.state;
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
                  dimension2: 'storyId',
                },
              });
            `,
          }}
        />
      </Fragment>
    );
  }
}

export default GoogleAnalytics;
