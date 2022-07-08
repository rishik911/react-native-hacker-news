import React, {Component} from 'react';
import {Text, TouchableOpacity, Linking, Alert} from 'react-native';
import {styles} from '../Styles/ListItemStyles';
import moment from 'moment';
import {TEST_ID} from '../../../CommonUtils';

//HOC being used in both the flat lists
class ListItem extends Component {
  openLink() {
    const {url} = this.props.data;
    Linking.canOpenURL(url)
      .then(success => Linking.openURL(url))
      .catch(e => Alert.alert(e));
  }
  handleItemPress() {
    this.props.onPress(this.props.data.kids);
  }
  render() {
    const {title, text, time, by, type} = this.props.data;
    const {isChildren = false} = this.props;
    return (
      <TouchableOpacity
        testID={TEST_ID.ITEM_PRESS}
        disabled={isChildren}
        onPress={this.handleItemPress.bind(this)}
        style={[
          styles.mainContainer,
          {backgroundColor: isChildren ? '#9cdbaf' : '#9fccd1'},
        ]}>
        <Text
          testID={TEST_ID.TITLE_TEXT}
          style={isChildren ? styles.textStyle : styles.titleText}>
          {isChildren ? text : title}
        </Text>
        <Text testID={TEST_ID.DATE_TEXT} style={styles.dateText}>
          {moment.unix(new Date(time)).fromNow()}
        </Text>
        {!isChildren && (
          <TouchableOpacity
            testID={TEST_ID.WEB_LINK_PRESS}
            onPress={this.openLink.bind(this)}
            style={styles.button}>
            <Text style={styles.buttonText}>Open the web link !</Text>
          </TouchableOpacity>
        )}

        <Text testID={TEST_ID.BY_TEXT} style={styles.dateText}>
          {type} By {by}
        </Text>
      </TouchableOpacity>
    );
  }
}

export default ListItem;
