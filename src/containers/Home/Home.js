import React, { Component } from 'react';
import axios from 'axios';
import message from 'antd/lib/message';

import VoteCard from '../../components/VoteCard/VoteCard';

export default class Home extends Component {
  state = {
    votingSessions: []
  };

  async componentDidMount() {
    try {
      const results = await axios.get('/api/votes');
      this.setState({
        votingSessions: results.data
      });
    } catch (error) {
      message.error('An error occured while getting latest votes.');
      console.log(error);
    }
  }

  render() {
    const { votingSessions } = this.state;
    return (
      <div className="d-flex flex-column p-4 height-100">
        <h2>Latest Voting Sessions:</h2>
        {votingSessions.length === 0 ? (
          <p>There are no voting sessions</p>
        ) : (
          <div class="card-deck">
            {votingSessions.map(vote => (
              <VoteCard id={vote._id} name={vote.name} />
            ))}
          </div>
        )}
      </div>
    );
  }
}
