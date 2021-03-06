import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 50,
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: '#56c078',
    backgroundColor: '#56c078',
    borderWidth: 1,
    shadowColor: '#000000',
    shadowOffset: {
        width: 3,
        height: 3,
      },
    shadowRadius: 5,
    shadowOpacity: 0.4,
    zIndex: 15,
  },

  buttonDisabled: {
    padding: 10,
    borderRadius: 50,
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: '#98d5b8',
    backgroundColor: '#98d5b8',
    borderWidth: 1,
    shadowColor: '#000000',
    shadowOffset: {
        width: 0,
        height: 3,
      },
    shadowRadius: 5,
    shadowOpacity: 0.4,
    zIndex: 15,
  },

  buttonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    zIndex: 15,
  },
});
