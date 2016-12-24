// PACKAGES
import React, { Component } from 'react';
import {
   Dimensions,
   StyleSheet,
   View
} from 'react-native';
import firebase from 'firebase';
// COMPONENTS
import Organize from './flows/Organize';
// CONFIGS
import themes from './themes';
import firebaseConfig from '../firebase.config';

export default class doozy extends Component {
   /******************************************
    * COMPONENT LIFECYCLE
    *****************************************/
   constructor (props) {
      super(props);

      // Get initial device dimensions (orientation changes handled by View.onLayout)
      var dimensions = Dimensions.get('window');

      // Get data
      this.userRef = firebase.database().ref('data/users/geoffreyfloyd');

      // Get initial state
      this.state = {
         styles: getStyles(themes.darkTheme),
         theme: themes.darkTheme,
         dimensions
      };
   }

   /******************************************
    * RENDERING
    *****************************************/
   render () {
      var { dimensions, styles, theme } = this.state;
      return (
         <View style={styles.container} onLayout={event => this.setState({ dimensions: event.nativeEvent.layout })}>
            <Organize dimensions={dimensions} theme={theme} userRef={this.userRef}/>
         </View>
      );
   }
}

/******************************************
 * STYLES
 *****************************************/
const getStyles = function (theme) {
   return StyleSheet.create({
      container: {
         flex: 1,
         backgroundColor: theme.bgColor,
      },
   });
};

/******************************************
 * INITIALIZATION
 *****************************************/
// Initialize Database Connection
firebase.initializeApp(firebaseConfig);
