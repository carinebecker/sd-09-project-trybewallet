import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteExpense as deleteExpenseAction } from '../actions';

class ExpenseTable extends React.Component {
  constructor() {
    super();
    this.deleteExpense = this.deleteExpense.bind(this);
  }

  deleteExpense({ target }) {
    const { expenses, deleteExpense } = this.props;
    const newExpensesList = expenses
      .filter((expense) => expense.description !== target.value);
    deleteExpense(newExpensesList);
  }

  render() {
    const { expenses } = this.props;
    const fields = [
      'Descrição', 'Tag', 'Método de pagamento', 'Valor', 'Moeda',
      'Câmbio utilizado', 'Valor convertido', 'Moeda de conversão', 'Editar/Excluir'];
    return (
      <table>
        <tbody>
          <tr>
              {fields.map((field) => <th key={ field }>{field}</th>)}
          </tr>
          {expenses.map((i) => (
            <tr key={ i.id }>
              <td>{i.description}</td>
              <td>{i.tag}</td>
              <td>{i.method}</td>
              <td>{i.value}</td>
              <td>{i.exchangeRates[i.currency].name}</td>
              <td>
                {parseFloat((i.exchangeRates)[i.currency].ask).toFixed(2)}
              </td>
              <td>
                {parseFloat((i.exchangeRates)[i.currency].ask * i.value).toFixed(2)}
              </td>
              <td>Real</td>
              <button
                type="button"
                data-testid="delete-btn"
                value={ i.description }
                onClick={ this.deleteExpense }
              >
                Excluir
              </button>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = ({ wallet }) => ({
  expenses: wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteExpense: (expenses) => dispatch(deleteExpenseAction(expenses)),
});

ExpenseTable.propTypes = {
  expenses: PropTypes.string.isRequired,
  deleteExpense: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseTable);
