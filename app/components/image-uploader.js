import Component from '@ember/component';
import fetch from 'fetch';
import filesize from 'filesize';
import ImageInfo from 'fortnight/objects/image-info';
import { inject } from '@ember/service';


export default Component.extend({
  imageLoader: inject(),

  minWidth: 320,
  minHeight: 180,
  maxSize: 5242880,

  accept: 'image/jpeg, image/png, image/gif, image/webm',
  isLoading: false,

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
    async uploadImage(files, preload = true) {
      this.sendEvent('onUploadStart');
      this.set('isLoading', true);
      this.set('error', null);

      try {
        const file = files[0];
        const info = ImageInfo.create({ file });
        await info.load();

        const { width, height } = info;

        const data = new FormData();
        data.append('width', width);
        data.append('height', height);
        data.append('file', file);

        const response = await fetch('/upload/image', { method: 'POST', body: data });
        const json = await response.json();

        if (preload) {
          // @todo This uploader should show the file as loaded into the browser,
          // but keep it grayed out until the upload process is complete.
          // Then there is not need to preload the image.
          await this.get('imageLoader').loadFromSource(json.link);
        }
        await this.sendEvent('onUploadSuccess', json);
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
