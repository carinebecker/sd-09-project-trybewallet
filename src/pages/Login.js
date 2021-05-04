import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './Login.css';
import Illustration from '../images/wallet.svg';

import loginUserAction from '../actions/loginUser';
import isLoggedAction from '../actions/isLogged';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      validateUser: {
        emailIsValid: false,
        passwordIsValid: false,
      },
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });

    if (name === 'email' && this.validateEmail(value)) {
      this.setState((prevState) => ({
        validateUser: {
          ...prevState.validateUser, emailIsValid: true,
        },
      }));
    }
    if (name === 'password' && this.validatePassword(value)) {
      this.setState((prevState) => ({
        validateUser: {
          ...prevState.validateUser, passwordIsValid: true,
        },
      }));
    }
  }

  handleClick() {
    const { login, isLogged } = this.props;
    const { email } = this.state;
    login(email);
    isLogged();
  }

  validateEmail(email) {
    // validação usando regex:
    /**
     * https://pt.stackoverflow.com/questions/1386/express%C3%A3o-regular-para-valida%C3%A7%C3%A3o-de-e-mail
     */
    const regexEmail = /\S+@\S+\.\S+/;
    return regexEmail.test(email);
  }

  validatePassword(password) {
    const minPassword = 6;
    if (password.length >= minPassword) {
      return true;
    }
  }

  render() {
    const {
      email,
      password,
      validateUser: { emailIsValid, passwordIsValid },
    } = this.state;
    const { loggedStatus } = this.props;
    if (loggedStatus) {
      return (<Redirect to="/carteira" />);
    }
    return (
      <main className="container-login">
        <section className="container-illustration">
          <img className="illustration-img" src={ Illustration } alt="Illustration" />
          <h1 className="title-login-page">Trybe Wallet</h1>
        </section>
        <form className="container-form">
          <h1 className="title-login-input">Welcome to Trybe Wallet</h1>
          <section className="container-inputs">
            <input
              className="input-email"
              type="text"
              name="email"
              data-testid="email-input"
              placeholder="Email address"
              onChange={ this.handleChange }
              value={ email }
            />
            <input
              className="input-password"
              type="password"
              name="password"
              data-testid="password-input"
              placeholder="Password"
              onChange={ this.handleChange }
              value={ password }
            />
            <button
              className="btn-login"
              type="button"
              onClick={ this.handleClick }
              disabled={ !(emailIsValid && passwordIsValid) }
            >
              Entrar
            </button>
          </section>
        </form>
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  loggedStatus: state.loggedStatus.isLogged,
});

const mapDispatchToProps = (dispatch) => ({
  login: (email) => dispatch(loginUserAction(email)),
  isLogged: () => dispatch(isLoggedAction()),
});

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isLogged: PropTypes.func.isRequired,
  loggedStatus: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
