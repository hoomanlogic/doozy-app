// @flow
import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Image,
    Text,
    TextInput,
    RecyclerViewBackedScrollView,
    Switch,
    TouchableWithoutFeedback,
    View,
    ListView
} from 'react-native';
import DurationInput from '../components/DurationInput';
import Indicator from '../components/Indicator';

// Resolve image sources for web or mobile
var imageSource = require('../../images/activity.png');

class Today extends Component {
   /***************************************************************
    * COMPONENT LIFECYCLE
    **************************************************************/
   constructor (props:Object) {
      super(props);

      this.renderRow = this.renderRow.bind(this);
      this.onLoggedChange = this.onLoggedChange.bind(this);
      this.onMeasurableValueChange = this.onMeasurableValueChange.bind(this);
      this.onNotesValueChange = this.onNotesValueChange.bind(this);

      this.state = {
         dataSource: this.getDataSource(props),
         styles: getStyles(props.theme),
      };
   }

   componentWillReceiveProps (nextProps:Object) {
      this.setState({
         dataSource: this.getDataSource(nextProps)
      });
   }

   /***************************************************************
    * CALCULATIONS
    **************************************************************/
   getDataSource (props:Object) {
      var agenda = [];
      var today = props.today || {};
      Object.keys(props.user.enrollment).forEach(programKey => {
         var enrollment = props.user.enrollment[programKey];
         var program = props.programs[programKey].levels[enrollment.level];
         program.targets.forEach(targetKey => {
            var target = props.targets[targetKey];
            var targetProgress = today[targetKey] || {};
            agenda.push({
               enrollment,
               program,
               target,
               targetKey,
               log: targetProgress.log || false,
               progress: targetProgress.progress || '',
               notes: targetProgress.notes || '',
            });
         });
      });

      var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
      return ds.cloneWithRows(agenda);
   }

   pressRow (row:Object) {
      console.log(row);
   }

   onMeasurableValueChange (rowData:Object, value:any) {
      this.props.todayRef.child(rowData.targetKey).set({
         log: true,
         progress: value
      });
   }

   onNotesValueChange (rowData:Object, value:any) {
      this.props.todayRef.child(rowData.targetKey).set({
         log: true,
         progress: rowData.target.measure === 'word-count' ? (value || '').split(' ').filter(word => word.length > 0).length : rowData.progress,
         notes: value,
      });
   }

   onLoggedChange (rowData:Object, value:any) {
      this.props.todayRef.child(rowData.targetKey).set({
         log: value,
         progress: value ? rowData.target.target : ''
      });
   }

   /***************************************************************
    * RENDERING
    **************************************************************/
   render () {
      var { dataSource } = this.state;

      if (Platform.OS === 'web') {
         return (
            <ListView
               style={this.props.style}
               dataSource={dataSource}
               renderRow={this.renderRow}
               renderSeparator={this.renderSeparator.bind(this)}
            />
         );
      }
      return (
         <ListView
            style={this.props.style}
            dataSource={dataSource}
            renderRow={this.renderRow}
            renderSeparator={this.renderSeparator.bind(this)}
            renderScrollComponent={props => <RecyclerViewBackedScrollView {...props} />}
         />
      );
   }

   renderRow (rowData:Object) {
      var { theme } = this.props;
      var { styles } = this.state;
      var logInput;
      switch (rowData.target.measure) {
         case 'duration':
            if (Platform.OS === 'web') {
               logInput = (
                  <View style={styles.thumbPanel}>
                     <DurationInput
                        radius={24}
                        value={rowData.log ? rowData.progress : rowData.target.target}
                        fillColor={rowData.log ? undefined : '#666'} 
                        onValueChange={this.onMeasurableValueChange.bind(null, rowData)}
                     />
                  </View>
               );
            }
            break;
         case 'word-count':
            logInput = (
                  <View style={styles.thumbPanel}>
                     <TextInput
                        radius={24}
                        value={rowData.notes} 
                        onChangeText={this.onNotesValueChange.bind(null, rowData)}
                     />
                  </View>
            );
      }

      return (
         <TouchableWithoutFeedback onPress={() => {
            this.pressRow(rowData);
         }}>
            <View style={rowData.log ? styles.row_logged : styles.row}>
               <View style={styles.thumbPanel}>
                  <Image style={styles.thumb} source={imageSource}/>
               </View>
               <View style={styles.stretchPanel}>
                  <Text style={styles.name}>{rowData.target.name}</Text>
               </View>
               <View style={styles.thumbPanel}>
                  <Indicator theme={theme} color={theme.foreColor} value={String(rowData.log ? rowData.progress : rowData.target.target)} kind="simple"/>
               </View>
               {logInput}
               <View style={styles.thumbPanel}>
                  <Switch
                     value={rowData.log}
                     onValueChange={this.onLoggedChange.bind(null, rowData)}
                  />
               </View>
            </View>
         </TouchableWithoutFeedback>
      );
   }

   renderSeparator (sectionId:number, rowId:number, adjacentRowHighlighted:bool) {
      var { styles } = this.state;
      return (
         <View
            key={`${sectionId}-${rowId}`}
            style={adjacentRowHighlighted ? styles.separatorAdjacent : styles.separator}
         />
      );
   }
}

/***************************************************************
 * STYLING
 **************************************************************/
function separatorStyle (theme, adjacentRowHighlighted) {
   return {
      height: adjacentRowHighlighted ? 4 : 1,
      backgroundColor: theme.bgColorLow,
   };
}

const getStyles = function (theme) {
   return StyleSheet.create({
      separator: separatorStyle(theme, false),
      separatorAdjacent: separatorStyle(theme, true),
      row: {
         flex: 1,
         flexDirection: 'row',
         padding: 8,
      },
      row_logged: {
         flex: 1,
         flexDirection: 'row',
         padding: 8,
         backgroundColor: theme.bgColorLow
      },
      name: {
         color: theme.foreColor,
         fontWeight: 'bold',
         textAlign: 'left',
         fontSize: 16,
         padding: 4,
      },
      thumb: {
         width: 24,
         height: 24,
      },
      thumbPanel: {
         padding: 4,
      },
      stretchPanel: {
         flex: 1,
         padding: 4,
      }    
   });
};

export default Today;
