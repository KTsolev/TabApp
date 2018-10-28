import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { CheckBox, Button } from 'react-native-elements';

export default class TermsAndConditions extends Component {
  constructor(props) {
    super(props);
    this.state = { aggreed: false };
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          TABEX
        </Text>
        <View>
          <Text>Terms and Conditions</Text>
          <CheckBox
            center
            title='Click Here'
            checked={this.state.checked}
          />
          <Text>
            To continue you must aggree to Sopharma AD
            <Text>
              Terms of Services and Polices.
            </Text>
          </Text>
          <Button
            title='CONTINUE'
            dissabled={!this.state.checked}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: '#0E72E3',
  },
  title: {
    fontSize: 32,
    textTransform: 'capitalize',
    textAlign: 'center',
    color: '#FCB92D',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
    margin: 10,
  }
});
