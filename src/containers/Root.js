import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Router, Route, Switch } from 'react-router-dom';
import history from '../config/history';
import Businesses from './Businesses';
import Business from './Business';
import Home from './Home';
import Login from './auth/Login';
import Register from './auth/Register';
import ResetPassword from './auth/ResetPassword';
import ChangePassword from './auth/ChangePassword';
import ConfirmEmail from './auth/ConfirmEmail';
import Account from './Account';
import NotFound from '../containers/404';
import { checkToken } from '../actions/AuthActions';

class Root extends Component {
  UNSAFE_componentWillMount() {
    this.props.checkToken();
  }
  render() {
    const { auth } = this.props;
    return auth.loading === true && auth.token === null ? (
      <h1>Loading</h1>
    ) : (
      <Router history={history}>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/" component={Home} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/auth/reset" component={ResetPassword} />
          <Route
            exact
            path="/auth/reset-password/:token"
            component={ChangePassword}
          />
          <Route
            exact
            path="/auth/confirm-password/:token"
            component={ConfirmEmail}
          />
          <Route exact path="/business/:id" component={Business} />
          <Route exact path="/businesses" component={Businesses} />
          <Route exact path="/businesses/page/:page" component={Businesses} />
          <Route path="/account" component={Account} />
          <Route component={NotFound} />
        </Switch>
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
  checkToken: PropTypes.func
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Root);
