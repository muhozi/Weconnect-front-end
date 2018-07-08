import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { Alert } from 'reactstrap';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import Master from '../Master';
import { registerBusiness } from '../../actions/UserBusinessesActions';
import { InputGroup, Error } from '../../components';

/** Add new business component */
export class AddBusiness extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      category: '',
      country: '',
      city: ''
    };
  }
  handleChange = e => {
    const value = {};
    value[e.target.name] = e.target.value;
    this.setState(value);
  };
  saveBusiness = e => {
    e.preventDefault();
    return this.props.registerBusiness(this.state);
  };
  componentWillUnmount() {
    this.props.dismissMessage(this.props.message.error);
  }
  selectCountry = val => {
    this.setState({ country: val });
  };

  selectRegion = val => {
    this.setState({ city: val });
  };
  render() {
    const { country, city } = this.state;
    return (
      <Master>
        <h5 className="text-center slim-header">Add new business</h5>
        <hr />
        <form method="post" onSubmit={this.saveBusiness}>
          {this.props.message.message && (
            <div className="form-group row justify-content-center">
              <div className="col-md-8">
                <Alert
                  color={this.props.message.error ? 'danger' : 'success'}
                  isOpen={
                    this.props.message.error || this.props.message.success
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
              value={this.state.name}
              autoComplete="off"
              size="8"
            />
            <Error errors={this.props.message.errors} name="name" size="8" />
          </div>
          <div className="form-group row justify-content-center">
            <InputGroup
              onChange={this.handleChange}
              name="category"
              placeholder="Business category ..."
              icon="icon ion-md-business"
              value={this.state.category}
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
                <div className="input-group-text" style={{ alignItems: 'flex-start'}}>
                  <i className="icon ion-ios-document" />
                </div>
              </div>
              <textarea
                name="description"
                value={this.state.description}
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
                value={country}
                onChange={val => this.selectCountry(val)}
                classes="form-control custom-select"
                defaultOptionLabel="Select a country where business is located ..."
              />
            </div>
            <Error errors={this.props.message.errors} name="country" size="8" />
          </div>
          <div className="form-group row justify-content-center">
            <div className="input-group input-group-sm col-sm-8">
              <div className="input-group-prepend">
                <div className="input-group-text">
                  <i className="icon ion-ios-pin" />
                </div>
              </div>
              <RegionDropdown
                country={country}
                value={city}
                onChange={val => this.selectRegion(val)}
                classes="form-control custom-select"
                blankOptionLabel="City where business is located..."
                defaultOptionLabel="Select city..."
              />
            </div>
            <Error errors={this.props.message.errors} name="city" size="8" />
          </div>
          <br />
          <br />
          <div className="form-group">
            <div className="text-center">
              <button type="submit" className="btn btn-primary btn-sm">
                Save new business
              </button>
            </div>
          </div>
        </form>
      </Master>
    );
  }
}

const mapStateToProps = state => ({
  message: state.businessMessage
});

const mapDispatchToProps = (dispatch, state) => ({
  registerBusiness: data => registerBusiness(dispatch, data),
  dismissMessage: (error = true) => {
    if (error) {
      return dispatch({ type: 'DISMISS_BUSINESS_MESSAGE' });
    } else {
      return null;
    }
  }
});

AddBusiness.propTypes = {
  /** Validate props */
  message: PropTypes.object,
  registerBusiness: PropTypes.func,
  dismissMessage: PropTypes.func
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddBusiness);
