import React from 'react';
import PropTypes from 'prop-types';

/** Error message component */
export const Error = props =>
  props.errors[props.name] ? (
    <div className="col-sm-9 small text-danger">
      <span>
        {props.errors[props.name].map((error, key) => (
          <i key={key}>
            {error}
            {props.errors[props.name][key + 1] === undefined ? null : ', '}
          </i>
        ))}
      </span>
    </div>
  ) : null;
Error.propTypes = {
  /** Errors object ex: [{"username":["username has been taken"]}]*/
  errors: PropTypes.object,
  /**  Error key */
  name: PropTypes.string
};