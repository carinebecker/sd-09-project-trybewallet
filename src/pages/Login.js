import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { func } from 'prop-types';
import { saveUserEmail } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      validEmail: false,
      validPassword: false,
      disable: true,
    };

    this.handlPassChange = this.handlPassChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.btnEnable = this.btnEnable.bind(this);
    this.handleClickSaveEmail = this.handleClickSaveEmail.bind(this);
  }

  handleEmailChange({ target }) {
    const emailValidator = /^[\S.]+@[a-z]+\.\w{2,3}$/g.test(target.value);
    this.setState({
      email: target.value,
      validEmail: emailValidator,
    });
  }

  handlPassChange({ target }) {
    const max = 5;
    const passValidator = target.value.length >= max;
    this.setState({
      validPassword: passValidator,
    });
  }

  btnEnable() {
    const { validEmail, validPassword } = this.state;
    if (validEmail && validPassword) {
      this.setState({
        disable: false,
      });
    } else {
      this.setState({
        disable: true,
      });
    }
  }

  handleClickSaveEmail() {
    const { getUserEmail } = this.props;
    const { email } = this.state;
    getUserEmail(email);
  }

  render() {
    const { disable } = this.state;
    return (
      <div>
        <input
          type="email"
          name="email"
          onChange={ (event) => {
            this.handleEmailChange(event);
            this.btnEnable();
          } }
          data-testid="email-input"
        />
        <input
          type="password"
          name="password"
          onChange={ (event) => {
            this.handlPassChange(event);
            this.btnEnable();
          } }
          data-testid="password-input"
        />
        <Link to="/carteira">
          <button
            type="button"
            disabled={ disable }
            onClick={ this.handleClickSaveEmail }
          >
            Entrar
          </button>
        </Link>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getUserEmail: (email) => {
    dispatch(saveUserEmail(email));
  },
});

Login.propTypes = {
  getUserEmail: func,
}.isRequired;

export default connect(null, mapDispatchToProps)(Login);
