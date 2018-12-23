import moment from 'moment';

const validation = {
  currency: {
    presence: {
      allowEmpty: false,
      message: '^Please enter currency!',
    },
  },

  pricePerPack: {
    presence: {
      allowEmpty: false,
      message: '^Please enter how much do you spend on pack of cigarettes!',
    },
    numericality: {
      greaterThan: 0,
      notValid: false,
      notInteger: false,
      message: '^Please enter valid number!',
    },
  },

  ciggarettesPerDay: {
    presence: {
      allowEmpty: false,
      message: '^Please enter how much cigarettes do you smoke per day!',
    },
    numericality: {
      greaterThan: 0,
      notValid: false,
      notInteger: false,
      message: '^Please enter valid number!',
    },
  },

  startingDate: {
    presence: {
      allowEmpty: false,
      message: '^Please enter valid date as start of your treatment!',
    },
    datetime: {
      earliest: moment.utc().format('YYYY-MM-DD'),
      message: '^You have to select a valid date that is not prior to the current!',
    },
  },
};

export default validation;
