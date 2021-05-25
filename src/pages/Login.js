import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { loginAction } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      disable: true,
      redirect: false,
    };

    this.loginUser = this.loginUser.bind(this);
    this.handleChanges = this.handleChanges.bind(this);
    this.enable = this.enable.bind(this);
  }

  handleChanges(event) {
    const inputValue = event.target.value;
    this.setState({
      [event.target.id]: inputValue,
    }, this.enable);
  }

  validationEmail(email) {
    const regexEmail = new RegExp([
      '^(([^<>()[\\]\\.,;:\\s@\\"]+(\\.[^<>()',
      '[\\]\\.,;:\\s@\\"]+)*)|(\\".+\\"))@(([^<>()',
      '[\\]\\.,;:\\s@\\"]+\\.)+[^<>()[\\]\\.,;:\\s@\\"]{2,})$',
    ].join(''));
    return regexEmail.test(email);
  }

  enable() {
    const { email, password } = this.state;
    const NUMBER = 6;
    if (password.length >= NUMBER && this.validationEmail(email)) {
      this.setState({
        disable: false,
      });
    } else {
      this.setState({
        disable: true,
      });
    }
  }

  loginUser(param) {
    param.preventDefault();
    const { loginWithEmail } = this.props;
    const { email } = this.state;
    loginWithEmail(email);
    this.setState({
      redirect: true,
    });
  }

  render() {
    const { disable, redirect } = this.state;
    return redirect
      ? <Redirect to="/carteira" />
      : (
        <form onSubmit={ this.loginUser }>
          <input
            id="email"
            data-testid="email-input"
            type="email"
            placeholder="Email"
            onChange={ this.handleChanges }
          />
          <input
            id="password"
            data-testid="password-input"
            type="password"
            placeholder="Senha"
            onChange={ this.handleChanges }
          />
          <button
            type="submit"
            disabled={ disable }
          >
            Entrar
          </button>
        </form>
      );
  }
}

const mapDispatchToProps = (dispatch) => ({
  loginWithEmail: (email) => dispatch(loginAction(email)),
});

Login.propTypes = {
  loginWithEmail: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
