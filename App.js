import React, { Component } from 'react';
import { Text, View } from 'react-native';
import IntroScreen from './app/Components/IntroScreen';
import MainNavigator from './app/Components/Navigator';
import moment from 'moment';
import { YellowBox } from 'react-native';
import UserStore from './app/data/UserStore';
import { loadUser } from './app/data/FluxActions';


export default class tabexapp extends Component {
  constructor(props) {
    super(props);
    loadUser();

    this.state = { isUserSet: false };
    this._setUser = this._setUser.bind(this);
    this._loadUser = this._loadUser.bind(this);
  }

  _loadUser() {
    const user = UserStore.getUser();
    this._setUser({ isFinished: user !== undefined && user !== null })
  }

  _setUser(val) {
    this.setState({
      isUserSet: val.isFinished,
    });
  }

  componentDidMount() {
    UserStore.on('user-created', this._loadUser);
    UserStore.on('user-deleted', () => this._setUser(false));
    UserStore.on('user-updated', this._loadUser);
    UserStore.on('user-saved', () => loadUser());
  }

  componentWillUnmount() {
    UserStore.removeListener('user-created', this._loadUser);
    UserStore.removeListener('user-deleted', () => this._setUser(false));
    UserStore.removeListener('user-updated', this._loadUser);
    UserStore.removeListener('user-saved', () => loadUser());

  }

  render() {

    if (this.state.isUserSet) {
      return <MainNavigator />;
    } else {
      return <IntroScreen />;
    }

  }
}
