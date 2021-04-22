import React from 'react';
import '../App.css';

class Login extends React.Component {
  constructor () {
    super()

    this.state = {
      btnAvaliable: false,
    }
  }

  render() {
    return (
      <section className="login-section">
        <label>Email
          <input
            type="text"
            testid="email-input"
            required
          />
        </label>
        <label>Senha
          <input
            type="password"
            data-testid="password-input"
            required
          />
        </label>
        <label>
          <button
            type="button"
            className="login-button"
          >
            Entrar
          </button>
        </label>
      </section>
    );
  }
}

export default Login;
