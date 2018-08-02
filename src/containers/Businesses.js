import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { getBusinesses } from '../actions/BusinessesActions';
import { Loading, Warning } from '../components/Loaders';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BusinessCard from '../components/SingleBusinessCard';

/**
 *   Businesses page Component
 */

class Businesses extends Component {
  componentDidMount() {
    this.props.dismissMessage();
    this.props.getBusinesses();
  }
  render() {
    const businesses = this.props.businesses;
    return (
      <Fragment>
        <Helmet>
          <title>Businesses - WeConnect</title>
        </Helmet>
        <div className="body">
          <Header />
          <section>
            <div className="container">
              <div className="row heading">
                <div className="col-md-12">
                  <h3 className="v-slim-header text-center text-primary">
                    Businesses on WeConnect<hr className="hr-divider" />
                  </h3>
                </div>
              </div>
            </div>
            <div className="container">
              {businesses.fetching ? (
                <Loading title="Loading recently added businesses" />
              ) : (
                <Fragment>
                  <div className="row justify-content-center">
                    {businesses.success ? (
                      <Fragment>
                        {businesses.businesses.map(business => (
                          <BusinessCard key={business.id} business={business} />
                        ))}
                      </Fragment>
                    ) : (
                      <Warning title={businesses.message} />
                    )}
                  </div>
                  <br />
                  <br />
                </Fragment>
              )}
            </div>
          </section>
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
Businesses.propTypes = {
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
)(Businesses);
