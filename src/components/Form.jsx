import React from 'react';
import { connect } from 'react-redux';
import { arrayOf, bool, func } from 'prop-types';
import fetchAPI from '../services/Api';
import { setCurrencies, setExpenses, addExpense, setEdit } from '../actions';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.fetchCurrencies = this.fetchCurrencies.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.submitExpense = this.submitExpense.bind(this);
    this.submitChanges = this.submitChanges.bind(this);
    this.createInput = this.createInput.bind(this);
    this.createDropdown = this.createDropdown.bind(this);

    if (props.edit) this.state = props.expense;
    else {
      this.state = {
        id: 0,
        value: 0,
        description: '',
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Alimentação',
      };
    }
  }

  componentDidMount() { this.fetchCurrencies(); }

  async fetchCurrencies() {
    const { updateCurrencies } = this.props;
    const data = await fetchAPI();
    updateCurrencies(Object.keys(data));
  }

  handleChange({ target: { id, value } }) {
    this.setState({ [id]: value });
  }

  async submitExpense() {
    const data = await fetchAPI();
    const { submit } = this.props;
    const expense = { ...this.state, exchangeRates: data };
    submit(expense);
    this.setState((state) => ({ id: state.id + 1, value: 0, description: '' }));
  }

  submitChanges() {
    const { updateExpenses, updateEdit, expenses, expense } = this.props;
    const { id, exchangeRates } = expense;
    const editExpense = { ...this.state, exchangeRates };
    const expensesList = expenses.map((el) => (el.id === id ? editExpense : el));
    updateExpenses(expensesList);
    updateEdit(false, {});
    this.setState({ value: 0, description: '' });
  }

  createInput(label, name, type, value) {
    return (
      <label htmlFor={ name }>
        { label }
        <input
          data-testid={ `${name}-input` }
          id={ name }
          type={ type }
          value={ value }
          onChange={ this.handleChange }
        />
      </label>
    );
  }

  createDropdown(label, name, value, options) {
    return (
      <label htmlFor={ name }>
        { label }
        <select
          data-testid={ `${name}-input` }
          id={ name }
          value={ value }
          onChange={ this.handleChange }
        >
          {options.map((el) => (
            <option data-testid={ el } value={ el } key={ el }>{ el }</option>
          ))}
        </select>
      </label>
    );
  }

  createButton(label, name, handleClick) {
    return (
      <button
        className={ name }
        type="button"
        onClick={ handleClick }
      >
        { label }
      </button>
    );
  }

  render() {
    const { currencies, edit } = this.props;
    const { value, description, currency, method, tag } = this.state;
    const methods = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const tags = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    return (
      <form className="wallet-form">
        { this.createInput('Valor:', 'value', 'number', value) }
        { this.createDropdown('Moeda:', 'currency', currency, currencies)}
        { this.createDropdown('Método de pagamento:', 'method', method, methods)}
        { this.createDropdown('Tag:', 'tag', tag, tags)}
        { this.createInput('Descrição:', 'description', 'text', description) }
        { edit ? this.createButton('Editar despesa', 'editExpense', this.submitChanges)
          : this.createButton('Adicionar despesa', 'addExpense', this.submitExpense) }
      </form>
    );
  }
}

Form.propTypes = {
  currencies: arrayOf(),
  expenses: arrayOf(),
  edit: bool,
  updateCurrencies: func,
  submit: func,
}.isRequired;

const mapStateToProps = ({ wallet: { currencies, expenses, edit, expense } }) => (
  { currencies, expenses, edit, expense });

const mapDispatchToProps = (dispatch) => ({
  updateCurrencies: (currencies) => dispatch(setCurrencies(currencies)),
  updateExpenses: (expenses) => dispatch(setExpenses(expenses)),
  submit: (expense) => dispatch(addExpense(expense)),
  updateEdit: (condition, expense) => dispatch(setEdit(condition, expense)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);
