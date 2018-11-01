import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

class Step extends Component {
  state = {};

  render() {
    return (
      <View>
        <Text>
          {this.props.children} Step {this.props.currentIndex}
        </Text>
        <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={['#009fea', '#0544a8']}
        style={styles.button}>
          <TouchableOpacity
            dissabled={this.props.last}
            onPress={this.props.nextStep}>
            <Text style={styles.buttonText}>{this.props.label}</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>);
  }
}

class Wizzard extends Component {
  static Step = (props) => <Step {...props}/>;

  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      label: 'NEXT',
    };

    this._nextStep = this._nextStep.bind(this);
  }

  _nextStep() {
    if (this.state.index !== this.props.children.length - 1) {
      this.setState(prevState => ({
        index: prevState.index + 1,
        label: prevState.index === 3 ? 'BEGIN' : 'NEXT',
      }));
    }
  }

  render() {
    return (
      <View>
      {React.Children.map(this.props.children, (el, index) => {
        if (index === this.state.index) {
          return React.cloneElement(el, {
            currentIndex: this.state.index + 1,
            nextStep: this._nextStep,
            label: this.state.label,
            isLast: this.state.index === this.props.children.length - 1,
          });
        }

        return null;
      })}
      </View>);
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    width: '90%',
    height: '40%',
    padding: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 50,
  },

  containerTitle: {
    fontSize: 22,
    textTransform: 'capitalize',
    color: '#0643a7',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
  },

  containerText: {
    fontSize: 14,
    textTransform: 'capitalize',
    color: '#0643a7',
    paddingLeft: 10,
    paddingRight: 10,
  },

  button: {
    padding: 10,
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 50,
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


export default Wizzard;
