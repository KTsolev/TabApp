import { StyleSheet } from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as loc,
  removeOrientationListener as rol
} from 'react-native-responsive-screen';

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    fontSize: 18,
    color: '#b05423',
    padding: 10,
  },

  button: {
    margin: 5,
    padding: 5,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#1a4266',
  },

  buttonText: {
    fontSize: 14,
    padding: 5,
  },

  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    maxHeight: hp('35%'),
    maxWidth: wp('95%'),
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#1a4266',
  },

  rowContainer: {
    justifyContent: 'space-around',
    alignItems: 'stretch',
    flexDirection: 'row',
    paddingTop: 20,
    paddingBottom: 20,
  },
});
