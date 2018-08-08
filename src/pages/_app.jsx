import App, { Container } from 'next/app';
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import withApollo from '../apollo/WithApollo';
import { AccountProvider } from '../providers/AccountProvider';

class NativeX extends App {
  render() {
    const { Component, pageProps, apollo } = this.props;
    return (
      <Container>
        <ApolloProvider client={apollo}>
          <AccountProvider apollo={apollo}>
            <Component {...pageProps} />
          </AccountProvider>
        </ApolloProvider>
      </Container>
    );
  }
}

export default withApollo(NativeX);
