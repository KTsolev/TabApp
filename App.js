import React, { Component } from 'react';
import { Text, View, AppState, Platform } from 'react-native';
import IntroScreen from './app/Components/IntroScreen';
import MainNavigator from './app/Components/Navigator';
import Spinner from './app/Components/Spinner';
import moment from 'moment';
import UserStore from './app/data/UserStore';
import PillStore from './app/data/PillStore';
import { loadUser, deleteUser, pillsMissed, resetCompleted } from './app/data/FluxActions';
import Dialog, { DialogTitle, DialogButton, DialogContent } from 'react-native-popup-dialog';

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
        hideDialog: false,
      });
       
      if (moment().diff(moment(user.lastPillTaken), 'days') >= 3) {
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
     let pilsData = PillStore.getPills();
     
     if (!pilsData)
      return;
     
     this.setState({
      isFinished: false,
      isUserLoading: false,
      showDialog: pilsData.showResetModal,
    });
  }

  _handleAppStateChange(appState) {

    if (appState === 'background') {
      this.setState({ notificationCount: this.state.notificationCount + 1 });
      console.log('PushNotification running in background');

      let date = moment().add(10, 'min').toDate();
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
    UserStore.on('user-updated', this._loadUser);
    PillStore.on('pills-missed', this._toggleModal);
    PillStore.on('reset-completed', this._toggleModal);
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
    PillStore.removeListener('reset-completed', this._toggleModal);
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  render() {
    // if (this.state.showDialog) {
    //   return <Dialog
    //   visible={this.state.showDialog}
    //   width={'90%'}
    //   dialogTitle={<DialogTitle 
    //   textStyle={{fontSize: 18, padding: 20, color: '#d15b1b'}}
    //   title="Hey it seems you missed quite few pills!" />
    //   actions={[
    //     <DialogButton
    //       text="Do you want to reset your treatment?"
    //       textStyle={{color: '#d62b4d', padding: 15}}
    //       onPress={() => {
    //         deleteUser();
    //         resetCompleted();
    //       }}/>,
    //     <DialogButton
    //       text="Take a pill!"
    //       textStyle={{color: '#1b39d1', padding: 15}}
    //       onPress={() => <MainNavigator />}
    //       />
    //       ]}>
    //   </Dialog>
    // }
    
    if (this.state.isUserLoading) {
      return <Spinner hide={ this.state.isUserLoading }/>;
    }

    if (this.state.isUserSet && !this.state.showDialog) {
      return <MainNavigator />;
    }

    return <IntroScreen />;
  }
}
