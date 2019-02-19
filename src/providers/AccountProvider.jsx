import React from 'react';
import PropTypes from 'prop-types';

const AccountContext = React.createContext({});

export const AccountConsumer = AccountContext.Consumer;

export const AccountProvider = ({ account, children }) => (
  <AccountContext.Provider value={{ account }}>
    {children}
  </AccountContext.Provider>
);

AccountProvider.propTypes = {
  account: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
