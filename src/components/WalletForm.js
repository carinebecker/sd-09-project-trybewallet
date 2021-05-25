import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getCurrencyAction,
  setExpensesAction,
} from '../actions/index';

class WalletForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
    };

    this.fetchCurrency = this.fetchCurrency.bind(this);
    this.setOptionsCurrency = this.setOptionsCurrency.bind(this);
    this.setOptionsTag = this.setOptionsTag.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.fetchCurrency();
  }

  setOptionsCurrency() {
    const { currency } = this.props;
    const currencyArray = Object.keys(currency || {}).map(
      (currentValue) => currency[currentValue],
    );
    return (
      <select data-testid="currency-input" onChange={ this.handleChange } name="currency">
        {currencyArray.map((currentValue) => (
          <option
            value={ currentValue.code }
            key={ currentValue.name }
            data-testid={ currentValue.code }
          >
            {currentValue.code}
          </option>
        ))}
      </select>
    );
  }

  setOptionsTag() {
    return (
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
    );
  }

  setOptionsPayment() {
    return (
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
    );
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  async newExpenses() {
    const newCurrencies = await this.fetchCurrency();
    const { expenses, setExpensesDispatcher } = this.props;
    const { value, currency, method, tag, description } = this.state;
    const newExpense = {
      id: expenses.length,
      value,
      currency,
      method,
      description,
      tag,
      exchangeRates: newCurrencies,
    };

    setExpensesDispatcher(newExpense);

    this.setState({
      value: 0,
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
    });
  }

  async fetchCurrency() {
    const { getCurrencyDispatcher } = this.props;
    const endpoint = 'https://economia.awesomeapi.com.br/json/all';
    try {
      const response = await fetch(endpoint);
      const responseJson = await response.json();
      delete responseJson.USDT;
      getCurrencyDispatcher(responseJson);
      return responseJson;
    } catch (error) {
      console.log(error);
    }
  }

  async handleClick() {
    await this.newExpenses();
  }

  render() {
    const { value, description } = this.state;
    return (
      <form>
        Valor:
        <input
          name="value"
          value={ value }
          type="text"
          data-testid="value-input"
          onChange={ this.handleChange }
        />
        <br />

        Descrição:
        <input
          type="text"
          data-testid="description-input"
          onChange={ this.handleChange }
          name="description"
          value={ description }
        />
        <br />

        Moeda:
        {this.setOptionsCurrency()}
        <br />

        Método de Pagamento:
        {this.setOptionsPayment()}
        <br />

        Tag:
        {this.setOptionsTag()}
        <br />

        <button type="button" onClick={ this.handleClick }>Adicionar despesa</button>
      </form>
    );
  }
}

WalletForm.propTypes = {
  getCurrencyDispatcher: PropTypes.func,
  setExpensesDispatcher: PropTypes.func,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  getCurrencyDispatcher: (responseJson) => dispatch(getCurrencyAction(responseJson)),
  setExpensesDispatcher: (expenses) => dispatch(setExpensesAction(expenses)),
});

const mapStatetoProps = (state) => ({
  currency: state.wallet.currency,
  expenses: state.wallet.expenses,
});

export default connect(mapStatetoProps, mapDispatchToProps)(WalletForm);
