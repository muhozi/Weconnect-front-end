import React, { Component, Fragment } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import moment from 'moment';
import _ from 'lodash';
import { Alert } from 'reactstrap';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import { Loading } from '../../components/Loaders';
import Master from '../Master';
import { getBusiness } from '../../actions/BusinessesActions';
import {
  deleteBusiness,
  updateBusiness,
  editBusiness
} from '../../actions/UserBusinessesActions';
import userImg from '../../assets/images/user.png';
import { MessageBox, PopModal, InputGroup, Error } from '../../components';

/** Business details component */
export class Business extends Component {
  constructor() {
    super();
    this.state = {
      delete: false,
      edit: false,
      name: '',
      description: '',
      category: '',
      country: '',
      city: '',
      edits: {}
    };
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

  confirmDelete = () => this.setState({ delete: !this.state.delete });

  editModal = () => this.props.editBusiness(!this.props.message.edit);

  selectCountry = val => {
    this.setState({ country: val });
  };

  selectRegion = val => {
    this.setState({ city: val });
  };

  getValue = name => {
    if (!this.state.edits[name]) {
      return this.props.business.details[name];
    }
    return this.state[name];
  };

  updateBusiness = e => {
    e.preventDefault();
    const data = {
      name: this.getValue('name'),
      description: this.getValue('description'),
      category: this.getValue('category'),
      country: this.getValue('country'),
      city: this.getValue('city'),
      business_id: this.props.business.details.id
    };
    this.props.updateBusiness(data);
  };

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
                    <button
                      className="d-inline-block action-btn"
                      onClick={this.editModal}
                    >
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
                <PopModal
                  state={this.state.delete}
                  toggle={this.confirmDelete}
                  action={() => this.props.deleteBusiness(business.details.id)}
                  working={business.deleting}
                  title="Delete this business?"
                  actionName="Yes, delete"
                >
                  <p>
                    {' '}
                    Do you really want to delete this business? This action can
                    not be undone.
                  </p>
                </PopModal>
                <PopModal
                  state={this.props.message.edit}
                  toggle={this.editModal}
                  action={this.updateBusiness}
                  working={business.deleting}
                  title="Edit Business"
                  size="lg"
                  actionName="Update business"
                  color="primary"
                >
                  <form method="post" onSubmit={this.updateBusiness}>
                    {this.props.message.message && (
                      <div className="form-group row justify-content-center">
                        <div className="col-md-8">
                          <Alert
                            color={
                              this.props.message.error ? 'danger' : 'success'
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
                    )}
                    <div className="form-group row justify-content-center">
                      <InputGroup
                        onChange={this.handleChange}
                        name="name"
                        placeholder="Business name ..."
                        icon="icon ion-ios-card"
                        value={this.getValue('name')}
                        autoComplete="off"
                        size="8"
                      />
                      <Error
                        errors={this.props.message.errors}
                        name="name"
                        size="8"
                      />
                    </div>
                    <div className="form-group row justify-content-center">
                      <InputGroup
                        onChange={this.handleChange}
                        name="category"
                        placeholder="Business category ..."
                        icon="icon ion-md-business"
                        value={this.getValue('category')}
                        autoComplete="off"
                        size="8"
                      />
                      <Error
                        errors={this.props.message.errors}
                        name="category"
                        size="8"
                      />
                    </div>
                    <div className="form-group row justify-content-center">
                      <div className="input-group input-group-sm col-sm-8">
                        <div className="input-group-prepend">
                          <div
                            className="input-group-text"
                            style={{ alignItems: 'flex-start' }}
                          >
                            <i className="icon ion-ios-document" />
                          </div>
                        </div>
                        <textarea
                          name="description"
                          value={this.getValue('description')}
                          onChange={this.handleChange}
                          className="form-control form-control-sm"
                          style={{ minHeight: '160px' }}
                          placeholder="Describe your business..."
                        />
                      </div>
                      <Error
                        errors={this.props.message.errors}
                        name="description"
                        size="8"
                      />
                    </div>
                    <div className="form-group row justify-content-center">
                      <div className="input-group input-group-sm col-sm-8">
                        <div className="input-group-prepend">
                          <div className="input-group-text">
                            <i className="icon ion-ios-map" />
                          </div>
                        </div>
                        <CountryDropdown
                          value={this.getValue('country')}
                          onChange={val => this.selectCountry(val)}
                          classes="form-control custom-select"
                          defaultOptionLabel="Select a country where business is located ..."
                        />
                      </div>
                      <Error
                        errors={this.props.message.errors}
                        name="country"
                        size="8"
                      />
                    </div>
                    <div className="form-group row justify-content-center">
                      <div className="input-group input-group-sm col-sm-8">
                        <div className="input-group-prepend">
                          <div className="input-group-text">
                            <i className="icon ion-ios-pin" />
                          </div>
                        </div>
                        <RegionDropdown
                          country={this.getValue('country')}
                          value={this.getValue('city')}
                          onChange={val => this.selectRegion(val)}
                          classes="form-control custom-select"
                          blankOptionLabel="City where business is located..."
                          defaultOptionLabel="Select city..."
                        />
                      </div>
                      <Error
                        errors={this.props.message.errors}
                        name="city"
                        size="8"
                      />
                    </div>
                    <br />
                  </form>
                </PopModal>
              </Fragment>
            ) : (
              <MessageBox message={business.message} state="danger" />
            )}
          </Fragment>
        ) : (
          <Loading title={business.message} />
        )}
      </Master>
    );
  }
}

const mapStateToProps = state => ({
  business: state.business,
  message: state.businessUpdateMsg
});

const mapDispatchToProps = dispatch => ({
  updateBusiness: data => updateBusiness(dispatch, data),
  getBusiness: business_id => getBusiness(dispatch, business_id),
  deleteBusiness: business_id => deleteBusiness(dispatch, business_id),
  dismissMessage: (error = true) => {
    if (error) {
      return dispatch({ type: 'DISMISS_UPDATE_BUSINESS_MESSAGE' });
    } else {
      return null;
    }
  },
  editBusiness: state => dispatch(editBusiness(state))
});
Business.propTypes = {
  /** Get businesses action */
  getBusiness: PropTypes.func,
  deleteBusiness: PropTypes.func,
  myBusinesses: PropTypes.object,
  match: PropTypes.object,
  location: PropTypes.object,
  business: PropTypes.object,
  message: PropTypes.object,
  dismissMessage: PropTypes.func,
  updateBusiness: PropTypes.func,
  editBusiness: PropTypes.func
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Business);
