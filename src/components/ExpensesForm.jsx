import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { prependExpenses } from '../actions';

class ExpensesForm extends Component {
  constructor() {
    super();

    this.state = {
      currencies: [],
      id: 0,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      exchangeRates: {},
    };

    this.getCurrency = this.getCurrency.bind(this);
    this.currencyinput = this.currencyinput.bind(this);
    this.descriptionInput = this.descriptionInput.bind(this);
    this.expenseValueInput = this.expenseValueInput.bind(this);
    this.methodInput = this.methodInput.bind(this);
    this.tagInput = this.tagInput.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.setId = this.setId.bind(this);
  }

  componentDidMount() {
    this.getCurrency();
  }

  async getCurrency() {
    const endpoint = 'https://economia.awesomeapi.com.br/json/all';
    try {
      const response = await fetch(endpoint);
      const result = await response.json();
      const entries = Object.entries(result);

      this.setState({ currencies: entries });
    } catch (error) {
      console.log(error);
    }
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  expenseValueInput() {
    return (
      <label htmlFor="value-input">
        Valor da despesa
        <input
          type="number"
          data-testid="value-input"
          id="value-input"
          name="value"
          onChange={ this.handleChange }
        />
      </label>
    );
  }

  descriptionInput() {
    return (
      <label htmlFor="description-input">
        Descrição da despesa
        <input
          type="text"
          data-testid="description-input"
          id="description-input"
          name="description"
          onChange={ this.handleChange }
        />
      </label>
    );
  }

  currencyinput() {
    const { currencies } = this.state;
    return (
      <label htmlFor="currency-input">
        Moeda
        <select
          data-testid="currency-input"
          id="currency-input"
          name="currency"
          onChange={ this.handleChange }
        >
          {
            currencies.map((value) => (
              value[0] === 'USDT'
                ? ''
                : (
                  <option
                    key={ value[0] }
                    value={ value[0] }
                    data-testid={ value[0] }
                  >
                    { value[0] }
                  </option>
                )
            ))
          }
        </select>
      </label>
    );
  }

  methodInput() {
    return (
      <label htmlFor="method-input">
        Método de pagamento
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
      </label>
    );
  }

  tagInput() {
    return (
      <label htmlFor="tag-input">
        Tipo da despesa
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
      </label>
    );
  }

  handleClick(event) {
    event.preventDefault();
    const { id, value, description, currency, method, tag, exchangeRates } = this.state;
    const data = { id, value, description, currency, method, tag, exchangeRates };
    const { expenseDispatcher } = this.props;
    this.setId();
    expenseDispatcher(data);
  }

  render() {
    return (
      <header>
        <h2 className="expenses-title">Despesas</h2>
        <form className="expenses-form">
          <div className="expenses-fields">
            { this.expenseValueInput() }
            { this.descriptionInput() }
            { this.currencyinput() }
            { this.methodInput() }
            { this.tagInput() }
          </div>
          <button type="submit" onClick={ (event) => this.handleClick(event) }>
            Adicionar despesa
          </button>
        </form>
      </header>
    );
  }
}

ExpensesForm.propTypes = {
  expensesDispatcher: PropTypes.func,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  expenseDispatcher: (expense) => dispatch(prependExpenses(expense)),
});

const mapStateToProps = (state) => ({
  expensesState: state.wallet.expenses,
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesForm);
