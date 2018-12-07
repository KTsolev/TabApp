import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },

  rowContainer: {
    flex: 1,
    flexDirection: 'column',
  },

  calendar: {
    flex: 1,
    width: '80%',
    height: '60%',
    marginBottom: 220,
    alignSelf: 'center',
  },

  divider: {
    width: '65%',
    height: 1,
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: '#959595',
  },

  backgroundImage: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    alignContent: 'center',
    resizeMode: 'contain',
  },

  headerText: {
    color: '#fff',
    fontSize: 18,
    paddingLeft: 15,
    paddingRight: 15,
    textAlign: 'center',
  },

  containerInner: {
    flex: 1,
    width: '85%',
    height: '80%',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 20,
    margin: 15,
    marginTop: -120,
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#f1f1f1',
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 5,
  },

  logoHollder: {
    marginTop: 20,
    marginBottom: 20,
    width: 150,
    height: '10%',
  },

  logo: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },

  img: {
    width: 30,
    height: 30,
    alignSelf: 'flex-end',
    resizeMode: 'contain',
  },

  innerRow: {
    flex: 1,
    flexDirection: 'row',
    padding: 5,
    margin: 5,
    maxWidth: '100%',
    maxHeight: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },

  lastRow: {
    flex: 1,
    marginTop: 10,
    marginRight: 20,
    maxHeight: 90,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  headerColumn: {
    flex: 1,
    maxWidth: '100%',
    maxHeight: 70,
    flexDirection: 'column',
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 10,
    paddingTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
