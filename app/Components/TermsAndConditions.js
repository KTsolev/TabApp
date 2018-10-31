import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, ImageBackground } from 'react-native';
import { CheckBox, Button } from 'react-native-elements';
import Hyperlink from 'react-native-hyperlink';

export default class TermsAndConditions extends Component {
  constructor(props) {
    super(props);
    this.state = { aggreed: false };
  }

  render() {
    const checkBoxText = <View style={styles.link}>
        <Text>
          To continue you must aggree to Sopharma AD
        </Text>
        <Hyperlink>
          <Text>Terms of Services and Polices.</Text>
        </Hyperlink>
      </View>;
    return (
      <View
        style={styles.backgroundImage}
        source={require('../imgs/main-background.png')}>
        <Text style={styles.title}>
          TABEX
        </Text>
        <View style={styles.container}>
          <View>
            <Text style={styles.containerTitle}>Terms and Conditions</Text>
            <CheckBox
              title={checkBoxText}
              style={styles.checkBox}
              checked={this.state.aggreed}
            />
            <LinearGradient colors={['#009eea', '#0643a7']}>
              <Button
                style={styles.button}
                title='CONTINUE'
                dissabled={!this.state.aggreed}
              />
            </LinearGradient>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '90%',
    height: '50%',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 50,
    fontSize: 16,
  },

  containerTitle: {
    fontSize: 22,
    textTransform: 'capitalize',
    justifyContent: 'flex-start',
    textAlign: 'center',
    color: '#0643a7',
    padding: 10,
  },

  title: {
    fontSize: 32,
    textTransform: 'capitalize',
    justifyContent: 'flex-start',
    textAlign: 'center',
    color: '#FCB92D',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
    margin: 10,
  },

  checkBox: {
    width: '100%',
    height: '100%',
  },

  link: {
    color: '#fab120',
    textDecorationLine: 'underline',
    padding: 10,
  },

  button: {
    borderRadius: 50,
  },

  backgroundImage: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    flex: 1,
    resizeMode: 'cover',
  },
});
