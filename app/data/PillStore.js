import dispatcher from './FluxDispatcher';
import moment from 'moment';
const EventEmmiter = require('events');

class PillStore extends EventEmmiter {
  constructor() {
    super();
    this.pillsData = {
      count: 0,
      lastPillTaken: null,
      showResetModal: false,
    };
  }

  getPills() {
    return this.pillsData;
  }

  increasePills() {
    this.pillsData.count += 1;
    this.pillsData.lastPillTaken = moment().format();

    this.emit('pills-increased');
  }

  forgotPills(user) {
    this.pillsData.showResetModal = true;
    this.emit('pills-missed');
  }

  _handleActions(action) {
    switch (action.type) {
      case 'pills-increased':
        this.increasePills(action.data);
        break;
      case 'pills-not-taken':
        this.forgotPills(action.data);
        break;
      default:
        break;
    }
  }
}

const pillstore = new PillStore();
dispatcher.register(pillstore._handleActions.bind(pillstore));
export default pillstore;
