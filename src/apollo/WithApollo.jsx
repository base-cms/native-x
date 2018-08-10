import React from 'react';
import Head from 'next/head';
import { getDataFromTree } from 'react-apollo';
import PropTypes from 'prop-types';
import initApollo from './init';
import apolloConfig from './config';


export default (App) => {
  class WithApollo extends React.Component {
    /**
     *
     * @param {*} props
     */
    constructor(props) {
      super(props);
      const { apolloState } = this.props;
      this.apollo = initApollo(apolloConfig, apolloState);
    }

    /**
     *
     * @param {*} ctx
     */
    static async getInitialProps({
      Component,
      router,
      ctx,
      rest,
    }) {
      const { req } = ctx;

      // Await the App's initial props.
      let appProps = {};
      if (App.getInitialProps) {
        appProps = await App.getInitialProps({
          Component,
          router,
          ctx,
          ...rest,
        });
      }

      const apollo = initApollo(apolloConfig, {}, req);
      // Run all GraphQL queries in tree and extract the data.
      if (!process.browser) {
        try {
          // Run queries in the tree.
          await getDataFromTree(<App
            {...appProps}
            Component={Component}
            router={router}
            apollo={apollo}
          />);
        } catch (e) {
          // Prevent errors from crashing SSR.
          // Handle the error in components via data.error prop.
          // @see http://dev.apollodata.com/react/api-queries.html#graphql-query-data-error
          // eslint-disable-next-line no-console
          console.error('SERVER ERROR in getDataFromTree', e);
        }
        // Clear the head state so duplicate head data is prevented.
        Head.rewind();
      }

      // Extract the Apollo query data.
      const apolloState = apollo.cache.extract();

      return {
        ...appProps,
        apolloState,
      };
    }

    /**
     *
     */
    render() {
      return <App {...this.props} apollo={this.apollo} />;
    }
  }

  WithApollo.displayName = 'WithApollo(App)';
  WithApollo.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    apolloState: PropTypes.object.isRequired,
  };
  return WithApollo;
};
