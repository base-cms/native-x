import React from 'react';
import PropTypes from 'prop-types';
import ImgixURL from '../../ImgixURL';

const StoryListItemPrimaryImage = ({ src, focalPoint }) => {
  if (!src) return null;
  const { x, y } = focalPoint;
  return (
    <div className="d-flex flex-column my-auto mr-3">
      <ImgixURL
        src={src}
        params={{
          w: 150,
          h: 150,
          fit: 'crop',
          crop: 'focalpoint',
          'fp-x': x,
          'fp-y': y,
          dpr: 2, // @todo Determine how to use hints so this can render on server
        }}
      >
        {url => <img src={url} alt="" width="150" height="150" /> }
      </ImgixURL>
    </div>
  );
};

StoryListItemPrimaryImage.defaultProps = {
  src: '',
  focalPoint: {
    x: 0.5,
    y: 0.5,
  },
};

StoryListItemPrimaryImage.propTypes = {
  src: PropTypes.string,
  focalPoint: PropTypes.shape({
    x: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    y: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
};

export default StoryListItemPrimaryImage;
