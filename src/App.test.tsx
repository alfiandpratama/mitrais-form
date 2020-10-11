import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

it('expect to render App component', () => {
  expect(shallow(<App />).length).toEqual(1);
});
