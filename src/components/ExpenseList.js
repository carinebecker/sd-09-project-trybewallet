import React from 'react';
import { connect } from 'react-redux';
import PropType from 'prop-types';
import { deleteExpense as deleteExpenseAction } from '../actions';

class ExpenseList extends React.Component {
  constructor(props) {
    super(props);

    this.handlerDeleteExpense = this.handlerDeleteExpense.bind(this);
    this.renderTable = this.renderTable.bind(this);
  }

  handlerDeleteExpense(id) {
    const { expenses, deleteExpense } = this.props;
    const newExpenses = expenses.filter((expense) => expense.id !== id);
    deleteExpense(newExpenses);
  }

  renderTable(expenses) {
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  render() {
    const { expenses } = this.props;
    return (
      this.renderTable(expenses)
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteExpense: (expenses) => dispatch(deleteExpenseAction(expenses)),
});

ExpenseList.propTypes = {
  expenses: PropType.arrayOf(Object),
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseList);
