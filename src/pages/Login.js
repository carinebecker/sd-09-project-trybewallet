import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import '../App.css';
import { loginAction } from '../actions/index';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      senha: '',
      redirect: false,
      button: true,
    };
  }

  render() {
    const { email, senha, button, redirect } = this.state;
    const { saveEmail } = this.props;
    const validateInput = () => {
      const reg = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
      if (reg.test(email) && senha.length >= '123456'.length) {
        this.setState({ button: false });
        saveEmail(email);
      } else this.setState({ button: true });
    };
    const handleChange = (target) => {
      this.setState({ [target.name]: target.value }, () => validateInput());
    };
    return (
      <section className="login-section">
        { redirect ? (<Redirect to="/carteira" />) : null }
        <label htmlFor="email-input">
          Email
          <input
            type="text"
            data-testid="email-input"
            name="email"
            value={ email }
            onChange={ ({ target }) => handleChange(target) }
          />
        </label>
        <label htmlFor="pswd-input">
          Senha
          <input
            type="password"
            data-testid="password-input"
            name="senha"
            value={ senha }
            onChange={ ({ target }) => handleChange(target) }
          />
        </label>
        <div>
          <button
            type="button"
            className="login-button"
            disabled={ button }
            onClick={ () => this.setState({ redirect: true }) }
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
  saveEmail: (email) => dispatch(loginAction(email)),
});

export default connect(null, mapDispatchToProps)(Login);
