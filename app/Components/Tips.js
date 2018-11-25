import React, { Component } from 'react';
import { View, Text, Image, ImageBackground, TouchableOpacity, StyleSheet } from 'react-native';
import PercentageCircle from 'react-native-percentage-circle';
import LinearGradient from 'react-native-linear-gradient';

export default class Tips extends Component{
  constructor(props) {
    super(props);
    this.state = {
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
  }

  randomTipGenerator() {
    let index = Math.floor(Math.random() * (this.state.tips.length - 1));
    console.log(index);
    console.log(this.state.tips[index]);


    return this.state.tips[index];
  }

  componentDidMount() {
    console.log(this.randomTipGenerator());
    this.setState({ currentTip: this.randomTipGenerator() });
  }

  render() {
    return (
      <ImageBackground
        style={styles.backgroundImage}
        source={require('../imgs/background.png')}>
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
