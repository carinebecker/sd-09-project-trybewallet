import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  constructor() {
    super();
    this.sumOfExpenses = this.sumOfExpenses.bind(this);
  }

  sumOfExpenses(expenses) {
    let results = '';
    if (expenses !== undefined) {
      results = expenses.reduce((accumulator,
        { exchangeRates, currency, value }) => {
        accumulator += value * exchangeRates[currency].ask;
        return accumulator;
      }, 0.00);
    }
    return results.toFixed(2);
  }

  render() {
    const { emailGot, expenses } = this.props;
    return (
      <div>
        <p data-testid="email-field">{ emailGot }</p>
        <p data-testid="total-field">{ this.sumOfExpenses(expenses) }</p>
        <p data-testid="header-currency-field">BRL</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  emailGot: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  emailGot: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(Object).isRequired,
};

export default connect(mapStateToProps)(Header);
