import React, {Component} from 'react';
import {
  View,
  ActivityIndicator,
  FlatList,
  Modal,
  Animated,
  Text,
  RefreshControl,
} from 'react-native';
import {styles} from '../Styles/HomeScreenStyles';
import {connect} from 'react-redux';
import {
  getTopStoriesAction,
  getStoriesDetailsAction,
  resetChildrenDetailsAction,
  resetHomeStateAction,
} from '../Redux/HomeActions';
import ListItem from '../Components/ListItem';
import ChildrenComponent from '../Components/ChildrenComponent';
import {TEST_ID} from '../../../CommonUtils';

export class HomeScreen extends Component {
  state = {
    storiesId: null,
    totalStories: 0,
    startIndex: 0,
    endIndex: 0,
    isModalVisible: false,
    children: [],
    opacityStatus: new Animated.Value(1),
    refresh: false,
  };
  componentDidMount() {
    this.props.getTopStoriesAction();
  }

  static getDerivedStateFromProps(props, state) {
    //storing the details response in local state
    if (
      state.storiesId == null &&
      props.topStories &&
      props.topStories.length
    ) {
      return {
        ...state,
        storiesId: props.topStories,
        totalStories: props.topStories.length,
      };
    } else {
      return {
        ...state,
      };
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (!prevState.storiesId && this.state.storiesId) {
      this.fetchNextStories(0, 11);
    }
  }
  fetchNextStories(start, end, isRefresh = false) {
    //paginated api calls , start is the starting index of the ids and last
    //is the ending index of the ids , so as to fetch the details and append
    //to the existing array
    this.setState({
      startIndex: end + parseInt(1),
    });
    const {storiesId} = this.state;
    const dataArray = [...storiesId].slice(start, end);
    this.props.getStoriesDetailsAction(dataArray, isRefresh);
    this.setState({
      refresh: false,
    });
  }

  handleOnReachedEnd() {
    this.fetchNextStories(
      this.state.startIndex,
      this.state.startIndex + parseInt(11),
    );
  }

  handleCloseModal() {
    this.setState({
      isModalVisible: false,
    });
    this.props.resetChildrenDetailsAction();
  }

  showModal() {
    return (
      <Modal
        testID={TEST_ID.CHILDREN_MODAL}
        animationType="slide"
        visible={this.state.isModalVisible}
        onRequestClose={this.handleCloseModal.bind(this)}
        onDismiss={this.handleCloseModal.bind(this)}>
        <ChildrenComponent
          onBackPress={this.handleCloseModal.bind(this)}
          data={this.state.children}
        />
      </Modal>
    );
  }

  handleOnPress(item) {
    this.setState(
      {
        children: item,
      },
      () => {
        this.setState({isModalVisible: true});
      },
    );
  }

  renderList({item}) {
    //the children are shwon using modal
    return (
      <View>
        <ListItem onPress={this.handleOnPress.bind(this)} data={item} />
      </View>
    );
  }
  renderListEmptyComponent() {
    //while the data is being fethed the activity indicator will consume the screen
    const {errorStatus} = this.props;
    if (!errorStatus) {
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
    if (errorStatus) {
      //if any errror is encountered a generic message will be shown
      return (
        <View style={styles.erroView}>
          <Text style={styles.errorText}>
            Something went wrong , please try again
          </Text>
        </View>
      );
    }
  }

  handleOnscroll({nativeEvent}) {
    //header animation based on the y axis position
    Animated.timing(this.state.opacityStatus, {
      toValue: nativeEvent.contentOffset.y,
      duration: 0,
      useNativeDriver: true,
    }).start();
  }
  renderHeader() {
    return (
      <Text testID={TEST_ID.HEADER_TEXT} style={styles.titleStyleStatic}>
        Top Stories
      </Text>
    );
  }
  renderListFooter() {
    if (
      this.props.detailsArray.length > 10 &&
      this.state.startIndex < this.state.totalStories
    ) {
      return <ActivityIndicator size="large" color="white" />;
    } else {
      return <></>;
    }
  }

  handleOnRefresh() {
    this.setState({
      refresh: true,
    });
    if (!this.state.storiesId) {
      this.props.getTopStoriesAction();
      this.setState({
        refresh: false,
      });
      return;
    }
    this.fetchNextStories(0, 11, true);
  }
  render() {
    //interpolated animation
    const animatedOpacity = this.state.opacityStatus.interpolate({
      inputRange: [0, 10, 15, 20, 30, 40, 45],
      outputRange: [0, 0.2, 0.3, 0.4, 0.6, 0.8, 1],
    });
    const {detailsArray} = this.props;
    return (
      <>
        <View style={styles.mainContainer}>
          <Animated.View
            style={[
              styles.dynamicHeaderContainer,
              ,
              {opacity: animatedOpacity},
            ]}>
            <Text style={[styles.titleStyle]}>Top Stories</Text>
          </Animated.View>
          <FlatList
            testID={TEST_ID.HOME_FLATLIST}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refresh}
                onRefresh={this.handleOnRefresh.bind(this)}
              />
            }
            onScroll={this.handleOnscroll.bind(this)}
            contentContainerStyle={styles.listContainer}
            renderItem={this.renderList.bind(this)}
            keyExtractor={item => item.id.toString()}
            data={detailsArray}
            onEndReachedThreshold={0.3}
            ListEmptyComponent={this.renderListEmptyComponent.bind(this)}
            onEndReached={this.handleOnReachedEnd.bind(this)}
            ListHeaderComponent={this.renderHeader.bind(this)}
            ListFooterComponent={this.renderListFooter.bind(this)}
          />
          {this.showModal()}
        </View>
      </>
    );
  }
}

const mapStateToProps = state => ({
  topStories: state.HomeReducer.topStories,
  detailsArray: state.HomeReducer.detailsArray,
  errorStatus: state.HomeReducer.failedHomeStatus,
});

const mapDispatchToProps = {
  getTopStoriesAction,
  getStoriesDetailsAction,
  resetChildrenDetailsAction,
  resetHomeStateAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
