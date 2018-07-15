import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect, Switch } from 'react-router-dom';
import AddBusiness from './account/AddBusiness';
import Businesses from './account/UserBusinesses';
import Business from './account/Business';
import NotFound from '../containers/404';

class Account extends Component {
  render() {
    if (this.props.auth.loading) {
      return <h1>Loading</h1>;
    } else {
      if (!this.props.auth.logged_in) {
        return <Redirect to="/login" />;
      } else {
        return (
          <Switch>
            <Route exact path="/account" component={Businesses} />
            <Route exact path="/account/businesses" component={Businesses} />
            <Route
              exact
              path="/account/businesses/add"
              component={AddBusiness}
            />
            <Route exact path="/account/businesses/page/:page" component={Businesses} />
            <Route exact path="/account/business/:id" component={Business} />
            <Route component={NotFound} />
          </Switch>
        );
      }
    }
  }
}
const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = dispatch => ({});
Account.propTypes = {
  auth: PropTypes.object
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Account);
