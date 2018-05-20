import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import uuid from 'uuid/v4';
import { Helmet } from 'react-helmet';

export class Register extends Component {
  render() {
    return (
      <section className="content">
        <Helmet>
          <title>Create an account - We Connect</title>
          <meta name="description" content="Login" />
        </Helmet>
        {this.props.fruits ? (
          <ul>
            {this.props.fruits.map(fruit => <li key={uuid()}>{fruit}</li>)}
          </ul>
        ) : (
          <b>No fruits yet</b>
        )}
      </section>
    );
  }
}

const mapStateToProps = state => {
  return {
    fruits: state.samples.data
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};
Register.propTypes = {
  fruits: PropTypes.array
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
