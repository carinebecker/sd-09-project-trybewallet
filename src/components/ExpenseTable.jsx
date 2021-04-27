import React from 'react';
import { connect } from 'react-redux';
import { arrayOf } from 'prop-types';
import { Link } from 'react-router-dom';
import DeleteButton from './DeleteButton';
import { editId, editingItem } from '../actions';

class ExpenseTable extends React.Component {
  constructor() {
    super();
    this.convertCurrencyName = this.convertCurrencyName.bind(this);
    this.tableOfExpenses = this.tableOfExpenses.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(id) {
    const { saveId, setEditing } = this.props;
    saveId(id);
    setEditing();
  }

  convertCurrencyName(Acronym, exchangeRates, value) {
    const currencyValue = Object.entries(exchangeRates)
      .find((element) => Acronym === element[0]);
    const convertedValue = Number(value) * Number(currencyValue[1].ask);
    return {
      name: currencyValue[1].name,
      ask: currencyValue[1].ask,
      value: convertedValue,
    };
  }

  tableOfExpenses(expenses) {
    return (
      expenses.length !== 0 && expenses.map((expense) => (
        <tr key={ expense.id }>
          <td>{expense.description}</td>
          <td>{expense.tag}</td>
          <td>{expense.method}</td>
          <td>{expense.value}</td>
          <td>
            {this.convertCurrencyName(expense.currency, expense.exchangeRates).name}
          </td>
          <td>
            {(this.convertCurrencyName(
              expense.currency, expense.exchangeRates,
            ).ask * 1).toFixed(2)}
          </td>
          <td>
            {(this.convertCurrencyName(
              expense.currency, expense.exchangeRates, expense.value,
            ).value * 1).toFixed(2)}
          </td>
          <td>Real</td>
          <td>
            <DeleteButton
              expenseId={ expense.id }
              value={ (this.convertCurrencyName(
                expense.currency, expense.exchangeRates, expense.value,
              ).value * 1).toFixed(2) }
            />
            <button
              data-testid="edit-btn"
              type="button"
              onClick={ () => this.handleClick(expense.id) }
            >
              Editar
            </button>
          </td>
        </tr>
      ))
    );
  }

  render() {
    const { expenses } = this.props;
    const tableTags = [
      'Descrição',
      'Tag',
      'Método de pagamento',
      'Valor',
      'Moeda',
      'Câmbio utilizado',
      'Valor convertido',
      'Moeda de conversão',
      'Editar/Excluir',
    ];
    return (
      <table>
        <thead>
          <tr>
            {tableTags.map((name) => <th key={ name }>{name}</th>)}
          </tr>
        </thead>
        <tbody>
          {this.tableOfExpenses(expenses)}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  id: state.expenseReducer.id,
});

const mapDispatchToProps = (dispatch) => ({
  saveId: (id) => dispatch(editId(id)),
  setEditing: () => dispatch(editingItem()),
});

ExpenseTable.propTypes = {
  expenses: arrayOf,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseTable);
