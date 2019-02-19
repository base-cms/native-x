import App, { Container } from 'next/app';
import React from 'react';
import withApollo from '../apollo/WithApollo';
import { AccountProvider } from '../providers/AccountProvider';

class NativeX extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <AccountProvider>
          <Component {...pageProps} />
        </AccountProvider>
      </Container>
    );
  }
}

export default withApollo(NativeX);
