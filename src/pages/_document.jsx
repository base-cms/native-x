import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import GoogleTagManager from '../components/GoogleTagManager';
import { AccountConsumer } from '../providers/AccountProvider';

export default class MyDocument extends Document {
  static async getInitialProps(args) {
    const initialProps = await Document.getInitialProps(args);
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
          <AccountConsumer>
            {({ account }) => {
              const { googleTagManagerId } = account.settings || {};
              return (
                <GoogleTagManager
                  googleTagManagerId={googleTagManagerId}
                />
              );
            }}
          </AccountConsumer>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
