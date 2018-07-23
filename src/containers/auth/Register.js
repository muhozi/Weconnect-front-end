import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { Link, Redirect } from 'react-router-dom';
import { Alert, Button, Card, CardHeader, CardBody } from 'reactstrap';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { register } from '../../actions/AuthActions';
import { Error, InputGroup } from '../../components';
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
  register = (e) => {
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
                <div className="col-md-6 d-none d-md-block">
                  <div className="m-5 text-center text-light">
                    <img src={logo} className="logo" alt="banner" />
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
                  <Card className="card-form">
                    <CardHeader className="text-center">
                      Create an account
                    </CardHeader>
                    <CardBody>
                      <form method="POST" onSubmit={this.register}>
                        {this.props.message.message && (
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
                              >
                                {this.props.message.message}
                              </Alert>
                            </div>
                          </div>
                        )}
                        <div className="form-group row justify-content-center">
                          <InputGroup
                            type="text"
                            name="username"
                            onChange={this.handleChange}
                            value={this.state.username}
                            placeholder="Username..."
                            autoComplete="off"
                            icon="ion-ios-person"
                          />
                          <Error
                            errors={this.props.message.errors}
                            name="username"
                          />
                        </div>
                        <div className="form-group row justify-content-center">
                          <InputGroup
                            type="text"
                            name="email"
                            onChange={this.handleChange}
                            value={this.state.email}
                            placeholder="Email..."
                            autoComplete="off"
                            icon="icon ion-ios-mail"
                          />
                          <Error
                            errors={this.props.message.errors}
                            name="email"
                          />
                        </div>
                        <div className="form-group row justify-content-center">
                          <InputGroup
                            type="password"
                            name="password"
                            onChange={this.handleChange}
                            value={this.state.password}
                            placeholder="Password..."
                            autoComplete="off"
                            icon="icon ion-ios-unlock"
                          />
                          <Error
                            errors={this.props.message.errors}
                            name="password"
                          />
                        </div>
                        <div className="form-group row justify-content-center">
                          <InputGroup
                            type="password"
                            name="confirm_password"
                            onChange={this.handleChange}
                            value={this.state.confirm_password}
                            placeholder="Confirm password..."
                            autoComplete="off"
                            icon="icon ion-ios-unlock"
                          />
                          <Error
                            errors={this.props.message.errors}
                            name="confirm_password"
                          />
                        </div>
                        <div className="form-group row justify-content-center">
                          <div className="col-md-9">
                            <Button color="primary" block size="sm">
                              Create an account
                            </Button>
                          </div>
                        </div>
                      </form>
                    </CardBody>
                    <div className="card-body text-center">
                      <Link
                        to="/login"
                        className="text-primary"
                        onClick={() => this.props.dismissMessage()}
                      >
                        Have an account? Login
                      </Link>
                    </div>
                  </Card>
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
  register: data => dispatch(register(data)),
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
