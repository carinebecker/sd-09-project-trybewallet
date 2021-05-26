import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import fetchApi from '../services';
import SelectOptions from './SelectOptions';
import { saveExpense } from '../actions';

class WalletForm extends Component {
  constructor(props) {
    super(props);
    this.handleCurrencyOptions = this.handleCurrencyOptions.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      currencies: [],
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
    const currenciesResponse = await fetchApi.currenciesApi();
    this.setState({
      currencies: Object.keys(currenciesResponse),
      exchangeRates: currenciesResponse,
    });
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  handleClick() {
    this.handleCurrencyOptions();
    const { id, currency, value, description, method, tag, exchangeRates } = this.state;
    const expense = { id, currency, value, description, method, tag, exchangeRates };
    const { addExpense } = this.props;
    addExpense(expense);
    this.setState({ id: id + 1, value: 0 });
  }

  render() {
    const { currencies, methods, tags, value } = this.state;
    return (
      <form>
        <label htmlFor="value-input">
          Valor:
          <input
            type="text"
            name="value"
            data-testid="value-input"
            onChange={ this.handleChange }
            value={ value }
          />
        </label>
        <label htmlFor="description-input">
          Descrição:
          <input
            type="text"
            name="description"
            data-testid="description-input"
            onChange={ this.handleChange }
          />
        </label>
        <SelectOptions
          name="currency"
          id="currency-input"
          options={ currencies }
          onChange={ (e) => this.handleChange(e) }
        />
        <SelectOptions
          name="method"
          id="method-input"
          options={ methods }
          onChange={ (e) => this.handleChange(e) }
        />
        <SelectOptions
          name="tag"
          id="tag-input"
          options={ tags }
          onChange={ (e) => this.handleChange(e) }
        />
        <button
          type="button"
          onClick={ this.handleClick }
        >
          Adicionar despesa
        </button>
      </form>
    );
  }
}

WalletForm.propTypes = {
  addExpense: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispacth) => ({
  addExpense: (expense) => dispacth(saveExpense(expense)),
});

export default connect(null, mapDispatchToProps)(WalletForm);
