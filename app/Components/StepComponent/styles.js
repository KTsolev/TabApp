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
    height: hp('100%'),
    width: wp('100%'),
    justifyContent: 'space-between',
    backgroundColor: '#ddf1fd',
  },

  mainContainer: {
    flex: 1,
    maxHeight: hp('60%'),
  },

  imageHolder: {
    flex: 1,
    flexDirection: 'row',
    width: wp('100%'),
    maxHeight: hp('10%'),
    justifyContent: 'center',
    alignItems: 'flex-end',
    resizeMode: 'cover',
  },

  headerContainer: {
    flex: 1,
    maxHeight: hp('30%'),
  },

  titleContainer: {
    maxHeight: hp('10%'),
    marginTop: 20,
    flexDirection: 'row',
  },

  buttonsContainer: {
    maxHeight: hp('90%'),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },

  headerBackground: {
    flex: 1,
    alignSelf: 'stretch',
    resizeMode: 'contain',
  },

  image: {
    width: 250,
    height: 120,
    resizeMode: 'contain',
    alignSelf: 'center',
  },

  currencyText: {
    marginBottom: 5,
  },

  errorText: {
    fontSize: 10,
    padding: 5,
    textTransform: 'capitalize',
    color: '#ff5100',
    textAlign: 'center',
  },

  containerTitle: {
    fontSize: 18,
    padding: 15,
    marginBottom: 10,
    textTransform: 'capitalize',
    color: '#0643a7',
    textAlign: 'center',
  },

  headerText: {
    fontSize: 16,
    textTransform: 'capitalize',
    color: '#fff',
    width: 25,
    height: 25,
    textAlign: 'center',
    borderRadius: 50,
    borderWidth: 1,
    backgroundColor: '#99d8ba',
    borderColor: '#99d8ba',
  },

  activeHeader: {
    fontSize: 16,
    textTransform: 'capitalize',
    color: '#fff',
    width: 25,
    height: 25,
    textAlign: 'center',
    borderRadius: 50,
    borderWidth: 1,
    backgroundColor: '#54bd74',
    borderColor: '#54bd74',
  },

  input: {
    padding: 5,
    maxWidth: '40%',
    minWidth: 250,
    minHeight: 30,
    marginTop: 5,
    marginBottom: 5,
    textAlign: 'center',
    alignSelf: 'center',
    paddingLeft: 45,
    paddingRight: 45,
    borderRadius: 50,
    backgroundColor: '#fff',
  },

  beforeHeaderTextElem: {
    position: 'absolute',
    width: '100%',
    height: 2,
    top: '50%',
    marginLeft: -10,
    marginRight: -10,
    borderColor: '#99d7b9',
    borderWidth: 1,
  },

  inputContainer: {
    height: '90%',
    marginBottom: 60,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  headerItem: {
    width: '33%',
    height: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#fff',
    position: 'relative',
  },

  containerText: {
    fontSize: 14,
    textTransform: 'capitalize',
    color: '#0643a7',
    paddingLeft: 10,
    paddingRight: 10,
  },

  button: {
    padding: 5,
    minWidth: 250,
    minHeight: 30,
    marginTop: 15,
    marginBottom: 15,
    borderRadius: 50,
    alignSelf: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#fff',
  },

  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },

  datePicker: {
    padding: 5,
    minWidth: 250,
    minHeight: 30,
    marginTop: 15,
    marginBottom: 15,
    borderRadius: 50,
    backgroundColor: '#fff',
    alignSelf: 'center',
  },

  datePickerText: {
    textAlign: 'center',
    color: '#cccccc',
  },

  innerText: {
    color: '#fff',
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: 16,
  },
});
