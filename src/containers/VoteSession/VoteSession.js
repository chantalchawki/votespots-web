import React, { Component } from 'react';
import axios from 'axios';
import message from 'antd/lib/message';

import VoteBar from '../../components/VoteBar/VoteBar';

export default class VoteSession extends Component {
  state = {
    id: '',
    name: '',
    headers: [],
    results: []
  };

  async componentDidMount() {
    await this.setState({ id: this.props.match.params.id });
    try {
      const vote = (await axios.get(`/api/vote/${this.state.id}`)).data;
      this.setState({
        name: vote.name,
        headers: vote.headers,
        results: vote.results
      });
    } catch (error) {
      message.error('An error occured while getting the vote data.');
      console.log(error);
    }
    // Connect to the Socket
  }

  submitVote = async header => {
    const idCheck = localStorage.getItem(this.state.id);
    if (idCheck) {
      message.error('You cannot vote twice.');
      return;
    }

    // integrate with Backend
    try {
      await axios.post(`/api/vote/${this.state.id}/${header}`);
      localStorage.setItem(this.state.id, true);
      message.success('Thank you for voting!');
    } catch (error) {
      message.success('An Error Occured.');
      console.log(error);
    }
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
