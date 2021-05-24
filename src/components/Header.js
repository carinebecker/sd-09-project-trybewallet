import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Requisito resolvido com auxílio de revisão de colegas.

class Header extends React.Component {
  render() {
    const { email } = this.props;
    return (
      <div>
        <span>Email: </span>
        <span data-testid="email-field">{ email }</span>
        <br />
        <span>Despesa Total: </span>
        <span data-testid="total-field">0</span>
        <span data-testid="header-currency-field">BRL</span>
      </div>);
  }
}

const mapStatetoProps = (state) => ({
  email: state.user.email,
});

Header.propTypes = {
  email: PropTypes.string,
}.isRequired;

export default connect(mapStatetoProps)(Header);
