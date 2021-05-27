import React from 'react';
import { connect } from 'react-redux';
import PropType from 'prop-types';
import {
  deleteExpense as deleteExpenseAction,
  setEditMode as setEditModeAction,
} from '../actions';

class ExpenseList extends React.Component {
  constructor(props) {
    super(props);

    this.handlerEditExpense = this.handlerEditExpense.bind(this);
    this.handlerDeleteExpense = this.handlerDeleteExpense.bind(this);
    this.renderRowsTable = this.renderRowsTable.bind(this);
  }

  handlerDeleteExpense(id) {
    const { expenses, deleteExpense } = this.props;
    const newExpenses = expenses.filter((expense) => expense.id !== id);
    deleteExpense(newExpenses);
  }

  handlerEditExpense(id) {
    const { setEditMode } = this.props;
    setEditMode({
      editModeInput: true,
      editMode: true,
      id,
    });
  }

  renderRowsTable(expenses) {
    return (
      <tbody>
        { expenses.map((expense) => (
          <tr key={ expense.id }>
            <td>{ expense.description }</td>
            <td>{ expense.tag }</td>
            <td>{ expense.method }</td>
            <td>{ expense.value }</td>
            <td>{ expense.exchangeRates[expense.currency].name }</td>
            <td>
              { parseFloat(
                expense.exchangeRates[expense.currency].ask,
              ).toFixed(2) }
            </td>
            <td>
              { (
                expense.value * expense.exchangeRates[expense.currency].ask
              ).toFixed(2) }
            </td>
            <td>Real</td>
            <td>
              <button
                type="button"
                data-testid="delete-btn"
                onClick={ () => this.handlerDeleteExpense(expense.id) }
              >
                D
              </button>
              <button
                type="button"
                data-testid="edit-btn"
                onClick={ () => this.handlerEditExpense(expense.id) }
              >
                E
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    );
  }

  render() {
    const { expenses } = this.props;
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
        { this.renderRowsTable(expenses) }
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  setEditMode: (editMode) => dispatch(setEditModeAction(editMode)),
  deleteExpense: (expenses) => dispatch(deleteExpenseAction(expenses)),
});

ExpenseList.propTypes = {
  expenses: PropType.arrayOf(Object),
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseList);
