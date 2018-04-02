module.exports = {
  extends: 'airbnb',
  plugins: [
    'react',
  ],
  env: {
    browser: true,
  },
  rules: {
    'jsx-a11y/anchor-is-valid': ['error', {
      'components': [ 'Link' ],
      'specialLink': [ 'to' ],
      'aspects': [ 'noHref', 'invalidHref', 'preferButton' ]
    }],
  },
};
