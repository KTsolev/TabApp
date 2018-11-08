import React, { Component } from 'react';
import { Text, View } from 'react-native';
import IntroScreen from './app/Components/IntroScreen';
import MainNavigator from './app/Components/Navigator';
import moment from 'moment';
import { YellowBox } from 'react-native';
import { saveData, getData, clearData } from './app/data/StoreService';


export default class tabexapp extends Component {
  constructor(props) {
    super(props);

    this.state = { isUserSet: false };
    this.setUser = this.setUser.bind(this);
  }

  componentWillMount() {
    getData('userData').then((user, err) => {
      this.setState({
        isUserSet: user !== undefined && user !== null,
      });
    });
  }

  setUser(val) {

    this.setState({
      isUserSet: val.isFinished,
    });
  }

  render() {

    if (this.state.isUserSet) {
      return <MainNavigator />;
    } else {
      return <IntroScreen finishSetUpUser={this.setUser} />;
    }

  }
}
