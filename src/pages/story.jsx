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

const Story = ({ id, preview, publisherId }) => {
  const input = { id, preview };
  return (
    <Fragment>
      <Query query={pageQuery} variables={{ input, publisherId }}>
        {({ loading, error, data }) => {
          if (loading) {
            return <LoadingBar />;
          }
          if (error) {
            return <ErrorAlert message={error.message} />;
          }
          const { publishedStory } = data;
          const {
            title,
            teaser,
            url,
            publisher,
          } = publishedStory;
          return (
            <Fragment>
              <TrackPageView params={{ story_id: id, page_title: title }} />
              <Title value={title} />
              <Head>
                <meta name="description" content={teaser} />
                {/* @todo Eventually use the publisher context. */}
                <meta name="native-x:publisher" content={publisher.name} />
                <link rel="canonical" href={url} />
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
  let preview = false;

  if (req) {
    preview = Boolean(req.query.preview);
  }
  const { id, publisherId } = query;
  return { id, preview, publisherId };
};

Story.defaultProps = {
  preview: false,
  publisherId: null,
};

Story.propTypes = {
  id: PropTypes.string.isRequired,
  publisherId: PropTypes.string,
  preview: PropTypes.bool,
};

export default Story;
