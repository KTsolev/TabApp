import dispatcher from './FluxDispatcher';
const EventEmmiter = require('events');

class UserStore extends EventEmmiter {
  constructor() {
    super();
    this.userData = null;
  }

  getUser() {
    return this.userData;
  }

  deleteUser() {
    return this.userData = null;
    this.emit('user-deleted');
  }

  createNewUser(user) {
    this.userData = user;
    this.emit('user-created');
  }

  addNewData(user) {
    this.userData = Object.assign({}, this.userData, user);
    console.log('from add pills');
    console.log(this.userData);

    this.emit('user-updated');
  }

  _handleActions(action) {
    switch (action.type) {
      case 'user-created':
        this.createNewUser(action.data);
        break;
      case 'user-new-props-added':
        this.addNewData(action.data);
        break;
      case 'user-deleted':
        this.deleteUser();
        break;
      case 'show-modal':
        break;
      case 'user-saving':
        this.emit('user-saving');
        break;
      case 'user-saved':
        this.emit('user-saved');
        break;
      case 'user-loading':
        this.emit('user-loading');
        break;
      case 'recieved-user-data':
        this.createNewUser(action.data);
        this.emit('recieved-user-data');
        break;
      default:
        break;
    }
  }
}

const userStore = new UserStore;
dispatcher.register(userStore._handleActions.bind(userStore));
export default userStore;
