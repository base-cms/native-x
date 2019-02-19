import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Image from './StoryView/Header/Image';
import Contents from './StoryView/Header/Contents';
import Body from './StoryView/Body';
import Style from './StoryView/Header/Style';
import Navbar from './StoryView/Navbar';
import { GTMTracker } from '../lib/gtm';

const StoryView = ({
  advertiser,
  body,
  id,
  primaryImage,
  teaser,
  title,
  tracker,
  url,
}) => {
  const logoSrc = advertiser.logo ? advertiser.logo.src : '';
  return (
    <Fragment>
      <Navbar title={advertiser.name} logoSrc={logoSrc} />
      <div className="story-wrapper">
        <Style />
        <div className="story-header">
          <Image src={primaryImage.src} {...primaryImage.focalPoint}>
            <Contents title={title} />
          </Image>
        </div>
        <Body
          storyId={id}
          imageSrc={primaryImage.src}
          url={url}
          title={title}
          teaser={teaser}
          body={body}
          tracker={tracker}
        />
      </div>
    </Fragment>
  );
};

StoryView.defaultProps = {
  teaser: '',
  primaryImage: {},
};

StoryView.propTypes = {
  advertiser: PropTypes.shape({
    name: PropTypes.string.isRequired,
    logo: PropTypes.shape({
      src: PropTypes.string,
    }),
  }).isRequired,
  body: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  primaryImage: PropTypes.shape({
    src: PropTypes.string,
    focalPoint: PropTypes.shape({
      x: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      y: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
  }),
  teaser: PropTypes.string,
  tracker: PropTypes.instanceOf(GTMTracker).isRequired,
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default StoryView;
