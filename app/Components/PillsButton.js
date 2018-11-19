import React, { Component } from 'react';
import PercentageCircle from 'react-native-percentage-circle';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { increasePills } from '../data/FluxActions';

export default class PillsButton extends Component {
  render() {
    return (
      <TouchableOpacity
        style={this.props.dissabled ? styles.buttonDissabled : styles.button}
        dissabled={this.props.dissabled}
        onPress={() => increasePills()}>
        <Text style={styles.buttonText}>+1</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 50,
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: '#56c078',
    backgroundColor: '#56c078',
    borderWidth: 1,
    shadowColor: '#000000',
    shadowOffset: {
        width: 0,
        height: 3,
      },
    shadowRadius: 5,
    shadowOpacity: 1.0,
    zIndex: 15,
  },

  buttonDissabled: {
    padding: 10,
    borderRadius: 50,
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: '#98d5b8',
    backgroundColor: '#98d5b8',
    borderWidth: 1,
    shadowColor: '#000000',
    shadowOffset: {
        width: 0,
        height: 3,
      },
    shadowRadius: 5,
    shadowOpacity: 1.0,
    zIndex: 15,
  },

  buttonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    zIndex: 15,
  },
});
