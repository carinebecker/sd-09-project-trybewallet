import React from 'react';
import { shape, arrayOf, string, func } from 'prop-types';
import { connect } from 'react-redux';
import deleteExpenseAction from '../actions/deleteExpenseAction';
import { enableEditAction } from '../actions/editAction';
import '../css/TableDispense.css';

class TableDispense extends React.Component {
  constructor(props) {
    super(props);

    this.rowExpense = this.rowExpense.bind(this);
    this.deleteExpense = this.deleteExpense.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  handleEdit(idExpense) {
    const { wallet: { expenses }, enableEditAction: enableEdit } = this.props;
    const expenseForEditing = expenses
      .filter((expense) => expense.id === idExpense);

    enableEdit(expenseForEditing);
  }

  deleteExpense(id) {
    const { wallet: { expenses }, deleteExpenseAction: deleteItemOfGlobal } = this.props;
    const withoutExpenseDelete = expenses
      .filter((expense) => expense.id !== id);
    deleteItemOfGlobal(withoutExpenseDelete);
  }

  rowExpense() {
    const { wallet: { expenses } } = this.props;
    return expenses.map((expense) => (
      <tr key={ expense.id }>
        <td className="column">
          { console.log(expenses.exchangeRates) }
          { expense.description }
        </td>
        <td className="column">
          { expense.tag }
        </td>
        <td className="column">
          { expense.method }
        </td>
        <td className="column">{ expense.value }</td>
        <td className="column">
          { expense.exchangeRates[expense.currency]
            && expense.exchangeRates[expense.currency].name }
        </td>
        <td className="column">
          { expense.exchangeRates[expense.currency]
            && Number(expense.exchangeRates[expense.currency].ask).toFixed(2) }
        </td>
        <td className="column">
          { expense.exchangeRates[expense.currency]
            && Number(expense.value)
            * Number(expense.exchangeRates[expense.currency].ask)}
        </td>
        <td>Real</td>
        <td className="column">
          <button
            type="button"
            data-testid="delete-btn"
            onClick={ () => this.deleteExpense(expense.id) }
          >
            Deletar
          </button>
          <button
            type="button"
            data-testid="edit-btn"
            onClick={ () => this.handleEdit(expense.id) }
          >
            Editar
          </button>
        </td>
      </tr>
    ));
  }

  render() {
    return (
      <table className="tableDispenses">
        <thead>
          <tr>
            <td>Descrição</td>
            <td>Tag</td>
            <td>Método de pagamento</td>
            <td>Valor</td>
            <td>Moeda</td>
            <td>Câmbio utilizado</td>
            <td>Valor convertido</td>
            <td>Moeda de conversão</td>
            <td>Editar/Excluir</td>
          </tr>
        </thead>
        <tbody>
          { this.rowExpense() }
        </tbody>
      </table>
    );
  }
}

// https://stackoverflow.com/questions/32325912/react-proptype-array-with-shape
TableDispense.propTypes = {
  wallet: shape({
    expenses: arrayOf(shape({
      id: string,
      description: string,
      tag: string,
      method: string,
      value: string,
      exchangeRates: shape({
        name: string,
        ask: string,
      }),
    })),
  }),
  deleteExpenseAction: func,
  enableEditAction: func,
};

TableDispense.defaultProps = {
  wallet: {},
  deleteExpenseAction: () => {},
  enableEditAction: () => {},
};

const mapStateToProps = (state) => ({
  wallet: state.wallet,
});

const mapDispatchToProps = {
  deleteExpenseAction,
  enableEditAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(TableDispense);
