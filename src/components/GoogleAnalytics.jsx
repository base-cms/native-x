import React, { Fragment } from 'react';

const GoogleAnalytics = () => {
  const { GA_TRACKING_ID } = process.env;
  if (!GA_TRACKING_ID) return null;

  /**
   * Global Site Tag (gtag.js) - Google Analytics
   * @see https://github.com/zeit/next.js/blob/master/examples/with-google-analytics
   */
  return (
    <Fragment>
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`} />
      <script
        dangerouslySetInnerHTML={{ // eslint-disable-line react/no-danger
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            window.gtag('config', '${GA_TRACKING_ID}', {
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
};

export default GoogleAnalytics;
