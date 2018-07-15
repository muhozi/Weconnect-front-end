import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { shallow } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { store } from '../../../config';
import { AddBusiness } from '../../../containers/account/AddBusiness';

configure({ adapter: new Adapter() });
it('renders without crashing', () => {
  const wrapper = shallow(
    <MemoryRouter keyLength={0}>
      <AddBusiness store={store} />
    </MemoryRouter>
  ).dive();
  expect(wrapper).toHaveLength(1);
});
