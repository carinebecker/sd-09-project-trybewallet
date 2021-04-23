import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { saveEmail } from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.turnOnButton = this.turnOnButton.bind(this);

    this.state = {
      email: '',
      isAble: true,
      checkEmail: false,
      checkPassword: false,
    };
  }

  handleEmail({ target }) {
    const checkEmail = /^[\S.]+@[a-z]+\.\w{2,3}$/g.test(target.value);
    this.setState({
      email: target.value,
      checkEmail,
    });
    this.turnOnButton();
  }

  handlePassword({ target }) {
    const min = 5;
    if (target.value.length >= min) {
      this.setState({
        checkPassword: true,
      });
    } else {
      this.setState({
        checkPassword: false,
      });
    }
    this.turnOnButton();
  }

  turnOnButton() {
    const { checkPassword, checkEmail, email } = this.state;
    const { sendEmail } = this.props;
    if (checkPassword && checkEmail) {
      this.setState({
        isAble: false,
      });
    } else {
      this.setState({
        isAble: true,
      });
    }

    sendEmail(email);
  }

  render() {
    const { isAble } = this.state;
    return (
      <div>
        <input type="text" data-testid="email-input" onChange={ this.handleEmail } />
        <input
          type="text"
          data-testid="password-input"
          onChange={ this.handlePassword }
        />
        <Link to="/carteira">
          <button
            type="button"
            disabled={ isAble }
          >
            Entrar
          </button>
        </Link>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  sendEmail: (email) => (dispatch(saveEmail(email))),
});

Login.propTypes = {
  sendEmail: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
