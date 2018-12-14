import React, { Component } from 'react';
import axios from 'axios';

export default class CreateVote extends Component {
  state = {
    name: '',
    headers: ''
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmit = async event => {
    event.preventDefault();
    // Integrate with Backend
    try {
      const result = await axios.post('/api/vote/', {
        name: this.state.name,
        headers: this.state.headers.split(';')
      });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { name, headers } = this.state;
    return (
      <div className="container-fluid">
        <div className="row height-100 justify-content-center align-items-center">
          <div className="col-lg-4 col-md-7 d-flex">
            <div className="flex-fill py-4">
              <h1 className="h2 text-center mb-4">Create Voting Session</h1>
              <form onSubmit={this.onSubmit}>
                <label htmlFor="name">Vote Name</label>
                <input
                  name="name"
                  type="text"
                  value={name}
                  className="form-control mb-3"
                  placeholder="Vote Name"
                  onChange={this.onChange}
                />

                <label htmlFor="headers">Voting Headers</label>
                <input
                  name="headers"
                  type="text"
                  value={headers}
                  className="form-control"
                  placeholder="Voting Headers"
                  onChange={this.onChange}
                />
                <small class="form-text text-muted mb-4">
                  Enter different voting headers separated by a semicolon.
                </small>

                <button type="submit" className="btn btn-primary btn-block btn-lg">
                  Create Voting Session
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
