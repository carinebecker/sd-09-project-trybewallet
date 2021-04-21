import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import updateEmail from '../actions/index';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      buttonDisable: true,
      email: '',
    };
    this.handleEmailAndPassword = this.handleEmailAndPassword.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
  }

  handleEmailAndPassword(event) {
    const { email } = this.state;
    const valid = email.match(/^([\w.-]+)@([\w-]+)((.(\w){2,3})+)$/);
    const senha = event.target.value.length;
    const senhaMinLength = 6;
    if (valid && senha >= senhaMinLength) {
      this.setState({ buttonDisable: false });
    } else {
      this.setState({ buttonDisable: true });
    }
  }

  handleChangeEmail(event) {
    this.setState({ email: event.target.value });
  }

  render() {
    const { buttonDisable, email } = this.state;
    const { emailLogin } = this.props;
    return (
      <div>
        <input
          type="email"
          name="email"
          value={ email }
          placeholder="email"
          data-testid="email-input"
          onChange={ this.handleChangeEmail }
        />
        <input
          type="password"
          placeholder="senha"
          name="senha"
          onChange={ this.handleEmailAndPassword }
          data-testid="password-input"
        />
        <Link to="/carteira">
          <input
            type="button"
            value="Entrar"
            disabled={ buttonDisable }
            onClick={ () => emailLogin(email) }
          />
        </Link>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  emailLogin: (email) => dispatch(updateEmail(email)),
});

Login.propTypes = {
  dispatch: PropTypes.func,
}.isRequired;

export default connect(null, mapDispatchToProps)(Login);
