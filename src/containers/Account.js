import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Businesses from './Businesses';

class Account extends Component {
  render() {
    return (
      <Fragment>
        {this.props.auth.loading===true ? (
          <h1>Loading</h1>
        ) : (
          <Fragment>
            {this.props.auth.logged_in === false &&
            this.props.auth.loading === false ? (
                <Redirect to="/login" />
              ) : (
                <Route path="/" component={Businesses} />
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
