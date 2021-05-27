import React from 'react';
import { connect } from 'react-redux';
import PropType from 'prop-types';

class Header extends React.Component {
  amountExpenses() {
    const { expenses } = this.props;
    const amountExpenses = expenses.reduce((acc, currentValue) => {
      const rate = currentValue.exchangeRates[currentValue.currency].ask;
      return acc + (rate * parseFloat(currentValue.value));
    }, 0);
    return amountExpenses;
  }

  render() {
    const { email } = this.props;
    return (
      <header>
        <span>E-Mail: </span>
        <span data-testid="email-field">{ email }</span>
        <span>Despesa Total:</span>
        <span data-testid="total-field">{ this.amountExpenses() }</span>
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
  email: PropType.string,
  expenses: PropType.arrayOf(Object),
}.isRequired;

export default connect(mapStateToProps, null)(Header);
