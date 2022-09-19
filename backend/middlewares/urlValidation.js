const { CelebrateError } = require('celebrate');
const validator = require('validator');

module.exports.urlValidation = (value) => {
  if (!validator.isURL(value)) {
    throw new CelebrateError('Неправильный формат URL');
  }
  return value;
};
