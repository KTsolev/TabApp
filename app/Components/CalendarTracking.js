import React, { Component } from 'react';
import PillsButton from './PillsButton';
import { View, Text, Image, ImageBackground, StyleSheet, ScrollView } from 'react-native';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { Divider } from 'react-native-elements';
import { addNewUserProps, saveUser, loadUser } from '../data/FluxActions';
import moment from 'moment';
import UserStore from '../data/UserStore';
import PillStore from '../data/PillStore';

export default class CalendarTr extends Component{
  constructor(props) {
    super(props);
    this._getUserData = this._getUserData.bind(this);
    this._increasePills = this._increasePills.bind(this);
    this._getSelectedRange = this._getSelectedRange.bind(this);
    this._dozeHandler = this._dozeHandler.bind(this);

    const user = UserStore.getUser();
    let pills = PillStore.getPills();
    const daysSinceStart = moment().diff(moment(user.startingDate), 'days');
    const pillsTaken = user.pillsTaken ? Number(user.pillsTaken) : 1;
    let dates =  this._getSelectedRange(moment().format(), '#57c279', user.endingDate);

    this.state = {
      pills: Number(user.pills) || pills.count,
      daysSinceStart,
      pillsTaken,
      disabled: user.disabled && user.lastPillTaken ? moment(user.lastPillTaken).isBefore(moment(), 'day') ? false : true : false,
      lastPillTaken: user.lastPillTaken,
      dates,
    };
  }

  _increasePills() {
    if (!this.state.disabled) {
      let pills = PillStore.getPills();
      let sum = this.state.pillsTaken + 1;
      console.log(sum)

      this.setState({
        pills: pills.count,
        pillsTaken: sum,
        lastPillTaken: pills.lastPillTaken,
      });
    }
  }

  _dozeHandler() {
    this.setState({ disabled: true });
    const user = UserStore.getUser();
    let sum = Number(user.pillsTaken) + this.state.pills;
    console.log(sum)
    addNewUserProps({
      pillsTaken: sum,
      lastPillTaken: this.state.lastPillTaken,
      disabled: true, });
    setTimeout(() => saveUser(UserStore.getUser()), 1000);
  }

  _getSelectedRange(startDate, color, endingDate) {
    let minDate = moment(startDate);
    let maxDate = endingDate ? moment(endingDate) : moment();
    let range  = [];
    while (minDate.isSameOrBefore(maxDate)) {
      range.push({
          date: minDate.format('YYYY-MM-DD'),
          startingDay: true,
          selected: true,
          marked: true,
        });
      minDate.add(1, 'day');
    }

    const objectArray = range.reduce((obj, item) => {
            obj[item.date] = item;
            return obj;
          }, {});

    return objectArray;
  }

  _getUserData() {
    const jsonUser = UserStore.getUser();
    console.log(moment().format())
    const datesObjects = this._getSelectedRange(moment().format(), '#57c279', jsonUser.endingDate);
    this.setState({
      dates: datesObjects,
    });
  }

  componentDidMount() {
    UserStore.on('user-updated', this._getUserData);
    UserStore.on('user-created', this._getUserData);
    PillStore.on('pills-increased', this._increasePills);
    UserStore.on('user-saved', () => loadUser());
    PillStore.on('day-doze-reached', this._dozeHandler);
  }

  componentWillUnmount() {
    UserStore.removeListener('user-updated', this._getUserData);
    UserStore.removeListener('user-created', this._getUserData);
    PillStore.removeListener('pills-increased', this._increasePills);
    UserStore.removeListener('user-saved', () => loadUser());
    PillStore.removeListener('day-doze-reached', this._dozeHandler);
  }

  render() {
    console.log(this.state)
    return (
        <ScrollView >
          <ImageBackground
            source={require('../imgs/rectangle.png')}
            style={styles.backgroundImage}>
            <Image style={styles.logo} source={require('../imgs/trackingi.png')}/>
            <Calendar
                style={styles.calendar}
                startFromMonday={true}
                allowRangeSelection={true}
                markedDates={this.state.dates ? this.state.dates : {}}
                theme={{
                  arrowColor: 'white',
                  monthTextColor: 'white',
                  calendarBackground: '#0187e6',
                  textSectionTitleColor: '#fff',
                  selectedDayBackgroundColor: '#57c279',
                  selectedDayTextColor: '#ffffff',
                  todayTextColor: '#fff',
                  dayTextColor: '#fff',
                  textDisabledColor: '#d9e1e8',
                  dotColor: '#2d4150',
                  selectedDotColor: '#57c279',
                  arrowColor: 'white',
                  monthTextColor: 'white',
                  textDayFontFamily: 'monospace',
                  textMonthFontFamily: 'monospace',
                  textDayHeaderFontFamily: 'monospace',
                  textDayFontSize: 14,
                  textMonthFontSize: 14,
                  textDayHeaderFontSize: 14,
                }}
              />
            </ImageBackground>
            <View style={styles.container}>
              <View style={styles.containerInner}>
                <View style={styles.headerColumn}>
                  <Text style={{ fontSize: 16, color: '#0648aa', flex: 1, textAlign: 'center' }}>{this.state.daysSinceStart}</Text>
                  <Text style={{ fontSize: 16, color: '#0648aa', flex: 1, textAlign: 'center' }}>days smoke free</Text>
                </View>
                <View style={styles.innerRow}>
                  <Image style={styles.img} source={require('../imgs/pill.png')}/>
                  <Text style={{ fontSize: 14, color: '#0648aa', paddingLeft: 30 }}>6 pills/day</Text>
                </View>
                <Divider style={styles.divider}/>
                <View style={styles.innerRow}>
                  <Image style={styles.img} source={require('../imgs/clock.png')}/>
                  <Text style={{ fontSize: 14, color: '#0648aa', paddingLeft: 30 }}>2 hours</Text>
                </View>
                <View style={styles.lastRow}>
                  <Text style={{ fontSize: 14, color: '#0648aa', flex: 1, marginRight: 15, textAlign: 'right' }}>
                    {this.state.pills}/6
                  </Text>
                  <PillsButton disabled={this.state.disabled} />
                </View>
              </View>
            </View>
        </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 2,
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
  },

  calendar: {
    flex: 1,
    maxWidth: '100%',
    padding: 10,
    marginBottom: 70,
    alignSelf: 'stretch',
  },

  divider: {
    width: '70%',
    height: 1,
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: '#959595',
  },

  backgroundImage: {
    flex: 2,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    resizeMode: 'contain',
  },

  headerText: {
    color: '#fff',
    fontSize: 18,
    paddingLeft: 15,
    paddingRight: 15,
    textAlign: 'center',
  },

  containerInner: {
    flex: 1,
    width: '80%',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 15,
    margin: 15,
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#f1f1f1',
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: { width: 15, height: 15 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 5,
    shadowOpacity: 1.0,
  },

  logo: {
    width: 150,
    height: '10%',
    marginTop: 30,
    marginBottom: 10,
    resizeMode: 'contain',
  },

  img: {
    width: 30,
    height: 30,
    alignSelf: 'flex-end',
    resizeMode: 'contain',
  },

  innerRow: {
    flex: 1,
    flexDirection: 'row',
    padding: 5,
    margin: 5,
    maxWidth: '100%',
    maxHeight: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },

  lastRow: {
    flex: 1,
    marginTop: 10,
    marginRight: 20,
    maxHeight: 90,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  headerColumn: {
    flex: 1,
    maxWidth: '100%',
    maxHeight: 70,
    flexDirection: 'column',
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 10,
    paddingTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
