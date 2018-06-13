import React, { Component } from 'react';
import { connect } from 'react-redux';
import Master from '../Master';

/** User businesses component */
export class Reviews extends Component {
  render() {
    return (
      <Master>
        <h1> Reviews</h1>
      </Master>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Reviews);
