import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { func } from 'prop-types';
import saveUserEmail from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      validEmail: false,
      validPassword: false,
      disable: true,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeInput = this.handleChangeInput.bind(this);
    this.setUserEmail = this.setUserEmail.bind(this);
  }

  setUserEmail(getUserEmail) {
    const { email } = this.state;
    getUserEmail(email);
  }

  handleChangeInput(event) {
    const { validEmail, validPassword } = this.state;

    if (validEmail && validPassword) {
      this.setState({
        disable: false,
      });
    }

    const maxPassLength = 5;
    if (event.target.type === 'email'
    && /(.+)@(.+){2,}\.(.+){2,}/.test(event.target.value)) {
      this.setState({
        email: event.target.value,
        validEmail: true,
      });
    }
    if (event.target.type === 'password' && event.target.value.length >= maxPassLength) {
      this.setState({
        validPassword: true,
      });
    }
  }

  handleSubmit() {
  }

  render() {
    const { disable } = this.state;
    const { getUserEmail } = this.props;
    return (
      <div>
        <input
          type="email"
          name="email"
          onChange={ this.handleChangeInput }
          data-testid="email-input"
        />
        <input
          type="password"
          name="password"
          onChange={ this.handleChangeInput }
          data-testid="password-input"
        />
        <Link to="/carteira">
          <button
            disabled={ disable }
            data-testid="my-action"
            type="submit"
            onClick={ () => {
              this.setUserEmail(getUserEmail);
              this.handleSubmit();
            } }
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
