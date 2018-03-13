import Component from '@ember/component';
import ComponentQueryManager from 'ember-apollo-client/mixins/component-query-manager';
import fetch from 'fetch';
import filesize from 'filesize';
import { Promise } from 'rsvp';

import query from 'fortnight/gql/queries/sign-image-upload';

export default Component.extend(ComponentQueryManager, {

  /**
   * @var object image The CampaignCreative.image object
   */
  image: null,

  minW: 320,
  minH: 180,
  maxSize: 5242880,

  accept: 'image/jpeg, image/png, image/gif',
  isLoading: false,

  imageResponse: null,
  imgixDomain: 'https://fortnight.imgix.net',

  // eslint-disable-next-line
  defaultFocalpoint: { x: 0.50, y: 0.50 },

  validateImage: function(file) {
    const { name, size, type } = file;
    const _this = this;

    return new Promise((resolve, reject) => {
      // validate file type
      if (-1 >= this.get('accept').indexOf(file.type)) {
        return reject(new Error('The file you are trying to upload is not a accepted file type'));
      }
      // validate file is under the max size
      if (file.size > this.get('maxSize')) {
       return reject(new Error('The ' + filesize(file.size) + ' file exceeds the ' + filesize(_this.get('maxSize')) +' max file size.'));
      }
      // load image to validate min width & height
      let img = new Image();
      img.src = window.URL.createObjectURL( file );
      img.onload = function() {
        let width = img.naturalWidth;
        let height = img.naturalHeight;
        window.URL.revokeObjectURL( img.src );
        // Check that min width is met
        if (width <= _this.get('minW')) {
          return reject(new Error('The image height does not meet the ' + _this.get('minW') + 'px minimum requirements'));
        }
        // Check that min height is met
        if (height <= _this.get('minH') ) {
          return reject(new Error('The image height does not meet the ' + _this.get('minH') + 'px minimum requirements'));
        }
        return resolve({name, size, type, height, width});
      };
    });
  },

  actions: {
    uploadFiles(files) {
      this.set('isLoading', true);
      this.send('reset');
      const file = files[0];

      return this.validateImage(file)
      .then(async ({ name, size, type, height, width }) => {
        const input = { name, size, type };
        const variables = { input };
        const { key, url } = await this.apollo.watchQuery({ query, variables }, 'signImageUpload');
        const src = `${this.get('imgixDomain')}/${key}`;
        await fetch(url, { method: 'PUT', headers: { 'Content-Type': type }, body: file });
        const focalPoint = this.get('defaultFocalpoint');
        this.set('image', { filePath: key, src, mimeType: type, fileSize: size, width, height, focalPoint });
      })
      .catch(e => this.get('errorProcessor').show(e))
      .finally(() => this.set('isLoading', false))
    },
    reset() {
      this.set('imageResponse', null);
      this.set('error', null);
      this.set('warning', null);
    },
  },
});
