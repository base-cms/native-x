import React from 'react';
import PropTypes from 'prop-types';

const StoryViewSocialShare = ({ storyId, url, className }) => (
  <div className={className}>
    Share:
    {' '}
    {storyId}
    {' '}
    {url}
  </div>
);

StoryViewSocialShare.defaultProps = {
  className: '',
};

StoryViewSocialShare.propTypes = {
  storyId: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default StoryViewSocialShare;
