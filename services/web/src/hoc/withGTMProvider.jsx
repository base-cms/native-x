import React from 'react';
import getDisplayName from '../lib/display-name';
import GTM from '../lib/gtm';
import { GTMProvider } from '../providers/GTMProvider';

export default (ComposedComponent) => {
  class WithGTMProvider extends React.Component {
    /**
     *
     * @param {*} props
     */
    constructor(props) {
      super(props);
      // eslint-disable-next-line react/prop-types
      const { account } = this.props;

      // Create GTM instance with global vars.
      const { NODE_ENV: environment } = process.env;
      this.gtm = new GTM({
        account_key: account.key,
        environment,
        // This is for internal tracking only. Not to be used be customers/accounts.
        // Should be considered a "private" GTM variable.
        _ua_tracking_id: account.globals.GA_TRACKING_ID,
      });
    }

    /**
     * The _app page's getInitialProps hook.
     * Assumes withAccount has already be executed.
     *
     * @param {object} args
     */
    static async getInitialProps(args) {
      const { ctx } = args;
      const { account } = ctx;

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
        <GTMProvider gtm={this.gtm}>
          <ComposedComponent {...this.props} />
        </GTMProvider>
      );
    }
  }
  WithGTMProvider.displayName = `WithGTMProvider(${getDisplayName(ComposedComponent)})`;
  return WithGTMProvider;
};
