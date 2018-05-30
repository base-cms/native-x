import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ApolloProvider, getDataFromTree } from 'react-apollo';
import initApollo from './init';

const getDisplayName = Component => Component.displayName || Component.name || 'Unknown';

export default function withApollo(apolloConfig) {
  return (ComposedComponent) => {
    class WithData extends React.Component {
      static async getInitialProps(context) {
        let serverState = { apollo: {} };
        const {
          req,
          query,
          pathname,
          asPath,
        } = context;

        // Await the composed components initial props.
        let composedProps = {};
        if (ComposedComponent.getInitialProps) {
          composedProps = await ComposedComponent.getInitialProps(context);
        }

        // Run all GraphQL queries in tree and extract their data.
        if (!process.browser) {
          const apollo = initApollo(apolloConfig, null, req);
          const url = { query, pathname };

          try {
            // Run queries in the tree.
            await getDataFromTree(
              <ApolloProvider client={apollo}>
                <ComposedComponent
                  url={url}
                  context={context}
                  {...composedProps}
                />
              </ApolloProvider>,
              { router: { asPath, pathname, query } },
            );
          } catch (e) {
            // Prevent errors from crashing SSR.
            // Handle the error in components via data.error prop.
            // eslint-disable-next-line no-console
            console.error('SERVER ERROR', e);
          }
          // Clear the head state so duplicate head data is prevented.
          Head.rewind();
          serverState = {
            apollo: { data: apollo.cache.extract() },
          };
        }
        return { serverState, ...composedProps };
      }

      constructor(props) {
        super(props);
        const { serverState } = this.props;
        this.apollo = initApollo(apolloConfig, serverState.apollo.data);
      }

      render() {
        return (
          <ApolloProvider client={this.apollo}>
            <ComposedComponent {...this.props} />
          </ApolloProvider>
        );
      }
    }

    WithData.displayName = `WithData(${getDisplayName(ComposedComponent)})`;

    WithData.propTypes = {
      // eslint-disable-next-line react/forbid-prop-types
      serverState: PropTypes.object.isRequired,
    };
    return WithData;
  };
}
