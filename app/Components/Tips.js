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
        `At ourselves direction believing do he departure. Celebrated her had sentiments understood are projection set. Possession ye no mr unaffected remarkably at.`,
        `Wrote house in never fruit up. Pasture imagine my garrets an he. However distant she request behaved see nothing. Talking settled at pleased an of me brother weather.`,
        `Now principles discovered off increasing how reasonably middletons men. Add seems out man met plate court sense. His joy she worth truth given.`,
        `All year feet led view went sake. You agreeable breakfast his set perceived immediate. Stimulated man are projecting favourable middletons can cultivated. `,
      ],
    };
  }

  randomTipGenerator() {
    let index = Math.floor(Math.random() * (this.state.tips.length - 1));
    console.warn(index);
    console.warn(this.state.tips[index]);


    return this.state.tips[index];
  }

  componentDidMount() {
    console.warn(this.randomTipGenerator());
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
          source={require('../imgs/tracking.png')}/>
        <View style={styles.containerInner}>
          <Text style={{ fontSize: 14, color: '#0648aa', textAlign: 'center' }}>
            {this.state.currentTip}
          </Text>
        </View>
        <Image
        style={styles.logo}
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
    width: '100%',
    height: '100%',
    flex: 1,
    marginTop: -70,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  logo: {
    marginTop: 20,
    width: 200,
    height: 250,
  },

  bottomLogo: {
    width: 200,
    height: 250,
    marginTop: -100,
  },

  img: {
    width: 30,
    height: 28,
    padding: 5,
    marginLeft: -10,
    marginTop: 10,
  },

  containerInner: {
    flexDirection: 'column',
    width: '90%',
    height: '25%',
    marginTop: -70,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    borderRadius: 50,
  },

  innerRow: {
    flexDirection: 'row',
    width: '80%',
    marginTop: 20,
  },
});
