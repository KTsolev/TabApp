import validation from './validation';
import moment from 'moment';
const validate = require('validate.js');

validate.extend(validate.validators.datetime, {
  // The value is guaranteed not to be null or undefined but otherwise it
  // could be anything.
  parse: (value, options) => {
      return moment.utc(value);
    },

  // Input is a unix timestamp
  format: (value, options) => {
    let format = options.dateOnly ? 'YYYY-MM-DD' : 'YYYY-MM-DD hh:mm:ss';
    return moment.utc(value).format(format);
  },
});

//import validate from 'validate.js';
export default function validateWrapper(fieldName, value) {
  let formValues = {};
  formValues[fieldName] = value;

  let formFields = {};
  formFields[fieldName] = validation[fieldName];

  // The formValues and validated against the formFields
  // the letiable result hold the error messages of the field
  let result = null;
  result = validate(formValues, formFields);
  // If there is an error message, return it!
  if (result) {
    // Return only the field error message if there are multiple
    return result[fieldName][0];
  }

  return null;
}
