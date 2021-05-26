import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  editExpense,
  deleteExpense,
} from '../actions';

const headerDetails = ['Descrição', 'Tag', 'Método de Pagamento', 'Valor',
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
                <th>{description}</th>
                <th>{tag}</th>
                <th>{method}</th>
                <th>{value}</th>
                <th>{name}</th>
                <th>{Number(ask).toFixed(2)}</th>
                <th>{(Number(ask) * value).toFixed(2)}</th>
                <th>Real</th>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }

  buttonEdit() {
    const { editExpenseAction } = this.props;
    editExpenseAction(this.state);
  }

  buttonDelete() {
    const { deleteExpenseAction } = this.props;
    deleteExpenseAction(this.state);
  }

  renderEditButton() {
    return (
      <button
        type="button"
        onClick={ this.buttonEdit }
      >
        Editar
      </button>
    );
  }

  renderDeleteButton() {
    return (
      <button
        type="button"
        data-testid="delete-btn"
        onClick={ this.buttonDelete }
      >
        Editar
      </button>
    );
  }

  render() {
    const { expenses } = this.props;
    return (
      <div>
        {this.constructorTable(expenses)}
        {this.renderEditButton()}
        {this.renderDeleteButton()}
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
