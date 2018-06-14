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
  const { host, path } = props;

  const qs = params.map((k) => {
    const v = props[k];
    return (v !== null && v !== undefined) ? `${encodeURIComponent(k)}=${encodeURIComponent(v)}` : '';
  }).filter(kv => kv !== '').join('&');

  const original = `${host}/${path}`;
  const src = qs ? `${original}?${qs}` : original;

  let img;
  if (path) {
    img = <img className={props.className} src={src} alt={props.alt} title={props.title} />;
  }
  return (
    img
  );
};

Imgix.defaultProps = {
  host: 'https://base.imgix.net',
  dpr: process.browser ? window.devicePixelRatio || 1 : 1,
  title: null,
  alt: null,
  className: null,
};

Imgix.propTypes = {
  host: PropTypes.string.isRequired,
  path: PropTypes.string,
  dpr: PropTypes.number,
};

export default Imgix;
