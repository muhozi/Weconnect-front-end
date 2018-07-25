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
import userImg from '../assets/images/user.png';
import businessImg from '../assets/images/building.png';
import { MessageBox } from '../components';

/** Business details component */
export class Business extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    const business_id = this.props.match.params.id;
    this.props.getBusiness(business_id);
  }

  handleChange = e => {
    const value = {};
    const edits = this.state.edits;
    edits[e.target.name] = true;
    value['edits'] = edits;
    value[e.target.name] = e.target.value;
    this.setState(value);
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
                        {business.reviews.length > 0 ? (
                          <ul className="list-unstyled">
                            <hr />
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
                                      moment(review.created_at).fromNow()
                                    )}
                                  </small>
                                </div>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <span>
                            {' '}
                            {/* <i className="icon ion-ios-alert" />{' '} */}
                            {/* {business.message} */}
                            {auth.logged_in ? (
                              <form>
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
                                    <textarea
                                      className="form-control"
                                      placeholeder="Add your review about this business ..."
                                    />
                                  </div>
                                  <div>
                                    <small />
                                  </div>
                                </div>
                              </form>
                            ) : (
                              <div>
                                <h4 className="slimmy">
                                  Loggin to add a review
                                </h4>
                              </div>
                            )}
                          </span>
                        )}
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
  message: state.businessUpdateMsg
});

const mapDispatchToProps = dispatch => ({
  getBusiness: business_id => dispatch(getBusiness(business_id)),
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
  dismissMessage: PropTypes.func
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Business);
