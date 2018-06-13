import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { shallow } from 'enzyme';
import Register from '../../../containers/auth/Register';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { store } from '../../../config';

configure({ adapter: new Adapter() });
it('renders without crashing', () => {
  const register = shallow(
    <MemoryRouter keyLength={0}>
      <Register store={store} />
    </MemoryRouter>
  ).dive();
  expect(register, 'Create an account');
});
