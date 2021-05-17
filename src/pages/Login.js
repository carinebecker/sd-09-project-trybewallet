import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { saveEmail } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.validateButton = this.validateButton.bind(this);
    this.state = {
      email: '',
      password: '',
      redirectWallet: false,
    };
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });
  }

  handleClick() {
    const { saveEmailKey } = this.props;
    const { email } = this.state;
    saveEmailKey(email);
    this.setState({
      redirectWallet: true,
    });
  }

  validateButton() {
    const { email, password } = this.state;
    const sizePasswd = 6;
    const emailValidation = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/.test(email);
    const passwordValidation = (password.length >= sizePasswd);
    return (emailValidation && passwordValidation);
  }

  render() {
    const { email, password, redirectWallet } = this.state;
    if (redirectWallet) {
      return <Redirect to="/carteira" />;
    }
    return (
      <div>
        <h1>Login</h1>
        <span>E-Mail: </span>
        <input
          type="email"
          data-testid="email-input"
          name="email"
          onChange={ this.handleChange }
          value={ email }
        />
        <span>Senha: </span>
        <input
          type="password"
          data-testid="password-input"
          name="password"
          onChange={ this.handleChange }
          value={ password }
        />
        <button
          type="submit"
          onClick={ this.handleClick }
          disabled={ !this.validateButton() }
        >
          Entrar
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveEmailKey: (email) => dispatch(saveEmail(email)),
});

Login.propTypes = {
  saveEmailKey: PropTypes.func,
}.isRequired;

export default connect(null, mapDispatchToProps)(Login);
