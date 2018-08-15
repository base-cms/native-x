export const trackEvent = (action, props) => {
  if (process.browser && window.gtag) {
    window.gtag('event', action, { ...props });
  }
};

export const trackPageView = (props) => {
  trackEvent('page_view', props);
};

export const trackSocialShare = (provider, props) => {
  trackEvent('share', {
    ...props,
    event_label: provider,
    social_shares: 1,
  });
};
