import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { Loading, Warning } from '../components/Loaders';
import BusinessCard from '../components/SingleBusinessCard';
import { logout } from '../actions/AuthActions';
import { searchBusiness } from '../actions/BusinessesActions';
import logo from '../assets/images/logo.png';

const CheckBox = props => (
  <div className="custom-control custom-checkbox custom-control-inline">
    <input
      type="checkbox"
      id={props.name + 'Id'}
      name={props.name}
      className="custom-control-input"
      {...props}
    />
    <label className="custom-control-label" htmlFor={props.name + 'Id'}>
      <small>{_.capitalize(props.name)}</small>
    </label>
  </div>
);
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      search: '',
      allSearch: true,
      name: true,
      category: true,
      city: true,
      country: true
    };
  }
  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };
  searchFilters = () => {
    return {
      allSearch: this.state.allSearch,
      name: this.state.name,
      category: this.state.category,
      city: this.state.city,
      country: this.state.country
    };
  };
  handleChange = e => {
    const value = this.state;
    value[e.target.name] =
      e.target.type === 'checkbox'
        ? !this.state[e.target.name]
        : e.target.value;
    this.setState(value);
    if (
      value.name &&
      value.category &&
      value.city &&
      value.country
    ) {
      this.setState({ allSearch: true });
    } else {
      this.setState({ allSearch: false });
    }
    this.props.searchBusiness(this.state.search.trim(), this.searchFilters());
  };
  handleCheckChange = e => {
    const value = this.state;
    value['allSearch'] = !this.state.allSearch;
    if (value.allSearch){
      value['name'] = value.allSearch;
      value['category'] = value.allSearch;
      value['country'] = value.allSearch;
      value['city'] = value.allSearch;
    }
    this.setState(value);
    this.props.searchBusiness(this.state.search.trim(), this.searchFilters());
  };
  render() {
    const { auth, logout, businessesResult } = this.props;
    return (
      <Fragment>
        <Navbar
          style={{ backgroundColor: 'rgba(206, 203, 203, 0.76' }}
          light
          expand="md"
        >
          <div className="container no-pad">
            <Link to="/" className="logo-header navbar-brand">
              <img
                src={logo}
                height={30}
                className="d-inline-block align-top"
                alt="Logo"
              />{' '}
              <h5 className="slim-header d-inline-block">We Connect</h5>
            </Link>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <div className="col-md-7 no-padding">
                <form
                  className="form-inline"
                  action="#"
                  method="post"
                  onSubmit={e => {
                    e.preventDefault();
                    return false;
                  }}
                >
                  <div className="input-group col-md-12 input-group-sm">
                    <div className="input-group-prepend">
                      <div className="input-group-text">
                        <i className="icon ion-ios-search" />
                      </div>
                    </div>
                    <input
                      type="text"
                      name="search"
                      value={this.state.search}
                      onChange={this.handleChange}
                      className="form-control"
                      placeholder="Search for business..."
                    />
                  </div>
                </form>
              </div>
              <Nav className="ml-auto" navbar>
                {auth.logged_in === true ? (
                  <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                      {auth.user.username}&nbsp;&nbsp;&nbsp;
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem>
                        <Link to="/account">My account</Link>
                      </DropdownItem>
                      <DropdownItem onClick={logout}>Logout</DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                ) : (
                  <Fragment>
                    <NavItem>
                      <Link to="/register" className="nav-link">
                        Create account
                      </Link>
                    </NavItem>
                    <NavItem>
                      <Link to="/login" className="nav-link">
                        <Button color="primary" size="sm" className="sign-btn">
                          Login
                        </Button>
                      </Link>
                    </NavItem>
                  </Fragment>
                )}
              </Nav>
            </Collapse>
          </div>
        </Navbar>
        {this.state.search && (
          <section className="search-result">
            <div className="container search-container">
              <div className="row">
                {/* <div className="col-md-12 text-dark text-right no-padding search-filters">
                  <CheckBox
                    name="all"
                    checked={this.state.allSearch}
                    onChange={this.handleCheckChange}
                  />
                  <CheckBox
                    name="name"
                    checked={this.state.name}
                    onChange={this.handleChange}
                  />
                  <CheckBox
                    name="category"
                    checked={this.state.category}
                    onChange={this.handleChange}
                  />
                  <CheckBox
                    name="country"
                    checked={this.state.country}
                    onChange={this.handleChange}
                  />
                  <CheckBox
                    name="city"
                    checked={this.state.city}
                    onChange={this.handleChange}
                  />
                </div> */}
                <div className="col-md-12 text-dark text-center">
                  Search for: {this.state.search}
                </div>
                <div className="col-md-12 text-dark text-center">
                  {businessesResult.message}
                </div>
              </div>
              {businessesResult.fetching ? (
                <Loading title={businessesResult.message} />
              ) : (
                <Fragment>
                  <div className="row justify-content-center">
                    {businessesResult.success ? (
                      <Fragment>
                        {businessesResult.businesses.map(business => (
                          <BusinessCard key={business.id} business={business} />
                        ))}
                      </Fragment>
                    ) : (
                      <Warning title={businessesResult.message} />
                    )}
                  </div>
                  <br />
                  <br />
                </Fragment>
              )}
            </div>
          </section>
        )}
      </Fragment>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth,
  businessesResult: state.businessesResult
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
  searchBusiness: (query, filters) => dispatch(searchBusiness(query,filters))
});
Header.propTypes = {
  auth: PropTypes.object,
  logout: PropTypes.func,
  searchBusiness: PropTypes.func,
  businessesResult: PropTypes.object
};
CheckBox.propTypes = {
  name: PropTypes.string
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
