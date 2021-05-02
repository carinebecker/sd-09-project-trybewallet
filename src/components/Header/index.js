import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import trybeWallet from '../../images/trybe_small.png';
import './style.css';

class Header extends Component {
  componentDidUpdate() {
    this.totalExpenses();
  }

  // função baseada na solução do Renato Pereira Feitosa
  totalExpenses() {
    const { expenses } = this.props;
    return expenses.reduce(
      (
        accumulatedTotal,
        { value, currency, exchangeRates },
      ) => parseFloat(accumulatedTotal) + parseFloat(value) * exchangeRates[currency].ask,
      0,
    ).toFixed(2);
  }

  render() {
    const { email } = this.props;
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
            {`R$ ${this.totalExpenses()}`}
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
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps, null)(Header);
