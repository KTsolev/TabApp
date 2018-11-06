import React, { Component } from 'react';
import PillsButton from './PillsButton';
import { View, Text, Image, ImageBackground, StyleSheet } from 'react-native';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { Divider } from 'react-native-elements';

export default class CalendarTr extends Component{
  render() {
    return (
        <View style={styles.headerContainer}>
          <Image style={styles.logo} source={require('../imgs/tracking.png')}/>
          <Calendar
              style={{
                borderWidth: 1,
                borderColor: '#fff',
                marginTop: -30,
                height: 330,
                width: 350,
              }}
              markedDates={
                 {
                  '2018-11-01': { startingDay: true, selected: true, marked: true, color: '#57c279' },
                  '2018-11-02': { selected: true, marked: true, color: '#57c279' },
                  '2018-11-03': { selected: true, marked: true, color: '#57c279' },
                  '2018-11-04': { selected: true, marked: true, color: '#57c279' },
                  '2018-11-05': { selected: true, marked: true, color: '#57c279' },
                  '2018-11-06': { selected: true, marked: true, color: '#57c279' },
                  '2018-11-07': { selected: true, marked: true, color: '#57c279' },
                  '2018-11-08': { endingDay: true, selected: true, marked: true, color: '#57c279' },
                 }}
               // Date marking style [simple/period/multi-dot/custom]. Default = 'simple'
               markingType={'period'}
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
              <Text style={{ fontSize: 18, color: '#0648aa', textAlign: 'center' }}>25</Text>
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
            <Text style={{ fontSize: 16, color: '#0648aa', flex: 1, marginRight: 15, textAlign: 'right' }}>1/6</Text>
            <PillsButton increasePills={this.incrementPills}/>
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
    marginTop: 15,
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
