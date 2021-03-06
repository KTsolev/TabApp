import React, { Component } from 'react';
import PercentageCircle from 'react-native-percentage-circle';
import LinearGradient from 'react-native-linear-gradient';
import Orientation from 'react-native-orientation';
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  Platform,
  Linking,
  LinkingIOS,
  Dimensions } from 'react-native';
import styles from './styles';

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
            source={require('../../imgs/backgroud12.png')}>
            <View styles={{ flex: 1, width: '50%', justifyContent: 'center', alignContent: 'center' }}>
              <TouchableOpacity
                style={styles.logoHollder}
                onPress={() => Platform === 'ios' ? LinkingIOS.openURL('https://www.tabex.bg/links/TABEX_LEAFLET_ss3360.pdf') : Linking.openURL('https://www.tabex.bg/links/TABEX_LEAFLET_ss3360.pdf')}>
                <Image
                  style={[styles.logo, {justifyContent: 'center', alignSelf: 'center'}]}
                  source={require('../../imgs/trackingi.png')} />
              </TouchableOpacity>

              <Image
                style={[styles.bottomLogo, { maxHeight: '50%' }]}
                resizeMode='contain'
                source={require('../../imgs/tabex-logo.png')}/>
            </View>
            <View styles={{ flex: 1, width: '50%', padding: 50, justifyContent: 'center', alignContent: 'center' }}>
              <View style={[styles.containerInner, { maxWidth: '70%', maxHeight: '50%', padding: 10,  alignSelf: 'center' }]}>
                <Text style={{ fontSize: 10, color: '#0648aa', textAlign: 'center' }}>
                  {this.state.currentTip}
                </Text>
                <Image
                  style={styles.speechTail}
                  resizeMode='contain'
                  source={require('../../imgs/speech-tail.png')} />
              </View>
              <Image
                style={[styles.characteLogo, { alignSelf: 'center' }]}
                resizeMode='contain'
                source={require('../../imgs/character.png')}/>
            </View>
          </ImageBackground>
        );
    } else {
      return (
          <ImageBackground
            style={styles.backgroundImage}
            source={require('../../imgs/backgroud12.png')}>
            <TouchableOpacity
              style={styles.logoHollder}
              onPress={() => Platform === 'ios' ? LinkingIOS.openURL('https://www.tabex.bg/links/TABEX_LEAFLET_ss3360.pdf') : Linking.openURL('https://www.tabex.bg/links/TABEX_LEAFLET_ss3360.pdf')}>
              <Image
                style={[styles.logo, {justifyContent: 'center', alignSelf: 'center'}]}
                source={require('../../imgs/trackingi.png')} />
            </TouchableOpacity>
              <View style={styles.containerInner}>
                <Text style={{ fontSize: 14, color: '#0648aa', textAlign: 'center' }}>
                  {this.state.currentTip}
                </Text>
                <Image
                  style={styles.speechTail}
                  resizeMode='contain'
                  source={require('../../imgs/speech-tail.png')} />
              </View>
              <Image
                style={styles.characteLogo}
                resizeMode='contain'
                source={require('../../imgs/character.png')}/>
              <Image
                style={styles.bottomLogo}
                resizeMode='contain'
                source={require('../../imgs/tabex-logo.png')}/>
          </ImageBackground>
        );
    }
  }
}
