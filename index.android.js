/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
   AppRegistry,
   Dimensions,
   ProgressBarAndroid,
   StyleSheet,
   View
} from 'react-native';
import {
   Tabs, Tab, Icon
} from 'react-native-elements';
import Today from './app/Today';
import Routines from './app/Routines';
import firebase from 'firebase';

// Initialize Firebase
const config = {
   apiKey: "AIzaSyDpARKylspEmH6yi8vJePuiwRVre0nKOb4",
   authDomain: "doozy-31df5.firebaseapp.com",
   databaseURL: "https://doozy-31df5.firebaseio.com",
   storageBucket: "doozy-31df5.appspot.com",
   messagingSenderId: "694975571209"
};
firebase.initializeApp(config);

export default class doozy extends Component {
   constructor (props) {
      super(props);
      // Get initial device dimensions (orientation changes handled by View.onLayout)
      var dimensions = Dimensions.get('window');

      // Get data
      this.focusesRef = firebase.database().ref('data/focuses');
      this.programsRef = firebase.database().ref('data/programs');
      this.targetsRef = firebase.database().ref('data/targets');
      this.userRef = firebase.database().ref('data/users/geoffreyfloyd');
      this.todayRef = firebase.database().ref('data/users/geoffreyfloyd/logs/' + (new Date).toISOString().slice(0, 10));

      this.state = {
         selectedTab: 'today',
         styles: getStyles(themes.lightTheme),
         theme: themes.lightTheme,
         dimensions
      };
   }

   componentDidMount () {
      this.listenForObjectMapData('focuses', this.focusesRef);
      this.listenForObjectMapData('programs', this.programsRef);
      this.listenForObjectMapData('targets', this.targetsRef);
      this.listenForObjectMapData('user', this.userRef);
      this.listenForObjectMapData('today', this.todayRef);
   }

   listenForArrayData (key, ref) {
      ref.on('value', (snap) => {
         // Get children as an array
         var items = [];
         snap.forEach((child) => {
            var childObj = child.val();
            childObj.id = child.key;
            items.push(childObj);
            // items.push({
            //     id: child.key,
            //     ...childObj,
            // });
         });

         // Update state
         var newState = {};
         newState[key] = items;
         this.setState(newState);
      });
   }

   listenForObjectMapData (key, ref) {
      ref.on('value', (snap) => {
         // Get value as an object
         var obj = snap.val();

         // Update state
         var newState = {};
         newState[key] = obj;
         this.setState(newState);
      });
   }

   changeTab (selectedTab) {
      this.setState({ selectedTab });
   }

   render () {
      var { dimensions, focuses, programs, selectedTab, styles, targets, theme, today, user } = this.state;
      var isTabToday = selectedTab === 'today';
      var renderTodayIcon = () => <Icon name="whatshot" size={26}/>;
      var isTabRoutines = selectedTab === 'routines';
      var renderRoutinesIcon = () => <Icon name="subscriptions" size={26}/>; // playlist-play

      if (!focuses || !targets || !programs || !user) {
         return this.renderLoadingIndicator();
      }

      return (
         <View style={styles.container} onLayout={event => this.setState({ dimensions: event.nativeEvent.layout })}>
            <Tabs
               tabBarStyle={styles.tabBar}
            >
               <Tab
                  onPress={() => this.changeTab('today')}
                  renderIcon={renderTodayIcon}
                  renderSelectedIcon={renderTodayIcon}
                  selected={isTabToday}
                  title={isTabToday ? 'TODAY' : null}
               >
                  <Today
                     style={styles.content}
                     theme={theme}
                     todayRef={this.todayRef}
                     today={today}
                     dimensions={dimensions}
                     focuses={focuses}
                     programs={programs}
                     targets={targets}
                     user={user}
                  />
               </Tab>
               <Tab
                  onPress={() => this.changeTab('routines')}
                  renderIcon={renderRoutinesIcon}
                  renderSelectedIcon={renderRoutinesIcon}
                  selected={isTabRoutines}
                  title={isTabRoutines ? 'ROUTINES' : null}
               >
                  <Routines
                     style={styles.content}
                     theme={theme}
                     todayRef={this.todayRef}
                     today={today}
                     dimensions={dimensions}
                     focuses={focuses}
                     programs={programs}
                     targets={targets}
                     user={user}
                  />
               </Tab>               
            </Tabs>
         </View>
      );
   }

   renderLoadingIndicator () {
      var { styles } = this.state;
      return (
         <View style={styles.loadingContainer}>
            <ProgressBarAndroid styleAttr="Large" />
         </View>
      );
   }
}

const themes = {
   darkTheme: {
      bgColor: '#231f1f',  
      bgColorHigh: '#111', // Greater magnitude of contrast
      bgColorLow: '#444', // Lesser magnitude of contrast
      foreColor: '#E0E0E0',
      foreColorHigh: '#FFF', // Greater magnitude of contrast
      foreColorLow: '#BBB', // Lesser magnitude of contrast
   },
   lightTheme: {
      bgColor: '#E0E0E0',
      bgColorHigh: '#FFF', // Greater magnitude of contrast
      bgColorLow: '#BBB', // Lesser magnitude of contrast
      foreColor: '#231f1f',
      foreColorHigh: '#111', // Greater magnitude of contrast
      foreColorLow: '#999', // Lesser magnitude of contrast
   }
};

const noBackground = 'transparent';
const getStyles = function (theme) {
   return StyleSheet.create({
      container: {
         flex: 1,
         backgroundColor: theme.bgColor,
      },
      content: {
         flex: 1,
      },
      loadingContainer: {
         flex: 1,
         justifyContent: 'center',
         backgroundColor: theme.bgColor,
      },
      tabBar: {
         marginLeft: 0,
         backgroundColor: theme.bgColorLow,
      },
   });
};

AppRegistry.registerComponent('doozy', () => doozy);
