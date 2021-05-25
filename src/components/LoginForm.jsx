import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { saveEmail } from '../actions';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.inputValidation = this.inputValidation.bind(this);
    this.state = {
      email: '',
      password: '',
      disabled: true,
    };
  }

  inputValidation({ email, password }) {
    const emailValidation = /[a-z0-9_]+@[a-z]+\.[a-z]+/;
    const passwordLength = 6;

    if (emailValidation.test(email) && password.length >= passwordLength) {
      this.setState({ disabled: false });
    } else {
      this.setState({ disabled: true });
    }
  }

  handleChange({ target: { type, value } }) {
    this.setState({ [type]: value }, () => this.inputValidation(this.state));
  }

  render() {
    const { auth } = this.props;
    const { email, disabled } = this.state;
    return (
      <form>
        <label htmlFor="email-input">
          Email:
          <input
            type="email"
            data-testid="email-input"
            placeholder="exemplo@email.com"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="password-input">
          Senha:
          <input
            type="password"
            data-testid="password-input"
            onChange={ this.handleChange }
          />
        </label>
        <Link to="/carteira">
          <button
            type="submit"
            disabled={ disabled }
            onClick={ () => auth(email) }
          >
            Entrar
          </button>
        </Link>
      </form>
    );
  }
}

LoginForm.propTypes = {
  auth: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispacth) => ({
  auth: (value) => dispacth(saveEmail(value)),
});

export default connect(null, mapDispatchToProps)(LoginForm);
