import React, { Component } from 'react';
import { Text, View, AppState, Platform } from 'react-native';
import IntroScreen from './app/Components/IntroScreen/IntroScreen';
import MainNavigator from './app/Components/Navigation/Navigator';
import Modal from './app/Components/Modal/Modal';
import Spinner from './app/Components/Spinner/Spinner';
import moment from 'moment';
import UserStore from './app/data/UserStore';
import PillStore from './app/data/PillStore';
import { loadUser, deleteUser, loadPillsData, reinitPillsData } from './app/data/FluxActions';
import PushNotificationService from './app/data/PushNotificationService';

const PushNotification = new PushNotificationService();

export default class tabexapp extends Component {
  constructor(props) {
    super(props);
    loadUser();
    reinitPillsData();

    this.state = {
      isUserSet: false,
      isUserLoading: true,
      isPillDataLoading: true,
      showDialog: false,
      notificationCount: 0,
    };
    PushNotification.sendNotifications((5 * 60000));
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

  componentWillMount() {
    UserStore.on('user-loading', () => this.setState({ isUserLoading: true }));
    UserStore.on('recieved-user-data', () => this.setState({ isUserLoading: false }));
    UserStore.on('user-deleted', () => this._setUser(false));
    UserStore.on('user-saved', () => loadUser());
    UserStore.on('user-updated', this._loadUser);
    UserStore.on('user-created', this._loadUser);
    PillStore.on('pills-missed', this._toggleModal);
    PillStore.on('pills-loading', () => this.setState({ isPillDataLoading: true }));
    PillStore.on('pills-state-created', () => this.setState({ isPillDataLoading: false }));
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
    PillStore.removeListener('pills-loading', () => this.setState({ isPillDataLoading: true }));
    PillStore.removeListener('pills-state-created', () => this.setState({ isPillDataLoading: false }));
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
    if (this.state.isUserLoading ) {
      return <Spinner hide={ this.state.isUserLoading }/>;
    }

    if (this.state.isUserSet) {

      if (this.state.showDialog) {
        return <Modal hideModal={this._toggleModal} showDialog={this.state.showDialog} />
      } else {
        if (this.state.isPillDataLoading) {
          setTimeout(() => this.setState({ isPillDataLoading: false }), 1000);
          return <Spinner hide={ this.state.isPillDataLoading }/>;
        }

        return <MainNavigator />;
      }
    }

    return <IntroScreen />;
  }
}
