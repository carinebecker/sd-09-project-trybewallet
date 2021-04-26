import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrency, addExpense, updateExpense } from '../actions';
import FormButtons from './FormButtons';

const alimentacao = 'Alimentação';
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
      tag: alimentacao,
    };
  }

  componentDidMount() {
    this.fetchCurrency();
  }

  componentDidUpdate(lastProps) {
    console.log(lastProps, 'lastProps');
    const { expense } = this.props;
    if (expense && !lastProps.expense) {
      console.log(lastProps.expense);
      this.setStateFunc(expense);
    }
    if (!expense && lastProps.expense) {
      this.setStateFunc({
        value: '',
        description: '',
        currency: 'USD',
        method: 'Dinheiro',
        tag: alimentacao,
      });
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

  generateExchangeRates() {
    this.fetchCurrency();
    const { expenses, currencies, setExpense, expense, upExpense } = this.props;
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
        exchangeRates: currencies,
      };
      setExpense(expenseObj);
    }
    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: alimentacao,
    });
  }

  renderSelectCurrency(currencies) {
    const { currency: currencyState } = this.state;
    return (
      <select
        name="currency"
        id="moeda"
        data-testid="currency-input"
        defaultValue={ currencyState }
        onChange={ this.formFieldsControl }
      >
        {Object.keys(currencies).map((currency) => (
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
        id="pagamento"
        data-testid="method-input"
        onChange={ this.formFieldsControl }
      >
        <option value="dinheiro">Dinheiro</option>
        <option value="cartaoCredito">Cartão de crédito</option>
        <option value="cartaoDebito">Cartão de débito</option>
      </select>
    );
  }

  renderSelectExpenseTag() {
    const { tag } = this.state;
    return (
      <select
        name="tag"
        value={ tag }
        id="despesa"
        data-testid="tag-input"
        onChange={ this.formFieldsControl }
      >
        <option value={ alimentacao }>Alimentação</option>
        <option value="lazer">Lazer</option>
        <option value="trabalho">Trabalho</option>
        <option value="transporte">Transporte</option>
        <option value="saude">Saúde</option>
      </select>
    );
  }

  render() {
    const { value, description } = this.state;
    const { currencies } = this.props;
    return (
      <form>
        <label htmlFor="despesa">
          Valor da despesa
          <input
            type="text"
            name="value"
            value={ value }
            data-testid="value-input"
            onChange={ this.formFieldsControl }
          />
        </label>
        <label htmlFor="descricao">
          descrição da despesa
          <input
            type="text"
            name="description"
            value={ description }
            data-testid="description-input"
            onChange={ this.formFieldsControl }
          />
        </label>
        <label htmlFor="moeda">
          Moeda
          {this.renderSelectCurrency(currencies)}
        </label>
        <label htmlFor="pagamento">
          Método de pagamento
          {this.renderSelectPaymentMethod()}
        </label>
        <label htmlFor="tipoDespesa">
          Tipo de despesa
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
