import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import trybeWallet from '../../images/trybe_small.png';
import './style.css';

class Header extends Component {
  render() {
    const { email, total } = this.props;
    return (
      <header className="header-content">
        <img
          alt="Trybe Wallet"
          src={ trybeWallet }
        />
        <h1 data-testid="email-field">
          Usuário:
          <span>{email}</span>
        </h1>
        <p>
          Despesa total:
          <span data-testid="total-field">
            {`R$ ${total}`}
          </span>
        </p>
        <p>
          Câmbio:
          <span data-testid="header-currency-field">BRL</span>
        </p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  total: state.wallet.total,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, null)(Header);
