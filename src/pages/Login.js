import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { addEmail } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      shouldRedirect: false,
    };

    this.updateLogin = this.updateLogin.bind(this);
    this.sendToRedux = this.sendToRedux.bind(this);
  }

  updateLogin({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  sendToRedux() {
    const { email } = this.state;
    const { user } = this.props;
    user(email);
    this.setState({ shouldRedirect: true });
  }

  renderEmailInput() {
    const { email } = this.state;
    return (
      <div>
        <label htmlFor="input_email">
          E-mail
          <input
            data-testid="email-input"
            name="email"
            placeholder="Insira o e-mail"
            id="input_email"
            type="email"
            className="form-email"
            value={ email }
            onChange={ this.updateLogin }
          />
        </label>
      </div>
    );
  }

  renderPasswordInput() {
    const { password } = this.state;
    return (
      <div>
        <label htmlFor="input_password">
          Senha
          <input
            data-testid="password-input"
            name="password"
            placeholder="Insira senha"
            type="password"
            id="input_password"
            className="form-password"
            value={ password }
            onChange={ this.updateLogin }
          />
        </label>
      </div>
    );
  }

  renderSubmitButton() {
    const { email, password } = this.state;
    const referenceNumber = 6;
    return (
      <div>
        <button
          type="button"
          disabled={
            !(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
            && password.length >= referenceNumber)
          }
          onClick={ this.sendToRedux }
        >
          Entrar
        </button>
      </div>
    );
  }

  render() {
    const { shouldRedirect } = this.state;
    if (shouldRedirect) {
      return (<Redirect to="/carteira" />);
    }
    return (
      <div>
        <div>Hello, TrybeWallet!</div>
        <br />
        <div>Login</div>
        <form>
          {this.renderEmailInput()}
          {this.renderPasswordInput()}
          {this.renderSubmitButton()}
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  user: (state) => dispatch(addEmail(state)),
});

Login.propTypes = {
  user: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
