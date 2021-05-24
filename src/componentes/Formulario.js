import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { doNotRefresh, fetchEconomyApi, updateExpenses } from '../actions/wallet';

class Formulario extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
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

  componentDidUpdate(props, prevState) {
    const { editExpense } = props;

    if (!!editExpense && editExpense.id !== prevState.id) {
      const { dispatchNotRefresh } = this.props;
      dispatchNotRefresh();
      this.setState(editExpense);
    }

    return null;
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

  async createExpense() {
    await this.requestCurrencies();
    const { expenses } = this.props;
    const { currencies, dispatchAddExpenses, editExpense } = this.props;
    const { id, value, currency, method, tag, description } = this.state;
    const expense = {
      id,
      value,
      currency,
      method,
      tag,
      description,
      exchangeRates: currencies,
    };
    let newExpenses = [];
    if (editExpense !== null) {
      newExpenses = expenses.filter((exp) => exp.id !== editExpense.id);
    }
    newExpenses = [...expenses, expense];

    dispatchAddExpenses(newExpenses);

    this.setState({
      id: expenses.length === 0 ? 1 : expenses[expenses.length - 1].id + 1,
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
          {this.props.editExpense ? 'Editar despesa' : 'Adicionar despesa'}
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
  editExpense: state.wallet.editExpense,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchFetchCurrencies: () => dispatch(fetchEconomyApi()),
  dispatchAddExpenses: (expenses) => dispatch(updateExpenses(expenses)),
  dispatchNotRefresh: () => dispatch(doNotRefresh()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Formulario);
