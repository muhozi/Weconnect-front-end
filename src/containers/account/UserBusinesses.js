import React, { Component, Fragment } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import _ from 'lodash';
import { Alert } from 'reactstrap';
import Master from '../Master';
import { getMyBusinesses } from '../../actions/UserBusinessesActions';
import { Loading } from '../../components/Loaders';
import businessImg from '../../assets/images/business.png';
import { MessageBox } from '../../components';

/** User businesses component */
const BusinessRow = props => (
  <Link
    to={{
      pathname: '/account/business/' + props.business.id,
      state: {
        business: props.business
      }
    }}
  >
    <li className="media review">
      <div className="mr-3">
        <img
          src={businessImg}
          alt="business-logo"
          className="rounded-circle business-hover-img"
        />
      </div>
      <div className="media-body">
        <h5 className="slim-header mt-0 mb-1">{props.business.name}</h5>
        <p>
          <small>
            <i className="icon ion-ios-pin" />
            {'  '}
            {props.business.city} - {props.business.country}
          </small>
        </p>
      </div>
      <div>
        <small>
          <i className="icon ion-ios-chatbubbles" />{' '}
          {props.business.reviews_count}
        </small>
      </div>
    </li>
  </Link>
);
export class Businesses extends Component {
  componentDidMount() {
    const page = this.props.match.params.page;
    this.props.getMyBusinesses(page);
  }
  componentWillUnmount() {
    this.props.dismissMessage();
  }
  render() {
    const { myBusinesses } = this.props;
    return (
      <Master>
        <Helmet>
          <title>My Businesses - We Connect</title>
        </Helmet>
        {this.props.message.message && (
          <div className="form-group row justify-content-center">
            <div className="col-md-8">
              <Alert
                color={this.props.message.error ? 'danger' : 'success'}
                isOpen={this.props.message.error || this.props.message.success}
                toggle={this.props.dismissMessage}
              >
                {this.props.message.message}
              </Alert>
            </div>
          </div>
        )}
        {myBusinesses.businesses && myBusinesses.businesses.length > 0 ? (
          <Fragment>
            <ul className="list-unstyled">
              {myBusinesses.businesses.map(business => (
                <BusinessRow key={business.id} business={business} />
              ))}
            </ul>
            {(myBusinesses.previous_page || myBusinesses.next_page) && (
              <ul
                aria-label="Business Pagination"
                className="justify-content-center pagination"
              >
                {myBusinesses.previous_page && (
                  <li className="page-item">
                    <Link
                      to={{
                        pathname:
                          '/account/businesses/page/' +
                          myBusinesses.previous_page
                      }}
                      onClick={() =>
                        this.props.getMyBusinesses(myBusinesses.previous_page)
                      }
                      className="page-link"
                    >
                      <i className="icon ion-md-arrow-back" />
                      <span className="sr-only">Previous</span>
                    </Link>
                  </li>
                )}
                {_.range(1, myBusinesses.pages + 1).map((value, key) => (
                  <Fragment key={key}>
                    {key >= myBusinesses.current_page - 4 &&
                      key < myBusinesses.current_page + 3 && (
                      <li
                        className={
                          value === myBusinesses.current_page
                            ? 'page-item active'
                            : 'page-item'
                        }
                      >
                        <Link
                          to={{
                            pathname: '/account/businesses/page/' + value
                          }}
                          onClick={() => this.props.getMyBusinesses(value)}
                          className="page-link"
                        >
                          {value}
                        </Link>
                      </li>
                    )}
                  </Fragment>
                ))}

                {myBusinesses.next_page && (
                  <li className="page-item">
                    <Link
                      to={{
                        pathname:
                          '/account/businesses/page/' + myBusinesses.next_page
                      }}
                      onClick={() =>
                        this.props.getMyBusinesses(myBusinesses.next_page)
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
          </Fragment>
        ) : (
          <Fragment>
            {myBusinesses.fetching ? (
              <Loading title="Loading businesses" />
            ) : (
              <MessageBox message={myBusinesses.message} />
            )}
          </Fragment>
        )}
      </Master>
    );
  }
}

const mapStateToProps = state => ({
  myBusinesses: state.myBusinesses,
  message: state.businessMessage
});

const mapDispatchToProps = dispatch => ({
  getMyBusinesses: page => dispatch(getMyBusinesses(page)),
  dismissMessage: () => dispatch({ type: 'DISMISS_BUSINESS_MESSAGE' })
});
Businesses.propTypes = {
  /** Get businesses action */
  getMyBusinesses: PropTypes.func,
  myBusinesses: PropTypes.object,
  match: PropTypes.object,
  message: PropTypes.object,
  dismissMessage: PropTypes.func
};
BusinessRow.propTypes = {
  business: PropTypes.object
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Businesses);
