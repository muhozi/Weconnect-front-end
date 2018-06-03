import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { Link, Redirect } from 'react-router-dom';
import { Alert } from 'reactstrap';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { login } from '../../actions/AuthActions';
import { Error } from '../../components';
/**
 *   Login Component
 */
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.login = this.login.bind(this);
  }
  handleChange(e) {
    const value = {};
    value[e.target.name] = e.target.value;
    this.setState(value);
  }
  login(e) {
    e.preventDefault();
    this.props.login(this.state);
    if (this.props.message.register_success) {
      this.setState({
        username: '',
        email: ''
      });
    }
  }
  render() {
    return (
      <Fragment>
        {this.props.auth.logged_in=== true ? <Redirect to="/account" /> : null}
        <Helmet>
          <title>Login - We Connect</title>
          <meta name="description" content="Login" />
        </Helmet>
        <Header />
        <section className="content">
          <div className="container">
            <div className="row justify-content-end account-card">
              <div className="col-md-6">
                <div>
                  <h1
                    className="text-center text-light"
                    style={{ fontSize: '160px' }}
                  >
                    <i className="icon ion-md-hand" />
                  </h1>
                  <p className="text-light text-center">
                    Welcome back!<br />
                    <br />
                  </p>
                </div>
              </div>
              <div className="col-md-6 no-padding">
                <div className="card card-form animated fadeIn">
                  <div className="card-header text-center">
                    <h5 className="form-header">Login</h5>
                  </div>
                  <div className="card-body">
                    <form method="POST" onSubmit={this.login}>
                      {this.props.message.message ? (
                        <div className="form-group row justify-content-center">
                          <div className="col-md-9">
                            <Alert
                              color={
                                this.props.message.error ? 'danger' : 'success'
                              }
                              isOpen={
                                this.props.message.error ||
                                this.props.message.success
                              }
                              toggle={this.props.dismissMessage}
                              className="small"
                            >
                              {this.props.message.message}
                            </Alert>
                          </div>
                        </div>
                      ) : null}
                      <div className="form-group row justify-content-center">
                        <div className="input-group input-group-sm col-md-9">
                          <div className="input-group-prepend">
                            <div className="input-group-text">
                              <i className="icon ion-ios-mail" />
                            </div>
                          </div>
                          <input
                            type="email"
                            name="email"
                            onChange={this.handleChange}
                            className="form-control"
                            placeholder="Email ..."
                          />
                        </div>
                        <Error
                          errors={this.props.message.errors}
                          name="email"
                        />
                      </div>
                      <div className="form-group row justify-content-center">
                        <div className="input-group input-group-sm col-md-9">
                          <div className="input-group-prepend">
                            <div className="input-group-text">
                              <i className="icon ion-ios-unlock" />
                            </div>
                          </div>
                          <input
                            type="password"
                            name="password"
                            onChange={this.handleChange}
                            className="form-control"
                            placeholder="Password ..."
                          />
                        </div>
                        <Error
                          errors={this.props.message.errors}
                          name="password"
                        />
                      </div>
                      <div className="form-group row justify-content-center">
                        <div className="col-md-9">
                          <button
                            type="submit"
                            className="btn btn-secondary btn-block btn-sm"
                          >
                            Login
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className="card-body text-center">
                    <Link
                      to="/register"
                      className="text-secondary"
                      onClick={() => this.props.dismissMessage()}
                    >
                      Create an account
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  message: state.message,
  auth: state.auth
});

const mapDispatchToProps = dispatch => ({
  login: data => login(dispatch, data),
  dismissMessage: data => dispatch({ type: 'DISMISS_MESSAGE' })
});
Login.propTypes = {
  /** Message reducer state  */
  message: PropTypes.object,
  /** Auth reducer state  */
  auth: PropTypes.object,
  /** Login action */
  login: PropTypes.func,
  /** Dismiss messages action  */
  dismissMessage: PropTypes.func
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
