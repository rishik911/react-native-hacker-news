import axios from 'axios';
import {BASE_URL, endPoints} from '../../../CommonUtils';

export const getTopStoriesAPI = () => {
  return axios
    .get(BASE_URL + endPoints.TOP_STORES, {
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
    })
    .then(success => success)
    .catch(e => e);
};

export const getDetailedStoryAPI = id => {
  return axios
    .get(`${BASE_URL}${endPoints.STORY_DETAIL(id)}`)
    .then(success => success.data)
    .catch(e => console.log(e));
};
