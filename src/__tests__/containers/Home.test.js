import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { MemoryRouter } from 'react-router-dom';
import { store } from '../../config';
import Home from '../../containers/Home';

configure({ adapter: new Adapter() });
it('renders without crashing', () => {
  const wrapper = shallow(
    <MemoryRouter keyLength={0}>
      <Home store={store} />
    </MemoryRouter>
  ).dive();
  expect(wrapper).toHaveLength(1);
});
