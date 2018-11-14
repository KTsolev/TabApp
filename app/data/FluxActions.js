import dispatcher from '../data/FluxDispatcher';
import { saveData, getData, clearData } from './StoreService';

export function increasePills() {
  dispatcher.dispatch({
    type: 'pills-increased',
  });
};

export function pillsMissed(data) {
  dispatcher.dispatch({
    type: 'pills-not-taken',
    data,
  });
};

export function createUser(data) {
  dispatcher.dispatch({
    type: 'user-created',
    data,
  });
};

export function addNewUserProps(data) {
  dispatcher.dispatch({
    type: 'user-new-props-added',
    data,
  });
};

export function saveUser(data) {
  console.warn('from add save');
  console.warn(data);
  saveData('userData', data);
  dispatcher.dispatch({
    type: 'user-saving',
  });
  setTimeout(() => {
    dispatcher.dispatch({
      type: 'user-saved',
    });
  }, 1000);
};

export function loadUser() {
  getData('userData').then((data) => {
    let jsonData = JSON.parse(data);
    setTimeout(() => {
        dispatcher.dispatch({
            type: 'recieved-user-data',
            data: jsonData,
          });
      }, 1000);
  });
};