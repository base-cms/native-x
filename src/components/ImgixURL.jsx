import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { buildImgixSrc } from '../lib/imgix';

const ImgixURL = ({ src, params, children }) => {
  const url = buildImgixSrc(src, params);
  return (
    <Fragment>
      {children(url)}
    </Fragment>
  );
};

ImgixURL.defaultProps = {
  params: {},
};

ImgixURL.propTypes = {
  src: PropTypes.string.isRequired,
  children: PropTypes.func.isRequired,
  params: PropTypes.shape({
    'fp-x': PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    'fp-y': PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    w: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    h: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    crop: PropTypes.string,
    fit: PropTypes.string,
    dpr: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
};

export default ImgixURL;
