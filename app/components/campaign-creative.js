import Component from '@ember/component';
import ComponentQueryManager from 'ember-apollo-client/mixins/component-query-manager';
import { computed, get, getProperties } from '@ember/object';
import { copy } from '@ember/object/internals';
import ActionMixin from 'fortnight/mixins/action-mixin';

import RemoveMutation from 'fortnight/gql/mutations/campaign/remove-creative';
import UpdateMutation from 'fortnight/gql/mutations/campaign/update-creative';

export default Component.extend(ComponentQueryManager, ActionMixin, {
  classNames: [ 'card', 'mnh-100' ],
  collapsed: true,

  campaignId: null,
  creativeId: computed.reads('creative.id'),
  creative: null,
  onRemove: 'onRemove',
  onUpdate: 'onUpdate',

  loading: false,

  id: null,
  name: null,
  title: null,
  url: null,
  teaser: null,
  image: null,

  src: computed('image.{src,focalPoint.x,focalPoint.y}', function() {
    const { src, focalPoint } = this.get('image');
    const { x, y } = focalPoint || {};
    if (!src) return 'https://via.placeholder.com/300x169?text=+';
    return `${src}?w=300&h=169&crop=focalpoint&fit=crop&dpr=1&fp-x=${x}&fp-y=${y}`
  }),

  isModified: computed('{title,teaser,image.src}', 'image.focalPoint.{x,y}', 'creative', function() {
    const c = this.get('creative');
    return [
      'title',
      'teaser',
      'image.src',
      'image.focalPoint.x',
      'image.focalPoint.y'
    ].some(k => this.get(k) !== get(c, k))
  }),

  canSave: computed.reads('isModified'),
  disableSave: computed.not('canSave'),

  init() {
    this._super(...arguments);
    // @todo Fix me: hack for creative array reload.
    this.endAction();

    const { id, name, url, title, teaser, image } = this.get('creative');
    this.setProperties({ id, name, url, title, teaser });
    this.set('image', copy(image || {}));
    if (!this.get('image.src')) this.set('collapsed', false);
  },

  getPayloadImage() {
    const image = this.get('image') || {};
    const { x, y } = this.get('image.focalPoint') || {};
    const focalPoint = { x, y };
    const imageProps = [ 'filePath', 'fileSize', 'height', 'mimeType', 'src', 'width' ];
    const { filePath, fileSize, height, mimeType, src, width } = getProperties(image, imageProps);
    if (!src) return null;
    return { filePath, fileSize, focalPoint, height, mimeType, src, width };
  },

  actions: {
    async remove() {
      this.startAction();
      const campaignId = this.get('campaignId');
      const creativeId = this.get('creativeId');
      const mutation = RemoveMutation;
      const variables = { input: { campaignId, creativeId } };
      const refetchQueries = ['CampaignCreatives'];
      try {
        await this.get('apollo').mutate({ mutation, variables, refetchQueries }, 'removeCampaignCreative');
      } catch (e) {
        this.get('graphErrors').show(e)
      } finally {
        this.endAction();
      }
    },
    async update() {
      this.startAction();
      const { title, teaser } = this.getProperties(['title', 'teaser']);
      const image = this.getPayloadImage();
      const campaignId = this.get('campaignId');
      const creativeId = this.get('creativeId');
      const mutation = UpdateMutation;
      let payload = { title, teaser, image };
      if (image) payload.image = image;
      const variables = { input: { campaignId, creativeId, payload } };
      try {
        await this.get('apollo').mutate({ mutation, variables }, 'updateCampaignCreative');
      } catch (e) {
        this.get('graphErrors').show(e);
      } finally {
        if (!this.get('isDestroyed')) {
          // @todo Fix me: hack for creative array reload.
          this.endAction();
        }
      }
    },
    toggleCollapse() {
      this.set('collapsed', !this.get('collapsed'));
    },
  },

});
