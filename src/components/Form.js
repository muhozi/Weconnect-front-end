import React from 'react';
import { PropTypes } from 'prop-types';
export const InputGroup = props => (
  <div className="input-group input-group-sm col-md-9">
    <div className="input-group-prepend">
      <div className="input-group-text">
        <i className={props.icon} />
      </div>
    </div>
    <input className="form-control" {...props} />
  </div>
);
InputGroup.propTypes = {
  icon: PropTypes.string
};
