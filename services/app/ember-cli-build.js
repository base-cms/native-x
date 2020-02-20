'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
    // Add options here
    ace: {
      modes: ['handlebars'],
      themes: ['monokai'],
      useSoftTabs: true,
      tabSize: 2,
      useWrapMode: false,
    },
    babel: {
      plugins: ['transform-object-rest-spread']
    },
    'ember-froala-editor': {
      plugins: [
        'paragraph_format',
        'lists',
        'link',
        'video',
        'image',
        'url',
        'emoticons',
        'help',
        'fullscreen',
        'quote',
        'char_counter',
        'word_paste',
        'draggable',
        'align',
      ],
    },
  });

  // Bootstrap JS and source maps.
  app.import('node_modules/bootstrap/dist/js/bootstrap.bundle.min.js');
  app.import('node_modules/bootstrap/dist/js/bootstrap.bundle.min.js.map', { destDir: 'assets' });

  app.import('node_modules/fraction.js/fraction.min.js', {
    using: [
      { transformation: 'amd', as: 'fraction.js' }
    ]
  });

  app.import('node_modules/filesize/lib/filesize.js', {
    using: [
      { transformation: 'amd', as: 'filesize' }
    ]
  });

  app.import('node_modules/validator/validator.min.js', {
    using: [
      { transformation: 'amd', as: 'validator' }
    ]
  });

  app.import('node_modules/highcharts/highcharts.js');
  app.import('node_modules/highcharts/modules/exporting.js');

  return app.toTree();
};
