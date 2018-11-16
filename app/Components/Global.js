import React, { Component } from 'react';
import { View, Text, Image, ImageBackground, TouchableOpacity, StyleSheet } from 'react-native';
import PercentageCircle from 'react-native-percentage-circle';
import LinearGradient from 'react-native-linear-gradient';
import { addNewUserProps, saveUser, loadUser } from '../data/FluxActions';
import moment from 'moment';
import UserStore from '../data/UserStore';

export default class Global extends Component{
  constructor(props) {
    super(props);
    const jsonUser = UserStore.getUser();

    this.state = {
      peopleArroundGLobe: 135565 + moment().diff(moment(jsonUser.startingDate), 'days'),
    };
    this._getUserStartingDate = this._getUserStartingDate.bind(this);

  }

  _getUserStartingDate() {
    const jsonUser = UserStore.getUser();
    const dates = this._getSelectedRange(jsonUser.startingDate);
    this.setState({
      peopleArroundGLobe: this.state.peopleArroundGLobe + moment().diff(moment(jsonUser.startingDate), 'days'),
    });
  }

  componentDidMount() {
    UserStore.on('user-updated', this._getUserStartingDate);
    UserStore.on('user-saved', () => loadUser());
  }

  componentWillUnmount() {
    UserStore.removeListener('user-updated', this._getUserStartingDate);
    UserStore.removeListener('user-saved', () => loadUser());
  }

  render() {
    return (
      <ImageBackground
        style={styles.backgroundImage}
        source={require('../imgs/background.png')}>
        <Image
          style={styles.logo}
          resizeMode='contain'
          source={require('../imgs/tracking.png')}/>
        <Image
          style={styles.earthImg}
          resizeMode='contain'
          source={require('../imgs/Earth.png')}/>
          <View style={styles.containerInner}>
            <Text style={{ marginTop: 5, fontSize: 18, color: '#0648aa', textAlign: 'center' }}>
              {this.state.peopleArroundGLobe}
            </Text>
            <Text style={{ marginTop: 5, fontSize: 14, color: '#0648aa', textAlign: 'center' }}>
              people arround the world quit smoking today
            </Text>
            <View style={styles.innerRow}>
              <Image
                style={styles.img}
                resizeMode='contain'
                source={require('../imgs/pin.png')}/>
              <Text style={{ fontSize: 10, color: '#0648aa', flex: 1, textAlign: 'right' }}>
                {this.state.peopleArroundGLobe} people in 7 different countries and 2 continents quit smoking today.
              </Text>
            </View>
          </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  logo: {
    marginTop: 20,
    marginBottom: 20,
    maxWidth: 200,
    maxHeight: 250,
  },

  earthImg: {
    maxWidth: 350,
    maxHeight: 300,
    marginTop: 10,
    marginBottom: 10,
  },

  img: {
    width: 30,
    height: 28,
    padding: 5,
    marginLeft: -10,
  },

  containerInner: {
    flexDirection: 'column',
    flex: 2,
    maxWidth: '90%',
    maxHeight: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    padding: 35,
    marginBottom: 10,
    borderRadius: 50,
  },

  innerRow: {
    flexDirection: 'row',
    width: '80%',
    marginTop: 20,
  },
});
