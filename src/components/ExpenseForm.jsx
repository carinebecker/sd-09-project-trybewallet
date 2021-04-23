import React from 'react';
import { connect } from 'react-redux';
import { string, number, func } from 'prop-types';
import getCurrencyApi from '../services/currenciesApi';
import { fetchCurrency, addNewExpense } from '../actions';
import AddExpenseButton from './AddExpenseButton';
import ExpenseTable from './ExpenseTable';

class ExpenseForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dataCurrencies: {},
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.fetchCurrenciesApi();
  }

  async fetchCurrenciesApi() {
    const currenciesData = await getCurrencyApi();
    this.setState({
      dataCurrencies: currenciesData,
    });
    return currenciesData;
  }

  handleChange({ target }) {
    const { addExpense } = this.props;
    const { name, value } = target;
    addExpense(name, value);
  }

  expenseValueInput() {
    const { expense } = this.props;
    return (
      <label htmlFor="expense">
        Valor da despesa:
        <input
          name="expense"
          type="number"
          data-testid="value-input"
          onChange={ this.handleChange }
          value={ expense }
        />
      </label>
    );
  }

  descriptionExpenseInput() {
    return (
      <label htmlFor="description">
        Descrição da despesa:
        <textarea
          name="description"
          data-testid="description-input"
          onChange={ this.handleChange }
        />
      </label>
    );
  }

  selectCurrencyInput() {
    const { dataCurrencies } = this.state;
    return (
      <label htmlFor="currency">
        Selecione a moeda:
        <select
          id="currency"
          name="currency"
          data-testid="currency-input"
          onChange={ this.handleChange }
        >
          <option value="Selecione uma opção...">Selecione uma opção...</option>
          {Object.keys(dataCurrencies)
            .filter((currency) => currency !== 'USDT')
            .map((filteredCurrency) => (
              <option
                key={ filteredCurrency }
                data-testid={ filteredCurrency }
                value={ filteredCurrency }
              >
                {filteredCurrency}
              </option>))}
        </select>
      </label>
    );
  }

  paymentMethodInput() {
    return (
      <label htmlFor="method">
        Método de pagamento:
        <select
          id="method"
          name="method"
          data-testid="method-input"
          onChange={ this.handleChange }
        >
          <option value="Selecione uma opção...">Selecione uma opção...</option>
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
      </label>
    );
  }

  tagInput() {
    return (
      <label htmlFor="tag">
        TAG:
        <select
          id="tag"
          name="tag"
          data-testid="tag-input"
          onChange={ this.handleChange }
        >
          <option value="Selecione uma opção...">Selecione uma opção...</option>
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
      </label>
    );
  }

  render() {
    return (
      <div>
        {this.expenseValueInput()}
        {this.descriptionExpenseInput()}
        {this.selectCurrencyInput()}
        {this.paymentMethodInput()}
        {this.tagInput()}
        <AddExpenseButton />
        <ExpenseTable />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expense: state.expenseReducer.expense,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrencies: () => dispatch(fetchCurrency()),
  addExpense: (name, value) => dispatch(addNewExpense(name, value)),
});

ExpenseForm.propTypes = {
  getCurrencies: func,
  addExpense: func,
  expense: number,
  currencies: string,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseForm);
