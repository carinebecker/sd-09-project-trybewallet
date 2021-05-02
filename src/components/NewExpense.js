import React from 'react';
import { connect } from 'react-redux';
import { func, objectOf, object, arrayOf } from 'prop-types';
import {
  fetchCurrencies,
  setTotalExpense,
  setExpense,
  setEditExpense,
  updateExpenses,
} from '../actions';

class NewExpense extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
      edit: {
        editable: false,
        id: 0,
      },
    };

    this.fetchCurrencies = this.fetchCurrencies.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.mySetState = this.mySetState.bind(this);
    this.updateTotalExpense = this.updateTotalExpense.bind(this);
    this.addExpense = this.addExpense.bind(this);
    this.editExpense = this.editExpense.bind(this);
    this.isEditOn = this.isEditOn.bind(this);
    this.renderCurrencySelector = this.renderCurrencySelector.bind(this);
    this.renderAddEditButton = this.renderAddEditButton.bind(this);
  }

  componentDidMount() {
    this.fetchCurrencies();
  }

  componentDidUpdate() {
    this.isEditOn();
  }

  async fetchCurrencies() {
    const { dispatchFetchCurrencies } = this.props;
    dispatchFetchCurrencies();
  }

  updateTotalExpense() {
    const { expenses, dispatchTotalExpense } = this.props;
    const totalExpense = expenses.reduce((total, expense) => {
      const rate = expense.exchangeRates[expense.currency].ask;
      return total + (rate * expense.value);
    }, 0);
    dispatchTotalExpense(totalExpense.toFixed(2));
  }

  mySetState(newState, edit) {
    const { value = '', currency = 'USD', method = 'Dinheiro' } = newState;
    const { tag = 'Alimentação', description = '' } = newState;
    this.setState({ value, currency, method, tag, description, edit });
  }

  async addExpense() {
    await this.fetchCurrencies();
    const { value, description, currency, method, tag } = this.state;
    const { currencies, expenses, dispatchSetExpense } = this.props;
    const expense = {
      id: expenses.length,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates: currencies,
    };
    await dispatchSetExpense(expense);
    this.mySetState({}, { editable: false, id: 0 });
    this.updateTotalExpense();
  }

  async editExpense() {
    const { expenses, dispatchUpdateExpenses } = this.props;
    const { value, currency, method, tag, description, edit } = this.state;
    const editedExpenses = expenses.map((expense) => {
      if (expense.id === edit.id) {
        return { ...expense, value, currency, method, tag, description };
      }
      return expense;
    });
    await dispatchUpdateExpenses(editedExpenses);
    this.mySetState({}, { editable: false, id: 0 });
    this.updateTotalExpense();
  }

  isEditOn() {
    const { expenses, edit, dispatchSetEditExpense } = this.props;
    if (edit && edit.editable) {
      const editExpense = expenses.find((expense) => expense.id === edit.id);
      this.mySetState(editExpense, edit);
      dispatchSetEditExpense({ editable: false, id: editExpense.id });
    }
  }

  handleChange({ target }) {
    const { value, name } = target;
    this.setState({ [name]: value });
  }

  renderCurrencySelector() {
    const { currencies } = this.props;
    const newCurrencies = Array.isArray(currencies)
      ? currencies : Object.keys(currencies);
    return (
      <select
        data-testid="currency-input"
        id="currency-input"
        name="currency"
        onChange={ this.handleChange }
      >
        { newCurrencies.map((currency) => (
          <option
            value={ currency }
            key={ currency }
            data-testid={ currency }
          >
            { currency }
          </option>)) }
      </select>
    );
  }

  renderPaymentMethod() {
    return (
      <select
        data-testid="method-input"
        id="method-input"
        name="method"
        onChange={ this.handleChange }
      >
        <option value="Dinheiro">Dinheiro</option>
        <option value="Cartão de crédito">Cartão de crédito</option>
        <option value="Cartão de débito">Cartão de débito</option>
      </select>
    );
  }

  renderExpenseTag() {
    return (
      <select
        data-testid="tag-input"
        id="tag-input"
        name="tag"
        onChange={ this.handleChange }
      >
        <option value="Alimentação">Alimentação</option>
        <option value="Lazer">Lazer</option>
        <option value="Trabalho">Trabalho</option>
        <option value="Transporte">Transporte</option>
        <option value="Saúde">Saúde</option>
      </select>
    );
  }

  renderAddEditButton() {
    const { edit } = this.state;
    return edit.editable
      ? <button type="button" onClick={ this.editExpense }>Editar despesa</button>
      : <button type="button" onClick={ this.addExpense }>Adicionar despesa</button>;
  }

  render() {
    const { value, description } = this.state;
    return (
      <div>
        <label htmlFor="value-input">
          Valor:
          <input
            type="text"
            data-testid="value-input"
            id="value-input"
            name="value"
            onChange={ this.handleChange }
            value={ value }
          />
        </label>
        <label htmlFor="currency-input">
          Moeda:
          { this.renderCurrencySelector() }
        </label>
        <label htmlFor="method-input">
          Método de pagamento:
          { this.renderPaymentMethod() }
        </label>
        <label htmlFor="tag-input">
          Tag:
          { this.renderExpenseTag() }
        </label>
        <label htmlFor="description-input">
          Descrição:
          <input
            type="text"
            data-testid="description-input"
            id="description-input"
            name="description"
            onChange={ this.handleChange }
            value={ description }
          />
        </label>
        { this.renderAddEditButton() }
      </div>
    );
  }
}

const mapStatetoProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  edit: state.wallet.edit,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchFetchCurrencies: () => dispatch(fetchCurrencies()),
  dispatchSetExpense: (expense) => dispatch(setExpense(expense)),
  dispatchTotalExpense: (totalExpense) => dispatch(setTotalExpense(totalExpense)),
  dispatchSetEditExpense: (edit) => dispatch(setEditExpense(edit)),
  dispatchUpdateExpenses: (expenses) => dispatch(updateExpenses(expenses)),
});

NewExpense.propTypes = {
  dispatchFetchCurrencies: func,
  dispatchSetExpense: func,
  currencies: objectOf(object),
  expenses: arrayOf(object),
}.isRequired;

export default connect(mapStatetoProps, mapDispatchToProps)(NewExpense);
