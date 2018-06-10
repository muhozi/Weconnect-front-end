import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect, Switch } from 'react-router-dom';
import AddBusiness from './account/AddBusiness';
import Businesses from './account/Businesses';
import Reviews from './account/Reviews';
import NotFound from '../containers/404';

class Account extends Component {
  render() {
    return (
      <Fragment>
        {this.props.auth.loading === true ? (
          <h1>Loading</h1>
        ) : (
          <Fragment>
            {this.props.auth.logged_in === false &&
            this.props.auth.loading === false ? (
                <Redirect to="/login" />
              ) : (
                <Switch>
                  <Route exact path="/account" component={Businesses} />
                  <Route
                    exact
                    path="/account/businesses"
                    component={Businesses}
                  />
                  <Route
                    exact
                    path="/account/businesses/add"
                    component={AddBusiness}
                  />
                  <Route
                    exact
                    path="/account/businesses/reviews"
                    component={Reviews}
                  />
                  <Route component={NotFound} />
                </Switch>
              )}
          </Fragment>
        )}
      </Fragment>
    );
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
