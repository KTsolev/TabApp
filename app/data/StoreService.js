import { AsyncStorage } from "react-native";

const saveData = (name, data) => {
  try {
    AsyncStorage.setItem(name, JSON.stringify(data));
  } catch (error) {
    console.error(error);
  }
};

const getData = (name) => AsyncStorage.getItem(name);

const clearData = () => {
    AsyncStorage.clear();
  };

export { getData, saveData, clearData };
