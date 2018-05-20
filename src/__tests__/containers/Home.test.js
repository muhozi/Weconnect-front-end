import React from 'react';
import { shallow } from 'enzyme';
import { Home } from '../../containers/Home';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
it('renders without crashing', () => {
  const home = shallow(<Home />);
  expect(home, 'home');
});
