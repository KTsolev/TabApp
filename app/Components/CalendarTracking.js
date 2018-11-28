import React, { Component } from 'react';
import PillsButton from './PillsButton';
import { View, Text, Image, ImageBackground, StyleSheet, ScrollView } from 'react-native';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { Divider } from 'react-native-elements';
import { addNewUserProps, saveUser, loadUser } from '../data/FluxActions';
import moment from 'moment';
import UserStore from '../data/UserStore';
import PillStore from '../data/PillStore';
import Orientation from 'react-native-orientation';

export default class CalendarTracking extends Component{
  constructor(props) {
    super(props);
    this._getUserData = this._getUserData.bind(this);
    this._increasePills = this._increasePills.bind(this);
    this._getSelectedRange = this._getSelectedRange.bind(this);
    this._dozeHandler = this._dozeHandler.bind(this);
    this._orientationDidChange = this._orientationDidChange.bind(this);

    const user = UserStore.getUser();
    let pills = PillStore.getPills();
    const daysSinceStart = moment().diff(moment(user.startingDate), 'days');
    const pillsTaken = user.pillsTaken ? Number(user.pillsTaken) : 1;
    let startDate = daysSinceStart < 0 ? user.startingDate : moment().format();
    let dates =  this._getSelectedRange(user.startingDate, user.endingDate);
    let disabled = user.disabled ? moment().diff(moment(user.lastPillTaken), 'days') > 0 ? false : true : false;

    this.state = {
      pills: Number(user.pills) || pills.count,
      daysSinceStart: daysSinceStart < 0 ? 0 : daysSinceStart,
      pillsTaken,
      isLandScape: false,
      disabled: daysSinceStart < 0 ? true : disabled,
      lastPillTaken: user.lastPillTaken,
      dates,
    };
  }

  _increasePills() {
    if (!this.state.disabled) {
      let pills = PillStore.getPills();
      let sum = this.state.pillsTaken + 1;

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
    addNewUserProps({
      pillsTaken: sum,
      lastPillTaken: this.state.lastPillTaken,
      disabled: true, });
    setTimeout(() => saveUser(UserStore.getUser()), 1000);
  }

  _getSelectedRange(startDate, endDate) {

    let minDate = moment(startDate);
    let maxDate = endDate ? moment(endDate) : moment();
    let range  = [];
    if (moment().isAfter(minDate, 'days')) {
      while (minDate.isSameOrBefore(maxDate)) {
          range.push({
            date: minDate.format('YYYY-MM-DD'),
            selected: true,
            marked: true,
            customStyles: {
              container: minDate.isSameOrBefore(moment(), 'days') ? {
                backgroundColor:  minDate.isSame(moment(), 'days') ? '#57c279' : '#2ca5af',
              } : {
                backgroundColor:  '#0187e6',
              },
              text: {
                color: 'white',
              },
            },
          });
        minDate.add(1, 'day');
      }
    }

    if (range.length === 0) {
      range.push({
          date: moment(startDate).format('YYYY-MM-DD'),
          selected: true,
          marked: true,
          customStyles: {
              container: {
                backgroundColor: '#0187e6',
                borderColor: '#57c279',
                borderWidth: 2,
              },
              text: {
                color: 'white',
              },
            },
        });

      range.push({
            date: moment(endDate).format('YYYY-MM-DD'),
            selected: true,
            marked: true,
            customStyles: {
                container: {
                  backgroundColor: '#0187e6',
                  borderColor: '#57c279',
                  borderWidth: 2,
                },
                text: {
                  color: 'white',
                },
              },
          });
    } else {
      range[0] = {
          date: moment(startDate).format('YYYY-MM-DD'),
          selected: true,
          marked: true,
          customStyles: {
              container: {
                backgroundColor: '#0187e6',
                borderColor: '#57c279',
                borderWidth: 2,
                elevation: 4,
              },
              text: {
                color: 'white',
              },
            },
        };

      range[range.length - 1] = {
            date: moment(endDate).format('YYYY-MM-DD'),
            selected: true,
            marked: true,
            customStyles: {
                container: {
                  backgroundColor: '#0187e6',
                  borderColor: '#57c279',
                  borderWidth: 2,
                  elevation: 4,
                },
                text: {
                  color: 'white',
                },
              },
          };
    }

    const objectArray = range.reduce((obj, item) => {
            obj[item.date] = item;
            return obj;
          }, {});

    return objectArray;
  }

  _getUserData() {
    const jsonUser = UserStore.getUser();
    const datesObjects = this._getSelectedRange(jsonUser.startingDate, jsonUser.endingDate);

    this.setState({
      dates: datesObjects,
    });
  }

  _orientationDidChange(orientation) {
    this.setState({ isLandScape: orientation === 'LANDSCAPE' });
  }

  componentDidMount() {
    UserStore.on('user-updated', this._getUserData);
    UserStore.on('user-created', this._getUserData);
    PillStore.on('pills-increased', this._increasePills);
    UserStore.on('user-saved', () => loadUser());
    PillStore.on('day-doze-reached', this._dozeHandler);
    Orientation.addOrientationListener(this._orientationDidChange);
  }

  componentWillUnmount() {
    UserStore.removeListener('user-updated', this._getUserData);
    UserStore.removeListener('user-created', this._getUserData);
    PillStore.removeListener('pills-increased', this._increasePills);
    UserStore.removeListener('user-saved', () => loadUser());
    PillStore.removeListener('day-doze-reached', this._dozeHandler);
    Orientation.removeOrientationListener(this._orientationDidChange);
  }

  render() {
    return (
        <ScrollView style={styles.container}>
          <ImageBackground
            source={require('../imgs/rectangle.png')}
            style={styles.backgroundImage}>
              <Image style={styles.logo} source={require('../imgs/trackingi.png')}/>
                <Calendar
                    style={styles.calendar}
                    startFromMonday={true}
                    allowRangeSelection={true}
                    markingType={'custom'}
                    markedDates={this.state.dates ? this.state.dates : {}}
                    theme={{
                      arrowColor: 'white',
                      monthTextColor: 'white',
                      calendarBackground: '#0187e6',
                      textSectionTitleColor: '#fff',
                      selectedDayTextColor: '#ffffff',
                      todayTextColor: '#fff',
                      dayTextColor: '#fff',
                      textDisabledColor: '#d9e1e8',
                      dotColor: '#2d4150',
                      arrowColor: 'white',
                      monthTextColor: 'white',
                      textDayFontFamily: 'monospace',
                      textMonthFontFamily: 'monospace',
                      textDayHeaderFontFamily: 'monospace',
                      textDayFontSize: 14,
                      textMonthFontSize: 14,
                      textDayHeaderFontSize: 14,
                      'stylesheet.calendar.main': {
                        week: {
                           marginTop: 3,
                           marginBottom: 3,
                           flexDirection: 'row',
                           justifyContent: 'space-around'
                         },
                      },
                      'stylesheet.calendar.header': {
                        monthText: {
                          fontSize: 14,
                          fontFamily: 'monospace',
                          fontWeight: 'normal',
                          color: '#fff',
                          margin: 2,
                        },
                        week: {
                          marginTop: 3,
                          flexDirection: 'row',
                          justifyContent: 'space-around',
                        },
                        dayHeader: {
                          marginTop: 2,
                          marginBottom: 2,
                          width: 32,
                          textAlign: 'center',
                          fontSize: 12,
                          fontFamily: 'monospace',
                          color: '#fff',
                        },
                      },
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
    flex: 1,
    flexDirection: 'column',
  },

  calendar: {
    flex: 1,
    width: '80%',
    height: '60%',
    marginBottom: 220,
    alignSelf: 'center',
  },

  divider: {
    width: '65%',
    height: 1,
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: '#959595',
  },

  backgroundImage: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    alignContent: 'center',
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
    width: '85%',
    height: '80%',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 20,
    margin: 15,
    marginTop: -120,
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
