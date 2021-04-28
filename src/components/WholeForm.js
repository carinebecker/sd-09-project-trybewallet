import React, { Component } from 'react';
import { connect } from 'react-redux';
import { func } from 'prop-types';
import { expenseSave } from '../actions';

class WholeForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      currencies: [],
      paymentMethods: ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'],
      expenseTag: ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.createOptions = this.createOptions.bind(this);
    this.createTextInputs = this.createTextInputs.bind(this);
    this.createDropdown = this.createDropdown.bind(this);
  }

  componentDidMount() {
    this.currencyToInitials();
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  async handleClick() {
    const { id, value, description, currency, method, tag } = this.state;
    const { addExpense } = this.props;
    const fetchFunc = await this.currenciesAPI();
    const expenseDetailed = {
      id,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates: fetchFunc,
    };
    addExpense(expenseDetailed);
    this.setState({
      id: id + 1,
      value: '',
      description: '',
    });
  }

  async currenciesAPI() {
    const url = 'https://economia.awesomeapi.com.br/json/all';
    const fetchResponse = await fetch(url);
    const response = await fetchResponse.json();
    delete response.USDT;
    return response;
  }

  async currencyToInitials() {
    const url = 'https://economia.awesomeapi.com.br/json/all';
    const fetchResponse = await fetch(url);
    const response = await fetchResponse.json();
    delete response.USDT;
    const crr = Object.keys(response);
    this.setState({ currencies: crr });
  }

  createOptions(item, stateKey) {
    return (
      <option
        data-testid={ item }
        key={ `${item}-option` }
        value={ stateKey }
      >
        { item }
      </option>
    );
  }

  createDropdown(inputName, stateKey) {
    return (
      <label htmlFor={ inputName }>
        <select
          id={ inputName }
          name={ inputName }
          data-testid={ `${inputName}-input` }
          onChange={ this.handleChange }
        >
          {stateKey.map((item) => (this.createOptions(item)))}
        </select>
      </label>
    );
  }

  createTextInputs(inputName, stateKey) {
    return (
      <label htmlFor={ inputName }>
        <input
          data-testid={ `${inputName}-input` }
          id={ inputName }
          type="text"
          name={ inputName }
          value={ stateKey }
          onChange={ this.handleChange }
        />
      </label>
    );
  }

  render() {
    const { value, description, currencies, paymentMethods, expenseTag } = this.state;
    return (
      <div>
        <form>
          Valor da despesa:
          { this.createTextInputs('value', value) }
          Descrição da despesa:
          { this.createTextInputs('description', description)}
          Moeda:
          { this.createDropdown('currency', currencies)}
          Método de pagamento:
          { this.createDropdown('method', paymentMethods)}
          Categoria da despesa:
          { this.createDropdown('tag', expenseTag)}
        </form>
        <button
          type="button"
          onClick={ this.handleClick }
        >
          Adicionar despesa
        </button>
      </div>);
  }
}

const mapDispatchToprops = (dispatch) => ({
  addExpense: (expenseDetails) => dispatch(expenseSave(expenseDetails)),
});

WholeForm.propTypes = {
  addExpense: func,
}.isRequired;

export default connect(null, mapDispatchToprops)(WholeForm);
