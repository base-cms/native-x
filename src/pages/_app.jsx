import App, { Container } from 'next/app';
import React from 'react';
import withApollo from '../apollo/WithApollo';
import withAccountProvider from '../hoc/withAccountProvider';
import withGTMProvider from '../hoc/withGTMProvider';

class NativeX extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <Component {...pageProps} />
      </Container>
    );
  }
}

export default withApollo(
  withAccountProvider(
    withGTMProvider(
      NativeX,
    ),
  ),
);
