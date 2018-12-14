import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import { logoutUser } from '../../../actions/authActions';

const LoggedInButtonBar = props => (
  <div className="d-flex button-bar">
    <Link to="/vote/create" className="btn btn-outline-light mr-3">
      Create Vote
    </Link>
    <button className="btn btn-outline-light" onClick={() => props.logoutUser(props.history)}>
      Logout
    </button>
  </div>
);

export default connect(
  null,
  { logoutUser }
)(withRouter(LoggedInButtonBar));
