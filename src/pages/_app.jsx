import App, { Container } from 'next/app';
import React from 'react';
import withApollo from '../apollo/WithApollo';
import withAccount from '../hoc/withAccount';

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

export default withApollo(withAccount(NativeX));
