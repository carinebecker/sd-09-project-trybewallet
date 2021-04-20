import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { userEmailDispatch } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      senha: '',
      buttonValidation: true,
      emailValidation: false,
      senhaValidation: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.inputValidation = this.inputValidation.bind(this);
    this.handleButton = this.handleButton.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange({ target }) {
    this.setState({
      buttonValidation: true,
    });
    this.setState({
      [target.name]: target.value,
    });
    this.inputValidation(target);
    this.handleButton();
  }

  inputValidation({ name, value }) {
    const emailRegex = new RegExp(/^[\w]+@[a-z]+.\w{2,3}$/g);
    const senhaRegex = new RegExp(/^[\w]{5,}/g);
    if (name === 'email') {
      this.setState({
        emailValidation: emailRegex.test(value),
      });
    }
    if (name === 'senha') {
      this.setState({
        senhaValidation: senhaRegex.test(value),
      });
    }
  }

  handleButton() {
    const { emailValidation, senhaValidation } = this.state;
    if (emailValidation === true && senhaValidation === true) {
      this.setState({
        buttonValidation: false,
      });
    }
  }

  handleClick() {
    const { emailDispatch } = this.props;
    const { email } = this.state;
    emailDispatch(email);
  }

  render() {
    const { email, senha, buttonValidation } = this.state;
    return (
      <div>
        <label htmlFor="email">
          E-mail
          <input
            value={ email }
            name="email"
            onChange={ this.handleChange }
            data-testid="email-input"
            required
          />
        </label>
        <label htmlFor="senha">
          Password
          <input
            value={ senha }
            name="senha"
            onChange={ this.handleChange }
            data-testid="password-input"
            required
          />
        </label>
        <Link to="/carteira">
          <button
            onClick={ this.handleClick }
            disabled={ buttonValidation }
            type="button"
          >
            Entrar
          </button>
        </Link>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  emailDispatch: (email) => dispatch(userEmailDispatch(email)),
});

Login.propTypes = {
  emailDispatch: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
