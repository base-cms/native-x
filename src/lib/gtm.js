const createContainerScript = containerId => `
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${containerId}');
`;

export class GTMTracker {
  constructor(gtm, vars = {}) {
    this.gtm = gtm;
    this.vars = vars;
  }

  pageLoad() {
    this.gtm.event('page_load', this.vars);
  }

  outboundLink(url) {
    this.gtm.event('outbound_click', { ...this.vars, outbound_url: url, eventTimeout: 3000 });
  }

  share(method) {
    this.gtm.event('share', { ...this.vars, social_provider: method });
  }

  endOfContent() {
    this.gtm.event('scroll_to_bottom', this.vars);
  }
}

export default class GTM {
  constructor(globals = {}, enabled = true) {
    this.globals = globals;
    this.enable(enabled);
  }

  enable(bit = true) {
    this.enabled = Boolean(bit);
  }

  event(name, vars) {
    if (!this.enabled) return;
    if (!process.browser) return;
    const { dataLayer, google_tag_manager: gtm } = window;
    if (!dataLayer) return;
    if (gtm) {
      Object.keys(gtm).filter(k => /^GTM-/.test(k)).forEach(id => gtm[id].dataLayer.reset());
    }
    dataLayer.push({ event: name, ...vars, ...this.globals });
  }

  createTracker(vars) {
    return new GTMTracker(this, vars);
  }

  static buildScriptFor(containerIds = []) {
    return containerIds.filter(id => id).map(id => createContainerScript(id)).join('\n');
  }
}
