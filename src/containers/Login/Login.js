import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { loginUser } from '../../actions/authActions';

class Login extends Component {
  state = {
    email: '',
    password: ''
  };
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/');
    }
  }
  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  onSubmit = async event => {
    event.preventDefault();

    // Integrate with Backend
    this.props.loginUser(
      {
        email: this.state.email,
        password: this.state.password
      },
      this.props.history
    );
  };

  render() {
    const { email, password } = this.state;
    return (
      <div className="container-fluid">
        <div className="row height-100 justify-content-center align-items-center">
          <div className="col-lg-4 col-md-7 d-flex">
            <div className="flex-fill py-4">
              <h1 className="h2 text-center mb-4">Login</h1>
              <form onSubmit={this.onSubmit}>
                <label htmlFor="email">Email</label>
                <input
                  name="email"
                  type="text"
                  value={email}
                  className="form-control mb-3"
                  placeholder="Email"
                  onChange={this.onChange}
                />

                <label htmlFor="password">Password</label>
                <input
                  name="password"
                  type="password"
                  value={password}
                  className="form-control mb-4"
                  placeholder="Password"
                  onChange={this.onChange}
                />

                <button type="submit" className="btn btn-primary btn-block btn-lg">
                  Log in
                </button>
              </form>
              <div className="text-center text-small mt-3">
                <span>Don't have an account? </span>
                <Link to="/register">Sign up here</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { loginUser }
)(withRouter(Login));
