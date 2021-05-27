import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  setUpdateExpensesAction,
  getCurrencyAction,
  setBooleanEditAction,
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

  componentDidUpdate(prevProps) {
    const { editExpenses } = this.props;
    if (prevProps.editExpenses
      && Object.entries(prevProps.editExpenses).length === 0
      && Object.entries(editExpenses).length > 0
    ) {
      this.storeToState(editExpenses);
    }
  }

  setOptionsCurrency(currencyState) {
    const { currencies } = this.props;
    return (
      <select
        data-testid="currency-input"
        onChange={ this.handleChange }
        name="currency"
        value={ currencyState }
      >
        {(currencies || []).map((currentValue) => (
          <option
            value={ currentValue }
            key={ currentValue }
            data-testid={ currentValue }
          >
            {currentValue}
          </option>
        ))}
      </select>
    );
  }

  setOptionsTag(tagState) {
    return (
      <select
        data-testid="tag-input"
        id="tag-input"
        name="tag"
        onChange={ this.handleChange }
        value={ tagState }
      >
        <option value="Alimentação">Alimentação</option>
        <option value="Lazer">Lazer</option>
        <option value="Trabalho">Trabalho</option>
        <option value="Transporte">Transporte</option>
        <option value="Saúde">Saúde</option>
      </select>
    );
  }

  setOptionsPayment(methodState) {
    return (
      <select
        data-testid="method-input"
        id="method-input"
        name="method"
        onChange={ this.handleChange }
        value={ methodState }
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

  storeToState(editExpenses) {
    this.setState({
      value: editExpenses.value,
      currency: editExpenses.currency,
      method: editExpenses.method,
      tag: editExpenses.tag,
      description: editExpenses.description,
    });
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
      const responseKeys = Object.keys(responseJson);
      getCurrencyDispatcher(responseKeys);
      return responseJson;
    } catch (error) {
      console.log(error);
    }
  }

  async handleClick() {
    const
      {
        booleanEdit,
        expenses,
        editExpenses,
        setUpdateExpensesDispatcher,
        setBooleanEditDispatcher,
      } = this.props;
    const { value, method, tag, currency, description } = this.state;
    if (booleanEdit === true) {
      const maped = expenses.map((currentValue) => {
        if (currentValue.id === editExpenses.id) {
          currentValue.value = value;
          currentValue.method = method;
          currentValue.currency = currency;
          currentValue.tag = tag;
          currentValue.description = description;
        }
        return currentValue;
      });
      console.log(maped);
      setUpdateExpensesDispatcher(maped);
      setBooleanEditDispatcher(false);
    } else if (booleanEdit === false) {
      await this.newExpenses();
    }
  }

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { booleanEdit } = this.props;
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
        {this.setOptionsCurrency(currency)}
        <br />
        Método de Pagamento:
        {this.setOptionsPayment(method)}
        <br />
        Tag:
        {this.setOptionsTag(tag)}
        <br />
        <button type="button" onClick={ this.handleClick }>
          {booleanEdit ? 'Editar despesa' : 'Adicionar despesa'}
        </button>
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
  setBooleanEditDispatcher: (boolean) => dispatch(setBooleanEditAction(boolean)),
  setUpdateExpensesDispatcher: (expense) => dispatch(setUpdateExpensesAction(expense)),
});

const mapStatetoProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  editExpenses: state.wallet.editExpenses,
  booleanEdit: state.wallet.booleanEdit,
});

export default connect(mapStatetoProps, mapDispatchToProps)(WalletForm);
