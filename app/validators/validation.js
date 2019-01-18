import moment from 'moment';

const validation = {
  currency: {
    presence: {
      allowEmpty: false,
      message: '^Please enter currency',
    },
  },

  pricePerPack: {
    presence: {
      allowEmpty: false,
      message: '^Please enter a how much do you spent on pack of ciggarettes!',
    },
    numericality: {
      greaterThan: 0,
      notValid: false,
      notInteger: false,
      message: '^Please enter valid number for price per pack of ciggarettes!',
    },
  },

  ciggarettesPerDay: {
    presence: {
      allowEmpty: false,
      message: '^Please enter a how much ciggarettes do you smoke!',
    },
    numericality: {
      greaterThan: 0,
      notValid: false,
      notInteger: false,
      message: '^Please enter valid number for ciggarettes you smoke per day!',
    },
  },

  startingDate: {
    presence: {
      allowEmpty: false,
      message: '^Please enter valid date as start of your treatment!',
    },
    datetime: {
      earliest: moment.utc().format('YYYY-MM-DD'),
      message: '^You can\'t select date that is in the past!!',
    },
  },
};

export default validation;
