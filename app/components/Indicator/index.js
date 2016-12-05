// @flow
import React, { Component } from 'react';
import {
   StyleSheet,
   Text,
   View,
} from 'react-native';

class Indicator extends Component {
   constructor (props) {
      super(props);
      this.state = this.calcState(props);
   }

   componentWillReceiveProps (nextProps) {
      if (nextProps.style !== this.props.style) {
         this.setState(this.calcState(nextProps));
      }
   }

   calcState (props) {
      return {
         styles: StyleSheet.create({
            text: {
               ...props.textStyle,
               color: '#e0e0e0',
               fontSize: 16,
               textAlign: 'center',
            },
            supportingText: {
               ...props.textStyle,
               color: '#ffffff',
               fontSize: 16,
               textAlign: 'center',
            },
            contentStyle: {
               height: 16,
               flex: 1,
               flexDirection: 'row',
               ...props.contentStyle
            },
            style: {
               ...props.style,
               maxWidth: 40,
            },
            top: {
               borderTopLeftRadius: 8,
               borderTopRightRadius: 8,
               backgroundColor: 'rgb(68, 68, 68)',
               marginBottom: 2,
               minHeight: 4,
            },
            bottom: {
               borderBottomLeftRadius: 8,
               borderBottomRightRadius: 8,
               backgroundColor: 'rgb(68, 68, 68)',
               marginTop: 2,
               minHeight: 4,
            }
         })
      };
   }
/*************************************************************
* RENDERING
*************************************************************/
   render () {
      var { change, compareValue, description, kind, title, value } = this.props;
      var { styles } = this.state;

      var content;

      var changeColor = 'rgb(68, 68, 68)';
      var changePrefix = '';
      var suffix = '';

      if (change > 0) {
         changeColor = 'hsl(120,90%,40%)';
      }
      else if (change < 0) {
         changeColor = 'hsl(0,90%,40%)';
      }

      if (kind === 'percent') {
         suffix = '%';
      }
      if (change > 0) {
         changePrefix = '+';
      }

      /**
       * Render content based on kind of indicator
         */
      if (kind === 'percent' || kind === 'simple') {
         content = (
            <View title={description} style={styles.contentStyle}>
               <Text style={styles.text}>{String(value) === 'NaN' ? '-' : value + suffix}</Text>
            </View>
         );
      }
      else if (kind === 'comparison') {
         content = (
            <View title={description} style={styles.contentStyle}>
               <View><Text style={styles.text}>{value + suffix}</Text></View>
               <View><Text style={styles.text}>/{compareValue + suffix}</Text></View>
            </View>
         );
      }

      return (
         <View {...this.props} style={styles.style}>
            <View style={styles.top}><Text style={styles.supportingText}>{title}</Text></View>
            {content}
            <View style={styles.bottom}><Text style={styles.supportingText}>{change ? (changePrefix + change + suffix) : ''}</Text></View>
         </View>
      );
   }
}

Indicator.propTypes = {
   value: React.PropTypes.any.isRequired,
   change: React.PropTypes.any,
};

Indicator.defaultProps = {
   width: 7 * 16,
   kind: 'simple',
   change: '',
};

Indicator.calcColor = function (percent) {
   if (typeof percent === 'undefined' || percent === '') {
      return null;
   }

   var multiplier = 120 / 100;
   var offBy = 100 - percent;

   var color = 'hsl(' + (120 - Math.round(offBy * multiplier)) + ',90%,40%)';

   return color;
};

Indicator.calcProgressProps = function (target, stats) {
   var progress = {
      kind: 'comparison',
      value: stats.periodActive.number,
      backgroundColor: 'white',
      compare: target.number,
      change: stats.periodActive.number > target.number ? stats.periodActive.number - target.number : 0
   };

   var diff = target.number - stats.periodActive.number;
   var expectedRate = target.number / stats.periodActive.daysInPeriod;
   if (diff <= 0) {
      Object.assign(progress, {
         kind: 'simple',
         backgroundColor: Indicator.calcColor(100),
         value: 'MET',
         compare: null,
      });
   }
   else if (Math.ceil(stats.periodActive.daysLeft * expectedRate) >= diff) {
      // do nothing
   }
   else {
      Object.assign(progress, {
         backgroundColor: Indicator.calcColor(Math.round((Math.ceil(stats.periodActive.daysLeft * expectedRate) / diff) * 100) - 50)
      });
   }

   return progress;
};

export default Indicator;
