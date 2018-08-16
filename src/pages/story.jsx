import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import Head from 'next/head';

import { GTAGTracker } from '../lib/gtag';

import Title from '../components/Title';
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
            advertiser,
            path,
            primaryImage,
            publishedAt,
            publisher,
            teaser,
            title,
            updatedAt,
            url,
          } = publishedStory;

          const tracker = new GTAGTracker({
            story_id: id,
            page_path: `/${path}`,
            page_title: title,
            publisher_id: publisher.id,
            advertiser_id: advertiser.id,
          });
          tracker.pageview();

          const { src } = primaryImage || {};
          return (
            <Fragment>
              <Title value={title} />
              <Head>
                {/* SEO */}
                <link rel="canonical" href={url} />
                <meta name="description" content={teaser} />
                {src && <meta name="image" content={src} />}

                {/* Schema.org */}
                <meta item-prop="name" content={title} />
                <meta item-prop="description" content={teaser} />
                {src && <meta item-prop="image" content={src} />}

                {/* Twitter */}
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:title" content={title} />
                <meta name="twitter:description" content={teaser} />
                {src && <meta name="twitter:image:src" content={src} />}

                {/* OpenGraph (Facebook, etc.) */}
                <meta name="og:title" content={title} />
                <meta name="og:description" content={teaser} />
                {/* @todo Create a new focal point preview for FB's 1200x630 ratio */}
                {src && <meta name="og:image" content={src} />}
                <meta name="og:url" content={url} />
                <meta name="og:site_name" content={publisher.name} />
                <meta name="og:locale" content="en_US" />
                <meta name="og:type" content="article" />

                {/* OpenGraph Article */}
                <meta name="article:published_time" content={publishedAt} />
                <meta name="article:modified_time" content={updatedAt} />

                {/* @todo Eventually use the publisher context. */}
                <meta name="native-x:publisher" content={publisher.name} />
              </Head>
              <StoryView {...publishedStory} tracker={tracker} />
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
