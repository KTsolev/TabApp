import React, { Component } from 'react';
import PercentageCircle from 'react-native-percentage-circle';
import LinearGradient from 'react-native-linear-gradient';
import Orientation from 'react-native-orientation';
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  Platform,
  Linking,
  LinkingIOS,
  Dimensions } from 'react-native';
import styles from './styles';

export default class Tips extends Component{
  constructor(props) {
    super(props);
    this.state = {
      isLandScape: false,
      currentTip: '',
      tips: [
    `1.The human body is an astonishing system that is capable of self-regulation and healing, so start now, as once you quit smoking - only in a week your taste and smell will improve, you will no longer need too much flavor to get satiated, you will only have three months to improve your lung function, only after 5 days most of the nicotine will be thrown out of your body.`,
    `2.Start the day with a glass of water with a few drops of lemon and a spoon of honey. This harmless habit brings you much more health and youth than you suspect. It purifies and "awakes" the body, strengthens metabolism, helps you go to the toilet more easily, loads you with vitamins and good mood.`,
    `3.Get in your sleep. Six, seven, eight, nine hours sleep ... Find your golden mean and keep up to it every night. Everyone goes through periods of tumultuous nights and systematic sleeplessness, but the fewer of them, the better for health.`,
    `4.If you have had unsuccessful attempts to stop smoking so far, you have probably not been confident enough, or you have been half-devoted to the idea. If your decision is serious this time, it's time to open the calendar and choose a date. When that day comes, remind yourself why you've given up smoking at all.`,
    `5.The first week is the biggest test. Especially the first 2-3 days to overcome nicotine dependence. Find a nice activity to relax you.`,
    `6.The second week is known as "the risky week" - still difficult, but not as much as it did at the beginning. Subsequently, the process of quitting cigarettes becomes sailing in quiet waters, and your confidence increases.`,
    `7.When the critical moment comes, your brain must work logically. Explain to yourself why you actually refuse cigarettes. Do you do it for your children? Because of a loved one? In the name of your health? Due to financial reasons?`,
    `8.The younger you stop the harmful habit, the more years you can add to your life, experts say. Studies show that if we stop smoking at the age of 40 we will extend our life by 9 years. If we do it in 50 years, we will live six years longer.`,
    `9.Consciousness will tell you that a cigarette will not hurt. Do not succumb! It is this logic that will hinder you the most. The reason? A cigarette follows second, third, fifth, and finally, as you feel, you become a smoker again. There is no point in deceiving yourself!`,
    `10.Eliminate other harmful habits. Against one negative place another positive one. Are you enjoying a cigarette first? This is a common habit for smokers. Prepare a healthy breakfast and avoid the morning headache caused by tobacco smoke. Do you reach cigarettes in a situation of stress and tension - find a substitute.`,
    `11.Sports must be present in your nicotine withdrawal plan. It could significantly reduce the risk of reaching out to cigarettes again. Raise your physical activity from the very first day of your mission.`,
    `11.1Make gifts - often and with pleasure. At first, reward yourself almost every day that will remind you and stimulate you to move forward without cigarettes. Buy your favorite things and use every moment of enjoyment.`,
    `12.In fact, any cigarette that you do NOT smoke helps, not the opposite. Most smokers believe that cigarettes have harmed so much to their body that there is no going back.`,
    `13.Nicotine is the fastest drug addiction known to mankind. It works so fast that 30 minutes after you have extinguished the cigarette, its content has dropped by half, and there comes the constant need of addicted smokers to light a cigarette.`,
    `14.If you associate the coffee with the cigarette, replace it with something else - say green tea. Instead of smoking during your breaks in the office, simply stroll in the fresh air, it will reveal many new and unsuspecting adventures that were just around you.`,
    `15.Drink plenty of water and fresh juices to help you get rid of the accumulated toxins in your body.`,
    `16.People most often resort to cigarettes as a vent for stressful situations. Think of several alternatives before stopping smoking. Sign up for a new sport, invent a hobby, start meditating, listen to relaxing music.`,
    `17.Once you have smoked your last cigarette, clear your home and your car. Apart from the fact that the environment you inhabit will become more welcoming and enjoyable, it will also have symbolic significance.`,
    `18.If you smoke a pack of cigarettes a day, which costs about $ 5 a month, you will save 450 leva in three months, and for six - 900! Think what you can give for this money, that will certainly be an additional incentive.`,
    `19.Experts say drinking sips of cold water, for example, can help in replacing the act of pulling from the cigarette.`,
    `20.Consumption of small meals also helps against the need for smoking. Choose complete and healthy foods to avoid any weight gain.`,
    `21.Rejecting is easier if you do it with someone who has the same problem and understands you completely. If this is not possible, just share with family, friends and colleagues that you are trying to quit smoking. They can support you when you need it most.`,`22.Drinking alcohol most often arouses the desire to smoke. When you stop smoking, try not to drink alcohol for a while. This applies to such exciters that awaken in you the desire to smoke: coffee, parties, stress at work, etc. It is really much easier to stop smoking if you avoid these situations when you really smoke a lot.`,
    `23.One of the biggest problems for people trying to quit smoking is negative thinking. When you feel the crisis comes, focus on the positive things: you will live much healthier, your hands, your mouth and your clothes will not smell of tobacco, and your life will be much more free without cigarettes.`,
    `24.Visiting a dentist at least twice a year saves you a lot of complications, problems and resources. Beautiful and well-maintained teeth are not only a sign of beauty but also of health.`,
    `25.Sport is health. There is no doubt about this and everybody is convinced how well he feels after a workout. If you want to prolong your life, hold on to your youth longer and improve your immune system, you must exercise regularly. Even if you do not have a favorite sport, do the gymnastics at home, emphasizing the movement of the joints and moderate tightening of the muscles.`,
      ],
    };

    this._orientationDidChange = this._orientationDidChange.bind(this);
  }

  _randomTipGenerator() {
    let index = Math.floor(Math.random() * (this.state.tips.length - 1));
    return this.state.tips[index];
  }

  _orientationDidChange(orientation) {
    this.setState({ isLandScape: orientation === 'LANDSCAPE' });
  }

  componentWillMount() {
    const initial = Orientation.getInitialOrientation();
    this.setState({ isLandScape: initial === 'LANDSCAPE' });
    Orientation.addOrientationListener(this._orientationDidChange);
  }

  componentWillUnmount() {
    Orientation.removeOrientationListener(this._orientationDidChange);
  }

  componentDidMount() {
    this.setState({ currentTip: this._randomTipGenerator() });
  }

  render() {
    if (this.state.isLandScape) {
      return (
          <ImageBackground
            style={[styles.backgroundImage, { flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', padding: 50 }]}
            source={require('../../imgs/backgroud12.png')}>
            <View styles={{ flex: 1, width: '50%', justifyContent: 'center', alignContent: 'center' }}>
              <TouchableOpacity
                style={styles.logoHollder}
                onPress={() => Platform === 'ios' ? LinkingIOS.openURL('https://www.tabex.bg/links/TABEX_LEAFLET_ss3360.pdf') : Linking.openURL('https://www.tabex.bg/links/TABEX_LEAFLET_ss3360.pdf')}>
                <Image
                  style={[styles.logo, {justifyContent: 'center', alignSelf: 'center'}]}
                  source={require('../../imgs/trackingi.png')} />
              </TouchableOpacity>

              <Image
                style={[styles.bottomLogo, { maxHeight: '50%' }]}
                resizeMode='contain'
                source={require('../../imgs/tabex-logo.png')}/>
            </View>
            <View styles={{ flex: 1, width: '50%', padding: 50, justifyContent: 'center', alignContent: 'center' }}>
              <View style={[styles.containerInner, { maxWidth: '70%', maxHeight: '50%', padding: 10,  alignSelf: 'center' }]}>
                <Text style={{ fontSize: 10, color: '#0648aa', textAlign: 'center' }}>
                  {this.state.currentTip}
                </Text>
                <Image
                  style={styles.speechTail}
                  resizeMode='contain'
                  source={require('../../imgs/speech-tail.png')} />
              </View>
              <Image
                style={[styles.characteLogo, { alignSelf: 'center' }]}
                resizeMode='contain'
                source={require('../../imgs/character.png')}/>
            </View>
          </ImageBackground>
        );
    } else {
      return (
          <ImageBackground
            style={styles.backgroundImage}
            source={require('../../imgs/backgroud12.png')}>
            <TouchableOpacity
              style={styles.logoHollder}
              onPress={() => Platform === 'ios' ? LinkingIOS.openURL('https://www.tabex.bg/links/TABEX_LEAFLET_ss3360.pdf') : Linking.openURL('https://www.tabex.bg/links/TABEX_LEAFLET_ss3360.pdf')}>
              <Image
                style={[styles.logo, {justifyContent: 'center', alignSelf: 'center'}]}
                source={require('../../imgs/trackingi.png')} />
            </TouchableOpacity>
              <View style={styles.containerInner}>
                <Text style={{ fontSize: 14, color: '#0648aa', textAlign: 'center' }}>
                  {this.state.currentTip}
                </Text>
                <Image
                  style={styles.speechTail}
                  resizeMode='contain'
                  source={require('../../imgs/speech-tail.png')} />
              </View>
              <Image
                style={styles.characteLogo}
                resizeMode='contain'
                source={require('../../imgs/character.png')}/>
              <Image
                style={styles.bottomLogo}
                resizeMode='contain'
                source={require('../../imgs/tabex-logo.png')}/>
          </ImageBackground>
        );
    }
  }
}
