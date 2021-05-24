import React, { Component } from 'react';
import { connect } from 'react-redux';
import { func, number, arrayOf, shape } from 'prop-types';
import { newExpense, getExchangeRates, postEditing } from '../actions';

class NewExpense extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
      editingStart: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleAddExpense = this.handleAddExpense.bind(this);
    this.handleEditExpense = this.handleEditExpense.bind(this);
  }

  async componentDidMount() {
    const { propGetExchangeRates } = this.props;
    await propGetExchangeRates();
  }

  componentDidUpdate() {
    this.isEditing();
  }

  isEditing() {
    const { editingStart } = this.state;
    const { editingId, isEditing, expenses } = this.props;
    if (isEditing && !editingStart) {
      this.setState({
        value: expenses[editingId].value,
        currency: expenses[editingId].currency,
        method: expenses[editingId].method,
        tag: expenses[editingId].tag,
        description: expenses[editingId].description,
        editingStart: true,
      });
    }
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });
  }

  valueInput() {
    const { value } = this.state;
    return (
      <div>
        <label htmlFor="value-input">
          Valor:
          <input
            type="number"
            name="value"
            id="value-input"
            value={ value }
            data-testid="value-input"
            onChange={ this.handleChange }
          />
        </label>
      </div>
    );
  }

  currencyInput() {
    const { currency } = this.state;
    const { currencies } = this.props;
    return (
      <div>
        <label htmlFor="currency-input">
          Moeda:
          <select
            id="currency-input"
            name="currency"
            value={ currency }
            onChange={ this.handleChange }
            data-testid="currency-input"
          >
            {currencies.map((coin) => (
              <option
                key={ coin }
                value={ coin }
                data-testid={ coin }
              >
                { coin }
              </option>
            ))}
          </select>
        </label>
      </div>
    );
  }

  methodInput() {
    const { method } = this.state;
    return (
      <div>
        <label htmlFor="method-input">
          Método de pagamento:
          <select
            id="method-input"
            name="method"
            value={ method }
            data-testid="method-input"
            onChange={ this.handleChange }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
      </div>
    );
  }

  tagInput() {
    const { tag } = this.state;
    return (
      <div>
        <label htmlFor="tag-input">
          Tag:
          <select
            id="tag-input"
            name="tag"
            value={ tag }
            data-testid="tag-input"
            onChange={ this.handleChange }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
      </div>
    );
  }

  descriptionInput() {
    const { description } = this.state;
    return (
      <div>
        <label htmlFor="description-input">
          Descrição:
          <input
            type="text"
            id="description-input"
            data-testid="description-input"
            value={ description }
            name="description"
            onChange={ this.handleChange }
          />
        </label>
      </div>
    );
  }

  async handleAddExpense() {
    const {
      value,
      currency,
      method,
      tag,
      description,
    } = this.state;
    const {
      id,
      expenses,
      exchangeRates,
      propNewExpense,
      propGetExchangeRates,
    } = this.props;
    await propGetExchangeRates();
    const expenseList = expenses.map((expense) => expense);
    const addNewExpense = {
      id,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates,
    };
    expenseList.push(addNewExpense);
    propNewExpense(expenseList);
    this.setState({
      value: 0,
      description: '',
    });
  }

  addExpenseButton() {
    return (
      <div>
        <button
          type="button"
          onClick={ this.handleAddExpense }
        >
          Adicionar despesa
        </button>
      </div>
    );
  }

  editExpenseButton() {
    return (
      <div>
        <button
          type="button"
          onClick={ this.handleEditExpense }
        >
          Editar despesa
        </button>
      </div>
    );
  }

  handleEditExpense() {
    const {
      value,
      currency,
      method,
      tag,
      description,
    } = this.state;
    const { propPostEditing, expenses, editingId } = this.props;
    const edittedExpense = {
      id: parseFloat(editingId),
      value,
      currency,
      method,
      tag,
      description,
      exchangeRates: expenses[parseFloat(editingId)].exchangeRates,
    };
    propPostEditing(edittedExpense);
    this.setState({
      editingStart: false,
    });
  }

  render() {
    const { isEditing } = this.props;
    return (
      <form className="flexbox">
        {this.valueInput()}
        {this.currencyInput()}
        {this.methodInput()}
        {this.tagInput()}
        {this.descriptionInput()}
        {isEditing ? this.editExpenseButton() : this.addExpenseButton()}
      </form>
    );
  }
}

NewExpense.propTypes = {
  expenses: arrayOf(shape({ id: number })),
  id: number,
  propNewExpense: func,
  propGetExchangeRates: func,
}.isRequired;

const mapStateToProps = ({ wallet: {
  expenses,
  id,
  currencies,
  exchangeRates,
  isEditing,
  editingId,
} }) => ({
  expenses,
  id,
  currencies,
  exchangeRates,
  isEditing,
  editingId,
});

const mapDispatchToProps = (dispatch) => ({
  propNewExpense: (expenses) => dispatch(newExpense(expenses)),
  propGetExchangeRates: () => dispatch(getExchangeRates()),
  propPostEditing: (expense) => dispatch(postEditing(expense)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewExpense);
