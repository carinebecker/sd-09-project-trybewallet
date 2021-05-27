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
      id: 0,
      value: '0',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      exchangeRates: {},
    };

    this.renderEditMode = this.renderEditMode.bind(this);
    this.renderMethodInput = this.renderMethodInput.bind(this);
    this.renderDescriptionInput = this.renderDescriptionInput.bind(this);
    this.renderValueInput = this.renderValueInput.bind(this);
    this.renderCurrencyInput = this.renderCurrencyInput.bind(this);
    this.handleChangeInputs = this.handleChangeInputs.bind(this);
    this.addExp = this.addExp.bind(this);
    this.editExp = this.editExp.bind(this);
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

  addExp() {
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

  editExp() {
    const { id, expenses, editMode } = this.props;
    if (editMode) {
      const expenseEdit = expenses.find((expense) => expense.id === id);
      this.setState({
        ...expenseEdit,
      });
    }
  }

  renderValueInput(value) {
    return (
      <input
        type="number"
        name="value"
        value={ value }
        data-testid="value-input"
        onChange={ this.handleChangeInputs }
      />
    );
  }

  renderDescriptionInput(description) {
    return (
      <input
        type="text"
        name="description"
        value={ description }
        data-testid="description-input"
        onChange={ this.handleChangeInputs }
      />
    );
  }

  renderCurrencyInput(newCurrencies) {
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

  renderMethodInput(method) {
    return (
      <select
        name="method"
        value={ method }
        data-testid="method-input"
        onChange={ this.handleChangeInputs }
      >
        <option value="Dinheiro">Dinheiro</option>
        <option value="Cartão de crédito">Cartão de crédito</option>
        <option value="Cartão de débito">Cartão de débito</option>
      </select>
    );
  }

  renderTagInput(tag) {
    return (
      <select
        name="tag"
        value={ tag }
        data-testid="tag-input"
        onChange={ this.handleChangeInputs }
      >
        <option value="Alimentação">Alimentação</option>
        <option value="Lazer">Lazer</option>
        <option value="Trabalho">Trabalho</option>
        <option value="Transporte">Transporte</option>
        <option value="Saúde">Saúde</option>
      </select>
    );
  }

  renderEditMode() {
    const { editMode } = this.props;
    return (
      <div>
        { editMode
          ? <button type="button" onClick={ this.editExp }>Editar despesa</button>
          : <button type="button" onClick={ this.addExp }>Adicionar despesa</button> }
      </div>
    );
  }

  render() {
    const { value, description, method, tag } = this.state;
    const { currencies } = this.props;
    const newCurrencies = Array.isArray(
      currencies,
    ) ? currencies : Object.keys(currencies);
    return (
      <div>
        { this.renderValueInput(value) }
        { this.renderDescriptionInput(description) }
        { this.renderCurrencyInput(newCurrencies) }
        { this.renderMethodInput(method) }
        { this.renderTagInput(tag) }
        { this.renderEditMode() }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  editMode: state.wallet.editMode,
  id: state.wallet.id,
});

const mapDispatchToProps = (dispatch) => ({
  setExpense: (expense) => dispatch(setExpenseAction(expense)),
  fetchCurrencies: () => dispatch(fetchCurrenciesThunk()),
});

ExpenseForm.propTypes = {
  setExpense: PropType.func,
  fetchCurrencies: PropType.func,
  currencies: PropType.object,
  id: PropType.string,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseForm);
