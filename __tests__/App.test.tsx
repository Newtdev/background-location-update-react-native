/**
 * @format
 */

import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import {sum} from '../sample';
import App from '../App';

test('add 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
// test('renders correctly', async () => {
//   await ReactTestRenderer.act(() => {
//     ReactTestRenderer.create(<App />);
//   });
// });
