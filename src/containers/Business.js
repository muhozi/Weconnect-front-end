import React, { Component, Fragment } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import moment from 'moment';
import _ from 'lodash';
import { Loading } from '../components/Loaders';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getBusiness } from '../actions/BusinessesActions';
import { addReview } from '../actions/UserBusinessesActions';
import userImg from '../assets/images/user.png';
import businessImg from '../assets/images/building.png';
import { MessageBox } from '../components';

/** Business details component */
export class Business extends Component {
  constructor() {
    super();
    this.state = {
      review: ''
    };
  }

  componentDidMount() {
    const business_id = this.props.match.params.id;
    this.props.getBusiness(business_id);
  }

  handleChange = e => {
    const value = {};
    value[e.target.name] = e.target.value;
    this.setState(value);
  };
  addReview = e => {
    e.preventDefault();
    const data = {
      business_id: this.props.business.details.id,
      review: this.state.review
    };
    this.props.addReview(data).then(() => {
      this.setState({ review: '' });
    });
  };
  render() {
    const { business, auth } = this.props;
    return (
      <div className="body">
        <Helmet>
          <title>
            {business.details && !business.error
              ? business.details.name + ' - WeConnect'
              : '- We Connect'}
          </title>
        </Helmet>
        <Header />
        <section className="detailed-content">
          <div className="container">
            <div className="row">
              <div className="col-md-4 text-center">
                <img
                  src={businessImg}
                  alt="business-logo"
                  className="hovered-business-img img-fluid m-auto"
                />
              </div>
              <div className="col-md-8">
                {business.details ? (
                  <Fragment>
                    {!business.error ? (
                      <Fragment>
                        <div className="d-flex justify-content-between">
                          <h2 className="slim-header d-inline-flex">
                            {business.details.name}
                          </h2>
                        </div>
                        <span className="text-muted">
                          <i className="icon ion-ios-pin" />{' '}
                          {business.details.city} - {business.details.country}
                          <br />
                          <br />
                        </span>
                        <p>{business.details.description}</p>
                        <h6 className="slim-header text-muted">
                          <i className="icon ion-ios-chatbubbles" /> Reviews ({
                            business.details.reviews_count
                          })<br />
                          <br />
                        </h6>
                        <Fragment>
                          {auth.logged_in ? (
                            <form onSubmit={this.addReview}>
                              <div className="media review">
                                <div className="mr-3">
                                  <img
                                    src={userImg}
                                    style={{ height: '40px' }}
                                    alt="User"
                                  />
                                </div>
                                <div className="media-body">
                                  <h6 className="mt-0 mb-1">{}</h6>
                                  <div className="review-textarea-wrapper">
                                    <textarea
                                      name="review"
                                      className="form-control review-textarea"
                                      placeholder="Add your review about this business ..."
                                      onChange={this.handleChange}
                                      value={this.state.review}
                                    />
                                    <div className="text-right">
                                      <button
                                        type="submit"
                                        className="btn btn-primary btn-sm rounded-circle send-review-btn"
                                        disabled={
                                          this.props.review.loading
                                            ? true
                                            : false
                                        }
                                      >
                                        <i className="icon ion-md-send" />
                                      </button>
                                    </div>
                                  </div>
                                </div>
                                <div>
                                  <small />
                                </div>
                              </div>
                            </form>
                          ) : (
                            <div>
                              <h6 className="slimmy text-right text-muted">
                                Log in to add a review
                              </h6>
                            </div>
                          )}
                        </Fragment>
                        {business.reviews.length > 0 ? (
                          <ul className="list-unstyled">
                            {business.reviews.map(review => (
                              <li key={review.id} className="media review">
                                <div className="mr-3">
                                  <img
                                    src={userImg}
                                    style={{ height: '40px' }}
                                    alt="User"
                                  />
                                </div>
                                <div className="media-body">
                                  <h6 className="mt-0 mb-1">{review.user}</h6>
                                  {review.description}
                                </div>
                                <div>
                                  <small>
                                    {_.capitalize(
                                      moment(
                                        review.created_at,
                                        'ddd, DD MMM YYYY HH:mm:ss'
                                      ).fromNow()
                                    )}
                                  </small>
                                </div>
                              </li>
                            ))}
                          </ul>
                        ) : null}
                      </Fragment>
                    ) : (
                      <MessageBox message={business.message} state="danger" />
                    )}
                  </Fragment>
                ) : (
                  <Loading title={business.message} />
                )}
              </div>
            </div>
          </div>
        </section>
        <Footer color="muted" />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  business: state.business,
  auth: state.auth,
  review: state.review,
  message: state.businessUpdateMsg
});

const mapDispatchToProps = dispatch => ({
  getBusiness: business_id => dispatch(getBusiness(business_id)),
  addReview: data => dispatch(addReview(data)),
  dismissMessage: (error = true) => {
    if (error) {
      return dispatch({ type: 'DISMISS_UPDATE_BUSINESS_MESSAGE' });
    } else {
      return null;
    }
  }
});
Business.propTypes = {
  /** Get businesses action */
  getBusiness: PropTypes.func,
  match: PropTypes.object,
  location: PropTypes.object,
  business: PropTypes.object,
  message: PropTypes.object,
  auth: PropTypes.object,
  dismissMessage: PropTypes.func,
  addReview: PropTypes.func,
  review: PropTypes.object
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Business);
