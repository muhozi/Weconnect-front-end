import React, { Component } from 'react';
import { connect } from 'react-redux';
import Master from '../Master';

/** User businesses component */
export class Businesses extends Component {
  render() {
    return (
      <Master>
        <h1> My Businesses</h1>
      </Master>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Businesses);
