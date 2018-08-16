export const trackEvent = (action, props) => {
  if (process.browser && window.gtag) {
    window.gtag('event', action, { ...props });
  }
};

export const trackPageView = (props) => {
  trackEvent('page_view', props);
};

export const trackSocialShare = (method, props) => {
  trackEvent('share', {
    ...props,
    method,
    social_shares: 1,
  });
};
