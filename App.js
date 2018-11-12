import React, { Component } from 'react';
import { Text, View } from 'react-native';
import IntroScreen from './app/Components/IntroScreen';
import MainNavigator from './app/Components/Navigator';
import moment from 'moment';
import { YellowBox } from 'react-native';
import { saveData, getData, clearData } from './app/data/StoreService';
import UserStore from './app/data/FluxStore';

export default class tabexapp extends Component {
  constructor(props) {
    super(props);

    this.state = { isUserSet: false };
    this._setUser = this._setUser.bind(this);
    this._getUser = this._getUser.bind(this);
  }

  _getUser() {
    const user = UserStore.getUser();
    this.setState({
      isUserSet: user !== undefined && user !== null,
    });
  }

  _setUser(val) {
    this.setState({
      isUserSet: val.isFinished,
    });
  }

  componentWillMount() {
    UserStore.on('user-created', this._getUser);
    UserStore.on('user-updated', this._getUser);
  }

  componentWillUnmount() {
    UserStore.removeListener('user-created', this._getUser);
    UserStore.removeListener('user-updated', this._getUser);
  }

  render() {

    if (this.state.isUserSet) {
      return <MainNavigator />;
    } else {
      return <IntroScreen finishSetUpUser={this._setUser} />;
    }

  }
}
