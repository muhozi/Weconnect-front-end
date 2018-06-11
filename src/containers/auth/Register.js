import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { Link, Redirect } from 'react-router-dom';
import { Alert } from 'reactstrap';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { register } from '../../actions/AuthActions';
import { Error } from '../../components';
import logo from '../../assets/images/logo-white.png';

/**
 * Register component
 */
export class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      confirm_password: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.register = this.register.bind(this);
  }
  handleChange(e) {
    const value = {};
    value[e.target.name] = e.target.value;
    this.setState(value);
  }
  register(e) {
    e.preventDefault();
    this.props.register(this.state);
  }

  render() {
    return (
      <Fragment>
        {this.props.auth.logged_in === true ? <Redirect to="/account" /> : null}
        <Helmet>
          <title>Create an account - We Connect</title>
          <meta name="description" content="Login" />
        </Helmet>
        <Header />
        <div className="body-img">
          <section className="content">
            <div className="container">
              <div className="row justify-content-end account-card">
                <div className="col-md-6">
                  <div className="m-5 text-center text-light">
                    <img src={logo} alt="logo" />
                    <br />
                    <br />
                    <p className="text-light text-center">
                      Join WeConnect, and Say something!<br />
                      <br />
                      Add your business and hear about it
                    </p>
                  </div>
                </div>
                <div className="col-md-6 no-padding">
                  <div className="card card-form animated fadeIn">
                    <div className="card-header text-center">
                      <h5 className="form-header">Create an account</h5>
                    </div>
                    <div className="card-body">
                      <form method="POST" onSubmit={this.register}>
                        {this.props.message.message ? (
                          <div className="form-group row justify-content-center">
                            <div className="col-md-9">
                              <Alert
                                color={
                                  this.props.message.error
                                    ? 'danger'
                                    : 'success'
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
                                <i className="ion-ios-person" />
                              </div>
                            </div>
                            <input
                              type="text"
                              name="username"
                              onChange={this.handleChange}
                              value={this.state.username}
                              className="form-control"
                              placeholder="Username..."
                            />
                          </div>
                          <Error
                            errors={this.props.message.errors}
                            name="username"
                          />
                        </div>
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
                              value={this.state.email}
                              className="form-control"
                              placeholder="Email..."
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
                              value={this.state.password}
                              className="form-control"
                              placeholder="Password..."
                            />
                          </div>
                          <Error
                            errors={this.props.message.errors}
                            name="password"
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
                              name="confirm_password"
                              onChange={this.handleChange}
                              value={this.state.confirm_password}
                              className="form-control"
                              placeholder="Confirm password..."
                            />
                          </div>
                          <Error
                            errors={this.props.message.errors}
                            name="confirm_password"
                          />
                        </div>
                        <div className="form-group row justify-content-center">
                          <div className="col-md-9">
                            <button
                              type="submit"
                              className="btn btn-secondary btn-block btn-sm"
                            >
                              Create account
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                    <div className="card-body text-center">
                      <Link
                        to="/login"
                        className="text-secondary"
                        onClick={() => this.props.dismissMessage()}
                      >
                        Have an account? Login
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <Footer />
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  message: state.message,
  auth: state.auth
});

const mapDispatchToProps = dispatch => ({
  register: data => register(dispatch, data),
  dismissMessage: data => dispatch({ type: 'DISMISS_MESSAGE' })
});
Register.propTypes = {
  /** Message reducer state  */
  message: PropTypes.object,
  /** Authentication reducer state  */
  auth: PropTypes.object,
  /** Login action */
  register: PropTypes.func,
  /** Dismiss messages action  */
  dismissMessage: PropTypes.func
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);
