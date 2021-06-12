import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { dataEmailUser } from '../actions';
import '../styles/login.css';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      passWord: '',
      validationEmail: false,
      validationPW: false,
      isRedirect: false,
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleclick = this.handleclick.bind(this);
  }

  handleInput({ target: { name, value } }) {
    const number = 6;
    if (name === 'email') {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      this.setState({
        [name]: value,
        validationEmail: re.test(value),
      });
    }
    if (name === 'passWord') {
      this.setState({
        [name]: value,
        validationPW: value.length >= number,
      });
    }
  }

  handleclick() {
    const { email } = this.state;
    const { dataEmailUser: loginSave } = this.props;
    this.setState({
      isRedirect: true,
    });
    loginSave(email);
  }

  render() {
    const { email, passWord, isRedirect, validationEmail, validationPW } = this.state;
    if (isRedirect) return <Redirect to="/carteira" />;
    return (
      <div className="login-context">
        <form className="main-context">
          <p><strong>Login</strong></p>
          <label htmlFor="email" className="email-context">
            <input
              type="text"
              data-testid="email-input"
              name="email"
              value={ email }
              onChange={ this.handleInput }
              minLength="6"
              placeholder="Digite seu e-mail aqui"
            />
          </label>
          <label htmlFor="passWord" className="password-context">
            <input
              type="password"
              data-testid="password-input"
              name="passWord"
              value={ passWord }
              onChange={ this.handleInput }
              placeholder="Digite sua senha aqui"
            />
          </label>
          <button
            type="button"
            className={ validationPW ? 'button-entrar' : 'button' }
            onClick={ this.handleclick }
            disabled={ !(validationEmail && validationPW) ? 'disabled' : null }
          >
            <span>
              Entrar
            </span>
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  dataEmailUser: PropTypes.func.isRequired,
};

const mapDispatchToProps = { dataEmailUser };

export default connect(null, mapDispatchToProps)(Login);
