import React, { Component } from 'react';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = { email: '', password: '' };
  }

  handleChange({ target: { type, value } }) {
    this.setState({ [type]: value });
  }

  render() {
    const { email, password } = this.state;
    return (
      <div>
        <div>
          <input
            type="email"
            data-testid="email-input"
            value={ email }
            onClick={ this.handleChange }
            required
          />
          <input
            type="password"
            data-testid="password-input"
            minLength="6"
            value={ password }
            onClick={ this.handleChange }
            required
          />
        </div>
        <button
          type="submit"
          onClick={ () => (<Redirect to="/carteira" />) }
        >
          Entrar
        </button>
      </div>
    );
  }
}

export default Login;
