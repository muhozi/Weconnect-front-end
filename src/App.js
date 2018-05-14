import React, { Component } from 'react';
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from "react-router-dom";
import ConfigureStore from './config/ConfigureStore'
import Header from './components/Header';
import Home from './containers/Home';
import Businesses from './containers/Businesses';
import Reviews from './containers/Reviews';
import Login from './containers/auth/Login';
import Register from './containers/auth/Register';

const store = ConfigureStore();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <Header/>
            <Route exact path="/" component={Home} />
            <Route path="/reviews" component={Reviews} />
            <Route path="/businesses" component={Businesses} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
