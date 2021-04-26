import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrency, addExpense, updateExpense } from '../actions';
import fetchApi from '../services/api';
import FormButtons from './FormButtons';

const initialState = {
  value: '',
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
};

class ExpenseForm extends React.Component {
  constructor() {
    super();

    this.formFieldsControl = this.formFieldsControl.bind(this);
    this.generateExchangeRates = this.generateExchangeRates.bind(this);

    this.state = {
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
  }

  componentDidMount() {
    this.fetchCurrency();
  }

  componentDidUpdate(lastProps) {
    const { expense } = this.props;
    if (expense && !lastProps.expense) {
      this.setStateFunc(expense);
    }
    if (!expense && lastProps.expense) {
      this.setStateFunc(initialState);
    }
  }

  setStateFunc(expense) {
    this.setState({
      value: expense.value,
      description: expense.description,
      currency: expense.currency,
      method: expense.method,
      tag: expense.tag,
      exchangeRates: expense.exchangeRates,
    });
  }

  async fetchCurrency() {
    const { getCurrency } = this.props;
    await getCurrency();
  }

  formFieldsControl(event) {
    const { target } = event;
    this.setState({
      [target.name]: target.value,
    });
  }

  async generateExchangeRates() {
    const response = await fetchApi();
    const { expenses, setExpense, expense, upExpense } = this.props;
    const { value, description, currency, method, tag } = this.state;
    if (expense) {
      upExpense(expense.id, this.state);
    } else {
      const expenseObj = {
        id: expenses.length,
        value,
        description,
        currency,
        method,
        tag,
        exchangeRates: response,
      };
      setExpense(expenseObj);
    }
    this.setState(initialState);
  }

  renderSelectCurrency(currencies) {
    const { currency: currencyState } = this.state;
    return (
      <select
        name="currency"
        id="currency"
        data-testid="currency-input"
        value={ currencyState }
        onChange={ this.formFieldsControl }
      >
        {currencies.map((currency) => (
          <option
            key={ currency }
            value={ currency }
            data-testid={ currency }
          >
            { currency }
          </option>
        ))}
      </select>
    );
  }

  renderSelectPaymentMethod() {
    const { method } = this.state;
    return (
      <select
        name="method"
        value={ method }
        id="method"
        data-testid="method-input"
        onChange={ this.formFieldsControl }
      >
        <option value="Dinheiro">Dinheiro</option>
        <option value="Cartão de crédito">Cartão de crédito</option>
        <option value="Cartão de débito">Cartão de débito</option>
      </select>
    );
  }

  renderSelectExpenseTag() {
    const { tag } = this.state;
    return (
      <select
        name="tag"
        value={ tag }
        id="tag"
        data-testid="tag-input"
        onChange={ this.formFieldsControl }
      >
        <option value="Alimentação">Alimentação</option>
        <option value="Lazer">Lazer</option>
        <option value="Trabalho">Trabalho</option>
        <option value="Transporte">Transporte</option>
        <option value="Saúde">Saúde</option>
      </select>
    );
  }

  render() {
    const { value, description } = this.state;
    const { currencies } = this.props;
    return (
      <form>
        <label htmlFor="description">
          {/* descrição da despesa */}
          <input
            type="text"
            name="description"
            value={ description }
            data-testid="description-input"
            onChange={ this.formFieldsControl }
          />
        </label>
        <label htmlFor="value">
          {/* Valor da despesa */}
          <input
            type="text"
            name="value"
            value={ value }
            data-testid="value-input"
            onChange={ this.formFieldsControl }
          />
        </label>
        <label htmlFor="currency">
          {/* Moeda */}
          {this.renderSelectCurrency(currencies)}
        </label>
        <label htmlFor="method">
          {/* Pagamento */}
          {this.renderSelectPaymentMethod()}
        </label>
        <label htmlFor="tag">
          {/* Tipo de despesa */}
          {this.renderSelectExpenseTag()}
        </label>
        <FormButtons generateExchangeRates={ this.generateExchangeRates } />
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  selected: state.wallet.selected,
  expense: state.wallet.expense,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrency: () => dispatch(fetchCurrency()),
  setExpense: (expense) => dispatch(addExpense(expense)),
  upExpense: (id, expense) => dispatch(updateExpense(id, expense)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseForm);

ExpenseForm.propTypes = {
  expense: PropTypes.object,
}.isRequired;
