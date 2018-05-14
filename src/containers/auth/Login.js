import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Helmet} from 'react-helmet';

class Login extends Component {
  render() {
    return (
      <div className="App">
        <Helmet>
            <title>Login - We Connect</title>
            <meta name="description" content="Login" />
        </Helmet>
        <header className="App-header">
          <h1 className="App-title">Home Component</h1>
        </header>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {

  }
}

const mapDispatchToProps = dispatch => {
  return {
  	
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)