import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import CoverImage from '../components/CoverImage';
import Loader from '../components/Loader';

const STORY = gql`
  query Story($input: ModelIdInput!) {
    story(input: $input) {
      title
      teaser
      body
      seoTitle
      primaryImage {
        src
        caption
      }
    }
  }
`;

const createMarkup = html => ({ __html: html });

const Story = ({ match }) => {
  const { params } = match;
  const { id } = params;
  const input = { id };
  return (
    <Query query={STORY} variables={{ input }}>
      {({ loading, error, data }) => {
        if (loading) return <Loader />;
        if (error) return <p><strong>{error.message}</strong></p>;

        const { story } = data;
        const { primaryImage } = story;

        const imgSrc = typeof primaryImage === 'object' ? primaryImage.src : '';
        return (
          <main>
            <CoverImage imgSrc={imgSrc} title={story.title} />
            <div className="container my-3">
              <Helmet>
                <title>{story.title}</title>
                <meta name="description" content={story.teaser} />
              </Helmet>
              <div className="row">
                <div className="col">
                  {/* eslint-disable-next-line react/no-danger */}
                  <article dangerouslySetInnerHTML={createMarkup(story.body)} />
                </div>
              </div>
            </div>
          </main>
        );
      }}
    </Query>
  );
};

Story.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default Story;

