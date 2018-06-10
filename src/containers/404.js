import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class NotFound extends Component {
  render() {
    return (
      <Fragment>
        <h1>Page not found</h1>
      </Fragment>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = dispatch => ({});
NotFound.propTypes = {
  auth: PropTypes.object
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotFound);
