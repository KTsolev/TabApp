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
import firebase from 'react-native-firebase';
import { AsyncStorage } from 'react-native';

let PushNotification = require('react-native-push-notification');

export default class tabexapp extends Component {
  constructor(props) {
    super(props);
    loadUser();
    this.state = {
      isFinished: true,
      isUserLoading: true,
      showDialog: false,
      notificationCount: 0,
    };

    this._setUser = this._setUser.bind(this);
    this._loadUser = this._loadUser.bind(this);
    this._toggleModal = this._toggleModal.bind(this);
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

  _toggleModal() {
    let user = UserStore.getUser();

    this.setState({
      isUserSet: user !== undefined && user !== null,
      isFinished: user !== undefined && user !== null,
      isUserLoading: false,
      showDialog: !this.state.showDialog,
    });
  }

  async checkPermission() {
    const notification = new firebase.notifications.Notification()
    .setNotificationId('notificationId')
    .setTitle('My notification title')
    .setBody('My notification body')
    .setData({
      key1: 'value1',
      key2: 'value2',
    });
    console.log(notification)
    const enabled = await firebase.messaging().hasPermission();
    console.log('in check permission');
    if (enabled) {
      console.log('withs permission');

      this.getToken().then(data => console.log(data));
      const date = new Date();
      date.setMinutes(date.getMinutes() + 1);
      console.log(date.getTime())
      firebase.notifications().scheduleNotification(notification, {
          fireDate: date.getTime(),
        });

    } else {
      this.requestPermission();
    }
  }

  async getToken() {
    let fcmToken = await AsyncStorage.getItem('fcmToken', value);
    console.log(fcmToken);
    if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken();
      if (fcmToken) {
        await AsyncStorage.setItem('fcmToken', fcmToken);
      }
    }
    this.setState({ token: fcmToken });
  }

  async requestPermission() {
    try {
      await firebase.messaging().requestPermission();
      this.getToken();
    } catch (error) {
      console.log('permission rejected');
    }
  }

  async createNotificationListeners() {
    /*
    * Triggered when a particular notification has been received in foreground
    * */
    this.notificationListener = firebase.notifications().onNotification((notification) => {
        const { title, body } = notification;
        this.showAlert(title, body);
    });

    /*
    * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
    * */
    this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
        const { title, body } = notificationOpen.notification;
        this.showAlert(title, body);
    });

    /*
    * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
    * */
    const notificationOpen = await firebase.notifications().getInitialNotification();
    if (notificationOpen) {
      const { title, body } = notificationOpen.notification;
      this.showAlert(title, body);
    }
    /*
    * Triggered for data only payload in foreground
    * */
    this.messageListener = firebase.messaging().onMessage((message) => {
      //process data message
      console.log(JSON.stringify(message));
    });
  }

  showAlert(title, body) {
    Alert.alert(
      title, body,
      [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
      ],
      { cancelable: false },
    );
  }

  componentDidMount() {
    this.checkPermission().then((err, data) => { err ? console.log(err): data });
    this.createNotificationListeners().then((err, data) => { err ? console.log(err): data });;
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
