import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { editExpenses } from '../actions/wallet';

class Tabela extends Component {
  deleteExpense(expenseId) {
    const { expenses, dispatchEditExpenses } = this.props;

    const updatedExpenses = expenses.filter((expense) => expense.id !== expenseId);

    dispatchEditExpenses(updatedExpenses);
  }

  render() {
    const { expenses } = this.props;
    return (
      <table>
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
        <tbody>
          {expenses.map((expense) => {
            const exchangeRates = expense.exchangeRates[expense.currency];
            return (
              <tr key={ expense.id }>
                <td>{ expense.description }</td>
                <td>{ expense.tag }</td>
                <td>{ expense.method }</td>
                <td>{ expense.value }</td>
                <td>{ exchangeRates.name }</td>
                <td>{ parseFloat(exchangeRates.ask).toFixed(2) }</td>
                <td>{ (expense.value * exchangeRates.ask).toFixed(2) }</td>
                <td>Real</td>
                <button type="button">Editar</button>
                <button
                  data-testid="delete-btn"
                  type="button"
                  onClick={ () => this.deleteExpense(expense.id) }
                >
                  Excluir
                </button>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

Tabela.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object),
}.isRequired;

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchEditExpenses: (expenses) => dispatch(editExpenses(expenses)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Tabela);
