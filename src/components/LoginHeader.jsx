import React, { Component } from 'react';

export default class LoginHeader extends Component {
  render() {
    return (
      <header className="login-header">
        <h1>
          <span role="img" aria-label="moneybag emoji">
            💰
          </span>
          TrybeWallet
          <span role="img" aria-label="moneybag emoji">
            💰
          </span>
        </h1>
      </header>
    );
  }
}
