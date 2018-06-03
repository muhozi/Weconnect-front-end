import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Router, Route } from 'react-router-dom';
import history from '../config/history';
import Businesses from './Businesses';
import Reviews from './Reviews';
import Login from './auth/Login';
import Register from './auth/Register';
import Account from './Account';
import {checkToken} from '../actions/AuthActions';

class Root extends Component {
  componentDidMount(){
    this.props.checkToken();
  }
  render() {
    return (
      <Router history={history}>
        <Fragment>
          <div className="body-img">
            <Route path="/login" exact component={Login} />
            <Route path="/register" component={Register} />
          </div>
          <Route path="/reviews" component={Reviews} />
          <Route path="/businesses" component={Businesses} />
          <Route path="/account" component={Account} />
        </Fragment>
      </Router>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = dispatch => ({
  checkToken: () => checkToken(dispatch)
});
Root.propTypes = {
  auth: PropTypes.object,
  checkToken: PropTypes.func,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Root);
