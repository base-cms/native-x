import Route from '@ember/routing/route';
import RouteQueryManager from 'ember-apollo-client/mixins/route-query-manager';
import { get } from '@ember/object';

import query from 'fortnight/gql/queries/story/edit';

export default Route.extend(RouteQueryManager, {
  model() {
    const model = this.modelFor('portal.campaigns.manage');
    const id = get(model, 'campaign.story.id');

    const variables = { input: { id } };
    return this.get('apollo').watchQuery({ query, variables, fetchPolicy: 'network-only' }, 'story');
  },

  renderTemplate(controller, model) {
    const manage = this.controllerFor('manage.story.edit.primary-image');
    this.render('portal.campaigns.manage.materials.primary-image', {
      controller: manage,
      model,
    });
  },
});
