import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Register extends Component {
  state = {
    name: '',
    email: '',
    password: ''
  };

  onSubmit = event => {
    event.preventDefault();

    // Integrate with Backend
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { name, email, password } = this.state;
    return (
      <div className="container-fluid">
        <div className="row height-100 justify-content-center align-items-center">
          <div className="col-lg-4 col-md-7 d-flex">
            <div className="flex-fill py-4">
              <h1 className="h2 text-center mb-4">Register</h1>
              <form onSubmit={this.onSubmit}>
                <label htmlFor="name">Name</label>
                <input
                  name="name"
                  type="text"
                  value={name}
                  className="form-control mb-3"
                  placeholder="Name"
                  onChange={this.onChange}
                />

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
                  Create account
                </button>
              </form>
              <div className="text-center text-small mt-3">
                <span>Already have an account? </span>
                <Link to="/login">Login here</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
