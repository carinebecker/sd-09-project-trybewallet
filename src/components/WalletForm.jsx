import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import fetchApi from '../services';
import SelectOptions from './SelectOptions';
import { saveExpense, saveEditedExpense, getCurrencies } from '../actions';

class WalletForm extends Component {
  constructor(props) {
    super(props);
    this.handleCurrencyOptions = this.handleCurrencyOptions.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.renderButton = this.renderButton.bind(this);
    this.renderSelectOptions = this.renderSelectOptions.bind(this);
    this.saveNewExpense = this.saveNewExpense.bind(this);
    this.saveEditedExpense = this.saveEditedExpense.bind(this);
    this.state = {
      methods: ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'],
      tags: ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'],
      id: 0,
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      exchangeRates: {},
    };
  }

  componentDidMount() {
    this.handleCurrencyOptions();
  }

  async handleCurrencyOptions() {
    const { reloadCurrencies } = this.props;
    const currenciesResponse = await fetchApi.currenciesApi();
    reloadCurrencies(Object.keys(currenciesResponse));
    this.setState({ exchangeRates: currenciesResponse });
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  handleClick() {
    const { status } = this.props;
    this.handleCurrencyOptions();
    if (status) {
      this.saveEditedExpense();
    } else {
      this.saveNewExpense();
    }
  }

  saveEditedExpense() {
    const { currency, value, description, method, tag } = this.state;
    const { expenseToEdit, expenses, saveEdited } = this.props;
    const editedExpense = {
      id: expenseToEdit.id,
      currency,
      value,
      description,
      method,
      tag,
      exchangeRates: expenseToEdit.exchangeRates };
    const newExpenses = expenses
      .map((item) => (item.id === expenseToEdit.id ? editedExpense : item));
    saveEdited(newExpenses);
  }

  saveNewExpense() {
    const { id, currency, value, description, method, tag, exchangeRates } = this.state;
    const expense = { id, currency, value, description, method, tag, exchangeRates };
    const { addExpense } = this.props;
    addExpense(expense);
    this.setState({ id: id + 1, value: 0 });
  }

  renderSelectOptions(name, id, options, value) {
    const { status, expenseToEdit } = this.props;
    return (
      <SelectOptions
        name={ name }
        id={ id }
        options={ options }
        value={ status ? expenseToEdit.name : value }
        onChange={ (e) => this.handleChange(e) }
      />
    );
  }

  renderButton(status) {
    if (status) {
      return (
        <button
          type="button"
          onClick={ this.handleClick }
        >
          Editar despesa
        </button>
      );
    }
    return (
      <button
        type="button"
        onClick={ this.handleClick }
      >
        Adicionar despesa
      </button>
    );
  }

  render() {
    const { methods, tags, value } = this.state;
    const { description, currency, method, tag } = this.state;
    const { status, expenseToEdit, currencies } = this.props;
    return (
      <form>
        <label htmlFor="value-input">
          Valor:
          <input
            type="text"
            name="value"
            data-testid="value-input"
            onChange={ this.handleChange }
            value={ status ? expenseToEdit.value : value }
          />
        </label>
        <label htmlFor="description-input">
          Descrição:
          <input
            type="text"
            name="description"
            data-testid="description-input"
            onChange={ this.handleChange }
            value={ status ? expenseToEdit.description : description }
          />
        </label>
        { this.renderSelectOptions('currency', 'currency-input', currencies, currency) }
        { this.renderSelectOptions('method', 'method-input', methods, method) }
        { this.renderSelectOptions('tag', 'tag-input', tags, tag) }
        { this.renderButton(status) }
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  expenseToEdit: state.wallet.expenseInEdition,
  status: state.wallet.inEdition,
  expenses: state.wallet.expenses,
  currencies: state.wallet.currencies,
});

WalletForm.propTypes = {
  addExpense: PropTypes.func,
  saveEdited: PropTypes.func,
  reloadCurrencies: PropTypes.func,
  value: PropTypes.string,
  description: PropTypes.string,

  method: PropTypes.string,
  tag: PropTypes.string,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  addExpense: (expense) => dispatch(saveExpense(expense)),
  saveEdited: (expense) => dispatch(saveEditedExpense(expense)),
  reloadCurrencies: (currencies) => dispatch(getCurrencies(currencies)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
