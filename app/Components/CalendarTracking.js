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

    const user = UserStore.getUser();
    let pills = PillStore.getPills();
    const daysSinceStart = moment().diff(moment(user.startingDate), 'days');
    const pillsTakenToday = user.pillsTakenToday ? user.pillsTakenToday : 1;
    let dates =  this._getSelectedRange(moment().format(), '#57c279', user.endingDate);
    console.log(dates)
    this.state = {
      pills: pills.count,
      daysSinceStart,
      pillsTakenToday,
      lastPillTaken: null,
      dates,
    };
  }

  _increasePills() {
    console.log('in method');
    let pills = PillStore.getPills();
    if (this.state.pills < 6) {
      let sum = this.state.pillsTakenToday + pills.count;
      this.setState({
        pills: pills.count,
        pillsTakenToday: sum,
        lastPillTaken: pills.lastPillTaken,
      });
    }
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
          customStyle: {
            container: {
              backgroundColor: color,
            },
          },
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
    this._getSelectedRange(jsonUser.startingDate);
    const datesObjects = this._getSelectedRange(jsonUser.startingDate);
    this.setState({
      dates: datesObjects,
    });
  }

  componentDidMount() {
    UserStore.on('user-updated', this._getUserData);
    PillStore.on('pills-increased', this._increasePills);
    UserStore.on('user-saved', () => loadUser());
  }

  componentWillUnmount() {
    UserStore.removeListener('user-updated', this._getUserData);
    PillStore.removeListener('pills-increased', this._increasePills);
    UserStore.removeListener('user-saved', () => loadUser());
  }

  render() {
    console.log(this.state)
    return (
        <ScrollView >
          <ImageBackground
            source={require('../imgs/rectangle.png')}
            style={styles.backgroundImage}>
            <Image style={styles.logo} source={require('../imgs/tracking.png')}/>
            <Calendar
                style={styles.calendar}
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
                  arrowColor: 'white',
                  monthTextColor: 'white',
                  textDayFontFamily: 'monospace',
                  textMonthFontFamily: 'monospace',
                  textDayHeaderFontFamily: 'monospace',
                  textMonthFontWeight: 'bold',
                  textDayFontSize: 16,
                  textMonthFontSize: 16,
                  textDayHeaderFontSize: 16,
                  marginTop: -50,
                }}
              />
            </ImageBackground>
            <View style={styles.containerInner}>
              <View style={styles.headerColumn}>
                <Text style={{ fontSize: 16, color: '#0648aa', flex: 1, textAlign: 'center' }}>{this.state.daysSinceStart}</Text>
                <Text style={{ fontSize: 16, color: '#0648aa', flex: 1, textAlign: 'center' }}>days smoke free</Text>
              </View>
              <View style={styles.innerRow}>
                <Image style={styles.img} source={require('../imgs/pill.png')}/>
                <Text style={{ fontSize: 14, color: '#0648aa', flex: 1, textAlign: 'right' }}>6 pills/day</Text>
              </View>
              <View style={styles.innerRow}>
                <Image style={styles.img} source={require('../imgs/clock.png')}/>
                <Text style={{ fontSize: 14, color: '#0648aa', flex: 1, textAlign: 'right' }}>2 hours</Text>
              </View>
              <View style={styles.lastRow}>
                <Text style={{ fontSize: 14, color: '#0648aa', flex: 1, marginRight: 15, textAlign: 'right' }}>
                  {this.state.pills}/6
                </Text>
                <PillsButton />
              </View>
            </View>
        </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  calendar: {
    flex: 1,
    maxHeight: 450,
    maxWidth: '90%',
    padding: 20,
    marginBottom: 70,
    alignSelf: 'center',
  },

  backgroundImage: {
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
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 15,
    margin: 15,
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
    flexDirection: 'row',
    padding: 5,
    margin: 5,
    maxWidth: '100%',
    maxHeight: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderColor: '#0648aa',
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
    maxHeight: 50,
    flexDirection: 'column',
    paddingLeft: 5,
    paddingRight: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
