import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
  backgroundImage: {
    resizeMode: 'contain',
    justifyContent: 'flex-start',
    flex: 1,
  },

  container: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },

  rowContainer: {
    flex: 1,
    flexDirection: 'row',
    resizeMode: 'cover',
    alignItems: 'flex-start',
  },

  logoHollder: {
    width: 150,
    height: '10%',
    marginTop: 30,
    marginBottom: 10,
    alignSelf: 'center',
  },

  logo: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },

  img: {
    width: 25,
    height: 25,
    marginTop: 10,
    resizeMode: 'contain',
  },

  headerContainer: {
    flex: 1,
    maxHeight: '20%',
    flexDirection: 'row',
    justifyContent: 'center',
  },

  rowHeaderContainer: {
    flex: 1,
    maxHeight: '50%',
    flexDirection: 'row',
    justifyContent: 'center',
  },

  tabBarRow: {
    flex: 1,
    maxHeight: '15%',
    padding: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  imageHolder: {
    width: '10%',
    height: 70,
  },

  tabBarHolder: {
    width: '90%',
    height: 70,
  },

  barGreen: {
    marginTop: 11,
    marginRight: 10,
    width: '100%',
    height: 'auto',
    borderWidth: 2,
    borderColor: '#56c17b',
    borderRadius: 50,
  },

  barPurple: {
    marginTop: 11,
    marginRight: 10,
    width: '100%',
    height: 'auto',
    borderWidth: 2,
    borderColor: '#ac66ea',
    borderRadius: 50,
  },

  barBottomRow: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  barLeftText: {
    fontSize: 12,
    color: '#fff',
    textAlign: 'left',
    marginLeft: 2,
  },

  barRightText: {
    fontSize: 12,
    color: '#fff',
    textAlign: 'right',
  },

  innerBarText: {
    fontSize: 12,
    color: '#fff',
    textAlign: 'right',
  },

  innerBar: {
    padding: 2,
    height: 'auto',
    marginLeft: '0%',
    width: '100%',
    backgroundColor: '#05439c',
    borderRadius: 50,
  },

  progressBar: {
    marginTop: 15,
    marginBottom: 15,
  },

  infoArea: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    maxHeight: '40%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  moneyArea: {
    flex: 1,
    padding: 4,
    height: '100%',
    maxHeight: '80%',
    width: '33%',
    marginTop: 20,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#d0f190',
    justifyContent: 'center',
    borderRadius: 100,
  },

  ciggarettesArea: {
    flex: 1,
    padding: 4,
    height: '100%',
    maxHeight: '80%',
    width: '33%',
    marginTop: 20,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#2ca5af',
    justifyContent: 'center',
    borderRadius: 100,
  },

  daysArea: {
    flex: 1,
    padding: 4,
    height: '100%',
    maxHeight: '80%',
    width: '33%',
    marginTop: 20,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#af67eb',
    justifyContent: 'center',
    borderRadius: 100,
  },

  areaText: {
    fontSize: 16,
    padding: 2,
    color: '#fff',
    textAlign: 'center',
  },

  areaTextBolded: {
    fontSize: 16,
    padding: 2,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
  },

  areaTextSmaller: {
    fontSize: 14,
    padding: 2,
    color: '#fff',
    textAlign: 'center',
  },
});
