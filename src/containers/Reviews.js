import React, { Component } from 'react';
import { connect } from 'react-redux';

export class Reviews extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Reviews Component</h1>
        </header>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Reviews);
