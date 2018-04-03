import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

const STORY = gql`
  query Story($input: ModelIdInput!) {
    story(input: $input) {
      title
      teaser
      body
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
        if (loading) return <p>Loading...</p>;
        if (error) return <p><strong>{error.message}</strong></p>;

        const { story } = data;
        const { primaryImage } = story;

        let image;
        if (primaryImage) {
          const { src, caption } = primaryImage;
          image = <img src={src} alt={caption} title={story.title} className="img-fluid mb-3" />;
        }

        return (
          <article>
            <h1>{story.title}</h1>
            <hr />
            <h2>{story.teaser}</h2>
            <hr />
            {image}
            <main dangerouslySetInnerHTML={createMarkup(story.body)} />
          </article>
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

