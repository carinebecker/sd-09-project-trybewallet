import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userEmail } from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      disabled: true,
      keyEmail: false,
      keyPassowrd: false,
    };
    this.handleInputEmail = this.handleInputEmail.bind(this);
    this.handleInputPassword = this.handleInputPassword.bind(this);
    this.disabledBtn = this.disabledBtn.bind(this);
  }

  handleInputEmail({ target }) {
    const validateEmail = /^[\S.]+@[a-z]+\.\w{2,3}$/g.test(target.value);
    this.setState({
      email: target.value,
      keyEmail: validateEmail,
    });
  }

  handleInputPassword({ target }) {
    const six = 5;
    if (target.value.length >= six) {
      this.setState({
        keyPassowrd: true,
      });
    } else {
      this.setState({
        keyPassowrd: false,
      });
    }
  }

  disabledBtn() {
    const { dispatchEmail } = this.props;
    const { keyEmail, keyPassowrd, email } = this.state;
    if (keyEmail && keyPassowrd) {
      this.setState({
        disabled: false,
      });
    } else {
      this.setState({
        disabled: true,
      });
    }
    dispatchEmail(email);
  }

  render() {
    const { disabled } = this.state;
    return (
      <div>
        <input
          type="text"
          data-testid="email-input"
          placeholder="Email"
          onChange={ (e) => {
            this.handleInputEmail(e);
            this.disabledBtn();
          } }
        />
        <input
          type="password"
          data-testid="password-input"
          placeholder="Senha"
          onChange={ (e) => {
            this.handleInputPassword(e);
            this.disabledBtn();
          } }
        />
        <Link to="/carteira">
          <button type="button" disabled={ disabled }>Entrar</button>
        </Link>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchEmail: (email) => (dispatch(userEmail(email))),
});

Login.propTypes = {
  dispatchEmail: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
