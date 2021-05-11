import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addUser } from '../actions';
import trybeWallet from '../images/trybe_small.png';
import '../App.css';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      validEmail: false,
      validPassword: false,
    };

    this.emailAllowed = this.emailAllowed.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.passwordAllowed = this.passwordAllowed.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
  }

  validateEmail(email) {
    const emailRegex = /^\w+[\W_]?\w*@[a-z]+\.[a-z]{2,3}(?:.br)?$/;
    return emailRegex.test(email);
  }

  emailAllowed({ target: { value } }) {
    const validEmail = this.validateEmail(value);
    this.setState({ validEmail, email: value });
  }

  validatePassword(password) {
    const passwordRegex = /^\w{6,}$/;
    return passwordRegex.test(password);
  }

  passwordAllowed({ target: { value } }) {
    const validPassword = this.validatePassword(value);
    this.setState({ validPassword });
  }

  handleClick() {
    const { login, history } = this.props;
    const { email } = this.state;
    login(email);
    history.push('./carteira');
  }

  render() {
    const { validEmail, validPassword } = this.state;
    return (
      <main className="main-content">
        <img
          alt="Trybe Wallet"
          src={ trybeWallet }
        />
        <form className="form-content">
          <label htmlFor="email">
            Email:
            <input
              type="email"
              name="email"
              onChange={ this.emailAllowed }
              data-testid="email-input"
            />
          </label>
          <label htmlFor="password">
            Password:
            <input
              type="password"
              name="password"
              onChange={ this.passwordAllowed }
              data-testid="password-input"
            />
          </label>
          <button
            type="button"
            disabled={ !(validEmail && validPassword) }
            onClick={ this.handleClick }
          >
            Entrar
          </button>
        </form>
      </main>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({ login: (email) => dispatch(addUser(email)) });

Login.propTypes = {
  login: PropTypes.func.isRequired,
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
