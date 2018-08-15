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
import { trackSocialShare } from '../../lib/gtag';

class StoryViewSocialShare extends React.Component {
  /**
   *
   * @param {string} provider The social provider name.
   */
  track(provider) {
    const { storyId, title } = this.props;
    trackSocialShare(provider, { story_id: storyId, page_title: title });
  }

  /**
   *
   */
  render() {
    const {
      url,
      className,
      size,
      title,
      teaser,
      imageSrc,
    } = this.props;
    return (
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

        <FacebookShareButton
          url={url}
          beforeOnClick={() => this.track('Facebook')}
          className="d-inline-block mr-2 share-button"
        >
          <FacebookIcon size={size} round />
        </FacebookShareButton>

        <TwitterShareButton
          title={title}
          url={url}
          beforeOnClick={() => this.track('Twitter')}
          className="d-inline-block mr-2 share-button"
        >
          <TwitterIcon size={size} round />
        </TwitterShareButton>

        <LinkedinShareButton
          title={title}
          description={teaser}
          url={url}
          beforeOnClick={() => this.track('LinkedIn')}
          className="d-inline-block mr-2 share-button"
        >
          <LinkedinIcon size={size} round />
        </LinkedinShareButton>

        {imageSrc.length > 0 && (
          <PinterestShareButton
            media={imageSrc}
            url={url}
            beforeOnClick={() => this.track('Pinterest')}
            className="d-inline-block mr-2 share-button"
          >
            <PinterestIcon size={size} round />
          </PinterestShareButton>
        )}

        <EmailShareButton
          url={url}
          beforeOnClick={() => this.track('Email')}
          className="d-inline-block mr-2 share-button"
        >
          <EmailIcon size={size} round />
        </EmailShareButton>
      </div>
    );
  }
}

StoryViewSocialShare.defaultProps = {
  className: '',
  imageSrc: '',
  size: 50,
  teaser: '',
};

StoryViewSocialShare.propTypes = {
  className: PropTypes.string,
  imageSrc: PropTypes.string,
  size: PropTypes.number,
  storyId: PropTypes.string.isRequired,
  teaser: PropTypes.string,
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default StoryViewSocialShare;
