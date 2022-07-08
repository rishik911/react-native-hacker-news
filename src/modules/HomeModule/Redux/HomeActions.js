import {HOME_TYPES} from './HomeTypes';

export const getTopStoriesAction = () => {
  return {
    type: HOME_TYPES.GET_TOP_STORIES,
  };
};

export const getStoriesDetailsAction = (dataArray, isRefresh) => {
  return {
    type: HOME_TYPES.GET_STORIES_DETAILS,
    dataArray,
    isRefresh,
  };
};

export const getChildrenDataAction = childrenArray => {
  return {
    type: HOME_TYPES.GET_CHILDREN_DETAILS,
    childrenArray,
  };
};

export const resetChildrenDetailsAction = () => {
  return {
    type: HOME_TYPES.RESET_CHILDREN_DETAILS,
  };
};
