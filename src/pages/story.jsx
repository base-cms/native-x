import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import PageWrapper from '../components/PageWrapper';
import Header from '../components/Story/Header';
import Body from '../components/Story/Body';
import withApollo from '../apollo/client';

const STORY = gql`
  query Story($input: ModelIdInput!) {
    story(input: $input) {
      id
      title
      teaser
      body
      primaryImage {
        src
      }
      advertiser {
        id
        name
        logo {
          id
          src
          filename
          mimeType
          size
          width
          height
        }
      }
    }
  }
`;

const Story = ({ id }) => {
  const input = { id };
  return (
    <PageWrapper>
      <Query query={STORY} variables={{ input }}>
        {({ loading, error, data }) => {
          if (loading) {
            return (
              <p>Loading...</p>
            );
          }
          if (error) return <p><strong>{error.message}</strong></p>;

          const { story } = data;

          return (
            <div className="story-wrapper">
              <Header
                title={story.title}
                primaryImgSrc={story.primaryImage.src}
                primaryImgCaption={story.primaryImage.caption}
              />
              <Body teaser={story.teaser} body={story.body} />
            </div>
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

export default withApollo(Story);
