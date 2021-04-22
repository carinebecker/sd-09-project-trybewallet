import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';
import { login } from '../actions';
import './Login.css';
import Wallet from '../assets/images/wallet.svg';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      loggedIn: false,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.validateLoginFields = this.validateLoginFields.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  validateLoginFields() {
    const { email, password } = this.state;
    const re = /[^@]+@[^.]+\..+/g;
    const minimumPasswordLength = 6;
    const emailTest = re.test(String(email).toLowerCase());
    const passwordTest = password.length >= minimumPasswordLength;
    return (emailTest && passwordTest);
  }

  handleInputChange({ target }) {
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;

    this.setState({ [name]: value });
  }

  handleClick(event) {
    event.preventDefault();
    const { dispatchLogin } = this.props;
    const { email, password } = this.state;
    dispatchLogin({ email, password });
    this.setState({ loggedIn: true });
  }

  render() {
    const { email, password, loggedIn } = this.state;
    const isButtonDisabled = !this.validateLoginFields(email, password);
    return (
      <div className="login-page">
        <div className="logo-container f-row">
          <img src={ Wallet } alt="Logo" />
          <h1>Trybe Wallet</h1>
        </div>
        <div className="login-container f-column">
          <input
            id="input-email"
            name="email"
            data-testid="email-input"
            type="email"
            value={ email }
            onChange={ this.handleInputChange }
            placeholder="Login"
            className="input"
          />
          <input
            id="input-password"
            name="password"
            data-testid="password-input"
            type="password"
            value={ password }
            onChange={ this.handleInputChange }
            placeholder="Password"
            className="input"
          />
          {loggedIn ? (
            <Redirect to="/carteira" />
          )
            : (
              <button
                type="button"
                disabled={ isButtonDisabled }
                onClick={ this.handleClick }
                className={ isButtonDisabled
                  ? 'disabled-btn round-btn' : 'login-btn round-btn' }
              >
                Entrar
              </button>
            )}
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchLogin: (credentials) => dispatch(login(credentials)) });

Login.propTypes = {
  dispatchLogin: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
