import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import Analytics from '../components/Analytics';
import PageWrapper from '../components/PageWrapper';
import Header from '../components/Story/Header';
import Body from '../components/Story/Body';
import withApollo from '../apollo/client';
import gql from '../gql/story.graphql';
import { AccountContext } from '../components/AccountProvider';

const Story = ({ id }) => {
  const input = { id };
  return (
    <PageWrapper>
      <Query query={gql} variables={{ input }}>
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
              <AccountContext.Consumer>
                {({ account }) => <Analytics accountKey={account.key} storyId={story.id} /> }
              </AccountContext.Consumer>
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
