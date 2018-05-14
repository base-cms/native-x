import Component from '@ember/component';
import { computed } from '@ember/object';
import { isPresent } from '@ember/utils';

const properties = [
  'fp-x',
  'fp-y',
  'w',
  'h',
  'crop',
  'fit',
  'dpr',
];

export default Component.extend({
  tagName: 'img',
  attributeBindings: ['src', 'alt', 'title'],

  originalSrc: null,

  dpr: computed(function() {
    return window.devicePixelRatio;
  }),

  params: computed(...properties, function() {
    return properties.map((k) => {
      const v = this.get(k);
      return isPresent(v) ? `${encodeURIComponent(k)}=${encodeURIComponent(v)}` : '';
    }).filter(kv => kv !== '').join('&');
  }),

  src: computed('originalSrc', 'params', function() {
    const src = this.get('originalSrc');
    const params = this.get('params');
    return params ? `${src}?${params}` : src;
  }),
});
