import React, { Component } from 'react';
import {
   AppRegistry,
   StyleSheet,
} from 'react-native';
import {
   Tabs, Tab, Icon
} from 'react-native-elements';
import Routines from 'doozy/app/views/Routines';

class Organize extends Component {
   /******************************************
    * COMPONENT LIFECYCLE
    *****************************************/
   constructor (props) {
      super(props);
      // Get initial state
      this.state = {
         selectedTab: 'PLANS',
         styles: getStyles(props.theme),
      };
   }

   componentWillReceiveProps (nextProps) {
      if (nextProps.theme !== this.props.theme) {
         this.setState({
            styles: getStyles(nextProps.theme),
         });
      }
   }

   /******************************************
    * METHODS
    *****************************************/
   changeTab (selectedTab) {
      this.setState({ selectedTab });
   }

   /******************************************
    * RENDERING
    *****************************************/
   render () {
      var { dimensions, theme, userRef } = this.props;
      var { selectedTab, styles } = this.state;
      // var isTabToday = selectedTab === 'today';
      // var renderTodayIcon = () => <Icon name="whatshot" size={26}/>;
      var isPlans = selectedTab === 'PLANS';
      var renderPlansIcon = () => <Icon name="checkbox" type="foundation" size={26} />; // playlist-play

      return (
         <Tabs
            tabBarStyle={styles.tabBar}
            >
            <Tab
               onPress={() => this.changeTab('PLANS')}
               renderIcon={renderPlansIcon}
               renderSelectedIcon={renderPlansIcon}
               selected={isPlans}
               title={isPlans ? 'PLANS' : null}
               >
               <Routines
                  style={styles.content}
                  theme={theme}
                  userRef={userRef}
                  dimensions={dimensions}
                  />
            </Tab>
         </Tabs>
      );
   }
}

const getStyles = function (theme) {
   return StyleSheet.create({
      content: {
         flex: 1,
      },
      tabBar: {
         marginLeft: 0,
         backgroundColor: theme.bgColorLow,
      },
   });
};

export default Organize;
