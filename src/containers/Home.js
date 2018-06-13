import React, { Component } from 'react';
import { connect } from 'react-redux';

export class Home extends Component {
  render() {
    return (
      <div>
        <header>
          <h1>Home Component</h1>
        </header>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
