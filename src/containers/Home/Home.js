import React, { Component } from 'react';
import VoteCard from '../../components/VoteCard/VoteCard';

export default class Home extends Component {
  state = {
    votingSessions: [
      { id: 1, name: 'Voting 1' },
      { id: 2, name: 'Voting 2' },
      { id: 3, name: 'Voting 3' },
      { id: 4, name: 'Voting 4' },
      { id: 5, name: 'Voting 5' },
      { id: 6, name: 'Voting 6' }
    ]
  };

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
              <VoteCard id={vote.id} name={vote.name} />
            ))}
          </div>
        )}
      </div>
    );
  }
}
