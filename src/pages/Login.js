import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import saveEmail from '../actions/userAction';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      email: '',
      password: '',
    };
  }

  handleChange({ target }) {
    const { saveEmailFunction } = this.props;
    const { name } = target;
    const { email } = this.state;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    });
    saveEmailFunction(email);
  }

  render() {
    const { email, password } = this.state;
    const verifyEmail = /^[\w.]+@[a-z]+\.\w{2,3}$/g;
    const verifyPassword = /[\w\D]{6}/g;

    return (
      <section className="login-section">
        <label htmlFor="email">
          <input
            type="text"
            id="email"
            name="email"
            data-testid="email-input"
            onChange={ (e) => this.handleChange(e) }
          />
        </label>
        <label htmlFor="password">
          <input
            type="password"
            id="password"
            name="password"
            data-testid="password-input"
            onChange={ (e) => this.handleChange(e) }
          />
        </label>
        <Link to="/carteira">
          <button
            type="button"
            disabled={ !((verifyEmail.test(email)) && (verifyPassword.test(password))) }
          >
            Entrar
          </button>
        </Link>
      </section>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveEmailFunction: (user) => dispatch(saveEmail(user)),
});

Login.propTypes = {
  saveEmailFunction: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
