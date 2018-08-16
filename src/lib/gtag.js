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

export const trackOutboundLink = (url, props) => {
  trackEvent('click', {
    ...props,
    event_category: 'outbound',
    event_label: url,
    transport_type: 'beacon',
    event_callback: () => {
      document.location = url;
    },
  });
};
