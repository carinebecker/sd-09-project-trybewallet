import React, { Component } from 'react';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.checkFormats = this.checkFormats.bind(this);
    this.state = { email: '', password: '', shouldRedirect: false };
  }

  handleChange({ target: { type, value } }) {
    this.setState({ [type]: value });
  }

  handleSubmit() {
    const { submit } = this.props;
    const { email } = this.state;
    submit(email);
    this.setState({ shouldRedirect: true });
  }

  checkFormats() {
    const { email, password } = this.state;
    const emailFormat = /^[\w.]+@[a-z]+\.\w{2,3}$/g.test(email);
    const passwordFormat = /[\w\D]{6}/g.test(password);
    return emailFormat && passwordFormat;
  }

  render() {
    const { email, password, shouldRedirect } = this.state;
    return shouldRedirect ? (<Redirect to="/carteira" />) : (
      <div>
        <div>
          <input
            type="email"
            data-testid="email-input"
            value={ email }
            onClick={ this.handleChange }
            required
          />
          <input
            type="password"
            data-testid="password-input"
            minLength="6"
            value={ password }
            onClick={ this.handleChange }
            required
          />
        </div>
        <button
          type="submit"
          onClick={ () => (this.handleSubmit) }
          disabled={ !this.checkFormats() }
        >
          Entrar
        </button>
      </div>
    );
  }
}

Login.propTypes = { submit: func }.isRequired;

const mapDispatchToProps = (dispatch) => ({ submit: (email) => dispatch(login(email)) });

export default connect(null, mapDispatchToProps)(Login);
