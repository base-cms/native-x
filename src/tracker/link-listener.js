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
      const endpoint = `/e/collect.gif?t=click&href=${encodeURIComponent(href)}`;

      const supportsBeacon = navigator.sendBeacon || false;
      if (supportsBeacon) {
        // Supports beacons. Send the event using it.
        navigator.sendBeacon(endpoint);
      } else if (linkWillUnloadPage(event, link)) {
        // The page will unload. Pause the transition and send the event.
        const handler = () => {
          window.removeEventListener('click', handler);
          if (!event.defaultPrevented) {
            event.preventDefault();
          }
          const redirect = withTimeout(() => {
            window.location.href = href;
          });
          const img = new Image();
          img.onerror = redirect;
          img.onload = redirect;
          img.src = endpoint;
        };
        window.addEventListener('click', handler);
      } else {
        // Send the event directly.
        const img = new Image();
        img.src = endpoint;
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
    // @todo Limit by selectors?
    return url.protocol.slice(0, 4) === 'http';
  }

  /**
   * Destroys all event listeners.
   */
  destroy() {
    Object.keys(this.delegates).forEach(key => this.delegates[key].destroy());
  }
}
