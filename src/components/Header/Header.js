import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import logo from '../../assets/logo.png';
import LoggedInButtonBar from './LoggedInButtonBar/LoggedInButtonBar';
import LoggedOutButtonBar from './LoggedOutButtonBar/LoggedOutButtonBar';

class Header extends Component {
  render() {
    return (
      <nav className="navbar navbar-dark bg-primary navbar-expand-lg">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarToggler"
          aria-controls="navbarToggler"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarToggler">
          <Link className="navbar-brand" to="/">
            <img src={logo} alt="" height="40" />
          </Link>
          {this.props.auth.isAuthenticated ? <LoggedInButtonBar /> : <LoggedOutButtonBar />}
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  null
)(withRouter(Header));
