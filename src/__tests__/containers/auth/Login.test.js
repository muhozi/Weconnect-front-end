import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { shallow } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Login from '../../../containers/auth/Login';
import { store } from '../../../config';

configure({ adapter: new Adapter() });
it('Render login component', () => {
  const login = shallow(
    <MemoryRouter>
      <Login store={store} />
    </MemoryRouter>
  ).dive();
  expect(login, 'Login');
});
