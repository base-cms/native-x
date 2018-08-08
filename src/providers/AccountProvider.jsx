import React from 'react';
import PropTypes from 'prop-types';
import query from '../gql/queries/account.graphql';

export const AccountContext = React.createContext({});

export class AccountProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: true, account: {}, error: null };
  }

  componentWillMount() {
    this.retrieveAccount();
  }

  async retrieveAccount() {
    this.setState({ loading: true });
    const { apollo } = this.props;
    try {
      const response = await apollo.query({ query });
      const { account } = response.data;
      this.setState({ account });
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ loading: false });
    }
  }

  render() {
    const { children } = this.props;
    return (
      <AccountContext.Provider value={{ ...this.state }}>
        {children}
      </AccountContext.Provider>
    );
  }
}

AccountProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
