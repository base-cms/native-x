import React from 'react';
import { Query } from 'react-apollo';
import PropTypes from 'prop-types';
import query from '../gql/account.graphql';

export const AccountContext = React.createContext({
  account: {
    key: '1234',
  },
  brand: {
    name: 'Firehouse.com',
    logo: {
      src: 'https://fortnight.imgix.net/ebm/5b476cd5e4f5510001847c65/fh_logo.png',
    },
  },
});

export const AccountProvider = props => (
  <Query query={query}>
    {({ loading, error, data }) => {
      if (loading) {
        return (
          <p>Loading...</p>
        );
      }
      if (error) return <p><strong>{error.message}</strong></p>;

      return (
        <AccountContext.Provider value={data}>
          {props.children}
        </AccountContext.Provider>
      );
    }}
  </Query>
);


AccountProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,

};

