import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import requestAPI from '../api/requestAPI';
import { prependExpenses, fetchExchanges, isEditing } from '../actions';

class EditExpense extends Component {
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

    this.populateCurrencies = this.populateCurrencies.bind(this);
    this.currencyinput = this.currencyinput.bind(this);
    this.descriptionInput = this.descriptionInput.bind(this);
    this.expenseValueInput = this.expenseValueInput.bind(this);
    this.methodInput = this.methodInput.bind(this);
    this.tagInput = this.tagInput.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.initialState = this.initialState.bind(this);
  }

  componentDidMount() {
    this.populateCurrencies();
    this.initialState();
  }

  populateCurrencies() {
    requestAPI().then((result) => {
      const entries = Object.entries(result);
      this.setState({ currencies: entries });
    });
  }

  initialState() {
    const { expense } = this.props;
    this.setState({
      value: expense.value,
      description: expense.description,
      currency: expense.currency,
      method: expense.method,
      tag: expense.tag,
    });
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  expenseValueInput() {
    const { value } = this.state;
    return (
      <label htmlFor="value-input">
        Valor:
        <input
          type="number"
          data-testid="value-input"
          id="value-input"
          name="value"
          value={ value }
          onChange={ this.handleChange }
        />
      </label>
    );
  }

  descriptionInput() {
    const { description } = this.state;
    return (
      <label htmlFor="description-input">
        Descrição da despesa:
        <input
          type="text"
          data-testid="description-input"
          id="description-input"
          name="description"
          value={ description }
          onChange={ this.handleChange }
        />
      </label>
    );
  }

  currencyinput() {
    const { currencies } = this.state;
    return (
      <label htmlFor="currency-input">
        Moeda:
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
        Método de pagamento:
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
        Tipo da despesa:
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

  async handleClick(event) {
    event.preventDefault();
    const { isEditingDispatcher } = this.props;
    isEditingDispatcher();
    const { id, value, description, currency, method, tag, exchangeRates } = this.state;
    const data = { id, value, description, currency, method, tag, exchangeRates };
    const { expenseDispatcher } = this.props;
    expenseDispatcher(data);
    this.initialState();
  }

  render() {
    return (
      <header>
        <form className="expenses-edit">
          <div className="expenses-fields">
            { this.expenseValueInput() }
            { this.currencyinput() }
            { this.methodInput() }
            { this.tagInput() }
            { this.descriptionInput() }
          </div>
          <button type="submit" onClick={ (event) => this.handleClick(event) }>
            Editar despesa
          </button>
        </form>
      </header>
    );
  }
}

EditExpense.propTypes = {
  expensesDispatcher: PropTypes.func,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  getExchanges: (exchange) => dispatch(fetchExchanges(exchange)),
  expenseDispatcher: (expense) => dispatch(prependExpenses(expense)),
  isEditingDispatcher: () => dispatch(isEditing()),
});

const mapStateToProps = (state) => ({
  expense: state.wallet.currentEdit,
});

export default connect(mapStateToProps, mapDispatchToProps)(EditExpense);
