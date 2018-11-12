import React, { Component } from 'react';
import PillsButton from './PillsButton';
import { View, Text, Image, ImageBackground, StyleSheet } from 'react-native';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { Divider } from 'react-native-elements';
import { saveData, getData, clearData, multiGet } from '../data/StoreService';
import UserStore from '../data/FluxStore';
import moment from 'moment';

export default class CalendarTr extends Component{
  constructor(props) {
    super(props);
    const user = UserStore.getUser();
    const dates = this._getSelectedRange(user.startingDate);

    this.state = {
      pills: 1,
      lastPillTaken: null,
      user,
      dates,
    };

    this._getUser = this._getUser.bind(this);
    this._incrementPills = this._incrementPills.bind(this);
  }

  _incrementPills() {
    if (this.state.pills < 6) {
      this.setState({ pills: this.state.pills + 1, lastPillTaken: moment().format() });
    }
  }

  _getSelectedRange(startDate) {
    let minDate = moment(startDate);
    let maxDate = moment();
    let range  = [];
    while (minDate.isSameOrBefore(maxDate)) {
      range.push({
          date: minDate.format('YYYY-MM-DD'),
          startingDay: true,
          selected: true,
          marked: true,
          color: '#57c279', });
      minDate.add(1, 'day');
    }

    const objectArray = range.reduce((obj, item) => {
            obj[item.date] = item;
            return obj;
          }, {});

    return objectArray;
  }

  _getUser() {
    const jsonUser = userStore.getUser();
    const dates = this._getSelectedRange(jsonUser.startingDate);
    this.setState({
      user: jsonUser,
      dates,
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
    return (
        <View style={styles.headerContainer}>
          <Image style={styles.logo} source={require('../imgs/tracking.png')}/>
          <Calendar
              startFromMonday={true}
              allowRangeSelection={true}
              markedDates={this.state.dates ? this.state.dates : {}}
              theme={{
                arrowColor: 'white',
                monthTextColor: 'white',
                calendarBackground: '#00adf5',
                textSectionTitleColor: '#fff',
                selectedDayBackgroundColor: '#57c279',
                selectedDayTextColor: '#ffffff',
                todayTextColor: '#fff',
                dayTextColor: '#fff',
                textDisabledColor: '#d9e1e8',
                dotColor: '#2d4150',
                selectedDotColor: '#57c279',
                arrowColor: 'orange',
                monthTextColor: 'blue',
                textDayFontFamily: 'monospace',
                textMonthFontFamily: 'monospace',
                textDayHeaderFontFamily: 'monospace',
                textMonthFontWeight: 'bold',
                textDayFontSize: 16,
                textMonthFontSize: 16,
                textDayHeaderFontSize: 16,
              }}
            />
          <View style={styles.containerInner}>
            <View style={styles.headerColumn}>
              <Text style={{ fontSize: 18, color: '#0648aa', textAlign: 'center' }}>{this.state.user.daysSinceStart}</Text>
              <Text style={{ fontSize: 16, color: '#0648aa', marginBottom: 20, textAlign: 'center' }}>days smoke free</Text>
            </View>
          <View style={styles.innerRow}>
          <Image style={styles.img} source={require('../imgs/pill.png')}/>
            <Text style={{ fontSize: 16, color: '#0648aa', flex: 1, textAlign: 'right' }}>6 pills/day</Text>
          </View>
          <Divider style={styles.rowDivider}></Divider>
          <View style={styles.innerRow}>
            <Image style={styles.img} source={require('../imgs/clock.png')}/>
            <Text style={{ fontSize: 16, color: '#0648aa', flex: 1, textAlign: 'right' }}>2 hours</Text>
          </View>
          <View style={styles.lastRow}>
            <Text style={{ fontSize: 16, color: '#0648aa', flex: 1, marginRight: 15, textAlign: 'right' }}>
            {this.state.pills}/6
            </Text>
            <PillsButton increasePills={this._incrementPills}/>
          </View>
          </View>
        </View>
    );
  }
}
const styles = StyleSheet.create({
  backgroundImage: {
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    resizeMode: 'contain',
  },
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },

  headerContainer: {
    flexDirection: 'column',
    width: '100%',
    height: '60%',
    justifyContent: 'flex-start',
    backgroundColor: '#0187e6',
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },

  headerText: {
    color: '#fff',
    fontSize: 18,
    paddingLeft: 15,
    paddingRight: 15,
    textAlign: 'center',
  },

  containerInner: {
    flexDirection: 'column',
    width: '90%',
    height: '55%',
    padding: 25,
    marginTop: 5,
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    borderRadius: 50,
    shadowColor: '#000000',
    shadowOffset: {
        width: 0,
        height: 3,
      },
    shadowRadius: 5,
    shadowOpacity: 1.0,
  },

  logo: {
    width: 150,
    height: 100,
    marginTop: -30,
    resizeMode: 'contain',
  },

  img: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
  },

  innerRow: {
    flex: 1,
    width: '100%',
    height: 50,
    flexDirection: 'row',
    paddingLeft: 5,
    paddingRight: 5,
    marginBottom: 10,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  lastRow: {
    flex: 1,
    width: '100%',
    height: 60,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  headerColumn: {
    flex: 1,
    width: '100%',
    height: 90,
    flexDirection: 'column',
    paddingLeft: 5,
    paddingRight: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },

  rowDivider: {
    width: '100%',
    marginTop: 5,
    marginBottom: 5,
    borderColor: '#0648aa',
    borderWidth: 1,
  },
});
