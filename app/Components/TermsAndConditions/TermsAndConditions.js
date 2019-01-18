import React, { Component } from 'react';
import { Text, View, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { CheckBox } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import TextPanel from '../TextPanel/TextPanel';
import overallTerms from '../../data/termsAndConditionsOverall';
import generalRights from '../../data/generallRights';
import styles from './styles';
import {
  listenOrientationChange as loc,
  removeOrientationListener as rol
} from 'react-native-responsive-screen';

export default class TermsAndConditions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showTerm: false,
      aggreed: props.isChecked || false,
      activeColors: ['#e3f3fd', '#e7e7e7'],
    };

    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onPressHandler = this.onPressHandler.bind(this);
  }

  onChangeHandler() {
    this.setState({
      aggreed: !this.state.aggreed,
    });

    if (!this.state.aggreed) {
      this.setState({ activeColors: ['#009fea', '#0544a8'] });
    } else {
      this.setState({ activeColors: ['#e3f3fd', '#e7e7e7'] });
    }
  }

  onPressHandler() {
    this.props.onParentChangeHandler(this.state.aggreed);
  }

  componentDidMount() {
    loc(this);
  }

  componentWillUnMount() {
    rol();
  }

  render() {
    console.log(generalRights);
    const checkBoxText = <View>
        <Text style={styles.containerText}>
          To continue you must aggree to Sopharma AD
        </Text>
      </View>;

    const terms = <ScrollView style={styles.scrollView}>
        <TextPanel style={{flex: 0.4}} panelText={overallTerms} />
        <TextPanel style={{flex: 0.4}} panelText={generalRights} />
        <TouchableOpacity
          onPress={() => {
            this.setState({ showTerm: false });
            this.onChangeHandler();
          }}>
          <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={['#009fea', '#0544a8']}
          style={styles.termsButton}>
                <Text style={styles.buttonText} >Accept</Text>
          </LinearGradient>
        </TouchableOpacity>
    </ScrollView>;

    const view =
        <LinearGradient
          style={styles.container}
          colors={['#fff', '#ddf1fc']} >
          <Text style={styles.containerTitle}>Terms and Conditions</Text>
          <CheckBox
            title={checkBoxText}
            style={styles.checkBox}
            type='font-awellsome'
            uncheckedColor='#c5c5c5'
            uncheckedIcon='square'
            checkedColor='#0643a6'
            checkedIcon='check-square'
            onPress={this.onChangeHandler}
            checked={this.state.aggreed}
          />
          <TouchableOpacity onPress={() => this.setState({ showTerm: true })}>
            <Text style={styles.link}>Terms of Services and Polices.</Text>
          </TouchableOpacity>
          <TouchableOpacity
            dissabled={this.state.aggreed}
            onPress={this.onPressHandler}
            >
            <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={this.state.activeColors}
            style={styles.button}>
                <Text style={styles.buttonText} >CONTINUE</Text>
            </LinearGradient>
          </TouchableOpacity>
        </LinearGradient>;
    return this.state.showTerm ? terms : view;
  }
}
