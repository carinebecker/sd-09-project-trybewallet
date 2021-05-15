import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  constructor() {
    super();

    this.totalExpenses = this.totalExpenses.bind(this);
  }

  totalExpenses() {
    const { expenses } = this.props;
    const expensesReduced = expenses.reduce((total, current) => {
      const expenseCurrency = current.exchangeRates[current.currency].ask;
      const expenseValue = parseFloat((current.value * expenseCurrency).toFixed(2));
      total += expenseValue;
      return total;
    }, 0);
    return expensesReduced;
  }

  render() {
    const { email } = this.props;

    return (
      <header>
        <div>HEADER LOGO</div>
        <span data-testid="email-field">{ email }</span>
        <span data-testid="total-field">
          { `Despesa Total: R$ ${this.totalExpenses()}` }
        </span>
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
  expenses: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default connect(mapStateToProps)(Header);
