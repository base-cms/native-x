import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import { GA_TRACKING_ID } from '../lib/gtag';

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <html lang="en">
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
          <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css" integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4" crossOrigin="anonymous" />
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/froala-editor/2.8.4/css/froala_style.css" type="text/css" />
          <link href="https://fonts.googleapis.com/css?family=Ubuntu:400,700|Raleway:300,400,500" rel="stylesheet" type="text/css" />
          {/* @TODO figure out how to add cusome js or use external lib */}
          <script src="https://code.jquery.com/jquery-3.3.1.min.js" />
          <script src="https://s3.amazonaws.com/media.cygnus.com/fortnight/theme.js" />
          {/* END OF @TODO */}

          {/* Global Site Tag (gtag.js) - Google Analytics */}
          {/* https://github.com/zeit/next.js/blob/master/examples/with-google-analytics */}
          <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`} />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                window.gtag('config', '${GA_TRACKING_ID}', {
                  send_page_view: false,
                  custom_map: {
                    dimension1: 'account',
                    dimension2: 'storyId',
                  },
                });
              `,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
