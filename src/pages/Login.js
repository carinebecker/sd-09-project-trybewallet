import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import loginAction from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      login: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // Validação de email e senha, alterando alterando o estado
  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value }, () => {
      const { email, password } = this.state;
      const validateEmail = /\w+@\w+(.com)/g;
      const passwordMinLength = 6;
      if (validateEmail.test(email) && password.length >= passwordMinLength) {
        this.setState({ login: false });
      } else {
        this.setState({ login: true });
      }
    });
  }
  // Envia o usuário para a pagina de carteira após o click no botão Entrar, quando a validação é feita.

  handleSubmit(e) {
    e.preventDefault();
    const { email } = this.state;
    const { history, loginActionProp } = this.props;
    loginActionProp(email);
    history.push('/carteira');
  }

  render() {
    const { login } = this.state;
    return (
      <form>
        <input
          type="text"
          name="email"
          data-testid="email-input"
          onChange={ this.handleChange }
        />
        <br />
        <input
          type="password"
          name="password"
          data-testid="password-input"
          onChange={ this.handleChange }
        />
        <br />
        <button
          type="submit"
          disabled={ login }
          onClick={ this.handleSubmit }
        >
          Entrar
        </button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  loginActionProp: (email) => dispatch(loginAction(email)),
});
Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  loginActionProp: PropTypes.func,
};
Login.defaultProps = {
  loginActionProp: {},
};

export default connect(null, mapDispatchToProps)(Login);
// Consultei repositório : https://github.com/tryber/sd-09-project-trybewallet/pull/58/commits/d22379aa7533fa7ba72804ad1f9958ad4b93dd11
