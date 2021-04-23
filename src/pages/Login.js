import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import action from '../actions';

class Login extends React.Component {
  constructor() {
    super();

    this.inputs = this.inputs.bind(this);
    this.validateInputs = this.validateInputs.bind(this);

    this.state = {
      email: '',
      senha: '',
      button: true,
    };
  }

  inputs(event) {
    const { target } = event;
    this.setState({
      [target.name]: target.value,
    }, () => this.validateInputs());
  }

  validateInputs() {
    const { email, senha } = this.state;
    const regex = /[a-zA-Z0-9\-_.]+@[a-zA-Z0-9]+.[a-z]+$/gm.test(email);
    const password = 6;
    if (regex && senha.length >= password) {
      this.setState({
        button: false,
      });
    } else {
      this.setState({
        button: true,
      });
    }
  }

  render() {
    const { button, email } = this.state;
    const { emailDispath } = this.props;

    return (
      <div>
        <form>
          <label htmlFor="Email">
            Email:
            <input
              onChange={ this.inputs }
              type="text"
              name="email"
              data-testid="email-input"
            />
          </label>
          <label htmlFor="Senha">
            Senha:
            <input
              onChange={ this.inputs }
              type="text"
              name="senha"
              data-testid="password-input"
            />
          </label>
        </form>
        <Link to="/carteira">
          <button
            onClick={ () => emailDispath(email) }
            type="button"
            name="button"
            disabled={ button }
          >
            Entrar
          </button>
        </Link>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  emailDispath: (state) => dispatch(action(state)),
});

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  emailDispath: PropTypes.object,
}.isRequired;
