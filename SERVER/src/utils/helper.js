const slugify = require("slugify");

const convertToSlug = (text) => {
  return slugify(text, {
    lower: true,
    strict: true,
  });
};

module.exports = {
  convertToSlug,
};
