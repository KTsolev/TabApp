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
  setTimeout(() => {
    dispatcher.dispatch({
      type: 'user-new-props-added',
      data,
    });
  });
};

export function saveUser(data) {
  console.log('save data')
  console.log(data)
  saveData('userData', data);
  setTimeout(() => {
    dispatcher.dispatch({
      type: 'user-saved',
    });
  }, 1000);
};

export function loadUser() {
  getData('userData').then((data) => {
    let jsonData = JSON.parse(data);
    dispatcher.dispatch({
        type: 'recieved-user-data',
        data: jsonData,
      });
  });
};

export function savePillsData(data) {
  saveData('pillsData', data);
  setTimeout(() => {
    dispatcher.dispatch({
      type: 'pills-saved',
    });
  }, 1000);
};

export function loadPillsData() {
  getData('pillsData').then((data) => {
    let jsonData = JSON.parse(data);
    dispatcher.dispatch({
        type: 'recieved-pills-data',
        data: jsonData,
      });
  });
};
