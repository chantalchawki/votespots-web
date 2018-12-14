import React, { Component } from 'react';
import logo from '../../assets/logo.png';

export default class Header extends Component {
  render() {
    return (
      <nav className="navbar navbar-dark bg-primary">
        <a className="navbar-brand" href="/">
          <img src={logo} alt="" height="40" />
        </a>
      </nav>
    );
  }
}
