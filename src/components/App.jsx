import React from 'react';
import { io } from 'socket.io-client';
import Login from './Login';
import Chat from './Chat';
const endpoint = 'http://rechatjsapi:9010';
let socket;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '',
      user: null,
    };
  }

  login = (username) => {
    this.setState({ user: { username } });
  };

  render() {
    return this.state.user ? <Chat /> : <Login login={this.login} />;
  }
}
