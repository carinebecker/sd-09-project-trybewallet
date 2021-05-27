import React from 'react';
import { connect } from 'react-redux';
import PropType from 'prop-types';
import {
  fetchCurrencies as fetchCurrenciesThunk,
  setExpense as setExpenseAction,
} from '../actions';

class ExpenseForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '0',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };

    this.handleChangeInputs = this.handleChangeInputs.bind(this);
    this.handleAddExpense = this.handleAddExpense.bind(this);
  }

  componentDidMount() {
    const { fetchCurrencies } = this.props;
    fetchCurrencies();
  }

  handleChangeInputs({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });
  }

  handleAddExpense() {
    const { value, description, currency, method, tag } = this.state;
    const { currencies, expenses, setExpense, fetchCurrencies } = this.props;
    fetchCurrencies();
    const expense = {
      id: expenses.length,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates: currencies,
    };
    setExpense(expense);
    this.setState({
      value: 0,
    });
  }

  renderPaymentMethod(newCurrencies) {
    return (
      <select
        name="currency"
        data-testid="currency-input"
        onChange={ this.handleChangeInputs }
      >
        {
          newCurrencies.map((currency) => (
            <option
              value={ currency }
              key={ currency }
              data-testid={ currency }
            >
              { currency }
            </option>
          ))
        }
      </select>
    );
  }

  render() {
    const { value, description } = this.state;
    const { currencies } = this.props;
    const newCurrencies = Array.isArray(
      currencies,
    ) ? currencies : Object.keys(currencies);
    return (
      <div>
        <input
          type="number"
          name="value"
          value={ value }
          data-testid="value-input"
          onChange={ this.handleChangeInputs }
        />
        <input
          type="text"
          name="description"
          value={ description }
          data-testid="description-input"
          onChange={ this.handleChangeInputs }
        />
        { this.renderPaymentMethod(newCurrencies) }
        <select
          name="method"
          data-testid="method-input"
          onChange={ this.handleChangeInputs }
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
        <select name="tag" data-testid="tag-input" onChange={ this.handleChangeInputs }>
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
        <button type="button" onClick={ this.handleAddExpense }>Adicionar despesa</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  setExpense: (expense) => dispatch(setExpenseAction(expense)),
  fetchCurrencies: () => dispatch(fetchCurrenciesThunk()),
});

ExpenseForm.propTypes = {
  setExpense: PropType.func,
  fetchCurrencies: PropType.func,
  currencies: PropType.object,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseForm);
