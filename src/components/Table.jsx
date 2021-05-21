import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { editExpenseAction, removeItemAction } from '../actions';

class TableHeader extends Component {
  removeHandler(id) {
    const { removeExpense } = this.props;
    removeExpense(id);
  }

  editForm(index) {
    const { editExpense } = this.props; // DispatchToProps
    const { expenses } = this.props; 

    editExpense(expenses[index]);
  }

  render() {
    const { expenses } = this.props;
    const rv = (value) => Math.round(value * 100) / 100;
    return (
      <table className="table table-dark">
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
          {expenses.map((expense, index) => (
            <tr key={ expense.id }>
              <td>{expense.description}</td>
              <td>{expense.tag}</td>
              <td>{expense.method}</td>
              <td>{expense.value}</td>
              <td>{expense.exchangeRates[expense.currency].name}</td>
              <td>{rv(expense.exchangeRates[expense.currency].ask)}</td>
              <td>{rv(expense.value * expense.exchangeRates[expense.currency].ask)}</td>
              <td>Real</td>
              <td>
                <button
                  type="button"
                  data-testid="edit-btn"
                  onClick={ () => this.editForm(index) }
                >
                  Editar
                </button>
                <button
                  type="button"
                  data-testid="delete-btn"
                  onClick={ () => this.removeHandler(index) }
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

// Acessar store como props - this.props
const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  expenseEdit: state.wallet.expenseEdit,
});

// Dispachar actions
const mapDispatchToProps = (dispatch) => ({
  removeExpense: (id) => dispatch(removeItemAction(id)),
  editExpense: (id) => dispatch(editExpenseAction(id)),
});

TableHeader.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  removeExpense: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(TableHeader);
