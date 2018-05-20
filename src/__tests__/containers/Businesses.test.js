import React from 'react';
import { shallow } from 'enzyme';
import { Businesses } from '../../containers/Businesses';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
it('renders without crashing', () => {
  const businesses = shallow(<Businesses />);
  expect(businesses, 'Businesses');
});
