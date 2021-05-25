import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteExpenses, editExpense, updateExpenses } from '../actions/wallet';

class Tabela extends Component {
  deleteExpense(expenseId) {
    const { expenses, dispatchDeleteExpenses } = this.props;

    const updatedExpenses = expenses.filter((expense) => expense.id !== expenseId);

    dispatchDeleteExpenses(updatedExpenses);
  }

  editExpense(expenseId) {
    const { expenses, dispatchEditExpense } = this.props;

    const updatedExpenses = expenses.filter((expense) => expense.id === expenseId);
    console.log('--', updatedExpenses);

    dispatchEditExpense(updatedExpenses[0]);
  }

  renderHead() {
    return (
      <tr>
        <th>Descrição</th>
        <th>Tag</th>
        <th>Método de pagamento</th>
        <th>Valor</th>
        <th>Moeda</th>
        <th>Câmbio utilizado</th>
        <th>Valor convertido</th>
        <th>Moeda de conversão</th>
        <th>Editar/Excluir</th>
      </tr>);
  }

  render() {
    const { expenses } = this.props;
    return (
      <table>
        <thead>{this.renderHead()}</thead>
        <thead />
        <tbody>
          {expenses.map((expense) => {
            console.log(expense);
            const exchangeRates = expense.exchangeRates[expense.currency];
            console.log(exchangeRates);
            return (
              <tr key={ expense.id }>
                <td>{ expense.description }</td>
                <td>{ expense.tag }</td>
                <td>{ expense.method }</td>
                <td>{ expense.value }</td>
                <td>{ exchangeRates.name.replace(/(.*)\/(.*)/g, '$1') }</td>
                <td>{ parseFloat(exchangeRates.ask).toFixed(2) }</td>
                <td>{ (expense.value * exchangeRates.ask).toFixed(2) }</td>
                <td>Real</td>
                <td>
                  <button
                    data-testid="edit-btn"
                    type="button"
                    onClick={ () => this.editExpense(expense.id) }
                  >
                    Editar
                  </button>
                  <button
                    data-testid="delete-btn"
                    type="button"
                    onClick={ () => this.deleteExpense(expense.id) }
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

Tabela.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object),
  currencies: PropTypes.arrayOf(PropTypes.object),
}.isRequired;

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchDeleteExpenses: (expenses) => dispatch(deleteExpenses(expenses)),
  dispatchEditExpense: (expense) => dispatch(editExpense(expense)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Tabela);
