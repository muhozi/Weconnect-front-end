import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { Link, Redirect } from 'react-router-dom';
import { Alert, Button, Card, CardHeader, CardBody } from 'reactstrap';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { confirmEmail } from '../../actions/AuthActions';
import { Error, InputGroup } from '../../components';
import logo from '../../assets/images/logo-white.png';

/**
 *   Confirm email Component
 */
class ConfirmEmail extends Component {
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
  /** Confirm email function */
  confirmEmail = e => {
    e.preventDefault();
    this.props.confirmEmail(this.state);
    if (this.props.message.register_success) {
      this.setState({
        email: '',
        password: '',
        confirm_password: ''
      });
    }
  };
  componentDidMount() {
    const token = this.props.match.params.token;
    this.setState({ token });
  }
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
                      Confirm email<br />
                      <small className="text-muted">
                        Enter your email to confirm it
                      </small>
                    </CardHeader>
                    <CardBody>
                      <form method="POST" onSubmit={this.confirmEmail}>
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
                          <div className="col-md-9">
                            <Button color="primary" block size="sm">
                              Confirm email
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
  confirmEmail: data => dispatch(confirmEmail(data)),
  dismissMessage: () => dispatch({ type: 'DISMISS_MESSAGE' })
});
ConfirmEmail.propTypes = {
  /** Message reducer state  */
  message: PropTypes.object,
  /** Auth reducer state  */
  auth: PropTypes.object,
  /** Change password password action */
  confirmEmail: PropTypes.func,
  /** Dismiss messages action  */
  dismissMessage: PropTypes.func,
  match: PropTypes.object
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfirmEmail);
