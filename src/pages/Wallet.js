import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Form from '../components/ExpenseForm';
import Table from '../components/ExpensesTable';

class Wallet extends React.Component {
  constructor() {
    super();

    this.getExpenseValue = this.getExpenseValue.bind(this);
  }

  getExpenseValue(expenses) {
    const expenseValue = expenses.reduce((total, { currency, value, exchangeRates }) => {
      total += value * exchangeRates[currency].ask;
      return total;
    }, 0);
    return expenseValue.toFixed(2);
  }

  render() {
    const { emailDispatch, expenses } = this.props;

    return (
      <div>
        <header>
          <section>
            <div data-testid="email-field">
              Email:
              { emailDispatch }
            </div>

            <div data-testid="total-field">
              Despesa Total:
              { this.getExpenseValue(expenses) }
              <div data-testid="header-currency-field">
                BRL
              </div>
            </div>
          </section>
        </header>
        <section>
          <Form />
        </section>
        <section>
          <Table />
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  emailDispatch: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps, null)(Wallet);

Wallet.propTypes = {
  emailDispatch: PropTypes.object,
  expenses: PropTypes.array,
}.isRequired;
