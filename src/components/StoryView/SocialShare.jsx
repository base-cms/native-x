import React from 'react';
import PropTypes from 'prop-types';
import {
  FacebookShareButton,
  FacebookIcon,
  LinkedinShareButton,
  LinkedinIcon,
  TwitterShareButton,
  TwitterIcon,
  EmailShareButton,
  EmailIcon,
  PinterestShareButton,
  PinterestIcon,
} from 'react-share';

const StoryViewSocialShare = ({
  storyId,
  url,
  className,
  size,
  title,
  teaser,
}) => (
  <div className={`share-button-container ${className}`}>
    <style jsx global>
      {`
        .share-button {
          cursor: pointer;
        }
        .share-button:hover:not(:active) {
          opacity: 0.75;
        }
      `}
    </style>

    <FacebookShareButton url={url} className="d-inline-block mr-2 share-button">
      <FacebookIcon size={size} round />
    </FacebookShareButton>

    <TwitterShareButton title={title} url={url} className="d-inline-block mr-2 share-button">
      <TwitterIcon size={size} round />
    </TwitterShareButton>

    <LinkedinShareButton title={title} description={teaser} url={url} className="d-inline-block mr-2 share-button">
      <LinkedinIcon size={size} round />
    </LinkedinShareButton>

    <PinterestShareButton description={teaser} url={url} className="d-inline-block mr-2 share-button">
      <PinterestIcon size={size} round />
    </PinterestShareButton>

    <EmailShareButton url={url} className="d-inline-block mr-2 share-button">
      <EmailIcon size={size} round />
    </EmailShareButton>

    {console.info(storyId)}
  </div>
);

StoryViewSocialShare.defaultProps = {
  className: '',
  size: 50,
  teaser: '',
};

StoryViewSocialShare.propTypes = {
  className: PropTypes.string,
  size: PropTypes.number,
  storyId: PropTypes.string.isRequired,
  teaser: PropTypes.string,
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default StoryViewSocialShare;
