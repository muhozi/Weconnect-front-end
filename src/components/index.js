import React from 'react';
import PropTypes from 'prop-types';
import { InputGroup } from './Form';
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from 'reactstrap';

/** Error message component */
export const Error = props =>
  props.errors[props.name] ? (
    <div className={'col-sm-' + props.size + ' small text-danger'}>
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

export const MessageBox = props => (
  <div
    style={{
      minHeight: '60vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}
    className="text-center"
  >
    <h4 className={'slim-header text-center text-' + (props.state || 'muted')}>
      <i className="icon ion-ios-alert" />
      {'   '}
      {props.message}
    </h4>
  </div>
);
export const ConfirmAlert = props => (
  <Modal isOpen={props.state} toggle={props.toggle} backdrop="static">
    <ModalHeader toggle={this.toggle}>{props.title}</ModalHeader>
    <ModalBody>{props.children}</ModalBody>
    <ModalFooter>
      <Button
        color="secondary"
        size="sm"
        onClick={props.action}
        disabled={props.working}
      >
        Yes, delete
      </Button>{' '}
      <Button
        color="outline-secondary"
        size="sm"
        onClick={props.toggle}
        disabled={props.working}
      >
        Cancel
      </Button>
    </ModalFooter>
  </Modal>
);
Error.propTypes = {
  /** Errors object ex: [{"username":["username has been taken"]}]*/
  errors: PropTypes.object,
  /**  Error key */
  name: PropTypes.string,
  /**  Error div size */
  size: PropTypes.string
};
MessageBox.propTypes = {
  /**  Message */
  message: PropTypes.string,
  state: PropTypes.string
};
ConfirmAlert.propTypes = {
  /**  Message */
  children: PropTypes.node,
  state: PropTypes.bool,
  working: PropTypes.bool,
  toggle: PropTypes.func,
  title: PropTypes.string,
  action: PropTypes.func
};
Error.defaultProps = {
  errors: {},
  name: '',
  size: '9'
};
export { InputGroup };
