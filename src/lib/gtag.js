const { GA_TRACKING_ID } = process.env;

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
const pageview = (account, storyId) => {
  window.gtag('event', 'page_view', { account, storyId });
};

module.exports = {
  GA_TRACKING_ID,
  pageview,
};
