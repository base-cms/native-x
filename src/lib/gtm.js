export const trackEvent = (event, props) => {
  if (!process.browser) return;
  const { dataLayer, google_tag_manager: gtm } = window;
  if (!dataLayer) return;
  if (gtm) {
    Object.keys(gtm).filter(k => /^GTM-/.test(k)).forEach(id => gtm[id].dataLayer.reset());
  }
  dataLayer.push({ event, ...props });
};

export const trackPageView = (props) => {
  trackEvent('page_view', props);
};

export const trackOutboundLink = (url, props) => {
  trackEvent('outbound_click', {
    ...props,
    outbound_url: url,
    eventTimeout: 3000,
  });
};

export const trackEndOfContent = (props) => {
  trackEvent('scroll_to_bottom', {
    ...props,
  });
};

export const trackSocialShare = (method, props) => {
  trackEvent('share', {
    ...props,
    social_provider: method,
  });
};


export class GTMTracker {
  constructor(accountKey, config = {}, enabled = true) {
    this.config = {
      ...config,
      account_key: accountKey,
    };
    this.enable(enabled);
  }

  enable(bit = true) {
    this.enabled = Boolean(bit);
  }

  event(action) {
    if (this.enabled) trackEvent(action, this.config);
  }

  pageview() {
    if (this.enabled) trackPageView(this.config);
  }

  outboundLink(url) {
    if (this.enabled) trackOutboundLink(url, this.config);
  }

  share(method) {
    if (this.enabled) trackSocialShare(method, this.config);
  }

  endOfContent() {
    if (this.enabled) trackEndOfContent(this.config);
  }
}
