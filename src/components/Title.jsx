import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { AccountConsumer } from '../providers/AccountProvider';

const Title = ({ value, children }) => (
  <AccountConsumer>
    {({ account }) => {
      const title = `${value} | ${account.name}`;
      return (
        <Head>
          <title>
            {title}
          </title>
          {children(title)}
        </Head>
      );
    }}
  </AccountConsumer>
);

Title.propTypes = {
  value: PropTypes.string.isRequired,
  children: PropTypes.func,
};

Title.defaultProps = {
  children: () => {},
};

export default Title;
