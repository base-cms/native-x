import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import Head from 'next/head';
import Link from 'next/link';
import { trackPageView } from '../lib/gtag';

import pageQuery from '../gql/queries/pages/story.graphql';

const Story = ({ id }) => {
  const input = { id };
  return (
    <Fragment>
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
          trackPageView({ story_id: story.id, page_title: story.title });
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
    </Fragment>
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
