import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { Link, Redirect } from 'react-router-dom';
import { Alert, Button, Card, CardHeader, CardBody } from 'reactstrap';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { login } from '../../actions/AuthActions';
import { Error, InputGroup } from '../../components';
import logo from '../../assets/images/logo-white.png';

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
  }
  /** Handle input value through state */
  handleChange = e => {
    const value = {};
    value[e.target.name] = e.target.value;
    this.setState(value);
  };
  /** Login function */
  login = e => {
    e.preventDefault();
    this.props.login(this.state);
    if (this.props.message.register_success) {
      this.setState({
        username: '',
        email: ''
      });
    }
  };
  render() {
    return (
      <Fragment>
        {this.props.auth.logged_in === true ? <Redirect to="/account" /> : null}
        <Helmet>
          <title>Login - We Connect</title>
        </Helmet>
        <div className="body-img">
          <Header />
          <section className="content">
            <div className="container">
              <div className="row justify-content-end account-card">
                <div className="col-md-6 d-none d-md-block">
                  <div className="m-5 text-center text-light">
                    <img src={logo} className="logo" alt="logo" />
                    <br />
                    <br />
                    <p className="text-light text-center">
                      We Connect<br />
                    </p>
                  </div>
                </div>
                <div className="col-md-6 no-padding">
                  <Card className="card-form">
                    <CardHeader className="text-center">Login</CardHeader>
                    <CardBody>
                      <form method="POST" onSubmit={this.login}>
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
                              >
                                {this.props.message.message}
                              </Alert>
                            </div>
                          </div>
                        ) : null}
                        <div className="form-group row justify-content-center">
                          <InputGroup
                            onChange={this.handleChange}
                            name="email"
                            placeholder="Email ..."
                            icon="icon ion-ios-mail"
                            value={this.state.email}
                            autoComplete="off"
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
                            placeholder="Password ..."
                            onChange={this.handleChange}
                            icon="icon ion-ios-unlock"
                            value={this.state.password}
                            autoComplete="off"
                          />
                          <Error
                            errors={this.props.message.errors}
                            name="password"
                          />
                        </div>
                        <div className="form-group row justify-content-center">
                          <div className="col-md-9">
                            <Button color="primary" block size="sm">
                              Login
                            </Button>
                          </div>
                        </div>
                      </form>
                    </CardBody>
                    <div className="card-body text-center">
                      <Link
                        to="/register"
                        className="text-primary"
                        onClick={() => this.props.dismissMessage()}
                      >
                        Create an account
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
  login: data => login(dispatch, data),
  dismissMessage: () => dispatch({ type: 'DISMISS_MESSAGE' })
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
