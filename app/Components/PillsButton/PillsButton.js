import React, { Component } from 'react';
import PercentageCircle from 'react-native-percentage-circle';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { increasePills } from '../../data/FluxActions';
import styles from './styles';

export default class PillsButton extends Component {
  render() {
    let button;
    if (this.props.disabled) {
      return (<TouchableOpacity
            style={styles.buttonDisabled}
            disabled={this.props.disabled}>
              <Text style={styles.buttonText}>+1</Text>
          </TouchableOpacity>);
    } else {
      return (<TouchableOpacity
            style={styles.button}
            disabled={this.props.disabled}
            onPress={() => increasePills()}>
            <Text style={styles.buttonText}>+1</Text>
          </TouchableOpacity>);
    }
  }
}
