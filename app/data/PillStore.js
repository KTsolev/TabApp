import dispatcher from './FluxDispatcher';
import moment from 'moment';
const EventEmmiter = require('events');

class PillStore extends EventEmmiter {
  constructor() {
    super();
    this.pillsData = {
        count: 0,
        leftPills: 180,
        lastPillTaken: null,
        disabled: false,
        showResetModal: false,
    };
  }

  getPills() {
    return this.pillsData;
  }

  increasePills() {
    if (this.pillsData.count >= 6) {
      this.pillsData.disabled = true;
      this.emit('day-doze-reached');
    } else {
      this.pillsData.count = this.pillsData.count + 1;
      this.pillsData.leftPills = this.pillsData.leftPills - 1;
      this.emit('pills-increased');
    }
    this.pillsData.lastPillTaken = moment().format();
  }

  forgotPills() {
    this.pillsData.showResetModal = !this.pillsData.showResetModal;
    this.emit('pills-missed');
  }

  createNewPillsData(pills) {
    this.pillsData.count = pills.count;
    this.pillsData.leftPills = pills.leftPills || 180 - this.pillsData.count;
    this.pillsData.lastPillTaken = pills.lastPillTaken || moment().format();
    this.pillsData.disabled = pills.disabled || false;
    this.emit('pills-created');
  }

  reinitPillsData(pills) {
    const resetVal = !moment().isSame(moment(pills.lastPillTaken), 'days') ? 0 : pills.count;
    this.pillsData.count = resetVal;
    this.pillsData.leftPills = pills.leftPills || 180 - this.pillsData.count;
    this.pillsData.lastPillTaken = pills.lastPillTaken || moment().format();
    this.pillsData.disabled = moment().isSame(moment(pills.lastPillTaken), 'days') ? pills.disabled : false;
    this.emit('pills-created');
  }

  _handleActions(action) {
    switch (action.type) {
      case 'pills-increased':
        this.increasePills(action.data);
        break;
      case 'pills-data-saved':
        this.emit('pills-data-saved');
        break;
      case 'pills-not-taken':
        this.forgotPills(action.data);
        break;
      case 'pills-loading':
        this.emit('pills-loading');
        break;
      case 'pills-data-loaded':
        this.createNewPillsData(action.data);
        this.emit('pills-state-created');
        break;
      case 'init-data':
        this.reinitPillsData(action.data);
        this.emit('pills-state-created');
        break;
      case 'pills-not-taken':
        forgotPills();
        this.emit('pills-missed');
        break;
      case 'reset-completed':
        this.showResetModal = false;
        this.emit('reset-completed');
        break;
      default:
        break;
    }
  }
}

const pillstore = new PillStore();
dispatcher.register(pillstore._handleActions.bind(pillstore));
export default pillstore;
