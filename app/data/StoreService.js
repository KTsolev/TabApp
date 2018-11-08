import { AsyncStorage } from 'react-native';

const getData = (key) => AsyncStorage.getItem(key);

const saveData = (key, json) => {

      const value = JSON.stringify(json, getCircularReplacer());

      return AsyncStorage.setItem(key, value);

    };

const mergeData = (key, json) => {

      const value = JSON.stringify(json, getCircularReplacer());

      return AsyncStorage.mergeItem(key, value);

    };

const clearData = () => AsyncStorage.clear();

const multiGet = (keys) => {
    return AsyncStorage.getAllKeys((err, keys) => {
      AsyncStorage.multiGet(keys, (err, stores) => {
        stores.map((result, i, store) => {
          // get at each store's key/value so you can work with it
          let key = store[i][0];
          let value = store[i][1];
          return { key, value, };
        });
      });
    });
};

const getCircularReplacer = () => {
  const seen = [];
  return (key, value) => {
    if (typeof value === 'object' && value !== null) {
      if (seen.indexOf(value) >= 0) {
        return;
      }

      seen.push(value);
    }

    return value;
  };
  return seen;
};

export { saveData, getData, mergeData, clearData, multiGet };
