import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },

  rowContainer: {
    flex: 1,
    flexDirection: 'row',
  },

  backgroundImage: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    resizeMode: 'contain',
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

  infoContainer: {
    flex: 1,
    height: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  infoContainerBigger: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },

  headerText: {
    color: '#fff',
    fontSize: 18,
    paddingLeft: 15,
    paddingRight: 15,
    textAlign: 'center',
  },

  divider: {
    width: '80%',
    height: 1,
    marginTop: 15,
    marginBottom: 15,
    backgroundColor: '#fff',
  },

  containerInner: {
    flex: 1,
    flexDirection: 'column',
    maxHeight: '95%',
    width: '80%',
    margin: 15,
    padding: 20,
    backgroundColor: '#f1f1f1',
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 5,
  },

  headerRow: {
    flexDirection: 'row',
    height: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 15,
  },

  headerRowElevated: {
    flexDirection: 'row',
    height: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 15,
    marginBottom: 30,
  },

  innerRow: {
    height: 80,
    flex: 1,
    flexDirection: 'row',
    padding: 5,
    justifyContent: 'space-between',
    borderColor: '#959595',
    borderBottomWidth: 1,
  },
});
