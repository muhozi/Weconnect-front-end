import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { shallow, mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ConfirmEmail from '../../../containers/auth/ConfirmEmail';
import { store } from '../../../config';

configure({ adapter: new Adapter() });
it('Render confirm email component', () => {
  const wrapper = shallow(
    <MemoryRouter>
      <ConfirmEmail store={store} />
    </MemoryRouter>
  );
  expect(wrapper.dive()).toHaveLength(1);
});
