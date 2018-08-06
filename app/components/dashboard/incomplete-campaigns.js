import Component from '@ember/component';
import ComponentQueryManager from 'ember-apollo-client/mixins/component-query-manager';

export default Component.extend(ComponentQueryManager, {
  classNames: ['card', 'border-0', 'z-depth-half'],

  isLoading: true,
});
