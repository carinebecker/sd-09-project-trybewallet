import React from 'react';
import { Link } from 'react-router-dom';
import { func } from 'prop-types';
import { connect } from 'react-redux';
import { setEmail } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.isNotValidated = this.isNotValidated.bind(this);

    this.state = {
      email: '',
      password: '',
      isNotValidated: true,
      // colorButon: 'danger',
    };
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => this.isNotValidated());
  }

  isNotValidated() {
    const { email, password } = this.state;
    const emailValidated = /^[\S.]+@[a-z]+\.\w{2,3}$/g.test(email);
    const passwordValidated = /[0-9a-zA-Z$*&@#]{6}/.test(password);

    if (emailValidated && passwordValidated) {
      this.setState({
        isNotValidated: false,
        // colorButon: 'success',
      });
    } else {
      this.setState({
        isNotValidated: true,
        // colorButon: 'danger',
      });
    }
  }

  render() {
    const { addEmail } = this.props;
    const { email, password, isNotValidated } = this.state;
    return (
      <section>
        <h1>Login</h1>
        <div>
          {/* <label htmlFor="email-input">Email:</label> */}
          <input
            type="email"
            data-testid="email-input"
            name="email"
            value={ email }
            onChange={ this.handleChange }
          />

          {/* <label htmlFor="password-input">Senha:</label> */}
          <input
            type="password"
            data-testid="password-input"
            name="password"
            value={ password }
            onChange={ this.handleChange }
          />
          <Link to="/carteira">
            <button
              type="button"
              disabled={ isNotValidated }
              onClick={ () => addEmail(email) }
            >
              Entrar
            </button>
          </Link>
        </div>
      </section>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addEmail: (email) => dispatch(setEmail(email)),
});

Login.propTypes = {
  addEmail: func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
