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
import Loading from 'doozy/app/components/Loading';

class Routines extends Component {
   /******************************************
    * COMPONENT LIFECYCLE
    *****************************************/
   constructor (props) {
      super(props);
      this.state = {
         lists: null,
         styles: getStyles(props.theme),
      };
   }

   componentDidMount () {
      // Create lists object if it doesn't yet exist
      this.props.userRef.child('lists').transaction(currentValue => {
         if (currentValue === null) {
            return {
               active: {
                  'morning-routine': {
                     name: 'Morning Routine',
                     icon: 'http://pngimg.com/upload/sun_PNG13449.png',
                  }
               },
               archive: {},
            };
         }
      }, error => console.log(error));
      this.listenForArrayData('lists', this.props.userRef.child('lists/active'));
   }

   /***************************************************************
    * EVENT HANDLING
    **************************************************************/
   pressRow (row: Object) {
      console.log(row);
   }

   /******************************************
    * METHODS
    *****************************************/
   listenForArrayData (key, ref) {
      ref.on('value', (snap) => {
         // Get children as an array
         var items = [];
         snap.forEach((child) => {
            var childObj = child.val();
            childObj.id = child.key;
            items.push(childObj);
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

   /***************************************************************
    * RENDERING
    **************************************************************/
   render () {
      var { style, theme } = this.props;
      var { lists, styles } = this.state;

      if (!lists) {
         return <Loading theme={theme}/>;
      }

      return (
         <View style={style}>
            <ScrollView keyboardShouldPersistTaps>
               <List containerStyle={styles.list}>
                  {
                     lists.map((row, i) => (
                        <ListItem
                           avatar={{ uri: row.icon }}
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
