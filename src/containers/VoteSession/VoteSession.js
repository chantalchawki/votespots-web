import React, { Component } from 'react';
import axios from 'axios';
import message from 'antd/lib/message';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import io from 'socket.io-client';

import VoteBar from '../../components/VoteBar/VoteBar';

class VoteSession extends Component {
  state = {
    id: '',
    name: '',
    headers: [],
    results: []
  };

  onVoteChanged(header) {
    const headerIndex = this.state.headers.indexOf(header);
    this.setState(prevState => {
      const newResults = prevState.results;
      newResults[headerIndex]++;
      return {
        ...prevState,
        results: newResults
      };
    });
  }

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
    const host = process.env.REACT_APP_SERVER_URL || 'http://localhost:3000';
    this.socket = io(host);
    this.socket.on('connect', () => {
      this.socket.emit('room', this.state.id);
    });

    this.socket.on('voteChanged', data => {
      console.log(data);
      this.onVoteChanged(data.header);
    });
  }

  componentWillUnmount() {
    this.socket.close();
  }

  submitVote = async header => {
    const localStorageVote = localStorage.getItem(this.state.id) || '';
    const voters = localStorageVote.split(';');

    if (voters.indexOf(this.props.auth.user.id || 'guest') !== -1) {
      message.error('You cannot vote twice.');
      return;
    }

    // integrate with Backend
    try {
      await axios.post(`/api/vote/${this.state.id}/${header}`);
      voters.push(this.props.auth.user.id || 'guest');
      localStorage.setItem(this.state.id, voters.join(';'));

      this.socket.emit('voteSubmission', {
        header
      });
      this.onVoteChanged(header);
      message.success('Thank you for voting!');
    } catch (error) {
      message.error('An Error Occured.');
      console.log(error);
    }
  };

  render() {
    const { name, headers, results } = this.state;
    const totalVotes = results.reduce((prevValue, curValue) => prevValue + curValue, 0);

    return (
      <div className="container p-4 height-100">
        <h2 className="mb-0">{name}</h2>
        <p className="mb-4">Total Votes: {totalVotes}</p>
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

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(withRouter(VoteSession));
