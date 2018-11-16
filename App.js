import React, { Component } from 'react';
import { Text, View, AppState, Platform } from 'react-native';
import IntroScreen from './app/Components/IntroScreen';
import MainNavigator from './app/Components/Navigator';
import Spinner from './app/Components/Spinner';
import moment from 'moment';
import UserStore from './app/data/UserStore';
import { loadUser } from './app/data/FluxActions';

let PushNotification = require('react-native-push-notification');

export default class tabexapp extends Component {
  constructor(props) {
    super(props);
    loadUser();

    this.state = {
      isUserSet: false,
      isUserLoading: true,
      notificationCount: 0,
    };

    this._setUser = this._setUser.bind(this);
    this._loadUser = this._loadUser.bind(this);
    this._handleAppStateChange = this._handleAppStateChange.bind(this);
  }

  _loadUser() {
    const user = UserStore.getUser();
    this._setUser({ isFinished: user !== undefined && user !== null, isUserLoading: !(user !== undefined && user !== null) })
  }

  _setUser(val) {
    this.setState({
      isUserSet: val.isFinished,
    });
  }

  _notificationHandler (notification) {
    console.log('NOTIFICATION:', notification);
    const clicked = notification.userInteraction;
    console.log(this.state.notificationCount);

    if (clicked) {
      this.setState({ notificationCount: this.state.notificationCount - 1 });
      PushNotification.setApplicationIconBadgeNumber(Number(this.state.notificationCount));

      if (Platform.OS === 'ios') {
        PushNotification.cancelLocalNotifications({ id: notification.data.id });
      } else {
        PushNotification.cancelLocalNotifications({ id: notification.id });
      }
    }
  }

  _handleAppStateChange(appState) {
    this.setState({ notificationCount: this.state.notificationCount + 1 });
    if (appState === 'foreground') {
      return;
    }

    console.log('PushNotification running in background');

    let date = moment().add(5, 'm').toDate();
    console.log(date);

    if (Platform === 'ios') {
      date = notificationSchedule.toISOString();
    }

    PushNotification.localNotificationSchedule({
      id: Date.now(),
      bigText: 'Get one closer to smoke-free life by taking your tabex now.', // (optional) default: 'message' prop
      date,
      title: 'Tabex Tracking', // (optional)
      message: 'Get one closer to smoke-free life', // (required)
      largeIcon: 'ic_launcher', // (optional) default: 'ic_launcher'
      smallIcon: 'ic_notification', // (optional) default: 'ic_notification' with fallback for 'ic_launcher'
      subText: 'Tabex tracking', // (optional) default: none
      color: 'blue',
      backgroundColor: 'darkBlue',
      repeatType: 'hour',
      actions: `['I took my pill', 'Open app']`,  // (Android only) See the doc for notification actions to know more
    });
    PushNotification.setApplicationIconBadgeNumber(Number(this.state.notificationCount));
  }

  componentDidMount() {
    UserStore.on('user-loading', () => this.setState({ isUserLoading: true }));
    UserStore.on('recieved-user-data', () => this.setState({ isUserLoading: false }));
    UserStore.on('user-deleted', () => this._setUser(false));
    UserStore.on('user-saved', () => loadUser());
    UserStore.on('user-updated', this._loadUser);
    UserStore.on('user-created', this._loadUser);
    AppState.addEventListener('change', this._handleAppStateChange);
  }

  componentWillUnmount() {
    UserStore.removeListener('user-loading', () => this.setState({ isUserLoading: true }));
    UserStore.removeListener('recieved-user-data', () => this.setState({ isUserLoading: false }));
    UserStore.removeListener('user-deleted', () => this._setUser(false));
    UserStore.removeListener('user-saved', () => loadUser());
    UserStore.removeListener('user-created', this._loadUser);
    UserStore.removeListener('user-updated', this._loadUser);
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  render() {
    if (this.state.isUserLoading) {
      return <Spinner hide={ this.state.isUserLoading }/>;
    }

    if (this.state.isUserSet) {
      return <MainNavigator />;
    }

    return <IntroScreen />;
  }
}
