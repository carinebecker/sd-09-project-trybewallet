import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setUser } from '../actions/actionUser';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  validadeEmail(email) {
    const regexEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]/i;
    return regexEmail.test(email);
  }

  validatePassword(password) {
    const tam = 6;
    if (password.length >= tam) {
      return true;
    }
  }

  validateLogin() {
    const { email, password } = this.state;
    return this.validatePassword(password) && this.validadeEmail(email);
  }

  handleClick() {
    const { saveUserState } = this.props;
    const { email, password } = this.state;
    saveUserState(email, password);
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
              onClick={ this.handleClick }
              disabled={ !this.validateLogin() }
            >
              Entrar
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  saveUserState: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  saveUserState: (email, password) => dispatch(setUser(email, password)),
});

export default connect(null, mapDispatchToProps)(Login);
