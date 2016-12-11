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
   ToolbarAndroid,
   View
} from 'react-native';
import Today from './app/Today';
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


   render () {
      var { dimensions, focuses, programs, targets, today, user } = this.state;

      if (!focuses || !targets || !programs || !user) {
         return this.renderLoadingIndicator();
      }

      return (
         <View style={styles.container} onLayout={event => this.setState({ dimensions: event.nativeEvent.layout })}>
            <ToolbarAndroid
               style={styles.toolbar}
               title={'Today'}
               />
            <Today style={styles.content} todayRef={this.todayRef} today={today} dimensions={dimensions} focuses={focuses} programs={programs} targets={targets} user={user} />
         </View>
      );
   }

   renderLoadingIndicator () {
      return (
         <View style={styles.loadingContainer}>
            <ProgressBarAndroid styleAttr="Large" />
         </View>
      );
   }
}
const contentBackground = '#231f1f'; // 231f1f
const toolbarBackground = '#999999'; // f6f5f5

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: contentBackground,
   },
   content: {
      flex: 1,
   },
   loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: contentBackground,
   },
   toolbar: {
      height: 56,
      backgroundColor: toolbarBackground
   }
});

AppRegistry.registerComponent('doozy', () => doozy);
