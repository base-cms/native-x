import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'reactstrap';
import SocialShare from './SocialShare';
import { trackOutboundLink } from '../../lib/gtag';

const createMarkup = html => ({ __html: html });

class StoryViewBody extends React.Component {
  /**
   *
   */
  componentDidMount() {
    const { storyId, title, path } = this.props;
    const elements = document.querySelectorAll(`#body-${storyId} a[href]`);
    elements.forEach((element) => {
      const url = element.getAttribute('href');
      element.addEventListener('click', (e) => {
        e.preventDefault();
        trackOutboundLink(url, {
          story_id: storyId,
          page_title: title,
          page_path: `/${path}`,
        });
      });
    });
  }

  /**
   *
   */
  render() {
    const {
      storyId,
      url,
      path,
      title,
      body,
      teaser,
      imageSrc,
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
            storyId={storyId}
            title={title}
            teaser={teaser}
            url={url}
            imageSrc={imageSrc}
            path={path}
            className="mb-4"
          />
          {/* eslint-disable-next-line react/no-danger */}
          <div id={`body-${storyId}`} className="fr-view" dangerouslySetInnerHTML={createMarkup(body)} />
          <hr className="mt-4 mb-4" />
          <SocialShare
            storyId={storyId}
            title={title}
            teaser={teaser}
            url={url}
            imageSrc={imageSrc}
            path={path}
          />
        </Container>
      </div>
    );
  }
}

StoryViewBody.defaultProps = {
  teaser: '',
  imageSrc: '',
};

StoryViewBody.propTypes = {
  storyId: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  teaser: PropTypes.string,
  imageSrc: PropTypes.string,
  body: PropTypes.string.isRequired,
};

export default StoryViewBody;
