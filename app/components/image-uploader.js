import Component from '@ember/component';
import ComponentQueryManager from 'ember-apollo-client/mixins/component-query-manager';
import fetch from 'fetch';
import filesize from 'filesize';
import ImageInfo from 'fortnight/objects/image-info';
import { inject } from '@ember/service';

import query from 'fortnight/gql/queries/sign-image-upload';

export default Component.extend(ComponentQueryManager, {
  imageLoader: inject(),

  minWidth: 320,
  minHeight: 180,
  maxSize: 5242880,

  accept: 'image/jpeg, image/png, image/gif',
  isLoading: false,

  imgixDomain: 'https://fortnight.imgix.net',

  /**
   * Validates the image based on its info.
   * Assumes the ImageInfo object as already been loaded/awaited.
   *
   * @param {ImageInfo} info
   */
  validateImage(info) {
    const { bytes, type, width, height } = info;
    if (this.get('accept').indexOf(type) === -1) {
      throw new Error('The file you are trying to upload is not an accepted file type.')
    }
    if (bytes > this.get('maxSize')) {
      throw new Error(`The image size of ${filesize(bytes)} exceeds the max file size of ${filesize(this.get('maxSize'))}`);
    }
    if (width < this.get('minWidth')) {
      throw new Error(`The image width must be at least ${this.get('minWidth')}px.`);
    }
    if (height < this.get('minHeight')) {
      throw new Error(`The image height must be at least ${this.get('minHeight')}px.`);
    }
  },

  sendEvent(name, ...args) {
    const fn = this.get(name);
    if (fn && typeof fn === 'function') return fn(...args);
  },

  actions: {
    async uploadImage(files) {
      this.sendEvent('onUploadStart');
      this.set('isLoading', true);
      this.set('image', null);
      this.set('error', null);

      try {
        const file = files[0];
        const info = ImageInfo.create({ file });
        await info.load();


        const { name, bytes, type, width, height } = info;
        const input = { name, size: bytes, type };
        const variables = { input };

        const { key, url } = await this.get('apollo').query({ query, variables }, 'signImageUpload');
        const src = `${this.get('imgixDomain')}/${key}`;
        await fetch(url, { method: 'PUT', headers: { 'Content-Type': type }, body: file });
        const focalPoint = { x: 0.5, y: 0.5 };
        const image = { filePath: key, src, mimeType: type, fileSize: bytes, width, height, focalPoint };

        // Load the image from source so it's in memory.
        await this.get('imageLoader').loadFromSource(src);

        this.set('image', image);
        this.sendEvent('onUploadSuccess', image);
      } catch(e) {
        this.set('error', e);
        this.sendEvent('onUploadError', e);
      } finally {
        this.set('isLoading', false);
        this.sendEvent('onUploadEnd');
      }
    },
  },
});
