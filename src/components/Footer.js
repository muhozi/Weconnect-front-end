import React from 'react';
import PropTypes from 'prop-types';
import logo from '../assets/images/logo.png';

const Footer = props => (
  <section className={(props.color) ?'footer-bg':''}>
    <div className="container">
      <div className="row b-footer">
        <div className="col-md-6">
          <img src={logo} className="f-logo" alt="weconnect"/>
          <span className={"text-"+props.color}>We Connect</span> <br />
          <p className={"small slimmy text-"+props.color}>
            Made with <i className="icon ion-ios-heart text-secondary" /> by
            <a href="https://muhozi.github.io" target="__blank"> Emery </a>
          </p>
        </div>
        <div className="col-md-6 text-right m-auto">
          <p className={'small text-'+props.color}>
            <i className="icon ion-ios-pin" /> Nairobi - Kenya {'   '}{' '}
            <i className="icon ion-ios-call" /> (254) 567 349
          </p>
        </div>
      </div>
    </div>
  </section>
);
Footer.propTypes = {
  color: PropTypes.string
};
Footer.defaultProps = {
  color: 'light'
};
export default Footer;
