import React, { Component } from 'react';
import PercentageCircle from 'react-native-percentage-circle';
import { StyleSheet, Text, TouchableOpacity} from 'react-native';

export default class PillsButton extends Component {
  render() {
    return (
      <TouchableOpacity
        style={styles.button}
        dissabled={false}
        onPress={this.props.increasePills}>
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
  },

  buttonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
});
