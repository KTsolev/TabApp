import dispatcher from './FluxDispatcher';
import moment from 'moment';
const EventEmmiter = require('events');

class PillStore extends EventEmmiter {
  constructor() {
    super();
    this.pillsData = {
      count: 1,
      lastPillTaken: null,
      dissabled: false,
    };
  }

  getPills() {
    return this.pillsData;
  }

  increasePills() {
    if (this.pillsData.count >= 6) {
      this.pillsData.dissabled = true;
      this.emit('day-doze-reached');
    } else {
      this.pillsData.count = this.pillsData.count + 1;
      this.pillsData.lastPillTaken = moment().format();
      this.emit('pills-increased');
    }
  }

  forgotPills(pills) {
    this.pillsData.showResetModal = true;
    this.emit('pills-missed');
  }

  createNewPillsData(pils) {
    this.pilsData = pils;
    this.emit('pills-created');
  }

  _handleActions(action) {
    switch (action.type) {
      case 'pills-increased':
        this.increasePills(action.data);
        break;
      case 'pills-not-taken':
        this.forgotPills(action.data);
        break;
      case 'pills-saved':
        this.emit('pills-saved');
        break;
      case 'pills-loading':
        this.emit('pills-loading');
        break;
      case 'recieved-pills-data':
        this.createNewPillsData(action.data);
        this.emit('recieved-pills-data');
        break;
      default:
        break;
    }
  }
}

const pillstore = new PillStore();
dispatcher.register(pillstore._handleActions.bind(pillstore));
export default pillstore;
