import React from 'react';
import PropTypes from 'prop-types';
import LoginForm from '../components/LoginForm';
import LoginHeader from '../components/LoginHeader';

export default class Login extends React.Component {
  render() {
    return (
      <main>
        <LoginHeader />
        <LoginForm />
      </main>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
