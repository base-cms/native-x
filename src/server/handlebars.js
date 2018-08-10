const handlebars = require('handlebars');
const { readFileSync } = require('fs');

// Register custom helpers, etc here...

const renderTemplate = (path, data) => {
  const source = readFileSync(`${__dirname}/templates/${path}`).toString();
  const template = handlebars.compile(source);
  return template(data);
};

module.exports = { handlebars, renderTemplate };
