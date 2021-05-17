import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FormAddExpenses from './FormAddExpenses';
import EditExpense from './EditExpense';
import Table from './Table';

class Wallet extends React.Component {
  constructor(props) {
    super(props);

    this.sumTotal = this.sumTotal.bind(this);
  }

  // Soma do Header
  sumTotal() {
    let total = 0;
    const { expenses } = this.props;
    expenses.forEach(({ value, currency, exchangeRates }) => {
      total += value * exchangeRates[currency].ask;
    });
    return total;
  }

  render() {
    const { email } = this.props;
    const { isEditing } = this.props;
    return (
      <div>
        <header>
          <h1 data-testid="email-field">{`Bem-vindo ${email}`}</h1>
          <p>
            Despesa Total: R$
            <span data-testid="total-field">{ this.sumTotal() }</span>
          </p>
          <p data-testid="header-currency-field">Cambio: BRL</p>
        </header>
        {!isEditing && <FormAddExpenses />}
        {isEditing && <EditExpense />}
        <Table />
      </div>);
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
  isEditing: state.wallet.isEditing,
});

Wallet.propTypes = {
  email: PropTypes.string,
  isEditing: PropTypes.bool.isRequired,
}.isRequired;

export default connect(mapStateToProps)(Wallet);
