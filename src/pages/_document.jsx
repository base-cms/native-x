import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';

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
          <link href="https://fonts.googleapis.com/css?family=News+Cycle:400,700|Open+Sans+Condensed:300,700|Roboto:400,700|Ubuntu:400,700|Raleway:300,400,500" rel="stylesheet" type="text/css" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
