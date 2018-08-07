import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import Head from 'next/head';
import Link from 'next/link';
import PageWrapper from '../containers/PageWrapper';

import pageQuery from '../gql/queries/pages/story.graphql';

const Story = ({ id }) => {
  const input = { id };
  return (
    <PageWrapper>
      <Query query={pageQuery} variables={{ input }}>
        {({ loading, error, data }) => {
          if (loading) {
            return (
              <p>
                Loading...
              </p>
            );
          }
          if (error) {
            return (
              <p>
                <strong>
                  {error.message}
                </strong>
              </p>
            );
          }
          const { story } = data;
          return (
            <Fragment>
              <Head>
                <title>
                  {story.title}
                </title>
              </Head>
              <h1>
                {story.title}
              </h1>
              <Link href="/">
                <a>
                  Home
                </a>
              </Link>
            </Fragment>
          );
        }}
      </Query>
    </PageWrapper>
  );
};

Story.getInitialProps = async ({ query }) => {
  const { id } = query;
  return { id };
};

Story.propTypes = {
  id: PropTypes.string.isRequired,
};

export default Story;
