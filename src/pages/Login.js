import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Redirect } from 'react-router-dom';
import user from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.inputValidate = this.inputValidate.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.submitBtn = this.subimitBtn.bind(this);

    this.state = {
      email: '',
      password: '',
      isValid: true,
      submit: false,
    };
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
    this.inputValidate();
  }

  subimitBtn() {
    this.setState({ submit: true });
  }

  inputValidate() {
    // Regex pattern retirado de: https://qastack.com.br/programming/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a
    const emailRGX = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    const { email } = this.state;
    const { password } = this.state;
    const number = 5;

    if (email.match(emailRGX) && (password.length >= number)) {
      this.setState({ isValid: false });
    } else {
      this.setState({ isValid: true });
    }
  }

  render() {
    const { email } = this.state;
    const { isValid } = this.state;
    const { userDispatch } = this.props;
    const { submit } = this.state;
    if (submit === false) {
      return (
        <section>
          <h2>Wallet</h2>
          <label htmlFor="email">
            Login:
            <input
              type="e-mail"
              data-testid="email-input"
              name="email"
              onKeyUp={ this.handleChange }
            />
          </label>
          <label htmlFor="password">
            Senha:
            <input
              type="password"
              name="password"
              onKeyUp={ this.handleChange }
              data-testid="password-input"
            />
          </label>
          <button
            type="button"
            onClick={ () => {
              userDispatch(email);
              this.subimitBtn();
            } }
            disabled={ isValid }
          >
            Entrar
          </button>

        </section>
      );
    }
    return (
      <Redirect to="/carteira" />
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  userDispatch: (state) => dispatch(user(state)),
});

Login.propTypes = {
  userDispatch: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
