import React, {useEffect, useState} from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  Text,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getChildrenDataAction} from '../Redux/HomeActions';
import {styles} from '../Styles/HomeScreenStyles';
import ListItem from './ListItem';

const ChildrenComponent = props => {
  const dispatch = useDispatch();

  const {childrenDetails, failedChildrenStatus} = useSelector(
    state => state.HomeReducer,
  );

  const [childrenID, setId] = useState(null);
  const [lastIndex, setIndex] = useState(0);
  useEffect(() => {
    if (props.data) {
      //storing the details response in local state
      setId(props.data);
      getDetailsData(0, 11, props.data);
    }
  }, []);

  function getDetailsData(start, end, childrenArray = childrenID) {
    //paginated api calls , start is the starting index of the ids and last
    //is the ending index of the ids , so as to fetch the details and append
    //to the existing array
    setIndex(end + parseInt(1));

    const array = [...childrenArray].slice(start, end);
    dispatch(getChildrenDataAction(array));
  }

  function renderChildrens({item}) {
    return <ListItem isChildren={true} data={item} />;
  }

  function handleOnEndReached() {
    getDetailsData(lastIndex, lastIndex + parseInt(11), childrenID);
  }

  function renderListEmptyComponent() {
    //if any errror is encountered a generic message will be shown
    if (failedChildrenStatus) {
      return (
        <View style={styles.erroView}>
          <Text style={styles.errorText}>
            Something went wrong , please try again
          </Text>
        </View>
      );
    } else {
      //while the data is being fethed the activity indicator will consume the screen
      return (
        <View style={styles.activityContainer}>
          <ActivityIndicator
            style={styles.activityLoader}
            size="small"
            color="white"
          />
        </View>
      );
    }
  }

  function handleOnBackPress() {
    props.onBackPress();
  }

  function renderListFooter() {
    if (
      childrenDetails &&
      childrenDetails.length !== null &&
      childrenDetails.length !== undefined &&
      childrenDetails.length > 10 &&
      lastIndex < childrenDetails.length
    ) {
      return <ActivityIndicator size="large" color="white" />;
    } else return <></>;
  }

  return (
    <View style={styles.mainContainer}>
      <View style={styles.dynamicHeaderContainer}>
        <TouchableOpacity
          onPress={handleOnBackPress}
          style={styles.imageHolder}>
          <Image
            source={require('../../../assets/icons/arrow-left.png')}
            style={styles.imageStyle}
          />
        </TouchableOpacity>
      </View>
      <FlatList
        data={childrenDetails}
        renderItem={renderChildrens}
        contentContainerStyle={styles.listContainer}
        onEndReached={handleOnEndReached}
        onEndReachedThreshold={0.3}
        ListEmptyComponent={renderListEmptyComponent}
        keyExtractor={item => item.id.toString()}
        ListFooterComponent={renderListFooter}
      />
    </View>
  );
};

export default ChildrenComponent;
