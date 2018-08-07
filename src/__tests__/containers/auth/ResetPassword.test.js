import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { shallow, mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ResetPassword from '../../../containers/auth/ResetPassword';
import { store } from '../../../config';

configure({ adapter: new Adapter() });
it('Render login component', () => {
  const wrapper = shallow(
    <MemoryRouter>
      <ResetPassword store={store} />
    </MemoryRouter>
  );
  expect(wrapper.dive()).toHaveLength(1);
});
