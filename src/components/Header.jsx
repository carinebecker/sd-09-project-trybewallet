import React from 'react';
import { connect } from 'react-redux';
import { string, arrayOf, object } from 'prop-types';
import { Alert } from 'react-bootstrap';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.calculateTotalExpenses = this.calculateTotalExpenses.bind(this);
  }

  calculateTotalExpenses() {
    const { expenses } = this.props;
    let total = 0;
    if (expenses.length > 0) {
      expenses.forEach((expense) => {
        const { exchangeRates, value, currency } = expense;
        const change = value * exchangeRates[currency].ask;
        total += parseFloat(change);
      });
      return total.toFixed(2);
    }
    return total.toFixed(2);
  }

  render() {
    const { email } = this.props;
    return (
      <header>
        <Alert color="dark">
          <h2>My Wallet</h2>
          <span data-testid="email-field">
            Email:
            { email }
          </span>
          <span data-testid="total-field">
            Despesa:
            { this.calculateTotalExpenses() }
          </span>
          <span data-testid="header-currency-field">BRL</span>
        </Alert>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: string,
  expenses: arrayOf(object),
}.isRequired;

export default connect(mapStateToProps)(Header);
