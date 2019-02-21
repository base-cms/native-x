import React from 'react';
import getDisplayName from '../lib/display-name';
import { GTMConsumer } from '../providers/GTMProvider';

export default (ComposedComponent) => {
  const WithGTMConsumer = props => (
    <GTMConsumer>
      {({ gtm }) => <ComposedComponent {...props} gtm={gtm} />}
    </GTMConsumer>
  );
  WithGTMConsumer.displayName = `WithGTMConsumer(${getDisplayName(ComposedComponent)})`;

  WithGTMConsumer.getInitialProps = async (args) => {
    let composedInitialProps = {};
    if (ComposedComponent.getInitialProps) {
      composedInitialProps = await ComposedComponent.getInitialProps(args);
    }
    return { ...composedInitialProps };
  };

  return WithGTMConsumer;
};
