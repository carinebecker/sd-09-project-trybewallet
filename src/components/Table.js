import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { editExpense, updateExpenses, updateTotal } from '../actions';
import '../App.css';

class Table extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      even: 'row even',
      odd: 'row odd',
    };

    this.editableExpense = this.editableExpense.bind(this);
    this.removeExpense = this.removeExpense.bind(this);
    this.renderTable = this.renderTable.bind(this);
  }

  componentDidUpdate() {
    this.renderTable();
  }

  editableExpense(index) {
    const { edit, expenses } = this.props;
    const { value, description, currency, method, tag } = expenses[index];
    const expense = {
      value,
      description,
      currency,
      method,
      tag,
      index,
    };
    edit(expense, index);
  }

  removeExpense(index) {
    const { expenses, removedExpenses, updatedTotal, total } = this.props;
    const removed = expenses[index];
    const convertedValue = removed.value * removed.exchangeRates[removed.currency].ask;
    const newTotal = (total - convertedValue).toFixed(2);
    const newExpenses = expenses.filter((expense) => expenses.indexOf(expense) !== index);
    // newExpenses.forEach((expense) => { expense.id = newExpenses.indexOf(expense); });
    removedExpenses(newExpenses);
    updatedTotal(newTotal);
  }

  renderTable() {
    const { expenses, isEditing } = this.props;
    if (!isEditing || isEditing) {
      return expenses.map((expense, index) => {
        const { id, description, tag, method, value, exchangeRates } = expense;
        const rates = exchangeRates[expense.currency];
        const { even, odd } = this.state;
        const curr = rates.name.split('/')[0];
        const background = (id % 2 === 0) ? even : odd;
        const currentCurrency = parseFloat(rates.ask).toFixed(2);
        const convertedValue = (rates.ask * value).toFixed(2);
        return (
          <tr key={ id } className={ background }>
            <td className="description">{description}</td>
            <td className="tag">{tag}</td>
            <td className="method">{method}</td>
            <td className="value">{value}</td>
            <td className="currency">{curr}</td>
            <td className="current-currency">{currentCurrency}</td>
            <td className="converted-value">{convertedValue}</td>
            <td className="converted-currency">Real</td>
            <td className="edit-remove">
              <button
                type="button"
                className="edit"
                data-testid="edit-btn"
                onClick={ () => this.editableExpense(index) }
              >
                Editar
              </button>
              <button
                type="button"
                className="remove"
                data-testid="delete-btn"
                onClick={ () => this.removeExpense(index) }
              >
                Excluir
              </button>
            </td>
          </tr>
        );
      });
    }
  }

  render() {
    return (
      <table>
        <thead>
          <tr className="row">
            <th className="description">Descrição</th>
            <th className="tag">Tag</th>
            <th className="method">Método de pagamento</th>
            <th className="value">Valor</th>
            <th className="currency">Moeda</th>
            <th className="current-currency">Câmbio utilizado</th>
            <th className="converted-value">Valor convertido</th>
            <th className="converted-currency">Moeda de conversão</th>
            <th className="edit-remove">Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {this.renderTable()}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = ({ wallet }) => ({
  expenses: wallet.expenses,
  isEditing: wallet.isEditing,
  total: wallet.total,
});

const mapDispatchToProps = (dispatch) => ({
  edit: (editableExpense, expenseIndex) => dispatch(
    editExpense(editableExpense, expenseIndex),
  ),
  removedExpenses: (expenses) => dispatch(updateExpenses(expenses)),
  updatedTotal: (total) => dispatch(updateTotal(total)),
});

Table.propTypes = {
  edit: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  isEditing: PropTypes.bool.isRequired,
  removedExpenses: PropTypes.func.isRequired,
  total: PropTypes.number.isRequired,
  updatedTotal: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
