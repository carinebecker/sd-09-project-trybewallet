import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    const totalExpenses = expenses.length > 0 ? expenses
      .map(({ value, exchangeRates, currency }) => (
        Math.round((Number(value) * exchangeRates[currency].ask) * 100) / 100))
      .reduce((acc, currentValue) => acc + currentValue)
      : 0;
    return (
      <header>
        <span data-testid="email-field">{ email }</span>
        <span data-testid="total-field">{totalExpenses}</span>
        <span data-testid="header-currency-field">BRL</span>
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

export default connect(mapStateToProps)(Header);
