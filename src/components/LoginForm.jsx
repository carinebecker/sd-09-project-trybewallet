import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUserEmail } from '../actions';

class LoginForm extends Component {
  constructor() {
    super();

    this.state = {
      emailInput: '',
      passwordInput: '',
      disabled: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.validateFields = this.validateFields.bind(this);
  }

  // Obrigada Tiago Granville pela ajuda na sincronicidade do negócio :D
  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    }, () => this.validateFields());
  }

  validateFields() {
    const { emailInput, passwordInput } = this.state;
    const minLength = 6;
    const emailRgx = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    if (emailInput.match(emailRgx) && passwordInput.length >= minLength) {
      this.setState({ disabled: false });
    } else {
      this.setState({ disabled: true });
    }
  }

  render() {
    const { emailInput, passwordInput, disabled } = this.state;
    const { userEmailDispatcher } = this.props;

    return (
      <main className="login-container">
        <h2>Login</h2>
        <form className="login-fields">
          <input
            type="email"
            name="emailInput"
            value={ emailInput }
            data-testid="email-input"
            placeholder="Digite seu e-mail"
            onChange={ this.handleChange }
            required
          />
          <input
            type="password"
            data-testid="password-input"
            name="passwordInput"
            value={ passwordInput }
            placeholder="Digite sua senha"
            onChange={ this.handleChange }
            required
          />
          <Link to="/carteira">
            <button
              type="button"
              disabled={ disabled }
              onClick={ () => userEmailDispatcher(emailInput) }
            >
              Entrar
            </button>
          </Link>
        </form>
      </main>
    );
  }
}

LoginForm.propTypes = {
  userEmailDispatcher: PropTypes.string,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  userEmailDispatcher: (email) => dispatch(getUserEmail(email)),
});

export default connect(null, mapDispatchToProps)(LoginForm);
