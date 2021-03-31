import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import deleteExpense from '../actions/deleteExpenses';

class ExpensesTable extends Component {
  renderExpense(expense) {
    const { currency, description, method, tag, value, exchangeRates, id } = expense;
    const currencyData = exchangeRates[currency];
    const convertedValue = Number(value) * Number(currencyData.ask);
    const { deleteExp } = this.props;

    return (
      <tr key={ id }>
        <td>{ description }</td>
        <td>{ tag }</td>
        <td>{ method }</td>
        <td>{ value }</td>
        <td>{ currencyData.name }</td>
        <td>{ (Math.round(currencyData.ask * 100) / 100).toFixed(2) }</td>
        <td>{ (Math.round(convertedValue * 100) / 100).toFixed(2) }</td>
        <td>Real</td>
        <td>
          <button
            data-testid="delete-btn"
            type="button"
            onClick={ () => deleteExp(id) }
          >
            excluir
          </button>
        </td>
      </tr>
    );
  }

  render() {
    const { expenses } = this.props;
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            { expenses.map((expense) => this.renderExpense(expense)) }
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = ({ wallet }) => ({
  expenses: wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteExp: (id) => {
    dispatch(deleteExpense(id));
  },
});

ExpensesTable.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object),
  deleteExp: PropTypes.func,
}.isRequered;

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesTable);
