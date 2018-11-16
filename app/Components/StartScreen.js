import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { CheckBox, Button } from 'react-native-elements';
import Hyperlink from 'react-native-hyperlink';
import LinearGradient from 'react-native-linear-gradient';

export default class TermsAndConditions extends Component {

  render() {
    return (
        <View style={styles.container}>
          <View style={styles.imageHolder}>
            <Image
              style={styles.rightImage}
              resizeMode='contain'
              source={require('../imgs/left-leaf.png')}/>
            <Image
              style={styles.leftImage}
              resizeMode='contain'
              source={require('../imgs/right-leaf.png')}/>
          </View>
          <Text style={styles.containerTitle}>QUIT</Text>
          <Text style={styles.containerText}>in less than a month!</Text>
          <TouchableOpacity onPress={this.props.parentStepsHandler}>
            <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={['#009fea', '#0544a8']}
            style={styles.button}>
                  <Text style={styles.buttonText}>START</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    maxWidth: '90%',
    maxHeight: '70%',
    padding: 35,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 50,
  },

  backgroundImage: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    flex: 1,
    resizeMode: 'cover',
  },

  imageHolder: {
    position: 'relative',
    flexDirection: 'row',
    maxWidth: '100%',
    maxHeight: '30%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  leftImage: {
    position: 'absolute',
    zIndex: 2,
    alignSelf: 'center',
    left: '-10%',
    top: -20,
    width: 70,
    height: 70,
  },

  rightImage: {
    position: 'absolute',
    zIndex: -2,
    alignSelf: 'center',
    right: '-3%',
    top: -20,
    width: 70,
    height: 70,
  },

  containerTitle: {
    fontSize: 22,
    textTransform: 'capitalize',
    color: '#0643a7',
    textAlign: 'center',
    marginTop: 70,
    marginBottom: 10,
  },

  containerText: {
    fontSize: 14,
    textTransform: 'capitalize',
    color: '#0643a7',
    paddingRight: 10,
    paddingLeft: 10,
  },

  button: {
    padding: 10,
    borderRadius: 50,
    marginTop: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#fff',
  },

  buttonText: {
    color: '#fff',
    textAlign: 'center',
    paddingRight: 50,
    paddingLeft: 50,
  },
});
