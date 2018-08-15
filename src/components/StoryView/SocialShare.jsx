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

    <TwitterShareButton url={url} className="d-inline-block mr-2 share-button">
      <TwitterIcon size={size} round />
    </TwitterShareButton>

    <LinkedinShareButton url={url} className="d-inline-block mr-2 share-button">
      <LinkedinIcon size={size} round />
    </LinkedinShareButton>

    <PinterestShareButton url={url} className="d-inline-block mr-2 share-button">
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
};

StoryViewSocialShare.propTypes = {
  storyId: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  className: PropTypes.string,
  size: PropTypes.number,
};

export default StoryViewSocialShare;
