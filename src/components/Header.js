import React, { Component } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Button
} from 'reactstrap';
import { Link } from 'react-router-dom';

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <React.Fragment>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">We Connect</NavbarBrand>
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
              <NavItem>
                <Link to="/register" className="nav-link">
                  Create account
                </Link>
              </NavItem>
              <NavItem>
                <Link to="/login" className="nav-link">
                  <Button color="secondary" size="sm" className="sign-btn">
                    Login
                  </Button>
                </Link>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </React.Fragment>
    );
  }
}
