import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react-native';
import Listtem from '../../../src/modules/HomeModule/Components/ListItem';
import {TEST_ID} from '../../../src/CommonUtils';

describe('render List Item', () => {
  it('list item component test', () => {
    render(
      <Listtem
        onPress={jest.fn()}
        data={{
          title: 'title',
          text: 'testText',
          time: 12345678900,
          by: 'by',
          type: 'type',
        }}
      />,
    );
    const item = screen.getByTestId(TEST_ID.ITEM_PRESS);
    expect(item).toBeTruthy();
    fireEvent.press(item);
    const title = screen.getByTestId(TEST_ID.TITLE_TEXT);
    expect(title).toBeTruthy();
    const date = screen.getByTestId(TEST_ID.DATE_TEXT);
    expect(date).toBeTruthy();
    const webLink = screen.getByTestId(TEST_ID.WEB_LINK_PRESS);
    fireEvent.press(webLink);
    const byText = screen.getByTestId(TEST_ID.BY_TEXT);
    expect(byText).toBeTruthy();
  });
});
