const EventEmmiter = require('events');

class UserStore extends EventEmmiter {
  constructor() {
    super();
    this.userData = {};
  }

  getUser() {
    return this.userData;
  }

  createNewData(user) {
    this.userData = user;
    this.emit('user-created');
  }

  addNewData(user) {
    this.userData = Object.assign({}, this.userData, user);
    this.emit('user-updated');
  }

  updateUserData(prop, value) {
    this.userData[prop] = value;
    this.emit('user-updated');
  }

}

const userStore = new UserStore;

export default userStore;
