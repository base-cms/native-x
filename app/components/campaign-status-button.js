import Ember from 'ember';
import Component from '@ember/component';
import { computed } from '@ember/object';

// const { Component, computed } = Ember;

export default Component.extend({
  tagName: '',

  type: null, // deleted, draft, paused
  value: null,

  icon: computed('type', function() {
    switch (this.get('type')) {
      case 'deleted':
        return 'trash-b';
      case 'draft':
        return 'edit';
      case 'paused':
        return 'pause';
    }
    console.warn(this.get('type'));
    return 'wat';
  }),

  helpText: computed('type', 'value', function() {
    const value = this.get('value');
    switch (this.get('type')) {
      case 'deleted':
        return value ? 'Campaign is deleted' : 'Campaign is not deleted';
      case 'draft':
        return value ? 'Campaign is in draft status' : 'Campaign is not in draft status';
      case 'paused':
        return value ? 'Campaign is paused' : 'Campaign is not paused';
    }
  }),

  buttonClass: computed('type', 'value', function() {
    if (false === this.get('value')) {
      return 'btn btn-sm btn-light text-muted';
    }
    switch (this.get('type')) {
      case 'deleted':
        return 'btn btn-sm btn-light text-danger';
      case 'draft':
        return 'btn btn-sm btn-light text-warning';
      case 'paused':
        return 'btn btn-sm btn-light text-primary';
    }
  }),

});
