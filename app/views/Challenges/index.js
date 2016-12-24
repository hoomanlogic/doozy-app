// @flow
import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Image,
    Text,
    RecyclerViewBackedScrollView,
    TouchableWithoutFeedback,
    View,
    ListView
} from 'react-native';

// Resolve image sources for web or mobile
var imageSource = require('../../images/activity.png');
// Don't need the following block when using url-loader and file-loader
// if (Platform.OS === 'web') {
//   imageSource = { uri: '/images/activity.png' };
// }
// else {
//   imageSource = require('../../images/doozy.png');
// }

class Challenges extends Component {
    /***************************************************************
     * COMPONENT LIFECYCLE
     **************************************************************/
    constructor (props) {
        super(props);

        this.state = {
            dataSource: this.getDataSource(props.focuses)
        };
    }

    componentWillReceiveProps (nextProps) {
        if (nextProps.focuses !== this.props.focuses) {
            this.setState({
                dataSource: this.getDataSource(nextProps.focuses)
            });
        }
    }

    /***************************************************************
     * CALCULATIONS
     **************************************************************/
    getDataSource (data) {
        var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        return ds.cloneWithRows(data);
    }

    pressRow (row: object) {
        console.log(row);
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
                  renderRow={(rowData) =>
                      <TouchableWithoutFeedback onPress={() => {
                          this.pressRow(rowData);
                      } }>
                          <View style={styles.row}>
                              <View style={styles.thumbPanel}>
                                  <Image style={styles.thumb} source={imageSource}/>
                              </View>
                              <Text style={styles.name}>{rowData.name}</Text>
                          </View>
                      </TouchableWithoutFeedback>
                  }
                  renderSeparator={this.renderSeparator.bind(this)}
              />
          );
        }
        else {
          return (
              <ListView
                  style={this.props.style}
                  dataSource={dataSource}
                  renderRow={(rowData) =>
                      <TouchableWithoutFeedback onPress={() => {
                          this.pressRow(rowData);
                      } }>
                          <View style={styles.row}>
                              <View style={styles.thumbPanel}>
                                  <Image style={styles.thumb} source={imageSource}/>
                              </View>
                              <Text style={styles.name}>{rowData.name}</Text>
                          </View>
                      </TouchableWithoutFeedback>
                  }
                  renderScrollComponent={props => <RecyclerViewBackedScrollView {...props} />}
                  renderSeparator={this.renderSeparator.bind(this)}
              />
          );
        }
    }

    renderSeparator (sectionId: number, rowId: number, adjacentRowHighlighted: bool) {
        return (
            <View
                key={`${sectionId}-${rowId}`}
                style={separatorStyle(adjacentRowHighlighted)}
            />
        );
    }
}

/***************************************************************
 * STYLING
 **************************************************************/
function separatorStyle (adjacentRowHighlighted) {
    return {
        height: adjacentRowHighlighted ? 4 : 1,
        backgroundColor: adjacentRowHighlighted ? '#3B5998' : '#111',
    };
}

const textColor = '#E0E0E0';
const styles = StyleSheet.create({
    row: {
        flex: 1,
        flexDirection: 'row',
        padding: 8,
    },
    name: {
        color: textColor,
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
    }
});

export default Challenges;
