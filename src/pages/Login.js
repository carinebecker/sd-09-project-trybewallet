import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target }) {
    this.setState({
      email: target.value,
    });
  }

  validateLogin() {
    const { email, password } = this.state;
    const tam = 6;
    const validateEmail = email.length > 1;
    const validatePassword = password.length > tam;
    return validateEmail && validatePassword;
  }

  handleClick() {
    // const { email, name } = this.state;
  }

  render() {
    const { email, password } = this.state;
    return (
      <div>
        <h2>
          Trybe Wallet
        </h2>
        <div>
          <input
            name="email"
            type="text"
            value={ email }
            placeholder="E-mail"
            data-testid="email-input"
            onChange={ this.handleChange }
          />
          <input
            name="password"
            type="password"
            value={ password }
            placeholder="Password"
            data-testid="password-input"
            onChange={ this.handleChange }
          />
          <Link to="/carteira">
            <button
              type="button"
              // disabled={ !this.validateLogin() }
              onClick={ this.handleClick }
            >
              Entrar
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

// Login.propTypes = {
//   saveUser: PropTypes.func.isRequired,
// };

export default Login;
