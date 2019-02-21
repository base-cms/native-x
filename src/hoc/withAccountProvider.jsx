import React from 'react';
import getDisplayName from '../lib/display-name';
import query from '../gql/queries/account.graphql';
import { AccountProvider } from '../providers/AccountProvider';

export default (ComposedComponent) => {
  class WithAccount extends React.Component {
    /**
     *
     * @param {*} props
     */
    constructor(props) {
      super(props);
      // eslint-disable-next-line react/prop-types
      const { account } = this.props;
      this.account = account;
    }

    /**
     * The _app page's getInitialProps hook.
     * Assumes withApollo has already be executed.
     *
     * @param {object} args
     */
    static async getInitialProps(args) {
      const { ctx } = args;
      const { apollo } = ctx;

      const { data } = await apollo.query({ query });
      const { account } = data;

      // Add the account to the context object.
      ctx.account = account;

      // Await the App's initial props.
      let composedInitialProps = {};
      if (ComposedComponent.getInitialProps) {
        composedInitialProps = await ComposedComponent.getInitialProps(args);
      }
      return {
        ...composedInitialProps,
        account,
      };
    }

    /**
     *
     */
    render() {
      return (
        <AccountProvider account={this.account}>
          <ComposedComponent {...this.props} />
        </AccountProvider>
      );
    }
  }
  WithAccount.displayName = `WithApollo(${getDisplayName(ComposedComponent)})`;
  return WithAccount;
};
