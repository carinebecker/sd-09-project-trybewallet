import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import getCurrencies from '../../services/api';
import {
  addExpense, sumExpenses, editExpense,
  setIdCounter, setCurr, toggleEditMode } from '../../actions';
import './styles.css';

const INITIAL_STATE = {
  value: 0, description: '', currency: 'USD', method: 'Dinheiro', tag: 'Alimentação',
};

let checkID = '';
class WalletExpenseForm extends Component {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
    this.handleChange = this.handleChange.bind(this);
    this.fetchCurrencies = this.fetchCurrencies.bind(this);
    this.renderValueInput = this.renderValueInput.bind(this);
    this.renderDescriptionInput = this.renderDescriptionInput.bind(this);
    this.renderCurrencyInput = this.renderCurrencyInput.bind(this);
    this.renderMethodInput = this.renderMethodInput.bind(this);
    this.renderTagInput = this.renderTagInput.bind(this);
    this.renderSubmitInput = this.renderSubmitInput.bind(this);
    this.submitExpense = this.submitExpense.bind(this);
    this.submitEditedExpense = this.submitEditedExpense.bind(this);
  }

  componentDidMount() {
    this.fetchCurrencies();
  }

  componentDidUpdate() {
    this.enableEdit();
  }

  async fetchCurrencies() {
    const apiCurrencies = await getCurrencies();
    delete apiCurrencies.USDT;
    const currencies = Object.keys(apiCurrencies);
    const { dispatchCurrencies } = this.props;
    dispatchCurrencies(currencies);
    return apiCurrencies;
  }

  handleChange({ target }) {
    const { name } = target;
    this.setState({ [name]: target.value });
  }

  async submitExpense(event) {
    event.preventDefault();
    const { dispatchExpense, totalExpensesValue, setCounter, idCounter } = this.props;
    const { value, currency } = this.state;
    const exchangeRates = await this.fetchCurrencies();
    const currencyIndex = Object.keys(exchangeRates).indexOf(currency);
    const currencyQuote = Object.values(exchangeRates)[currencyIndex].ask;
    const valueForQuote = parseFloat(value) * parseFloat(currencyQuote);
    totalExpensesValue(valueForQuote);
    const setExpense = { ...this.state, id: idCounter, exchangeRates };
    dispatchExpense(setExpense);
    setCounter();
    this.setState(INITIAL_STATE);
    const expenseForm = document.getElementById('expense-form');
    expenseForm.reset();
  }

  async submitEditedExpense(event) {
    event.preventDefault();
    const { dispatchEditedExpense, expenses,
      totalExpensesValue, idEditing, setEditMode } = this.props;
    const { value, currency } = this.state;
    const { exchangeRates } = expenses[idEditing];
    const currencyIndex = Object.keys(exchangeRates).indexOf(currency);
    const currencyQuote = Object.values(exchangeRates)[currencyIndex].ask;
    const valueForQuote = parseFloat(value) * parseFloat(currencyQuote);
    totalExpensesValue(valueForQuote);
    const setExpense = { ...this.state, id: idEditing, exchangeRates };
    dispatchEditedExpense(setExpense);
    this.setState(INITIAL_STATE);
    setEditMode();
    const expenseForm = document.getElementById('expense-form');
    expenseForm.reset();
  }

  enableEdit() {
    const { idEditing, editMode, expenses } = this.props;
    if (editMode && checkID !== idEditing) {
      const { value, description, currency, method, tag } = expenses[idEditing];
      this.setState(
        (state) => ({ ...state, value, description, currency, method, tag }),
      );
      checkID = idEditing;
    }
  }

  renderValueInput(value) {
    return (
      <input
        className="input-form"
        type="number"
        name="value"
        data-testid="value-input"
        value={ value }
        onChange={ this.handleChange }
      />
    );
  }

  renderDescriptionInput(description) {
    return (
      <input
        className="input-form"
        type="text"
        name="description"
        data-testid="description-input"
        value={ description }
        onChange={ this.handleChange }
        placeholder="Descrição"
      />
    );
  }

  renderCurrencyInput(currency) {
    const { currencies } = this.props;
    return (
      <select
        data-testid="currency-input"
        id="currency-input"
        name="currency"
        onChange={ this.handleChange }
        value={ currency }
      >
        {
          currencies.map((thisCurrency) => ((
            <option
              key={ thisCurrency }
              value={ thisCurrency }
              data-testid={ thisCurrency }
            >
              { thisCurrency }
            </option>
          )))
        }
      </select>
    );
  }

  renderMethodInput(method) {
    return (
      <select
        data-testid="method-input"
        id="method-input"
        name="method"
        value={ method }
        onChange={ this.handleChange }
      >
        <option key="dinheiro">Dinheiro</option>
        <option key="credito">Cartão de crédito</option>
        <option key="debito">Cartão de débito</option>
      </select>
    );
  }

  renderTagInput(tag) {
    return (
      <select
        data-testid="tag-input"
        id="tag-input"
        name="tag"
        onChange={ this.handleChange }
        value={ tag }
      >
        <option key="alimentacao">Alimentação</option>
        <option key="lazer">Lazer</option>
        <option key="trabalho">Trabalho</option>
        <option key="transporte">Transporte</option>
        <option key="saude">Saúde</option>
      </select>
    );
  }

  renderSubmitInput() {
    return (
      <input
        className="submit-button"
        type="submit"
        value="Adicionar despesa"
        onClick={ this.submitExpense }
      />
    );
  }

  renderEditInput() {
    return (
      <input
        className="edit-submit-button"
        type="button"
        value="Editar despesa"
        onClick={ this.submitEditedExpense }
      />
    );
  }

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { editMode } = this.props;
    return (
      <form id="expense-form" className="expense-form-class">
        { this.renderValueInput(value) }
        { this.renderDescriptionInput(description) }
        { this.renderCurrencyInput(currency) }
        { this.renderMethodInput(method) }
        { this.renderTagInput(tag) }
        { editMode ? this.renderEditInput() : this.renderSubmitInput() }
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  currencies: state.wallet.currencies,
  idCounter: state.wallet.idCounter,
  editMode: state.wallet.editMode,
  idEditing: state.wallet.idEditing,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchExpense: (expenses) => dispatch(addExpense(expenses)),
  dispatchCurrencies: (currencies) => dispatch(setCurr(currencies)),
  totalExpensesValue: (value) => dispatch(sumExpenses(value)),
  dispatchEditedExpense: (expense) => dispatch(editExpense(expense)),
  setCounter: () => dispatch(setIdCounter()),
  setEditMode: () => dispatch(toggleEditMode()),
});

WalletExpenseForm.propTypes = {
  dispatchExpense: PropTypes.func,
  dispatchCurrencies: PropTypes.func,
  value: PropTypes.string,
  totalExpensesValue: PropTypes.func,
  dispatchEditedExpense: PropTypes.func,
  setEditMode: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(WalletExpenseForm);
