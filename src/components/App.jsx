import React from 'react';
import Login from './Login';
import Chat from './Chat';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '',
      user: null,
    };
  }

  handleLogin = (username) => {
    this.setState({ user: { username } });
  };

  render() {
    return this.state.user ? <Chat user={this.state.user} /> : <Login onLogin={this.handleLogin} />;
  }
}
