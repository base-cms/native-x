import React from 'react';
import PropTypes from 'prop-types';

const params = [
  'fp-x',
  'fp-y',
  'w',
  'h',
  'crop',
  'fit',
  'dpr',
];

const Imgix = (props) => {
  let { src } = props;

  const qs = params.map((k) => {
    const v = props[k];
    return (v !== null && v !== undefined) ? `${encodeURIComponent(k)}=${encodeURIComponent(v)}` : '';
  }).filter(kv => kv !== '').join('&');

  src = qs ? `${src}?${qs}` : src;

  let img;
  if (src) {
    if (props.tag === 'img') {
      img = <img className={props.className} src={src} alt={props.alt} title={props.title} />;
    } else if (props.tag === 'div') {
      const divStyle = {
        backgroundImage: `url(${src})`,
      };
      img = <div className={props.className} style={divStyle}>{props.children}</div>;
    }
  }

  return (
    img
  );
};

Imgix.defaultProps = {
  // dpr: process.browser ? window.devicePixelRatio || 1 : 1,
  dpr: 1,
  title: null,
  alt: null,
  className: null,
  tag: 'img',
};

Imgix.propTypes = {
  src: PropTypes.string.isRequired,
  dpr: PropTypes.number,
  tag: PropTypes.oneOf(['img', 'div']),
};

export default Imgix;
