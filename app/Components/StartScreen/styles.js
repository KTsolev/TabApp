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
    flexDirection: 'column',
    maxWidth: wp('90%'),
    maxHeight: hp('60%'),
    padding: 35,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 50,
  },

  imageHolder: {
    position: 'relative',
    flexDirection: 'row',
    maxWidth: wp('100%'),
    maxHeight: hp('30%'),
    justifyContent: 'center',
    alignItems: 'center',
  },

  leftImage: {
    position: 'absolute',
    zIndex: 4,
    alignSelf: 'center',
    left: '-10%',
    top: -10,
    width: 70,
    height: 70,
  },

  rightImage: {
    position: 'absolute',
    zIndex: 2,
    alignSelf: 'center',
    right: '-10%',
    top: -20,
    width: 70,
    height: 70,
  },

  containerTitle: {
    fontSize: 22,
    color: '#0643a7',
    textAlign: 'center',
    marginTop: 70,
    marginBottom: 10,
  },

  containerText: {
    fontSize: 20,
    color: '#0643a7',
    paddingRight: 10,
    paddingLeft: 10,
  },

  button: {
    padding: 10,
    borderRadius: 50,
    marginTop: 20,
    marginBottom: 20,
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
