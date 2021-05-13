import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setCurrencies as setCurrenciesThunk, setExpense as setExpenseThunk,
  updateExpense as actionUpdateExpense } from '../actions';

class RegisterExpense extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.setEditExpense = this.setEditExpense.bind(this);
  }

  componentDidMount() {
    const { setCurrencies } = this.props;
    setCurrencies();
  }

  componentDidUpdate(prevProps) {
    const { edit } = this.props;
    const isEditable = edit ? edit.isEditable : false;
    const prevEditable = prevProps.edit !== undefined ? prevProps.edit.isEditable : false;
    if (isEditable && isEditable !== prevEditable) {
      this.setEditExpense();
    }
  }

  setEditExpense() {
    const { expenses, edit: { id } } = this.props;
    const index = expenses.findIndex(({ id: expenseId }) => id === expenseId);
    if (index || index === 0) {
      const { value, description, currency, method, tag } = expenses[index];
      this.setState({ value, description, currency, method, tag });
    }
  }

  setExpense(event) {
    event.preventDefault();
    const { setExpense, expenses } = this.props;
    const id = expenses.length;
    const { value, description, currency, method, tag } = this.state;
    const expense = { id, value, description, currency, method, tag };
    setExpense(expense);
    this.setState({ value: '0' });
  }

  handleInputChange(event) {
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;

    this.setState({
      [name]: value,
    });
  }

  updateExpense() {
    const { updateExpense, expenses, edit: { id } } = this.props;
    const { value, description, currency, method, tag } = this.state;
    const index = expenses.findIndex(({ id: expenseId }) => id === expenseId);
    const { exchangeRates } = expenses[index];
    console.log(exchangeRates[currency]);
    const expense = { id, value, description, currency, method, tag, exchangeRates };
    expenses[index] = expense;
    updateExpense([...expenses]);
  }

  renderInputValue() {
    const { value } = this.state;
    return (
      <label htmlFor="value">
        Valor:
        <input
          type="number"
          name="value"
          value={ value }
          id="value"
          data-testid="value-input"
          onChange={ this.handleInputChange }
        />
      </label>
    );
  }

  renderInputDescription() {
    const { description } = this.state;
    return (
      <label htmlFor="description">
        Descrição:
        <input
          type="text"
          name="description"
          value={ description }
          id="description"
          data-testid="description-input"
          onChange={ this.handleInputChange }
        />
      </label>
    );
  }

  renderInputMethod() {
    const { method } = this.state;
    return (
      <label htmlFor="method">
        Método de pagamento:
        <select
          name="method"
          id="method"
          data-testid="method-input"
          onChange={ this.handleInputChange }
          defaultValue={ method }
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
      </label>
    );
  }

  renderSelectCurrency() {
    const { currency: defaultValue } = this.state;
    const { currencies } = this.props;
    let selectCurrency = !Array.isArray(currencies) ? Object.keys(currencies)
      : currencies;
    selectCurrency = selectCurrency.map((currency, index) => (
      <option
        value={ currency }
        key={ index }
        data-testid={ currency }
      >
        {currency}
      </option>
    ));
    return (
      <label htmlFor="currency">
        Moeda:
        <select
          name="currency"
          id="currency"
          data-testid="currency-input"
          onChange={ this.handleInputChange }
          defaultValue={ defaultValue }
        >
          {selectCurrency}
        </select>
      </label>
    );
  }

  renderSelectTag() {
    const { tag } = this.state;
    return (
      <label htmlFor="tag">
        Tag:
        <select
          name="tag"
          id="tag"
          data-testid="tag-input"
          onChange={ this.handleInputChange }
          defaultValue={ tag }
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

  render() {
    const { edit } = this.props;
    const isEditable = edit ? edit.isEditable : false;
    return (
      <form>
        {this.renderInputValue()}
        {this.renderInputDescription()}
        {this.renderSelectCurrency()}
        {this.renderInputMethod()}
        {this.renderSelectTag()}
        <button
          type="button"
          onClick={ isEditable ? () => this.updateExpense()
            : (event) => this.setExpense(event) }
        >
          {isEditable ? 'Editar despesa' : 'Adicionar despesa'}
        </button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  isFetching: state.wallet.isFetching,
  expenses: state.wallet.expenses,
  edit: state.wallet.edit,
});

const mapDispatchToProps = (dispatch) => ({
  setExpense: (expense) => dispatch(setExpenseThunk(expense)),
  setCurrencies: () => dispatch(setCurrenciesThunk()),
  updateExpense: (expenses) => dispatch(actionUpdateExpense(expenses)),
});

RegisterExpense.propTypes = {
  setExpense: PropTypes.func.isRequired,
  updateExpense: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  setCurrencies: PropTypes.func.isRequired,
  edit: PropTypes.objectOf(PropTypes.string).isRequired,
  currencies: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterExpense);
