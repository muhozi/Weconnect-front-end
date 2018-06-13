import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { Link } from 'react-router-dom';

class Master extends Component {
  render() {
    return (
      <section className="dash-body">
        <Header />
        <section className="content-body">
          <div className="container main-body">
            <div className="row justify-content-center">
              <div className="col-md-3 no-padding">
                <div className="nav flex-column nav-pills">
                  <Link
                    to="/account/businesses/add"
                    className="nav-link active bg-primary"
                  >
                    <i className="icon ion-ios-add-circle-outline" />&nbsp; Add
                    new business
                  </Link>
                  <Link to="/account/businesses" className="nav-link text-primary">
                    <i className="icon ion-ios-business" />&nbsp; My businesses
                  </Link>
                  <Link
                    to="/account/businesses/reviews"
                    className="nav-link text-primary"
                  >
                    <i className="icon ion-ios-chatbubbles" />&nbsp; Reviews
                  </Link>
                </div>
              </div>
              <div className="col-md-9 body-content">{this.props.children}</div>
            </div>
          </div>
        </section>
        <footer className="text-center text-primary">
          &copy; WeConnect - Made with{' '}
          <i className="icon ion-ios-heart text-secondary" /> by Emery
        </footer>;
      </section>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});
Master.propTypes = {
  children: PropTypes.node
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Master);
