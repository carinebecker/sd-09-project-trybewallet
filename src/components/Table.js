import React, { Component } from 'react';
import { arrayOf } from 'prop-types';
import { connect } from 'react-redux';
import { expenseDelete, getExpense } from '../actions';

class Table extends Component {
  constructor(props) {
    super(props);
    this.tableRows = this.tableRows.bind(this);
  }

  handleClick(key, event) {
    const { expenses, globalDeleteExpense, globalGetExpense } = this.props;
    const { name } = event.target;
    const newFilteredExpenses = expenses.filter((expense) => (expense.id !== key));
    const newGetExpDetails = expenses.find((expense) => (expense.id === key));
    if (name === 'delete-btn') {
      globalDeleteExpense(newFilteredExpenses);
    } else {
      globalGetExpense(newGetExpDetails);
    }
  }

  tableRows() {
    const { expenses } = this.props;
    return (
      expenses.map((expense) => (
        <tr key={ expense.id }>
          <td>{ expense.description }</td>
          <td>{ expense.tag}</td>
          <td>{ expense.method }</td>
          <td>{ expense.value }</td>
          <td>{ expense.exchangeRates[expense.currency].name }</td>
          <td>{ parseFloat(expense.exchangeRates[expense.currency].ask).toFixed(2) }</td>
          <td>
            { parseFloat(expense.value * expense.exchangeRates[expense.currency].ask)
              .toFixed(2) }
          </td>
          <td>Real</td>
          <td>
            <button
              type="button"
              name="edit-btn"
              onClick={ (e) => this.handleClick(expense.id, e) }
            >
              Editar
            </button>
            <button
              type="button"
              data-testid="delete-btn"
              name="delete-btn"
              onClick={ (e) => this.handleClick(expense.id, e) }
            >
              Excluir
            </button>
          </td>
        </tr>
      ))
    );
  }

  render() {
    return (
      <table>
        <thead>
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
          </tr>
        </thead>
        <tbody>
          { this.tableRows() }
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => (
  {
    globalDeleteExpense: (filteredExpenses) => {
      dispatch(expenseDelete(filteredExpenses));
    },
    globalGetExpense: (getExpenseDetails) => {
      dispatch(getExpense(getExpenseDetails));
    },
  }
);

Table.propTypes = {
  expenses: arrayOf({}),
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Table);
