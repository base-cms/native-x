import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import Link from 'next/link';
import Title from '../components/Title';
import TrackPageView from '../components/TrackPageView';

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
          // page_path
          // { trackPageView({ story_id: story.id, page_title: title, page_path: 'foo' }); }}
          const { story } = data;
          const { title } = story;
          return (
            <Fragment>
              <TrackPageView params={{ story_id: id, page_title: title }} />
              <Title value={story.title} />
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
