import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ExpensesForm from '../components/ExpensesForm';
import ExpensesTable from '../components/ExpensesTable';
import EditExpense from '../components/EditExpense';

class Wallet extends React.Component {
  render() {
    const { expenses } = this.props;
    const expensesResult = expenses
      .map(({ exchangeRates, currency, value }) => exchangeRates[currency].ask * value);
    const totalValue = expensesResult.reduce((acc, actual) => {
      acc += actual;
      return acc;
    }, 0);

    const { userEmail, isEditing } = this.props;
    return (
      <div>
        <header className="wallet-header">
          <span data-testid="email-field"><strong>{ userEmail }</strong></span>
          <span data-testid="total-field">
            R$
            { Number(totalValue).toFixed(2) }
          </span>
          <span data-testid="header-currency-field">BRL</span>
        </header>
        <ExpensesForm />
        {
          isEditing
            ? <EditExpense />
            : ''
        }
        <ExpensesTable />
      </div>
    );
  }
}

Wallet.propTypes = {
  userEmail: PropTypes.string,
}.isRequired;

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  expenses: state.wallet.expenses,
  isEditing: state.wallet.isEditing,
});

export default connect(mapStateToProps)(Wallet);
