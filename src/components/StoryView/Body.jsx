import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'reactstrap';
import VisibilitySensor from 'react-visibility-sensor';
import SocialShare from './SocialShare';
import { GTMTracker } from '../../lib/gtm';

const createMarkup = html => ({ __html: html });

class StoryViewBody extends React.Component {
  constructor(props) {
    super(props);
    this.trackEndOfContent = this.trackEndOfContent.bind(this);
  }

  /**
   *
   */
  componentDidMount() {
    const { tracker, storyId } = this.props;
    const elements = document.querySelectorAll(`#body-${storyId} a[href]`);
    elements.forEach((element) => {
      const url = element.getAttribute('href');
      element.addEventListener('click', (e) => {
        e.preventDefault();
        tracker.outboundLink(url);
      });
    });
  }

  trackEndOfContent(isVisible) {
    const { tracker } = this.props;
    if (isVisible) tracker.endOfContent();
  }

  /**
   *
   */
  render() {
    const {
      storyId,
      url,
      title,
      body,
      teaser,
      tracker,
      imageSrc,
      preview,
    } = this.props;
    return (
      <div id="story-body" className="position-relative mx-3">
        <style jsx global>
          {`
            #story-body .container *{
              max-width: 100%;
            }

            #story-body {
              font-family: 'Raleway', sans-serif;
              font-size: 1.1rem;
              line-height: 1.7rem;
            }

            #story-body > .container {
              margin-top: -10vh;
            }

            #story-body h3,
            #story-body h2:not(.teaser) {
              margin-top: 2rem;
            }

            #story-body .fr-video.fr-fvl,
            #story-body .fr-view img.fr-dii.fr-fil,
            #story-body .fr-view span.fr-dii.fr-fil {
              margin: 5px 20px 5px 0;
            }

            #story-body .fr-video.fr-fvr,
            #story-body .fr-view img.fr-dii.fr-fir,
            #story-body .fr-view span.fr-dii.fr-fir {
              margin: 5px 0 5px 20px;
            }

            #story-body h2.teaser {
              font-size: 1.6rem;
              line-height: 2.4rem;
            }

            @media screen and (max-width: 600px) {
              .fr-img-caption,
              iframe {
                min-width: 100%;
              }

              #story-body h2.teaser {
                font-size: 1.2rem;
                line-height: 2rem;
              }

            }
          `}
        </style>
        <Container className="shadow-lg p-3 mb-4 p-lg-5 bg-white rounded">
          <h2 className="mb-4 font-weight-light font-italic teaser">
            {teaser}
          </h2>
          <hr className="mt-4 mb-4" />
          <SocialShare
            title={title}
            teaser={teaser}
            url={url}
            imageSrc={imageSrc}
            tracker={tracker}
            preview={preview}
            className="mb-4"
          />
          {/* eslint-disable-next-line react/no-danger */}
          <div id={`body-${storyId}`} className="fr-view" dangerouslySetInnerHTML={createMarkup(body)} />
          <VisibilitySensor onChange={this.trackEndOfContent} />
          <hr className="mt-4 mb-4" />
          <SocialShare
            title={title}
            teaser={teaser}
            url={url}
            imageSrc={imageSrc}
            tracker={tracker}
            preview={preview}
          />
        </Container>
      </div>
    );
  }
}

StoryViewBody.defaultProps = {
  imageSrc: '',
  teaser: '',
};

StoryViewBody.propTypes = {
  body: PropTypes.string.isRequired,
  imageSrc: PropTypes.string,
  storyId: PropTypes.string.isRequired,
  teaser: PropTypes.string,
  title: PropTypes.string.isRequired,
  tracker: PropTypes.instanceOf(GTMTracker).isRequired,
  url: PropTypes.string.isRequired,
  preview: PropTypes.bool.isRequired,
};

export default StoryViewBody;
