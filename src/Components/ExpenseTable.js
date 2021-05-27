import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  editExpense,
  deleteExpense,
} from '../actions';

const headerDetails = ['Descrição', 'Tag', 'Método de pagamento', 'Valor',
  'Moeda', 'Câmbio utilizado', 'Valor convertido', 'Moeda de conversão',
  'Editar/Excluir'];

class ExpenseTable extends Component {
  constructorTable() {
    const { expenses } = this.props;
    return (
      <table>
        <thead>
          <tr>
            {headerDetails.map((det, index) => (
              <th key={ index }>
                {det}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => {
            const { description, tag, method, value, currency, exchangeRates } = expense;
            const { ask, name } = exchangeRates[currency];
            return (
              <tr key={ expense.description }>
                <td>{description}</td>
                <td>{tag}</td>
                <td>{method}</td>
                <td>{value}</td>
                <td>{name}</td>
                <td>{Number(ask).toFixed(2)}</td>
                <td>{(Number(ask) * value).toFixed(2)}</td>
                <td>Real</td>
                <td>
                  {this.renderEditButton()}
                  {this.renderDeleteButton(expense.id)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }

  buttonEdit() {
    const { editExpenseAction } = this.props;
    editExpenseAction();
  }

  buttonDelete(id) {
    const { deleteExpenseAction } = this.props;
    deleteExpenseAction(id);
  }

  renderEditButton() {
    return (
      <button
        type="button"
        onClick={ this.buttonEdit }
      >
        Editar despesa
      </button>
    );
  }

  renderDeleteButton(id) {
    return (
      <button
        type="button"
        data-testid="delete-btn"
        onClick={ () => this.buttonDelete(id) }
      >
        Excluir
      </button>
    );
  }

  render() {
    const { expenses } = this.props;
    return (
      <div>
        {this.constructorTable(expenses)}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  editExpenseAction: (id) => dispatch(editExpense(id)),
  deleteExpenseAction: (id) => dispatch(deleteExpense(id)),
});

ExpenseTable.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  editExpenseAction: PropTypes.func.isRequired,
  deleteExpenseAction: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseTable);
