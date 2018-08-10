export const imgixParameters = [
  'fp-x',
  'fp-y',
  'w',
  'h',
  'crop',
  'fit',
  'dpr',
];

export const buildImgixQueryString = (params = {}) => {
  if (typeof params !== 'object') return '';
  return imgixParameters.map((k) => {
    const v = params[k];
    return (v !== null && v !== undefined) ? `${encodeURIComponent(k)}=${encodeURIComponent(v)}` : '';
  }).filter(kv => kv !== '').join('&');
};

export const buildImgixSrc = (src, params = {}) => {
  if (!src) return '';
  const qs = buildImgixQueryString(params);
  return qs ? `${src}?${qs}` : src;
};
