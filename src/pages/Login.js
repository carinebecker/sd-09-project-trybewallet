import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userEmail } from '../actions/index';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      validated: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.validateLogin = this.validateLogin.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
    this.validateLogin();
  }

  handleClick(email) {
    const { userEmailDispatcher } = this.props;
    userEmailDispatcher(email);
  }

  validateLogin() {
    const { email, password } = this.state;
    const emailRegex = new RegExp(/^[\w.]+@[a-z]+.\w{2,3}$/g);
    const passwordRegex = new RegExp(/[\w\D]{5}/g);
    if (emailRegex.test(email) && passwordRegex.test(password)) {
      this.setState({ validated: false });
    } else {
      this.setState({ validated: true });
    }
  }

  render() {
    const { validated, email } = this.state;
    return (
      <form>
        <label htmlFor="email-input">
          Email:
          <input
            type="email"
            data-testid="email-input"
            name="email"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="password-input">
          Senha:
          <input
            type="password"
            data-testid="password-input"
            name="password"
            onChange={ this.handleChange }
          />
        </label>
        <Link to="/carteira">
          <button
            disabled={ validated }
            type="button"
            onClick={ () => this.handleClick(email) }
          >
            Entrar
          </button>
        </Link>
      </form>
    );
  }
}

Login.propTypes = {
  userEmailDispatcher: PropTypes.func,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  userEmailDispatcher: (email) => dispatch(userEmail(email)),
});

export default connect(null, mapDispatchToProps)(Login);
