import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropType from 'prop-types';
import { setEmail as setEmailAction } from '../actions/index';

const NUMBER_SIX = 6;

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      isDisabled: true,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    }, () => this.validateInfos());
  }

  validateInfos() {
    const { email, password } = this.state;
    const { setEmail } = this.props;
    const regex = /\S+@\S+\.\S+/;
    if (regex.test(email) && password.length >= NUMBER_SIX) {
      this.setState({ isDisabled: false });
      setEmail(email);
      return;
    }
    this.setState({ isDisabled: true });
  }

  render() {
    const { email, password, isDisabled } = this.state;

    return (
      <>
        <input
          type="email"
          value={ email }
          placeholder="E-mail"
          data-testid="email-input"
          name="email"
          onChange={ this.handleChange }
        />
        <input
          type="password"
          value={ password }
          placeholder="Senha"
          data-testid="password-input"
          name="password"
          onChange={ this.handleChange }
        />
        <Link to="/carteira">
          <button type="button" disabled={ isDisabled }>ENTRAR</button>
        </Link>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setEmail: (email) => dispatch(setEmailAction(email)),
});

Login.propTypes = {
  setEmail: PropType.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
