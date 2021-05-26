import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  sumExpense() {
    const { expenses } = this.props;
    if (expenses.length === 0) return 0;
    return expenses.reduce((acc, cur) => {
      const { value, currency, exchangeRates } = cur;
      const coinData = exchangeRates[currency];
      const total = Number(value) * Number(coinData.ask);
      return acc + total;
    }, 0);
  }

  render() {
    const { email } = this.props;
    return (
      <div>
        <p data-testid="email-field">
          { email }
        </p>
        <p data-testid="total-field">
          Gastos:
          {this.sumExpense()}
        </p>
        <p data-testid="header-currency-field">
          Câmbio utilizado:
          BRL
        </p>
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
