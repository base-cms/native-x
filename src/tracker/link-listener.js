import { delegate, parseUrl } from 'dom-utils';
import { withTimeout, assign } from '../utils';

/**
 * Determines if a link click event will cause the current page to unload.
 * @todo Need to determine if link is opened via the context menu.
 *
 * @param {Event} event
 * @param {Element} link
 * @return {boolean}
 */
function linkWillUnloadPage(event, link) {
  return !(
    // Only look a click events that will not open a new window or tab
    event.type !== 'click' || link.target === '_blank' ||
    // Cmd+Click (Mac) and Ctrl+Click (Windows) opens a new tab
    // Shift+Click opens a new window in Chrome/Firefox, in Safari it adds to favorites
    // Opt+Click (Mac) is used to download
    event.metaKey || event.ctrlKey || event.shiftKey || event.altKey ||
    // Middle mouse clicks (2) open link in new tab
    // Right clicks (3) on Firefox trigger a click event
    event.which > 1
  );
}

export default class LinkListener {
  /**
   *
   * @param {Tracker} tracker
   * @param {object} options
   */
  constructor(tracker, options = {}) {
    // Prevent execution when disabled or unsupported
    if (!options.enabled || !window.addEventListener) return;

    this.tracker = tracker;
    const defaults = {
      events: ['click'],
      selector: 'a',
      shouldTrackLink: LinkListener.shouldTrackLink,
      callback: undefined,
    };
    this.opts = assign(defaults, options);

    this.handleInteractions = this.handleInteractions.bind(this);

    this.delegates = {};
    this.opts.events.forEach((event) => {
      this.delegates[event] = delegate(
        document,
        event,
        this.opts.selector,
        this.handleInteractions,
        { composed: true, useCapture: true },
      );
    });
  }

  handleInteractions(event, link) {
    if (this.opts.shouldTrackLink(link, parseUrl)) {
      const href = link.getAttribute('href');
      const attr = link.getAttribute('data-fortnight-click');

      let fields;
      try {
        fields = JSON.parse(decodeURIComponent(attr));
      } catch (e) {
        fields = {};
      }

      const eventOpts = {
        transport: 'beacon',
        callback: this.opts.callback,
      };

      const supportsBeacon = navigator.sendBeacon || false;
      if (!supportsBeacon && linkWillUnloadPage(event, link)) {
        // The page will unload. Pause the transition and send the event.
        const handler = () => {
          window.removeEventListener('click', handler);

          if (!event.defaultPrevented) {
            event.preventDefault();

            // @todo What happens when the user-land code already does something similar?
            // For example, an event listener is previously attached to the link, that also
            // triggers a window.location call. Wouldn't that prevent the event from
            // being tracked?
            const original = eventOpts.callback;
            eventOpts.callback = withTimeout((...args) => {
              if (typeof original === 'function') original(...args);
              window.location.href = href;
            });
          }
          this.tracker.execute('event', 'click', fields, eventOpts);
        };
        window.addEventListener('click', handler);
      } else {
        // Send the event directly.
        this.tracker.execute('event', 'click', fields, eventOpts);
      }
    }
  }

  /**
   * Determines if the link should be tracked.
   *
   * @param {Element} element
   * @param {Function} urlParser
   * @return {boolean}
   */
  static shouldTrackLink(element, urlParser) {
    const href = element.getAttribute('href');
    const url = urlParser(href);
    const attr = element.getAttribute('data-fortnight-click');
    const isTrackable = typeof attr === 'string' && attr.length;
    // @todo Limit by selectors?
    return url.protocol.slice(0, 4) === 'http' && isTrackable;
  }

  /**
   * Destroys all event listeners.
   */
  destroy() {
    Object.keys(this.delegates).forEach(key => this.delegates[key].destroy());
  }
}
