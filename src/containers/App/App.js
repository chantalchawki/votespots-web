import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import Header from '../../components/Header/Header';
import Home from '../Home/Home';
import Login from '../Login/Login';
import Register from '../Register/Register';
import VoteSession from '../VoteSession/VoteSession';
import CreateVote from '../CreateVote/CreateVote';
import store from '../../store';
import PrivateRoute from '../../components/PrivateRoute/PrivateRoute';
import { checkAuthToken } from '../../utils/authToken';

checkAuthToken();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Header />
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/login" exact component={Login} />
              <Route path="/register" exact component={Register} />
              <PrivateRoute path="/vote/create" exact component={CreateVote} />
              <Route path="/vote/:id" exact component={VoteSession} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
