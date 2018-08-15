import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import _ from 'lodash';
import { Link } from 'react-router-dom';
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
    const page = this.props.match.params.page;
    this.props.getBusinesses(page);
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
                <Loading title={businesses.message} />
              ) : (
                <Fragment>
                  <div className="row justify-content-center">
                    {businesses.success ? (
                      <Fragment>
                        {businesses.businesses.map(business => (
                          <BusinessCard key={business.id} business={business} />
                        ))}
                        <div className="divided">
                          {(businesses.previous_page ||
                            businesses.next_page) && (
                            <ul
                              aria-label="Business Pagination"
                              className="justify-content-center pagination"
                            >
                              {businesses.previous_page && (
                                <li className="page-item">
                                  <Link
                                    to={{
                                      pathname:
                                        '/businesses/page/' +
                                        businesses.previous_page
                                    }}
                                    onClick={() =>
                                      this.props.getBusinesses(
                                        businesses.previous_page
                                      )
                                    }
                                    className="page-link"
                                  >
                                    <i className="icon ion-md-arrow-back" />
                                    <span className="sr-only">Previous</span>
                                  </Link>
                                </li>
                              )}
                              {_
                                .range(1, businesses.pages + 1)
                                .map((value, key) => (
                                  <Fragment key={key}>
                                    {key >= businesses.current_page - 4 &&
                                      key < businesses.current_page + 3 && (
                                      <li
                                        className={
                                          value === businesses.current_page
                                            ? 'page-item active'
                                            : 'page-item'
                                        }
                                      >
                                        <Link
                                          to={{
                                            pathname:
                                                '/businesses/page/' + value
                                          }}
                                          onClick={() =>
                                            this.props.getBusinesses(value)
                                          }
                                          className="page-link"
                                        >
                                          {value}
                                        </Link>
                                      </li>
                                    )}
                                  </Fragment>
                                ))}

                              {businesses.next_page && (
                                <li className="page-item">
                                  <Link
                                    to={{
                                      pathname:
                                        '/businesses/page/' +
                                        businesses.next_page
                                    }}
                                    onClick={() =>
                                      this.props.getBusinesses(
                                        businesses.next_page
                                      )
                                    }
                                    className="page-link"
                                  >
                                    <span aria-hidden="true">
                                      <i className="icon ion-md-arrow-forward" />
                                    </span>
                                    <span className="sr-only">Next</span>
                                  </Link>
                                </li>
                              )}
                            </ul>
                          )}
                        </div>
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
  getBusinesses: page => dispatch(getBusinesses(page)),
  dismissMessage: () => dispatch({ type: 'DISMISS_MESSAGE' })
});
Businesses.propTypes = {
  /** Auth reducer state  */
  auth: PropTypes.object,
  dismissMessage: PropTypes.func,
  // Fetch businesses function
  getBusinesses: PropTypes.func,
  // Businesses
  businesses: PropTypes.object,
  match: PropTypes.object
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Businesses);
