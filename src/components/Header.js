import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logout } from '../actions/AuthActions';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.png';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
  }
  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };
  render() {
    const { auth, logout } = this.props;
    return (
      <Fragment>
        <Navbar
          style={{ backgroundColor: 'rgba(206, 203, 203, 0.76' }}
          light
          expand="md"
        >
          <div className="container no-pad">
            <NavbarBrand href="/" className="logo-header">
              <img
                src={logo}
                height={30}
                className="d-inline-block align-top"
                alt="Logo"
              />{' '}
              <h5 className="slim-header d-inline-block">We Connect</h5>
            </NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <div className="col-md-7 no-padding">
                <form
                  className="form-inline"
                  action="searchResults.html"
                  method="post"
                >
                  <div className="input-group col-md-12 input-group-sm">
                    <div className="input-group-prepend">
                      <div className="input-group-text">
                        <i className="icon ion-ios-search" />
                      </div>
                    </div>
                    <input
                      type="text"
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
      </Fragment>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
});
Header.propTypes = {
  auth: PropTypes.object,
  logout: PropTypes.func
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
