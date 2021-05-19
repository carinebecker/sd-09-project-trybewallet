import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import { func } from 'prop-types';
import { login } from '../actions';

class LoginContent extends Component {
  constructor(props) {
    super(props);
    this.checkFormats = this.checkFormats.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.createInput = this.createInput.bind(this);
    this.state = { email: '', password: '', shouldRedirect: false };
  }

  checkFormats() {
    const { email, password } = this.state;
    const emailFormat = /^[\w.]+@[a-z]+\.\w{2,3}$/g.test(email);
    const passwordFormat = /[\w\D]{6}/g.test(password);
    return emailFormat && passwordFormat;
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

  createInput(type) {
    return (
      <input
        data-testid={ `${type}-input` }
        type={ type }
        placeholder={ type }
        onChange={ this.handleChange }
        required
      />
    );
  }

  render() {
    const { shouldRedirect } = this.state;
    if (shouldRedirect) return <Redirect to="/carteira" />;
    return (
      <section className="login-form">
        { this.createInput('email') }
        { this.createInput('password') }

        <button
          type="submit"
          onClick={ this.handleSubmit }
          disabled={ !this.checkFormats() }
        >
          Entrar
        </button>
      </section>
    );
  }
}

LoginContent.propTypes = { submit: func }.isRequired;

const mapDispatchToProps = (dispatch) => ({ submit: (email) => dispatch(login(email)) });

export default connect(null, mapDispatchToProps)(LoginContent);
