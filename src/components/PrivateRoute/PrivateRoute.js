import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router';

const PrivateRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={props => (auth.isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />)}
  />
);

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);
