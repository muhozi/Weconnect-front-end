import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { store } from './config';
import Root from './containers/Root';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Root/>
      </Provider>
    );
  }
}
export default App;
