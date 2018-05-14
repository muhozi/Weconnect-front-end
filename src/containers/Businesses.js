import React, { Component } from 'react';
import {connect} from 'react-redux'

class Businesses extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Businesses Component</h1>
        </header>
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    
  }
}

function mapDispatchToProps (dispatch) {
  return {

  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Businesses)