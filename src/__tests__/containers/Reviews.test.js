import React from 'react';
import { shallow } from 'enzyme';
import { Reviews } from '../../containers/Reviews';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
it('renders without crashing', () => {
  const home = shallow(<Reviews />);
  expect(home, 'Reviews');
});
