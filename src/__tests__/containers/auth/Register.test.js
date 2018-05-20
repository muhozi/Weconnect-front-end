import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import { Register } from '../../../containers/auth/Register';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
it('renders without crashing', () => {
    const register = shallow(<Register />);
    expect(register, 'Create an account')
});