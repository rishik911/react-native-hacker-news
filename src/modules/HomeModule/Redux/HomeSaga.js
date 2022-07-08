import {all, call, put, takeLatest} from 'redux-saga/effects';
import {getDetailedStoryAPI, getTopStoriesAPI} from './HomeServices';
import {HOME_TYPES} from './HomeTypes';

function* getTopStoriesSaga() {
  try {
    const response = yield call(getTopStoriesAPI);

    if (
      response.name !== undefined &&
      response.name !== null &&
      response.name === 'AxiosError'
    ) {
      yield put({
        type: HOME_TYPES.GET_STORIES_DETAILS_FAILURE,
      });
    } else if (response) {
      yield put({
        type: HOME_TYPES.GET_TOP_STORIES_SUCCESS,
        topStories: response.data,
      });
    }
  } catch (e) {
    yield put({
      type: HOME_TYPES.GET_STORIES_DETAILS_FAILURE,
    });
  }
}

function* getStoryDetailsSaga(action) {
  try {
    const response = yield all(
      action.dataArray.map(item => call(getDetailedStoryAPI, item)),
    );
    if (
      response.name !== undefined &&
      response.name !== null &&
      response.name === 'AxiosError'
    ) {
      yield put({
        type: HOME_TYPES.GET_STORIES_DETAILS_FAILURE,
      });
    } else if (response && response.length) {
      yield put({
        type: HOME_TYPES.GET_STORIES_DETAILS_SUCCESS,
        detailsArray: response,
        isRefresh: action.isRefresh,
      });
    }
  } catch (e) {
    yield put({
      type: HOME_TYPES.GET_STORIES_DETAILS_FAILURE,
    });
  }
}

function* getChildrenDetailsSaga(action) {
  try {
    const response = yield all(
      action.childrenArray.map(item => call(getDetailedStoryAPI, item)),
    );
    if (
      response.name !== undefined &&
      response.name !== null &&
      response.name === 'AxiosError'
    ) {
      yield put({
        type: HOME_TYPES.GET_CHILDREN_DETAILS_FAILURE,
      });
    } else if (response && response.length) {
      yield put({
        type: HOME_TYPES.GET_CHILDREN_DETAILS_SUCCESS,
        childrenDetails: response,
      });
    }
  } catch (e) {
    yield put({
      type: HOME_TYPES.GET_CHILDREN_DETAILS_FAILURE,
    });
  }
}
function* HomeModuleSaga() {
  yield all([
    takeLatest(HOME_TYPES.GET_TOP_STORIES, getTopStoriesSaga),
    takeLatest(HOME_TYPES.GET_STORIES_DETAILS, getStoryDetailsSaga),
    takeLatest(HOME_TYPES.GET_CHILDREN_DETAILS, getChildrenDetailsSaga),
  ]);
}

export default HomeModuleSaga;
