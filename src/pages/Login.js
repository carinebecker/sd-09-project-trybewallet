import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { func } from 'prop-types';
import { emailSave } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      disabled: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.validateLogin = this.validateLogin.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    }, () => this.validateLogin());
  }

  validateLogin() {
    const { email, password } = this.state;
    const emailRegex = new RegExp(/^[\S.]+@[a-z]+.\w{2,3}$/g).test(email);
    const passRegex = new RegExp(/[0-9a-zA-Z$*&@#]{6}/).test(password);
    if (emailRegex && passRegex) {
      this.setState({ disabled: false });
    } else {
      this.setState({ disabled: true });
    }
  }

  render() {
    const { disabled, email } = this.state;
    const { addEmail } = this.props;
    return (
      <form>
        <label
          htmlFor="email"
        >
          E-mail:
          <input
            data-testid="email-input"
            itemID="email"
            type="email"
            name="email"
            onChange={ this.handleChange }
            required
          />
        </label>
        <label
          htmlFor="password"
        >
          Senha:
          <input
            data-testid="password-input"
            itemID="password"
            type="password"
            name="password"
            onChange={ this.handleChange }
            required
          />
        </label>
        <Link to="/carteira">
          <button
            type="button"
            onClick={ () => addEmail(email) }
            disabled={ disabled }
          >
            Entrar
          </button>
        </Link>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addEmail: (email) => dispatch(emailSave(email)),
});

Login.propTypes = {
  addEmail: func,
}.isRequired;

export default connect(null, mapDispatchToProps)(Login);
