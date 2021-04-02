import React from 'react';
import { Link } from 'react-router-dom';
import { func } from 'prop-types';
import { connect } from 'react-redux';
import { Form, FormGroup, Label, Input, Col, Button } from 'reactstrap';
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
      colorButon: 'danger',
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
        colorButon: 'success',
      });
    } else {
      this.setState({
        isNotValidated: true,
        colorButon: 'danger',
      });
    }
  }

  render() {
    const { addEmail } = this.props;
    const { email, password, isNotValidated, colorButon } = this.state;
    return (
      <section>
        <h1>Login</h1>
        <Form>
          <FormGroup>
            <Col sm={ 2 }>
              <Label htmlFor="email-input">Email:</Label>
              <Input
                type="email"
                data-testid="email-input"
                name="email"
                value={ email }
                onChange={ this.handleChange }
              />
            </Col>
          </FormGroup>
          <FormGroup>
            <Col sm={ 2 }>
              <Label htmlFor="password-input">Senha:</Label>
              <Input
                type="password"
                data-testid="password-input"
                name="password"
                value={ password }
                onChange={ this.handleChange }
              />
            </Col>
          </FormGroup>
          <Link to="/carteira">
            <Button
              type="button"
              color={ colorButon }
              disabled={ isNotValidated }
              onClick={ () => addEmail(email) }
            >
              Entrar
            </Button>
          </Link>
        </Form>
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
