import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import Head from 'next/head';
import Title from '../components/Title';
import TrackPageView from '../components/TrackPageView';
import StoryView from '../components/StoryView';
import LoadingBar from '../components/LoadingBar';
import ErrorAlert from '../components/ErrorAlert';

import pageQuery from '../gql/queries/pages/story.graphql';

const Story = ({ id, preview }) => {
  const input = { id, preview };
  return (
    <Fragment>
      <Query query={pageQuery} variables={{ input }}>
        {({ loading, error, data }) => {
          if (loading) {
            return <LoadingBar />;
          }
          if (error) {
            return <ErrorAlert message={error.message} />;
          }
          const { publishedStory } = data;
          const { title, teaser } = publishedStory;
          return (
            <Fragment>
              <TrackPageView params={{ story_id: id, page_title: title }} />
              <Title value={title} />
              <Head>
                <meta name="description" content={teaser} />
              </Head>
              <StoryView {...publishedStory} />
            </Fragment>
          );
        }}
      </Query>
    </Fragment>
  );
};

Story.getInitialProps = async ({ req, query }) => {
  const { preview } = req.query;
  const { id } = query;
  return { id, preview: Boolean(preview) };
};

Story.defaultProps = {
  preview: false,
};

Story.propTypes = {
  id: PropTypes.string.isRequired,
  preview: PropTypes.bool,
};

export default Story;
