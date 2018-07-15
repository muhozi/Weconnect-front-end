import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { shallow } from 'enzyme';
import Business from '../../../containers/account/Business';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { store } from '../../../config';

configure({ adapter: new Adapter() });
it('renders without crashing', () => {
  const  wrapper = shallow(
    <MemoryRouter keyLength={0}>
      <Business store={store} />
    </MemoryRouter>
  ).dive();
  expect(wrapper).toHaveLength(1);
});
