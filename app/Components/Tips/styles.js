import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  bubbleImage: {
    resizeMode: 'contain',
  },

  logoHollder: {
    marginTop: 20,
    marginBottom: 20,
    width: 150,
    height: '15%',
    justifyContent: 'center',
    alignSelf: 'center',
  },

  logo: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },

  bottomLogo: {
    maxWidth: 200,
    maxHeight: '15%',
  },

  characteLogo: {
    maxWidth: 200,
    maxHeight: '30%',
  },

  containerInner: {
    flex: 2,
    position: 'relative',
    flexDirection: 'column',
    maxWidth: '90%',
    maxHeight: '40%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 50,
    padding: 25,
    marginTop: 20,
    marginBottom: 20,
  },

  speechTail: {
    position: 'absolute',
    bottom: -35,
    width: 60,
    height: 60,
    left: '15%',
  },
});
