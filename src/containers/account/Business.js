import React, { Component, Fragment } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import moment from 'moment';
import _ from 'lodash';
import { Loading } from '../../components/Loaders';
import Master from '../Master';
import { getBusiness } from '../../actions/BusinessesActions';
import { deleteBusiness } from '../../actions/UserBusinessesActions';
import userImg from '../../assets/images/user.png';
import { MessageBox, ConfirmAlert } from '../../components';

/** Business details component */
export class Business extends Component {
  constructor() {
    super();
    this.state = {
      delete: false
    };
  }
  componentDidMount() {
    const business_id = this.props.match.params.id;
    this.props.getBusiness(business_id);
  }
  confirmDelete = () => this.setState({ delete: !this.state.delete });
  render() {
    const { business } = this.props;
    return (
      <Master>
        <Helmet>
          <title>
            {business.details && !business.error
              ? business.details.name + ' - WeConnect'
              : 'My Businesses - We Connect'}
          </title>
        </Helmet>
        {business.details ? (
          <Fragment>
            {!business.error ? (
              <Fragment>
                <div className="d-flex justify-content-between">
                  <h2 className="slim-header d-inline-flex">
                    {business.details.name}
                  </h2>
                  <div className="d-inline-d-flex p-2">
                    <button className="d-inline-block action-btn">
                      <i className="icon ion-md-create" />
                    </button>
                    <button
                      className="d-inline-block action-btn"
                      onClick={this.confirmDelete}
                    >
                      <i className="icon ion-ios-trash" />
                    </button>
                  </div>
                </div>
                <span className="text-muted">
                  <i className="icon ion-ios-pin" /> {business.details.city} -{' '}
                  {business.details.country}
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
                            {_.capitalize(moment(review.created_at).fromNow())}
                          </small>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <span className="text-warning">
                    {' '}
                    <i className="icon ion-ios-alert" /> {business.message}
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
        <ConfirmAlert
          state={this.state.delete}
          toggle={this.confirmDelete}
          action={() => this.props.deleteBusiness(business.details.id)}
          working={business.deleting}
          title="Delete this business?"
        >
          <p>
            {' '}
            Do you really want to delete this business? This action can not be
            undone.
          </p>
        </ConfirmAlert>
      </Master>
    );
  }
}

const mapStateToProps = state => ({
  business: state.business
});

const mapDispatchToProps = dispatch => ({
  getBusiness: business_id => getBusiness(dispatch, business_id),
  deleteBusiness: business_id => deleteBusiness(dispatch, business_id)
});
Business.propTypes = {
  /** Get businesses action */
  getBusiness: PropTypes.func,
  deleteBusiness: PropTypes.func,
  myBusinesses: PropTypes.object,
  match: PropTypes.object,
  location: PropTypes.object,
  business: PropTypes.object
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Business);
