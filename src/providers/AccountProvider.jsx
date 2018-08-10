import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import query from '../gql/queries/account.graphql';

const AccountContext = React.createContext({});

export const AccountConsumer = AccountContext.Consumer;

export const AccountProvider = ({ children }) => (
  <Query query={query}>
    {({ error, data }) => {
      if (error) {
        return (
          <p>
            <strong>
              {error.message}
            </strong>
          </p>
        );
      }
      return (
        <AccountContext.Provider value={data}>
          {children}
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
