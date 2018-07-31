import Component from '@ember/component';
import { inject } from '@ember/service';
import { computed } from '@ember/object';
import { task, timeout } from 'ember-concurrency';

export default Component.extend({
  autocomplete: inject(),

  classNames: ['row'],

  showPublisher: true,
  publisher: null,
  topic: null,
  wasValidated: false,

  topicsDisabled: computed('publisher.id', function() {
    if (!this.get('publisher.id')) return true;
    return false;
  }),

  topicsPlaceholder: computed('topicsDisabled', function() {
    if (this.get('topicsDisabled')) return 'Select a publisher before searching topics.';
    return 'Being typing to search...';
  }),

  /**
   * Searches for topics for the selected publisher.
   */
  searchPublisherTopics: task(function* (phrase) {
    yield timeout(600);
    const vars = { publisherId: this.get('publisher.id') };
    return this.get('autocomplete').query('publisher-topic', phrase, { vars });
  }),

  /**
   * Sends the `onChange` event action.
   */
  sendOnChange() {
    const fn = this.get('onChange');
    const { publisher, topic } = this.getProperties('publisher', 'topic');
    if (typeof fn === 'function') fn(publisher, topic);
  },

  actions: {
    /**
     *
     * @param {object} publisher
     */
    setPublisher(publisher) {
      this.set('publisher', publisher);
      this.set('topic', null);
      this.sendOnChange();
    },

    /**
     *
     * @param {object} topic
     */
    setTopic(topic) {
      this.set('topic', topic);
      this.sendOnChange();
    },
  },
});
