import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import Lottie from 'react-lottie';
import _ from 'lodash';
import { getBusinesses } from '../actions/BusinessesActions';
import Header from '../components/Header';
import Footer from '../components/Footer';
import businessImg from '../assets/images/building.png';
import connectAnimation from '../assets/anim/businesses-anim.json';

/**
 *   Home page Component
 */
const SingleBusiness = props => {
  const business = props.business;
  return (
    <div className="col-md-3">
      <div className="card business-card" style={{ marginTop: '40px' }}>
        <Link to={"/business/"+business.id} className="text-center">
          <img
            src={businessImg}
            alt="business-logo"
            className="hover-business-img img-fluid m-auto"
          />
        </Link>
        <Link to={"/business/" + business.id}>
          <div className="card-body">
            <h6 className="slim-header card-title">{business.name}</h6>
            <p className="card-text text-muted">
              <i className="icon ion-ios-pin" /> {business.city}
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};
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
                  improving my services from their reviews through WeConnect
                  . This is an incredible platform.
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
          <section
            className="content home"
          >
            <div className="container">
              <div className="row">
                <div className="col-md-6">
                  <h1 className="text-primary v-slim-header">
                    We connect <br />
                  </h1>
                  <hr className="hr-divider" />
                  <h3 className="v-slim-header">
                    WeConnect  brings businesses and individuals together.
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
                  <button className="btn btn-md btn-primary">
                    {'   '}
                    View businesses
                  </button>{' '}
                  {!auth.logged_in === true && (
                    <Link to="/login" className="btn btn-md btn-outline-primary">
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
                  <h2 className="v-slim-header text-center text-primary">
                    Recently added businesses<hr className="hr-divider" />
                  </h2>
                </div>
              </div>
            </div>
            <div className="container">
              {businesses.fetching ? (
                <h1> Loading latest businesses </h1>
              ) : (
                <Fragment>
                  <div className="row">
                    {businesses.success ? (
                      <Fragment>
                        {_
                          .take(businesses.businesses, 8)
                          .map(business => (
                            <SingleBusiness
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
  /** Message reducer state  */
  message: PropTypes.object,
  /** Auth reducer state  */
  auth: PropTypes.object,
  /** Login action */
  login: PropTypes.func,
  /** Dismiss messages action  */
  dismissMessage: PropTypes.func,
  // Fetch businesses function
  getBusinesses: PropTypes.func,
  // Businesses
  businesses: PropTypes.object
};
SingleBusiness.propTypes = {
  // Business details
  business: PropTypes.object
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
