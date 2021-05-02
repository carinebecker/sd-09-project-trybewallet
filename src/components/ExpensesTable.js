import React from 'react';
import { connect } from 'react-redux';
import { arrayOf, object } from 'prop-types';
import { updateExpenses, setTotalExpense, setEditExpense } from '../actions';

class ExpensesTable extends React.Component {
  constructor(props) {
    super(props);
    this.deleteExpense = this.deleteExpense.bind(this);
    this.editExpense = this.editExpense.bind(this);
    this.renderExpensesTable = this.renderExpensesTable.bind(this);
  }

  deleteExpense(expenseId) {
    const { expenses, dispatchUpdateExpenses, dispatchSetTotalExpense } = this.props;
    const expenseSelection = expenses.filter(
      (expense) => expense.id !== expenseId,
    );
    dispatchUpdateExpenses(expenseSelection);
    const totalExpense = expenseSelection.reduce((total, expense) => {
      const rate = expense.exchangeRates[expense.currency].ask;
      return total + (rate * expense.value);
    }, 0);
    dispatchSetTotalExpense(totalExpense.toFixed(2));
  }

  editExpense(id) {
    const { dispatchSetEditExpense } = this.props;
    dispatchSetEditExpense({ editable: true, id });
  }

  renderExpensesTable() {
    const { expenses } = this.props;
    return expenses.map((item) => {
      const rate = item.exchangeRates[item.currency];
      return (
        <tr key={ item.id }>
          <td>{item.description}</td>
          <td>{item.tag}</td>
          <td>{item.method}</td>
          <td>{item.value}</td>
          <td>{rate.name}</td>
          <td>{parseFloat(rate.ask).toFixed(2)}</td>
          <td>{(rate.ask * item.value).toFixed(2)}</td>
          <td>Real</td>
          <td>
            <button
              data-testid="edit-btn"
              type="button"
              onClick={ () => this.editExpense(item.id) }
            >
              Editar
            </button>
            <button
              data-testid="delete-btn"
              type="button"
              onClick={ () => this.deleteExpense(item.id) }
            >
              Deletar
            </button>
          </td>
        </tr>
      );
    });
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
          {this.renderExpensesTable()}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchUpdateExpenses: (expenses) => dispatch(updateExpenses(expenses)),
  dispatchSetTotalExpense: (totalExpense) => dispatch(setTotalExpense(totalExpense)),
  dispatchSetEditExpense: (edit) => dispatch(setEditExpense(edit)),
});

ExpensesTable.propTypes = {
  expenses: arrayOf(object),
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesTable);
