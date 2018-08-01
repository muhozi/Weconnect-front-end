import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import businessImg from '../assets/images/building.png';

/**
 *   Home page Component
 */
const SingleBusiness = props => {
  const business = props.business;
  return (
    <div className="col-md-3">
      <div className="card business-card" style={{ marginTop: '40px' }}>
        <Link to={'/business/' + business.id} className="text-center">
          <img
            src={businessImg}
            alt="business-logo"
            className="hover-business-img img-fluid m-auto"
          />
        </Link>
        <Link to={'/business/' + business.id}>
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

SingleBusiness.propTypes = {
  // Business details
  business: PropTypes.object
};
export default SingleBusiness;