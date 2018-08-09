import React from 'react';
import PropTypes from 'prop-types';
import Image from './StoryView/Header/Image';
import Contents from './StoryView/Header/Contents';
import Style from './StoryView/Header/Style';

const StoryView = ({ title, primaryImage }) => (
  <div className="story-wrapper">
    <Style />
    <div className="story-header">
      <Image src={primaryImage.src} {...primaryImage.focalPoint}>
        <Contents title={title} />
      </Image>
    </div>
  </div>
);

StoryView.defaultProps = {
  primaryImage: {},
};

StoryView.propTypes = {
  title: PropTypes.string.isRequired,
  primaryImage: PropTypes.shape({
    src: PropTypes.string,
    focalPoint: PropTypes.shape({
      x: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      y: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
  }),
};

export default StoryView;
