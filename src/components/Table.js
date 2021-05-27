import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  setFilterExpensesAction,
  setBooleanEditAction,
  setEditExpensesAction,
} from '../actions/index';

class Table extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  getHeaders() {
    return (
      <thead>
        <tr>
          <th>Descrição</th>
          <th>Tag</th>
          <th>Método de pagamento</th>
          <th>Valor</th>
          <th>Moeda</th>
          <th>Câmbio utilizado</th>
          <th>Valor convertido</th>
          <th>Moeda de conversão</th>
          <th>Editar/Excluir</th>
        </tr>
      </thead>
    );
  }

  getButtons(expense) {
    return (
      <td>
        <button
          type="button"
          data-testid="edit-btn"
          onClick={ () => this.editClick({
            id: expense.id,
            value: expense.value,
            description: expense.description,
            currency: expense.currency,
            method: expense.method,
            tag: expense.tag,
          }) }
        >
          Editar
        </button>
        <button
          type="button"
          data-testid="delete-btn"
          onClick={ () => this.handleClick(expense.id) }
        >
          Excluir
        </button>
      </td>
    );
  }

  editClick(values) {
    const { setBooleanEditDispatcher, setEditExpensesDispatcher } = this.props;
    setBooleanEditDispatcher(true);
    setEditExpensesDispatcher(values);
  }

  handleClick(value) {
    const { expenses, setFilterExpensesDispatcher } = this.props;
    const filteredExpenses = expenses.filter((expense) => expense.id !== value);
    setFilterExpensesDispatcher(filteredExpenses);
  }

  render() {
    const { expenses } = this.props;
    return (
      <table>
        {this.getHeaders()}
        <tbody>
          {expenses.map((expense) => (
            <tr key={ expense.id }>
              <td>{expense.description}</td>
              <td>{expense.tag}</td>
              <td>{expense.method}</td>
              <td>{expense.value}</td>
              <td>{expense.exchangeRates[expense.currency].name}</td>
              <td>
                {parseFloat(
                  expense.exchangeRates[expense.currency].ask,
                ).toFixed(2)}
              </td>
              <td>
                {(
                  expense.value * expense.exchangeRates[expense.currency].ask
                ).toFixed(2)}
              </td>
              <td>Real</td>
              {this.getButtons(expense)}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object),
}.isRequired;

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  setFilterExpensesDispatcher: (expense) => dispatch(setFilterExpensesAction(expense)),
  setBooleanEditDispatcher: (boolean) => dispatch(setBooleanEditAction(boolean)),
  setEditExpensesDispatcher: (
    editExpense,
  ) => dispatch(setEditExpensesAction(editExpense)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
