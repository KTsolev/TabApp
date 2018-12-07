import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  logo: {
    marginTop: 20,
    marginBottom: 20,
    maxWidth: 200,
    maxHeight: 250,
    alignSelf: 'center',
    resizeMode: 'contain',
  },

  map: {
    minHeight: 250,
    maxHeight: '50%',
    width: 350,
    marginBottom: 20,
    marginTop: 10,
  },

  img: {
    width: 30,
    height: 28,
    padding: 5,
    marginLeft: -10,
  },

  containerInner: {
    flexDirection: 'column',
    flex: 2,
    maxWidth: '90%',
    maxHeight: '40%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    padding: 35,
    marginBottom: 10,
    borderRadius: 50,
  },

  innerRow: {
    flexDirection: 'row',
    width: '80%',
    marginTop: 20,
  },
});
