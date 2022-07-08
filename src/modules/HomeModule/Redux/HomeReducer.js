import {HOME_TYPES} from './HomeTypes';

const INITIAL_STATE = {
  topStories: null,
  detailsArray: [],
  childrenDetails: [],
  failedHomeStatus: false,
  failedChildrenStatus: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case HOME_TYPES.GET_TOP_STORIES_SUCCESS:
      return {
        ...state,
        topStories: action.topStories,
        failedHomeStatus: false,
      };
    case HOME_TYPES.GET_STORIES_DETAILS_SUCCESS:
      return {
        ...state,
        detailsArray: action.isRefresh
          ? action.detailsArray
          : state.detailsArray.concat(action.detailsArray),
        failedHomeStatus: false,
      };
    case HOME_TYPES.GET_CHILDREN_DETAILS_SUCCESS:
      return {
        ...state,
        childrenDetails: state.childrenDetails.concat(action.childrenDetails),
        failedChildrenStatus: false,
      };
    case HOME_TYPES.GET_CHILDREN_DETAILS_FAILURE:
      return {
        ...state,
        childrenDetails: [],
        failedChildrenStatus: true,
      };
    case HOME_TYPES.GET_STORIES_DETAILS_FAILURE:
      return {
        ...state,
        detailsArray: [],
        topStories: null,
        failedHomeStatus: true,
      };
    case HOME_TYPES.RESET_CHILDREN_DETAILS:
      return {
        ...state,
        childrenDetails: [],
      };
    default:
      return state;
  }
};
