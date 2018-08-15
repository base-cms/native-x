import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Image from './StoryView/Header/Image';
import Contents from './StoryView/Header/Contents';
import Body from './StoryView/Body';
import Style from './StoryView/Header/Style';
import Navbar from './StoryView/Navbar';

const StoryView = ({
  id,
  url,
  title,
  teaser,
  body,
  primaryImage,
  advertiser,
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
        <Body storyId={id} url={url} teaser={teaser} body={body} />
      </div>
    </Fragment>
  );
};

StoryView.defaultProps = {
  teaser: '',
  primaryImage: {},
};

StoryView.propTypes = {
  id: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  teaser: PropTypes.string,
  body: PropTypes.string.isRequired,
  primaryImage: PropTypes.shape({
    src: PropTypes.string,
    focalPoint: PropTypes.shape({
      x: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      y: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
  }),
  advertiser: PropTypes.shape({
    name: PropTypes.string.isRequired,
    logo: PropTypes.shape({
      src: PropTypes.string,
    }),
  }).isRequired,
};

export default StoryView;
