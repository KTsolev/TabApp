import React, { Component } from 'react';
import { Text, View, AppState, Platform } from 'react-native';
import IntroScreen from './app/Components/IntroScreen/IntroScreen';
import MainNavigator from './app/Components/Navigation/Navigator';
import Modal from './app/Components/Modal/Modal';
import Spinner from './app/Components/Spinner/Spinner';
import moment from 'moment';
import UserStore from './app/data/UserStore';
import PillStore from './app/data/PillStore';
import { loadUser, deleteUser } from './app/data/FluxActions';

let PushNotification = require('react-native-push-notification');

export default class tabexapp extends Component {
  constructor(props) {
    super(props);
    loadUser();

    this.state = {
      isUserSet: false,
      isUserLoading: true,
      showDialog: false,
      notificationCount: 0,
    };

    PushNotification.configure({

        // (required) Called when a remote or local notification is opened or received
        onNotification: this._notificationHandler.bind(this),

        // IOS ONLY (optional): default: all - Permissions to register.
        permissions: {
            alert: true,
            badge: true,
            sound: true,
          },

        // Should the initial notification be popped automatically
        // default: true
        popInitialNotification: true,

        /**
          * (optional) default: true
          * - Specified if permissions (ios) and token (android and ios) will requested or not,
          * - if not, you must call PushNotificationsHandler.requestPermissions() later
          */
        requestPermissions: true,
      });

    this._setUser = this._setUser.bind(this);
    this._loadUser = this._loadUser.bind(this);
    this._toggleModal = this._toggleModal.bind(this);
    this._handleAppStateChange = this._handleAppStateChange.bind(this);
  }

  _loadUser() {
    const user = UserStore.getUser();
    this._setUser({
      isFinished: user !== undefined && user !== null,
      isUserLoading: !(user !== undefined && user !== null),
    });

    if (user) {
      this.setState({
        isFinished: true,
        isUserLoading: false,
        showDialog: false,
      });

      if (moment().diff(moment(user.lastPillTaken), 'days') >= 3) {
        this.setState({ showDialog: true });
        pillsMissed(true);
      }

    }
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

  _toggleModal() {
    console.warn('in toggle');
    let user = UserStore.getUser();

    this.setState({
      isUserSet: user !== undefined && user !== null,
      isFinished: user !== undefined && user !== null,
      isUserLoading: false,
      showDialog: !this.state.showDialog,
    });
  }

  _handleAppStateChange(appState) {

    if (appState === 'background') {
      this.setState({ notificationCount: this.state.notificationCount + 1 });
      console.log('PushNotification running in background');

      let date = moment().add(2, 'hours').toDate();
      console.log(date);

      if (Platform === 'ios') {
        date = notificationSchedule.toISOString();
      }

      PushNotification.localNotification({
        id: Date.now(),
        bigText: 'This is mdg', // (optional) default: 'message' prop
        date,
        title: 'Tabex Tracking', // (optional)
        message: 'You have a maassaaggee', // (required)
        largeIcon: 'ic_launcher', // (optional) default: 'ic_launcher'
        smallIcon: 'ic_notification', // (optional) default: 'ic_notification' with fallback for 'ic_launcher'
        subText: 'Tabex tracking', // (optional) default: none
        color: 'blue',
        backgroundColor: 'darkBlue',
      });

      PushNotification.setApplicationIconBadgeNumber(Number(this.state.notificationCount));
    }
  }

  componentDidMount() {
    UserStore.on('user-loading', () => this.setState({ isUserLoading: true }));
    UserStore.on('recieved-user-data', () => this.setState({ isUserLoading: false }));
    UserStore.on('user-deleted', () => this._setUser(false));
    UserStore.on('user-saved', () => loadUser());
    UserStore.on('user-updated', this._loadUser);
    UserStore.on('user-created', this._loadUser);
    PillStore.on('pills-missed', this._toggleModal);
    PillStore.on('reset-completed', () => {
      this.setState({
        showDialog: false,
        isUserSet: false,
        isUserLoading: false,
      });
    });
    AppState.addEventListener('change', this._handleAppStateChange);
  }

  componentWillUnmount() {
    UserStore.removeListener('user-loading', () => this.setState({ isUserLoading: true }));
    UserStore.removeListener('recieved-user-data', () => this.setState({ isUserLoading: false }));
    UserStore.removeListener('user-deleted', () => this._setUser(false));
    UserStore.removeListener('user-saved', () => loadUser());
    UserStore.removeListener('user-created', this._loadUser);
    UserStore.removeListener('user-updated', this._loadUser);
    PillStore.removeListener('pills-missed', this._toggleModal);
    PillStore.removeListener('reset-completed', () => {
      this.setState({
        showDialog: false,
        isUserSet: false,
        isUserLoading: false,
      });
    });
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  render() {
    if (this.state.isUserLoading) {
      return <Spinner hide={ this.state.isUserLoading }/>;
    }

    if (this.state.isUserSet) {

      if (this.state.showDialog) {
        return <Modal hideModal={this._toggleModal} showDialog={this.state.showDialog} />
      } else {
        return <MainNavigator />;
      }
    }

    return <IntroScreen />;
  }
}
