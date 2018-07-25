import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { NavLink } from 'react-router-dom';
import Footer from '../components/Footer';

/**
 * User account views wrapper
 */
export default class Master extends Component {
  render() {
    return (
      <section className="dash-body">
        <Header />
        <section className="content-body">
          <div className="container main-body">
            <div className="row justify-content-center">
              <div className="col-md-3 no-padding">
                <div className="nav flex-column nav-pills sticky-top">
                  <NavLink
                    exact
                    to="/account/businesses/add"
                    activeClassName="active bg-primary"
                    className="nav-link"
                  >
                    <i className="icon ion-ios-add-circle-outline" />&nbsp; Add
                    new business
                  </NavLink>
                  <NavLink
                    exact
                    to="/account/businesses"
                    activeClassName="active bg-primary"
                    className="nav-link"
                  >
                    <i className="icon ion-ios-business" />&nbsp; My businesses
                  </NavLink>
                </div>
              </div>
              <div className="col-md-9 body-content">{this.props.children}</div>
            </div>
          </div>
        </section>
        <Footer color="muted"/>
      </section>
    );
  }
}
Master.propTypes = {
  children: PropTypes.node
};
