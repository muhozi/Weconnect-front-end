import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
/**
 *   Login Component
*/
class Login extends Component {
  render() {
    return (
      <Fragment>
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
                    <form method="POST" action="updateBusiness.html">
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
                            className="form-control"
                            placeholder="Email ..."
                          />
                        </div>
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
                            className="form-control"
                            name="password"
                            placeholder="Password ..."
                          />
                        </div>
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
                    <Link to="/register" className="text-secondary">
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

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
