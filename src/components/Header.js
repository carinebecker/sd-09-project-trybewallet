import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  sumExpenses() {
    const { expenses } = this.props;
    let total = 0;
    expenses.forEach((currentValue) => {
      const currentCurrency = currentValue.exchangeRates[currentValue.currency].ask;
      total += currentValue.value * currentCurrency;
    });
    return total.toFixed(2);
  }

  render() {
    const { email } = this.props;
    return (
      <div>
        <span>Email: </span>
        <span data-testid="email-field">{ email }</span>
        <br />
        <span>Despesa Total: </span>
        <span data-testid="total-field">{ this.sumExpenses() || 0 }</span>
        <span data-testid="header-currency-field">BRL</span>
        <hr />
      </div>);
  }
}

const mapStatetoProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
  currency: state.wallet.currency,
});

Header.propTypes = {
  email: PropTypes.string,
}.isRequired;

export default connect(mapStatetoProps)(Header);
