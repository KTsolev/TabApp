import dispatcher from '../data/FluxDispatcher';
import { saveData, getData, clearData } from './StoreService';
import { AsyncStorage } from 'react-native';

export function increasePills() {
  dispatcher.dispatch({
    type: 'pills-increased',
  });
};

export async function reinitPillsData() {
  try {
    let data = await AsyncStorage.getItem('pillsData');
    let jsonData = JSON.parse(data);

    dispatcher.dispatch({
        type: 'init-data',
        data: jsonData,
      });

  } catch (err) {
    console.log(err);
  }
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

export async function saveUser(data) {
  try {
    await AsyncStorage.setItem('userData', JSON.stringify(data));
    setTimeout(() => {
      dispatcher.dispatch({
        type: 'user-saved',
      });
    }, 1000);
  } catch (err) {
    console.log(err);
  }
};

export async function loadUser() {
  try {
    let data = await AsyncStorage.getItem('userData');
    let jsonData = JSON.parse(data);

    dispatcher.dispatch({
        type: 'recieved-user-data',
        data: jsonData,
      });
  } catch (err) {
    console.log(err);
  }
};

export async function savePillsData(data) {
  try {
    console.log('from save action', data);
    await AsyncStorage.setItem('pillsData', JSON.stringify(data));
    setTimeout(() => {
      dispatcher.dispatch({
        type: 'pills-data-saved',
      });
    }, 1000);
  } catch (err) {
    console.log(err);
  }
};

export async function loadPillsData() {
  try {
    let data = await AsyncStorage.getItem('pillsData');
    let jsonData = JSON.parse(data);

    dispatcher.dispatch({
        type: 'pills-data-loaded',
        data: jsonData,
      });

  } catch (err) {
    console.log(err);
  }
};

export async function deleteUser() {
  try {
    await AsyncStorage.clear();
    setTimeout(() => {
      dispatcher.dispatch({
        type: 'delete-user',
      });
    }, 1000);
  } catch (err) {
    console.log(err);
  }
};

export function resetCompleted() {
  dispatcher.dispatch({
      type: 'reset-completed',
  });
};
