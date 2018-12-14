import React, { Component } from 'react';
import VoteBar from '../../components/VoteBar/VoteBar';

export default class VoteSession extends Component {
  state = {
    id: '',
    name: 'Vote 1',
    headers: ['Header 1', 'Header 2'],
    results: [40, 60]
  };

  componentDidMount() {
    this.setState({ id: this.props.match.params.id });

    // Integrate with Backend

    // Connect to the Socket
  }

  submitVote = header => {
    // integrate with Backend
    console.log('Clicked on', this.state.id, header);
  };

  render() {
    const { name, headers, results } = this.state;
    const totalVotes = results.reduce((prevValue, curValue) => prevValue + curValue, 0);

    return (
      <div className="container p-4 height-100">
        <h2 className="mb-4">{name}</h2>
        {headers.map((header, index) => (
          <VoteBar
            header={header}
            result={results[index]}
            totalVotes={totalVotes}
            submitVote={this.submitVote}
          />
        ))}
      </div>
    );
  }
}
