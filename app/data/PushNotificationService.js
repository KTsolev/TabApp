import { Platform } from 'react-native';
import RNNotificationAndroidPermissionLibrary from 'react-native-notification-android-permission-library';
let PushNotification = require('react-native-push-notification');

export default class PushNotificationService {
  init() {
    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: (token) => {
          console.log('TOKEN:', token);
        },

      // (required) Called when a remote or local notification is opened or received
      onNotification: (notification) => {
        const clicked = notification.userInteraction;

        if (clicked) {
          this.setState({ notificationCount: this.state.notificationCount - 1 });
          PushNotification.setApplicationIconBadgeNumber(Number(this.state.notificationCount));

          if (Platform.OS === 'ios') {
            PushNotification.cancelLocalNotifications({ id: notification.data.id });
          } else {
            PushNotification.cancelLocalNotifications({ id: notification.id });
          }
        }
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
  }

  checkAndroidNotificationPermission() {
    if (Platform.OS === 'ios') {
      return new Promise((resolve) => {
          PushNotification.checkPermissions(({ alert, badge, sound }) => {
            if (!alert || !badge || !sound) {
              PushNotification.requestPermissions();
            }
          });
          return resolve(alert || badge || sound);
        });
    } else {
      return RNNotificationAndroidPermissionLibrary.checkNotificationPermission();
    }
  }

  sendNotifications(time) {
    let fireAt = time || (5 * 60000); //5 mins in miliseconds

    this.checkAndroidNotificationPermission().then((status) => {
      PushNotification.cancelAllLocalNotifications();
      console.warn(status);
      PushNotification.localNotificationSchedule({
        date: new Date(Date.now() + time),
        bigText: 'Get one step closer to a smoke free life by taking your tabeks pill now', // (optional) default: 'message' prop
        title: 'Tabex Tracking', // (optional)
        message: 'Get one step closer to a smoke free life by taking your tabeks pill now', // (required)
        largeIcon: 'ic_launcher', // (optional) default: 'ic_launcher'
        smallIcon: 'ic_notification', // (optional) default: 'ic_notification' with fallback for 'ic_launcher'
        subText: 'Tabex tracking', // (optional) default: none
        repeatType: 'time',
        repeatTime: time,
        color: 'blue',
      });
    });;
  }
}
