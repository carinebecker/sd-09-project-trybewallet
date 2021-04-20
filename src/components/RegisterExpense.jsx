import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setExpense as setExpenseThunk } from '../actions';
import SelectCurrency from './SelectCurrency';
import ExpenseCategory from './ExpenseCategory';

class RegisterExpense extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      description: '',
      currency: '',
      method: '',
      tag: '',
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  setExpense(event) {
    event.preventDefault();
    const { setExpense } = this.props;
    const { value, description, currency, method, tag } = this.state;
    const expense = { value, description, currency, method, tag };
    setExpense(expense);
  }

  handleInputChange(event) {
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;

    this.setState({
      [name]: value,
    });
  }

  render() {
    return (
      <form>
        <label htmlFor="value">
          Valor:
          <input
            type="number"
            name="value"
            id="value"
            data-testid="value-input"
            onChange={ this.handleInputChange }
          />
        </label>
        <label htmlFor="description">
          Descrição:
          <input
            type="text"
            name="description"
            id="description"
            data-testid="description-input"
            onChange={ this.handleInputChange }
          />
        </label>
        <SelectCurrency handleChange={ this.handleInputChange } />
        <label htmlFor="method">
          <select
            name="method"
            id="method"
            data-testid="method-input"
            onChange={ this.handleInputChange }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <ExpenseCategory handleChange={ this.handleInputChange } />
        <button
          type="button"
          onClick={ (event) => this.setExpense(event) }
        >
          Adicionar despesa
        </button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  isFetching: state.wallet.isFetching,
});

const mapDispatchToProps = (dispatch) => ({
  setExpense: (expense) => dispatch(setExpenseThunk(expense)),
});

RegisterExpense.propTypes = {
  setExpense: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterExpense);
