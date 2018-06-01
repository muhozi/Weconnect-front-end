import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { store } from './config';
import Businesses from './containers/Businesses';
import Reviews from './containers/Reviews';
import Login from './containers/auth/Login';
import Register from './containers/auth/Register';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="body-img">
            <Route path="/login" exact component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/reviews" component={Reviews} />
            <Route path="/businesses" component={Businesses} />
          </div>
        </Router>
      </Provider>
    );
  }
}
export default App;
