import React from 'react';
import PropTypes from 'prop-types';
import ImgixURL from '../../ImgixURL';

const StoryViewHeaderImage = ({
  src,
  x,
  y,
  children,
}) => (
  <ImgixURL
    src={src}
    params={{
      w: 1200,
      h: 600,
      fit: 'crop',
      crop: 'focalpoint',
      'fp-x': x,
      'fp-y': y,
    }}
  >
    {(url) => {
      if (url) {
        const style = { backgroundImage: `url(${url})` };
        return (
          <div className="d-flex bg-imgIx img-fluid" style={style}>
            {children}
          </div>
        );
      }
      return (
        <div className="d-flex bg-imgIx">
          {children}
        </div>
      );
    }}
  </ImgixURL>
);

StoryViewHeaderImage.defaultProps = {
  src: '',
  x: 0.5,
  y: 0.5,
};

StoryViewHeaderImage.propTypes = {
  src: PropTypes.string,
  x: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  y: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  children: PropTypes.node.isRequired,
};

export default StoryViewHeaderImage;
