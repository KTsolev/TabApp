import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
  logo: {
    width: 300,
    height: '10%',
    marginBottom: 20,
    marginTop: 20,
  },

  wrapper: {
    flex: 1,
    width: '100%',
    backgroundColor: '#fff',
  },

  backgroundBottomImg: {
    width: '50%',
    height: '50%',
    resizeMode: 'contain',
  },

  backgroundImage: {
    alignItems: 'center',
    flex: 1,
    resizeMode: 'cover',
  },

  container: {
    flex: 1,
    flexDirection: 'column',
    width: '100%',
    height: '100%',
  },

  innerContainer: {
    flex: 1,
    height: '90%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
