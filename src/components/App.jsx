import React from 'react';
import Login from './Login';
import Chat from './Chat';
const endpoint = 'http://rechatjsapi:9010';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
  }

  handleError = async (response) => {
    if (!response.ok) {
      const data = await response.text();
      throw Error(data);
    }
    return response;
  };

  handleLogin = async (username) => {
    const credentials = { username };
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    };

    try {
      const response = await fetch(`${endpoint}/login`, options);
      if (!response.ok) {
        const data = await response.text();
        throw Error(data);
      }
      const user = await response.json();
      this.setState({ user });
    } catch (error) {
      alert(error);
    }
  };

  handleLogout = () => {
    this.setState({ user: null });
  };

  render() {
    return this.state.user ? (
      <Chat user={this.state.user} onLogout={this.handleLogout} />
    ) : (
      <Login onLogin={this.handleLogin} />
    );
  }
}
