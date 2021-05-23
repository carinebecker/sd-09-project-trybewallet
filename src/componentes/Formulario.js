import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchEconomyApi, updateExpenses } from '../actions/wallet';

class Formulario extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 0,
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.requestCurrencies();
  }

  async requestCurrencies() {
    const { dispatchFetchCurrencies } = this.props;
    await dispatchFetchCurrencies();
  }

  handleChange({ target }) {
    const { value, name } = target;

    this.setState({
      [name]: value,
    });
  }

  createExpense() {
    this.requestCurrencies();

    const { expenses, currencies, dispatchAddExpenses } = this.props;
    const { value, currency, method, tag, description } = this.state;

    const expense = {
      id: expenses.length,
      value,
      currency,
      method,
      tag,
      description,
      exchangeRates: currencies,
    };

    dispatchAddExpenses(expense);

    this.setState({
      value: 0,
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
    });
  }

  renderCurrenciesSelect(currencies) {
    const { currency } = this.state;
    return (
      <select
        data-testid="currency-input"
        id="currency-input"
        value={ currency }
        name="currency"
        onChange={ this.handleChange }
      >
        { Object.keys(currencies).map((moeda) => (
          <option
            key={ moeda }
            value={ moeda }
            data-testid={ moeda }
          >
            { moeda }
          </option>
        )) }
      </select>
    );
  }

  renderMethodSelect() {
    const { method } = this.state;
    return (
      <select
        data-testid="method-input"
        id="method-input"
        value={ method }
        name="method"
        onChange={ this.handleChange }
      >
        <option value="Dinheiro">Dinheiro</option>
        <option value="Cartão de crédito">Cartão de crédito</option>
        <option value="Cartão de débito">Cartão de débito</option>
      </select>
    );
  }

  renderTagSelect() {
    const { tag } = this.state;
    return (
      <select
        data-testid="tag-input"
        id="tag-input"
        value={ tag }
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

  render() {
    const { value, description } = this.state;
    const { currencies } = this.props;

    return (
      <form>
        <label htmlFor="value-input">
          Valor:
          <input
            type="number"
            data-testid="value-input"
            value={ value }
            name="value"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="currency-input">
          Moeda:
          { this.renderCurrenciesSelect(currencies) }
        </label>
        <label htmlFor="method-input">
          Método de pagamento:
          { this.renderMethodSelect() }
        </label>
        <label htmlFor="tag-input">
          Tag:
          { this.renderTagSelect() }
        </label>
        <label htmlFor="description-input">
          Descrição:
          <input
            type="text"
            data-testid="description-input"
            value={ description }
            name="description"
            onChange={ this.handleChange }
          />
        </label>
        <button
          type="button"
          onClick={ () => this.createExpense() }
        >
          Adicionar despesa
        </button>
      </form>
    );
  }
}

Formulario.propTypes = {
  dispatchAddExpenses: PropTypes.func,
  expenses: PropTypes.arrayOf(PropTypes.object),
  currencies: PropTypes.objectOf(PropTypes.string),
}.isRequired;

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchFetchCurrencies: () => dispatch(fetchEconomyApi()),
  dispatchAddExpenses: (expenses) => dispatch(updateExpenses(expenses)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Formulario);
