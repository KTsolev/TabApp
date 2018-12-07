import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as loc,
  removeOrientationListener as rol
} from 'react-native-responsive-screen';

export default styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#fff',
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 20,
    paddingBottom: 20,
    textAlign: 'justify',
  },

  listText: {
    textAlign: 'justify',
    fontSize: 14,
  },

  container: {
    flex: 1,
    flexDirection: 'column',
    maxWidth: wp('90%'),
    maxHeight: hp('60%'),
    padding: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 50,
  },

  containerTitle: {
    fontSize: 22,
    textTransform: 'capitalize',
    color: '#0643a7',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
  },

  containerText: {
    fontSize: 14,
    textTransform: 'capitalize',
    color: '#0643a7',
    paddingLeft: 10,
    paddingRight: 10,
  },

  checkBox: {
    width: wp('100%'),
    height: hp('100%'),
  },

  link: {
    color: '#fab120',
    textDecorationLine: 'underline',
    paddingLeft: 10,
    paddingRight: 10,
  },

  button: {
    padding: 15,
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#fff',
  },

  termsButton: {
      padding: 15,
      marginTop: 10,
      marginBottom: 30,
      borderRadius: 50,
      borderWidth: 1,
      borderColor: '#fff',
    },

  buttonText: {
    color: '#fff',
    textAlign: 'center',
    paddingRight: 50,
    paddingLeft: 50,
  },
});
