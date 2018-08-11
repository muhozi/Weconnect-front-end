import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { Link, Redirect } from 'react-router-dom';
import { Alert, Button, Card, CardHeader, CardBody } from 'reactstrap';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { reset } from '../../actions/AuthActions';
import { Error, InputGroup } from '../../components';
import logo from '../../assets/images/logo-white.png';

/**
 *   Reset Password Component
 */
class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: ''
    };
  }
  /** Handle input value through state */
  handleChange = e => {
    const value = {};
    value[e.target.name] = e.target.value;
    this.setState(value);
  };
  /** Reset function */
  reset = e => {
    e.preventDefault();
    this.props.reset(this.state.email);
    if (this.props.message.register_success) {
      this.setState({
        email: ''
      });
    }
  };
  render() {
    return (
      <Fragment>
        {this.props.auth.logged_in === true ? <Redirect to="/account" /> : null}
        <Helmet>
          <title>Reset password - We Connect</title>
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
                    <CardHeader className="text-center">
                      Reset password<br />
                      <small className="text-muted">Enter your email</small>
                    </CardHeader>
                    <CardBody>
                      <form method="POST" onSubmit={this.reset}>
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
                          <div className="col-md-9">
                            <Button color="primary" block size="sm">
                              Send me reset instructions
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
                        Login
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
  reset: data => dispatch(reset(data)),
  dismissMessage: () => dispatch({ type: 'DISMISS_MESSAGE' })
});
ResetPassword.propTypes = {
  /** Message reducer state  */
  message: PropTypes.object,
  /** Auth reducer state  */
  auth: PropTypes.object,
  /** Reset password action */
  reset: PropTypes.func,
  /** Dismiss messages action  */
  dismissMessage: PropTypes.func
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResetPassword);
