import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import '../App.css';
import { loginAction } from '../actions/index';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
    };
  }

  render() {
    const { email } = this.state;
    const { sendLogin } = this.props;
    const validateEmail = (info) => {
      this.setState({ email: info });
      const reg = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i;
      if (reg.test(info)) document.getElementById('login-btn').disabled = false;
      else document.getElementById('login-btn').disabled = true;
    };

    return (
      <section className="login-section">
        <label htmlFor="email-input">
          Email
          <input
            type="text"
            data-testid="email-input"
            id="email-input"
            onChange={ ({ target }) => validateEmail(target.value) }
            required
          />
        </label>
        <label htmlFor="pswd-input">
          Senha
          <input
            type="password"
            data-testid="password-input"
            id="pswd-input"
            onChange={ ({ target }) => {
              if (target.value.length < '123456'.length) {
                document.getElementById('login-btn').disabled = true;
              } else document.getElementById('login-btn').disabled = false;
            } }
            required
          />
        </label>
        <div>
          <button
            type="button"
            className="login-button"
            id="login-btn"
            onClick={ () => sendLogin(email) }
          >
            Entrar
          </button>
        </div>
      </section>
    );
  }
}

Login.propTypes = {
  sendLogin: PropTypes.func,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  sendLogin: (email) => dispatch(loginAction(email)),
});

export default connect(null, mapDispatchToProps)(Login);
