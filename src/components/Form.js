import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { saveExpenseData, updateExpenses } from '../actions';

import CurrencySelect from './CurrencySelect';
import MethodSelect from './MethodSelect';
import CategorySelect from './CategorySelect';
import awesomeApiEndPoint from '../services/awesomeApi';
import './Form.css';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: '',
      tag: '',
      method: '',
      value: 0,
      currency: '',
      currencyTypes: [],
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleAddExpenses = this.handleAddExpenses.bind(this);
    this.handleEditExpenses = this.handleEditExpenses.bind(this);
  }

  componentDidMount() {
    this.updatesCurrencyTypesState();
  }

  getCurrencies() {
    awesomeApiEndPoint.getCurrencies()
      .then((response) => {
        delete response.USDT;
        delete response.DOGE;
        const { setExpenses, expenses } = this.props;
        const { value, currency, method, tag, description } = this.state;
        const expenseEntry = {
          id: expenses.length,
          value,
          description,
          currency,
          method,
          tag,
          exchangeRates: response,
        };
        setExpenses(expenseEntry);
        this.updatesCurrencyTypesState();
      })
      .catch((error) => console.log(error.message));
  }

  updatesCurrencyTypesState() {
    const { currencies } = this.props;
    this.setState(() => ({
      currency: currencies[0],
      value: 0,
      description: '',
      method: 'Dinheiro',
      tag: 'Alimentação',
      currencyTypes: currencies,
    }));
  }

  handleAddExpenses() {
    this.getCurrencies();
  }

  handleEditExpenses() {
    const { editExpenses, expenses, idToEdit } = this.props;
    const { value, currency, method, tag, description } = this.state;

    const editedExpense = expenses.map((expense) => {
      if (expense.id === idToEdit) {
        expense.value = value;
        expense.description = description;
        expense.currency = currency;
        expense.method = method;
        expense.tag = tag;
      }
      return expense;
    });
    editExpenses(editedExpense);
  }

  handleInputChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  render() {
    const {
      value,
      description,
      currency,
      method,
      tag,
      currencyTypes,
    } = this.state;
    const { editor } = this.props;
    return (
      <form className="container-form" action="">
        <label htmlFor="value">
          Valor:
          <input
            id="value"
            type="number"
            name="value"
            value={ value }
            onChange={ this.handleInputChange }
            data-testid="value-input"
          />
        </label>
        <CurrencySelect
          currencyTypes={ currencyTypes }
          onChange={ this.handleInputChange }
          currency={ currency }
        />
        <MethodSelect onChange={ this.handleInputChange } method={ method } />
        <CategorySelect onChange={ this.handleInputChange } tag={ tag } />
        <label htmlFor="description">
          Descricao:
          <input
            type="text"
            id="description"
            name="description"
            value={ description }
            onChange={ this.handleInputChange }
            data-testid="description-input"
          />
        </label>
        <button
          type="button"
          onClick={ editor ? this.handleEditExpenses : this.handleAddExpenses }
        >
          {editor ? 'Editar despesa' : 'Adicionar despesa'}
        </button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  idToEdit: state.wallet.idToEdit,
  editor: state.wallet.editor,
});

const mapDispatchToProps = (dispatch) => ({
  setExpenses: (expenseEntry) => dispatch(saveExpenseData(expenseEntry)),
  editExpenses: (editedExpense) => dispatch(updateExpenses(editedExpense)),
});

Form.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  setExpenses: PropTypes.func.isRequired,
  editExpenses: PropTypes.func.isRequired,
  editor: PropTypes.bool.isRequired,
  idToEdit: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
