import React from 'react';
import PropTypes from 'prop-types';
import Analytics from '../components/Analytics';
import PageWrapper from '../components/PageWrapper';
import Header from '../components/Story/Header';
import Body from '../components/Story/Body';
import withApollo from '../apollo/client';
import { AccountContext } from '../components/AccountProvider';
import { StoryContext, StoryProvider } from '../components/StoryProvider';

const Story = ({ id }) => (
  <StoryProvider id={id}>
    <PageWrapper>
      <StoryContext.Consumer>
        {({ story }) => (
          <div className="story-wrapper">
            <AccountContext.Consumer>
              {({ account }) => <Analytics accountKey={account.key} storyId={story.id} /> }
            </AccountContext.Consumer>
            <Header
              title={story.title}
              primaryImgCaption={story.primaryImage.caption}
            />
            <Body teaser={story.teaser} body={story.body} />
          </div>
        )}
      </StoryContext.Consumer>
    </PageWrapper>
  </StoryProvider>
);

Story.getInitialProps = async ({ query }) => {
  const { id } = query;
  return { id };
};

Story.propTypes = {
  id: PropTypes.string.isRequired,
};

export default withApollo(Story);
