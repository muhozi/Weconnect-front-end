import React from 'react';
import { shallow } from 'enzyme';
import { Login } from '../../../containers/auth/Login';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
it('renders without crashing', () => {
  const login = shallow(<Login />);
  expect(login, 'Login');
});
