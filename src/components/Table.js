import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteExpense, editExpense } from '../actions';

class Table extends React.Component {
  handleDelete(itemId) {
    const { expenses, deleteExpenseAction } = this.props;
    const filtered = expenses.filter(({ id }) => id !== itemId);
    deleteExpenseAction(filtered);
  }

  handleEdit(item) {
    const { dispatchEdit } = this.props;
    dispatchEdit(item);
  }

  Expense(expense) {
    const { description, tag, method, value, exchangeRates, currency } = expense;
    const exchangeRatesCurrency = exchangeRates[currency];
    const expenseConverted = Number(value) * Number(exchangeRatesCurrency.ask);
    return (
      <tr>
        <td>{description}</td>
        <td>{tag}</td>
        <td>{method}</td>
        <td>{value}</td>
        <td>{exchangeRatesCurrency.name}</td>
        <td>{ (Math.round(exchangeRatesCurrency.ask * 100) / 100).toFixed(2)}</td>
        <td>{ (Math.round(expenseConverted * 100) / 100).toFixed(2)}</td>
        <td>Real</td>
        <td>
          <button
            type="button"
            data-testid="edit-btn"
            onClick={ () => this.handleEdit(expense) }
          >
            Edit
          </button>
          <button
            type="button"
            data-testid="delete-btn"
            onClick={ () => this.handleDelete(expense.id) }
          >
            Excluir
          </button>
        </td>
      </tr>
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
        <tbody>
          { expenses.map((expense) => this.Expense(expense))}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = ({ wallet }) => ({
  expenses: wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteExpenseAction: (obj) => dispatch(deleteExpense(obj)),
  dispatchEdit: (item) => dispatch(editExpense(item)),
});

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  deleteExpenseAction: PropTypes.func.isRequired,
  dispatchEdit: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
