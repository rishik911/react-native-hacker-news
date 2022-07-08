import {HomeScreen} from '../../../src/modules/HomeModule/Container/HomeScreen';
import {render, screen, fireEvent} from '@testing-library/react-native';
import React from 'react';
import {
  getTopStoriesAction,
  getStoriesDetailsAction,
  resetChildrenDetailsAction,
  resetHomeStateAction,
} from '../../../src/modules/HomeModule/Redux/HomeActions';
import {TEST_ID} from '../../../src/CommonUtils';

describe('Home Screen Component test', () => {
  it('render the component', () => {
    render(
      <HomeScreen
        getTopStoriesAction={getTopStoriesAction}
        getStoriesDetailsAction={getStoriesDetailsAction}
        resetChildrenDetailsAction={resetChildrenDetailsAction}
        resetHomeStateAction={resetHomeStateAction}
        topStories={[1, , 2, 3, 4]}
        detailsArray={[
          {id: 1, title: 'test id1 '},
          {id: 2, title: 'test id 2'},
        ]}
      />,
    );
    const eventData = {
      nativeEvent: {
        contentOffset: {
          y: 100,
        },
        contentSize: {
          height: 500,
          width: 100,
        },
        layoutMeasurement: {
          height: 100,
          width: 100,
        },
      },
    };
    const HomeFlatList = screen.getByTestId(TEST_ID.HOME_FLATLIST);
    fireEvent.scroll(HomeFlatList, eventData);

    const ChildrenModal = screen.getByTestId(TEST_ID.CHILDREN_MODAL);
    fireEvent.press(ChildrenModal);

    const headerText = screen.getByTestId(TEST_ID.HEADER_TEXT);
    expect(headerText).toBeTruthy();

    
  });
});
