import React from 'react';
import { Link } from 'react-router-dom';

const LoggedOutButtonBar = props => (
  <div className="d-flex button-bar">
    <Link to="/login" className="btn btn-outline-light mr-3">
      Login
    </Link>
    <Link to="/register" className="btn btn-outline-light">
      Register
    </Link>
  </div>
);

export default LoggedOutButtonBar;
