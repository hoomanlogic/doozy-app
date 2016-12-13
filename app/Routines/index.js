// @flow
import React, { Component } from 'react';
import {
    ScrollView,
    StyleSheet,
    View
} from 'react-native';
import {
   Icon,
   List,
   ListItem   
} from 'react-native-elements';

class Routines extends Component {
   constructor (props) {
      super(props);
      this.state = {
         styles: getStyles(props.theme),
      };
   }

   /***************************************************************
    * CALCULATIONS
    **************************************************************/
   pressRow (row:Object) {
      console.log(row);
   }

   /***************************************************************
    * RENDERING
    **************************************************************/
   render () {
      var { style, theme } = this.props;
      var { styles } = this.state;

      return (
         <View style={style}>
            <ScrollView keyboardShouldPersistTaps>
               <List containerStyle={styles.list}>
                  {
                     list.map((row, i) => (
                        <ListItem
                           avatar={{ uri: row.avatar_url }}
                           containerStyle={styles.listItem}
                           titleStyle={styles.listItemTitle}
                           key={i}
                           onPress={() => this.pressRow(row)}
                           roundAvatar
                           title={row.name}
                           underlayColor={styles.icon}
                           avatarStyle={styles.icon}
                        />
                     ))
                  }
               </List>
            </ScrollView>
            <View style={styles.actionButton}>
               <Icon
                  raised
                  reverse
                  name="add"
                  reverseColor={theme.foreColor}
                  containerStyle={styles.actionIcon}
               />
            </View>
         </View>
      );
   }
}

var list = [
   {
      name: 'Morning Routine',
      avatar_url: 'http://pngimg.com/upload/sun_PNG13449.png'
   },
   {
      name: 'Shoulder Rehab',
      avatar_url: 'http://www.clipartkid.com/images/380/bright-sun-weather-weather-icons-weather-icons-set-2-bright-sun-png-OiPm5A-clipart.png'
   },
   {
      name: 'Guitar Warmup',
      avatar_url: 'http://www.clipartkid.com/images/380/bright-sun-weather-weather-icons-weather-icons-set-2-bright-sun-png-OiPm5A-clipart.png'
   },
   {
      name: 'Workout Wednesday',
      avatar_url: 'http://www.clipartkid.com/images/380/bright-sun-weather-weather-icons-weather-icons-set-2-bright-sun-png-OiPm5A-clipart.png'
   },
   {
      name: 'Morning Routine',
      avatar_url: 'http://www.clipartkid.com/images/380/bright-sun-weather-weather-icons-weather-icons-set-2-bright-sun-png-OiPm5A-clipart.png'
   },
   {
      name: 'Shoulder Rehab',
      avatar_url: 'http://www.clipartkid.com/images/380/bright-sun-weather-weather-icons-weather-icons-set-2-bright-sun-png-OiPm5A-clipart.png'
   },
   {
      name: 'Guitar Warmup',
      avatar_url: 'http://www.clipartkid.com/images/380/bright-sun-weather-weather-icons-weather-icons-set-2-bright-sun-png-OiPm5A-clipart.png'
   },
   {
      name: 'Workout Wednesday',
      avatar_url: 'http://www.clipartkid.com/images/380/bright-sun-weather-weather-icons-weather-icons-set-2-bright-sun-png-OiPm5A-clipart.png'
   },
   {
      name: 'Morning Routine',
      avatar_url: 'http://www.clipartkid.com/images/380/bright-sun-weather-weather-icons-weather-icons-set-2-bright-sun-png-OiPm5A-clipart.png'
   },
   {
      name: 'Shoulder Rehab',
      avatar_url: 'http://www.clipartkid.com/images/380/bright-sun-weather-weather-icons-weather-icons-set-2-bright-sun-png-OiPm5A-clipart.png'
   },
   {
      name: 'Guitar Warmup',
      avatar_url: 'http://www.clipartkid.com/images/380/bright-sun-weather-weather-icons-weather-icons-set-2-bright-sun-png-OiPm5A-clipart.png'
   },
   {
      name: 'Workout Wednesday',
      avatar_url: 'http://www.clipartkid.com/images/380/bright-sun-weather-weather-icons-weather-icons-set-2-bright-sun-png-OiPm5A-clipart.png'
   }
];

/***************************************************************
 * STYLING
 **************************************************************/
const noBackground = 'transparent';
const getStyles = function (theme) {
   return StyleSheet.create({
      list: {
         backgroundColor: noBackground,
         marginLeft: 0,
         marginTop: 0,
         marginBottom: 70,
      },
      listItem: {
         backgroundColor: noBackground,
         marginTop: 0,
         borderBottomWidth: 1,
         borderBottomColor: theme.bgColorLow,
      },
      listItemTitle: {
         color: theme.foreColor,
      },
      actionButton: {
         width: 60,
         height: 60,
         position: 'absolute',
         bottom: 10,
         right: 40
      },
      actionIcon: {
         backgroundColor: theme.bgColorHigh,
         color: theme.foreColor,
      },
      icon: {
         backgroundColor: noBackground,
      },
      row: {
         flex: 1,
         flexDirection: 'row',
         padding: 8,
      },
   });
};

export default Routines;
