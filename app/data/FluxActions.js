import dispatcher from '../data/FluxDispatcher';
import { saveData, getData, clearData } from './StoreService';
import { AsyncStorage } from 'react-native';

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
    console.log(data)
    let jsonData = JSON.parse(data);
    dispatcher.dispatch({
        type: 'recieved-user-data',
        data: jsonData,
      });
  } catch (err) {
    console.log(err);
  }
};
