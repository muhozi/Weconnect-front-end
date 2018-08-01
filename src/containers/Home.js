import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import Lottie from 'react-lottie';
import _ from 'lodash';
import { getBusinesses } from '../actions/BusinessesActions';
import { Loading } from '../components/Loaders';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BusinessCard from '../components/SingleBusinessCard';
import connectAnimation from '../assets/anim/businesses-anim.json';

/**
 *   Home page Component
 */
const HoloSection = () => (
  <section className="holo-sec">
    <div className="container">
      <div className="row" style={{ minHeight: '100vh' }}>
        <div className="col-md-12 m-auto">
          <div className="testimonials">
            <h2 className="slimmy text-light">
              <blockquote>
                <i>
                  {'"'} The number of my clients doubled in a month after
                  improving my services from their reviews through WeConnect .
                  This is an incredible platform.
                  {'"'}
                  <br />
                </i>
              </blockquote>
            </h2>
            <i className="text-light">{'  '} - WeConnect happy user </i>
          </div>
        </div>
      </div>
    </div>
  </section>
);

class Home extends Component {
  componentDidMount() {
    this.props.dismissMessage();
    this.props.getBusinesses();
  }
  render() {
    const businessAnim = {
      loop: false,
      autoplay: true,
      animationData: connectAnimation,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
      }
    };
    const auth = this.props.auth;
    const businesses = this.props.businesses;
    return (
      <Fragment>
        <Helmet>
          <title>Welcome to We Connect</title>
        </Helmet>
        <div className="body">
          <Header />
          <section className="content home">
            <div className="container">
              <div className="row">
                <div className="col-md-6">
                  <h1 className="text-primary v-slim-header">
                    We connect <br />
                  </h1>
                  <hr className="hr-divider" />
                  <h3 className="v-slim-header">
                    WeConnect brings businesses and individuals together.
                  </h3>
                  <br />
                  - Get your favorite businesses details in one place<br />
                  - Share what you think about businesses<br />
                  <br />
                  <h5 className="text-primary slim-header">
                    Do you own a business(es)?
                  </h5>
                  - Receive reviews from your clients<br />
                  - Share with your clients your business address and details
                  <br />
                  <br />
                  <Link to="/businesses" className="btn btn-md btn-primary">
                    {'   '}
                    View businesses
                  </Link>{' '}
                  {!auth.logged_in === true && (
                    <Link
                      to="/login"
                      className="btn btn-md btn-outline-primary"
                    >
                      {' '}
                      <i className="ion-ios-add-circle-outline" />
                      {'   '}
                      Join the network
                    </Link>
                  )}
                </div>
                <div className="col-md-6">
                  <Lottie options={businessAnim} height={600} width={600} />
                </div>
              </div>
            </div>
          </section>
          <section>
            <div className="container">
              <div className="row heading">
                <div className="col-md-12">
                  <h3 className="v-slim-header text-center text-primary">
                    Recently added businesses<hr className="hr-divider" />
                  </h3>
                </div>
              </div>
            </div>
            <div className="container">
              {businesses.fetching ? (
                <Loading title="Loading recently added businesses" />
              ) : (
                <Fragment>
                  <div className="row">
                    {businesses.success ? (
                      <Fragment>
                        {_
                          .take(businesses.businesses, 8)
                          .map(business => (
                            <BusinessCard
                              key={business.id}
                              business={business}
                            />
                          ))}
                      </Fragment>
                    ) : (
                      <h1 className="text-danger text-center">
                        Something went wrong
                      </h1>
                    )}
                  </div>
                  <br />
                  <br />
                  <div className="row justify-content-center">
                    <div className="col-md-12 text-center">
                      <Link to="/businesses" className="btn btn-primary btn-lg">
                        Browse more businesses
                      </Link>
                    </div>
                  </div>
                  <br />
                  <br />
                </Fragment>
              )}
            </div>
          </section>
          <HoloSection />
          <Footer color="muted" />
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  message: state.message,
  auth: state.auth,
  businesses: state.businesses
});

const mapDispatchToProps = dispatch => ({
  getBusinesses: () => dispatch(getBusinesses()),
  dismissMessage: () => dispatch({ type: 'DISMISS_MESSAGE' })
});
Home.propTypes = {
  /** Auth reducer state  */
  auth: PropTypes.object,
  dismissMessage: PropTypes.func,
  // Fetch businesses function
  getBusinesses: PropTypes.func,
  // Businesses
  businesses: PropTypes.object
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
