import React, { Component } from 'react';
import { connect } from 'react-redux';
import fetchApi from '../services';
import SelectOptions from './SelectOptions';
import { saveExpense } from '../actions';

class WalletForm extends Component {
  constructor(props) {
    super(props);
    this.handleOptions = this.handleOptions.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      currencies: [],
      methods: ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'],
      tags: ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'],
      currency: '',
      value: 0,
      description: '',
      method: '',
      tag: '',
    };
  }

  componentDidMount() {
    this.handleOptions();
  }

  async handleOptions() {
    const currenciesResponse = await fetchApi.currenciesApi();
    this.setState({ currencies: Object.keys(currenciesResponse) });
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  handleClick() {
    const { currency, value, description, method, tag } = this.state;
    const expense = [{ currency, value, description, method, tag }];
    saveExpense(expense);
  }

  render() {
    const { currencies, methods, tags } = this.state;
    return (
      <form>
        <label htmlFor="value-input">
          Valor:
          <input
            type="text"
            name="value"
            data-testid="value-input"
            onChange={ this.handleChange }
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
        <button type="submit" onClick={ this.handleClick }>Adicionar despesa</button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispacth) => ({
  expense: (value) => dispacth(saveExpense(value)),
});

export default connect(null, mapDispatchToProps)(WalletForm);
