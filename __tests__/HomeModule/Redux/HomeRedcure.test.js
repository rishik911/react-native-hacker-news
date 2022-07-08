import {HOME_TYPES} from '../../../src/modules/HomeModule/Redux/HomeTypes';
import HomeReducer from '../../../src/modules/HomeModule/Redux/HomeReducer';

const INITAIL_STATE = {
  topStories: null,
  detailsArray: [],
  childrenDetails: [],
  failedHomeStatus: false,
  failedChildrenStatus: false,
};

const TOP_STORIES_MOCK = [1, 2, 3, 4, 5, 6, 7];
const DETAILS_MOCK = [
  {id: 1, title: 'test case 1'},
  {id: 2, title: 'test case 2'},
];
const DETAILS_MOCK_2 = [
  {id: 3, title: 'test case 3'},
  {id: 4, titel: 'test case 4'},
];
describe(' home reducer tests', () => {
  it('return default value', () => {
    const mockState = HomeReducer(undefined, {});
    expect(mockState).toStrictEqual(INITAIL_STATE);
  });

  it('return the updated value for the top stories id', () => {
    const mockState = HomeReducer(undefined, {
      type: HOME_TYPES.GET_TOP_STORIES_SUCCESS,
      topStories: TOP_STORIES_MOCK,
    });
    expect(mockState).toStrictEqual({
      ...INITAIL_STATE,
      topStories: TOP_STORIES_MOCK,
    });
  });

  it('return the updated value for the first 2 story details', () => {
    const mockState = HomeReducer(undefined, {
      type: HOME_TYPES.GET_STORIES_DETAILS_SUCCESS,
      detailsArray: DETAILS_MOCK,
    });
    expect(mockState).toStrictEqual({
      ...INITAIL_STATE,
      detailsArray: DETAILS_MOCK,
    });
  });

  it('return the updated value for the paginated details', () => {
    const mockState = HomeReducer(
      {...INITAIL_STATE, detailsArray: DETAILS_MOCK},
      {
        type: HOME_TYPES.GET_STORIES_DETAILS_SUCCESS,
        detailsArray: DETAILS_MOCK_2,
      },
    );
    expect(mockState).toStrictEqual({
      ...INITAIL_STATE,
      detailsArray: DETAILS_MOCK.concat(DETAILS_MOCK_2),
    });
  });

  it('return the updaetd value for the children details', () => {
    const mockState = HomeReducer(undefined, {
      type: HOME_TYPES.GET_CHILDREN_DETAILS_SUCCESS,
      childrenDetails: DETAILS_MOCK,
    });
    expect(mockState).toStrictEqual({
      ...INITAIL_STATE,
      childrenDetails: DETAILS_MOCK,
    });
  });

  it('return the updated value for the paginated children details', () => {
    const mockState = HomeReducer(
      {...INITAIL_STATE, childrenDetails: DETAILS_MOCK},
      {
        type: HOME_TYPES.GET_CHILDREN_DETAILS_SUCCESS,
        childrenDetails: DETAILS_MOCK_2,
      },
    );
    expect(mockState).toStrictEqual({
      ...INITAIL_STATE,
      childrenDetails: DETAILS_MOCK.concat(DETAILS_MOCK_2),
    });
  });

  it('return error for home screen', () => {
    const mockState = HomeReducer(undefined, {
      type: HOME_TYPES.GET_STORIES_DETAILS_FAILURE,
    });
    expect(mockState).toStrictEqual({...INITAIL_STATE, failedHomeStatus: true});
  });

  it('return error for children screen', () => {
    const mockState = HomeReducer(undefined, {
      type: HOME_TYPES.GET_CHILDREN_DETAILS_FAILURE,
    });
    expect(mockState).toStrictEqual({
      ...INITAIL_STATE,
      failedChildrenStatus: true,
    });
  });

  it('return value for reseting children data', () => {
    const mockState = HomeReducer(undefined, {
      type: HOME_TYPES.RESET_CHILDREN_DETAILS,
    });
    expect(mockState).toStrictEqual({
      ...INITAIL_STATE,
      childrenDetails: [],
    });
  });
});
