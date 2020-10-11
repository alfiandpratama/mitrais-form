import React from 'react';
import { shallow } from 'enzyme';
import Register from './Register';

it('expect to render Register component', () => {
  expect(shallow(<Register />).length).toEqual(1);
});
