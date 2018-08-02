import React from 'react';
import { shallow } from 'enzyme';
import Businesses from '../../containers/Businesses';
import { configure } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
it('renders without crashing', () => {
  const businesses = shallow(
    <MemoryRouter>
      <Businesses />
    </MemoryRouter>
  );
  expect(businesses, 'Businesses');
});
