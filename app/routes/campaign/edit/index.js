import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import RouteQueryManager from 'ember-apollo-client/mixins/route-query-manager';

import query from 'fortnight/gql/queries/campaign';
import mutation from 'fortnight/gql/mutations/update-campaign';

export default Route.extend(RouteQueryManager, AuthenticatedRouteMixin, {

  hasSaved: false,

  model() {
    const { id } = this.modelFor('campaign.edit');
    const resultKey = 'campaign';
    const variables = { input: { id } };
    return this.apollo.watchQuery({ query, variables }, resultKey);
  },

  renderTemplate() {
    this.render();
    this.render('campaign.actions.edit.index', { outlet: 'actions', into: 'application' });
  },

  doUpdate() {
    const model = this.modelFor('campaign.edit.index');
    const { id, url, description, status, advertiser, name, externalLinks } = model;
    const resultKey = 'updateCampaign';
    const advertiserId = advertiser.id;
    const links = externalLinks.map(({ label, url }) => Object.assign({}, { label, url }));
    const payload = { url, name, description, status, advertiserId, externalLinks: links };
    const variables = { input: { id, payload } };
    const refetchQueries = ['campaign', 'AllCampaigns'];
    return this.apollo.mutate({ mutation, variables, refetchQueries }, resultKey)
      .then(() => this.get('notify').info('Campaign saved.'))
      .catch(e => this.get('errorProcessor').show(e))
    ;
  },

  actions: {
    update() {
      return this.doUpdate();
    },
    didTransition() {
      this.set('hasSaved', false);
    },
    willTransition(transition) {
      if (this.get('hasSaved')) return true;
      transition.abort();
      this.doUpdate()
        .then(() => this.set('hasSaved', true))
        .then(() => transition.retry())
      ;
    },
  },
})
