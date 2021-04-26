import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import getCurrencies from '../../services/api';
import { addExpense, sumExpenses, editExpense } from '../../actions';
import './styles.css';

class WalletExpenseForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currencies: [],
      id: 0,
      value: 0,
      description: '',
      currency: 'USD',
      method: '',
      tag: '',
      editMode: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.fetchCurrencies = this.fetchCurrencies.bind(this);
    this.valueInput = this.valueInput.bind(this);
    this.descriptionInput = this.descriptionInput.bind(this);
    this.currencyInput = this.currencyInput.bind(this);
    this.methodInput = this.methodInput.bind(this);
    this.tagInput = this.tagInput.bind(this);
    this.submitInput = this.submitInput.bind(this);
    this.submitExpense = this.submitExpense.bind(this);
  }

  componentDidMount() {
    this.fetchCurrencies();
  }

  async fetchCurrencies() {
    const apiCurrencies = await getCurrencies();
    this.setState({
      currencies: Object.keys(apiCurrencies),
    });
  }

  handleChange({ target }) {
    const { name } = target;
    this.setState({
      [name]: target.value,
    });
  }

  async submitExpense(event) {
    event.preventDefault();
    const { dispatchExpense, totalExpensesValue } = this.props;
    const { id, value, description, currency, method, tag } = this.state;
    const exchangeRates = await getCurrencies();
    const expenseKeys = {
      id,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates,
    };
    const currencyIndex = Object.keys(exchangeRates).indexOf(currency);
    const currencyQuote = Object.values(exchangeRates)[currencyIndex].ask;
    const valueForQuote = parseFloat(value) * parseFloat(currencyQuote);
    dispatchExpense(
      expenseKeys,
    );
    totalExpensesValue(valueForQuote);
    this.setState({
      id: id + 1,
      value: 0,
      description: '',
      currency: 'USD',
      method: '',
      tag: '',
    });
    const expenseForm = document.getElementById('expense-form');
    expenseForm.reset();
  }

  async submitEditedExpense(event) {
    event.preventDefault();

    const expenseForm = document.getElementById('expense-form');
    expenseForm.reset();
  }

  valueInput() {
    const { value } = this.state;
    return (
      <label htmlFor="value-input">
        Valor:
        <input
          className="input-form"
          type="number"
          name="value"
          data-testid="value-input"
          onChange={ this.handleChange }
          value={ value }
        />
      </label>
    );
  }

  descriptionInput() {
    const { description } = this.state;
    return (
      <label htmlFor="description-input">
        Descrição:
        <input
          className="input-form"
          type="text"
          name="description"
          data-testid="description-input"
          onChange={ this.handleChange }
          value={ description }
        />
      </label>
    );
  }

  currencyInput() {
    const { currencies, currency } = this.state;
    return (
      <select
        data-testid="currency-input"
        id="currency-input"
        name="currency"
        onChange={ this.handleChange }
        defaultValue="Escolha a moeda"
        value={ currency }
      >
        <option disabled>Escolha a moeda</option>
        {
          currencies.map((thisCurrency) => ((thisCurrency !== 'USDT') ? (
            <option
              key={ thisCurrency }
              value={ thisCurrency }
              data-testid={ thisCurrency }
            >
              { thisCurrency }
            </option>
          ) : ''))
        }
      </select>
    );
  }

  methodInput() {
    const { method } = this.state;
    return (
      <select
        data-testid="method-input"
        id="method-input"
        name="method"
        onChange={ this.handleChange }
        defaultValue="Forma de pagamento"
        value={ method }
      >
        <option disabled>Forma de pagamento</option>
        <option key="dinheiro">Dinheiro</option>
        <option key="credito">Cartão de crédito</option>
        <option key="debito">Cartão de débito</option>
      </select>
    );
  }

  tagInput() {
    const { tag } = this.state;
    return (
      <select
        data-testid="tag-input"
        id="tag-input"
        name="tag"
        onChange={ this.handleChange }
        defaultValue="Categoria"
        value={ tag }
      >
        <option disabled>Categoria</option>
        <option key="alimentacao">Alimentação</option>
        <option key="lazer">Lazer</option>
        <option key="trabalho">Trabalho</option>
        <option key="transporte">Transporte</option>
        <option key="saude">Saúde</option>
      </select>
    );
  }

  submitInput() {
    return (
      <input
        className="submit-button"
        type="submit"
        value="Adicionar despesa"
        onClick={ this.submitExpense }
      />
    );
  }

  editInput() {
    return (
      <input
        className="edit-button"
        type="submit"
        value="Editar despesa"
        onClick={ this.submitEditedExpense }
      />
    );
  }

  // enableEdit(expense) {
  // const { id, value, description, currency, method, tag, editMode } = expense[0];
  // console.log(description);
  /* this.setState({
      editMode: true,
    }); */
  // }

  render() {
    const { expense } = this.props;
    if (expense) {
      this.enableEdit(expense);
    }
    const { value, description, currency, method, tag, editMode } = this.state;
    return (
      <form id="expense-form" className="expense-form-class">
        { this.valueInput(value) }
        { this.descriptionInput(description) }
        { this.currencyInput(currency) }
        { this.methodInput(method) }
        { this.tagInput(tag) }
        { editMode ? this.editInput() : this.submitInput() }
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  expense: state.wallet.expense,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchExpense: (expenses) => dispatch(addExpense(expenses)),
  totalExpensesValue: (value) => dispatch(sumExpenses(value)),
  editExpense,
});

WalletExpenseForm.propTypes = {
  dispatchExpense: PropTypes.func,
  value: PropTypes.string,
  totalExpensesValue: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(WalletExpenseForm);
