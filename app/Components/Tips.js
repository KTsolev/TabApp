import React, { Component } from 'react';
import { View, Text, Image, ImageBackground, TouchableOpacity, StyleSheet } from 'react-native';
import PercentageCircle from 'react-native-percentage-circle';
import LinearGradient from 'react-native-linear-gradient';
import Orientation from 'react-native-orientation';

export default class Tips extends Component{
  constructor(props) {
    super(props);
    this.state = {
      isLandScape: false,
      currentTip: '',
      tips: [
        ` By quiting, you are even improving your hair.
          Experts now say that toxic chemicals in smoke can damage DNA in hair folicles.
          This can cause hair to thin and go gray faster.`,
        `By quiting, you are even improving your hair. Experts now say that toxic
         chemicals in smoke can damage DNA in hair folicles. This can cause hair to thin and go gray faster.`,
        `Get back your glow. Quitting will improve the color and appearance of your skin.`,
        `The breathing through a small straw. This is a good smoking simulator.`],
    };

    this._orientationDidChange = this._orientationDidChange.bind(this);
  }

  _randomTipGenerator() {
    let index = Math.floor(Math.random() * (this.state.tips.length - 1));
    return this.state.tips[index];
  }

  _orientationDidChange(orientation) {
    this.setState({ isLandScape: orientation === 'LANDSCAPE' });
  }

  componentWillMount() {
    const initial = Orientation.getInitialOrientation();
    this.setState({ isLandScape: initial === 'LANDSCAPE' });
    Orientation.addOrientationListener(this._orientationDidChange);
  }

  componentWillUnmount() {
    Orientation.removeOrientationListener(this._orientationDidChange);
  }

  componentDidMount() {
    this.setState({ currentTip: this._randomTipGenerator() });
  }

  render() {
    if (this.state.isLandScape) {
      return (
          <ImageBackground
            style={[styles.backgroundImage, { flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', padding: 50 }]}
            source={require('../imgs/backgroud12.png')}>
            <View styles={{ flex: 1, width: '50%', justifyContent: 'center', alignContent: 'center' }}>
              <Image
                style={[styles.logo, { maxHeight: '50%' }]}
                resizeMode='contain'
                source={require('../imgs/trackingi.png')}/>

              <Image
                style={[styles.bottomLogo, { maxHeight: '50%' }]}
                resizeMode='contain'
                source={require('../imgs/tabex-logo.png')}/>
            </View>
            <View styles={{ flex: 1, width: '50%', justifyContent: 'center', alignContent: 'center' }}>
              <View style={[styles.containerInner, { maxWidth: '70%', maxHeight: '50%', padding: 10,  alignSelf: 'center' }]}>
                <Text style={{ fontSize: 10, color: '#0648aa', textAlign: 'center' }}>
                  {this.state.currentTip}
                </Text>
                <Image
                  style={styles.speechTail}
                  resizeMode='contain'
                  source={require('../imgs/speech-tail.png')} />
              </View>
              <Image
                style={[styles.characteLogo, { alignSelf: 'center' }]}
                resizeMode='contain'
                source={require('../imgs/character.png')}/>
            </View>
          </ImageBackground>
        );
    } else {
      return (
          <ImageBackground
            style={styles.backgroundImage}
            source={require('../imgs/backgroud12.png')}>
              <Image
                style={styles.logo}
                resizeMode='contain'
                source={require('../imgs/trackingi.png')}/>
              <View style={styles.containerInner}>
                <Text style={{ fontSize: 14, color: '#0648aa', textAlign: 'center' }}>
                  {this.state.currentTip}
                </Text>
                <Image
                  style={styles.speechTail}
                  resizeMode='contain'
                  source={require('../imgs/speech-tail.png')} />
              </View>
              <Image
                style={styles.characteLogo}
                resizeMode='contain'
                source={require('../imgs/character.png')}/>
              <Image
                style={styles.bottomLogo}
                resizeMode='contain'
                source={require('../imgs/tabex-logo.png')}/>
          </ImageBackground>
        );
    }
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  bubbleImage: {
    resizeMode: 'contain',
  },

  logo: {
    marginTop: 20,
    maxWidth: 200,
    maxHeight: '15%',
  },

  bottomLogo: {
    maxWidth: 200,
    maxHeight: '15%',
  },

  characteLogo: {
    maxWidth: 200,
    maxHeight: '40%',
  },

  containerInner: {
    flex: 2,
    position: 'relative',
    flexDirection: 'column',
    maxWidth: '90%',
    maxHeight: '30%',
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
