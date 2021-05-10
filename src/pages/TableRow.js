import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteExpense, subtractExpenses, sendEdit } from '../actions';

class TableRow extends React.Component {
  currencyInfos(currency, exchangeRates) {
    const currenciesArray = Object.values(exchangeRates)
      .find((foundCurrency) => foundCurrency.code === currency);
    return ({
      nameCurrency: currenciesArray.name,
      conversionCurrency: currenciesArray.ask,
    });
  }

  // Função que vai habilitar novamente o formAddExpense ao clicar no botão editar

  render() {
    const { expense, deleteExp, subExpensesToRedux } = this.props;
    const { id, description, tag, method, value, currency, exchangeRates } = expense;
    const { nameCurrency, conversionCurrency,
    } = this.currencyInfos(currency, exchangeRates);
    const valueExpense = (value * conversionCurrency).toFixed(2);
    return (
      <tr>
        <td>{description}</td>
        <td>{tag}</td>
        <td>{method}</td>
        <td>{value}</td>
        <td>{nameCurrency}</td>
        <td>{parseFloat(conversionCurrency).toFixed(2)}</td>
        <td>{valueExpense}</td>
        <td>Real</td>
        <td>
          <button
            type="button"
            data-testid="delete-btn"
            onClick={ () => {
              subExpensesToRedux(valueExpense);
              deleteExp(id);
            } }
          >
            Excluir
          </button>
          <button
            type="button"
            data-testid="edit-btn"
            onClick={ () => sendEdit(expense) }
          >
            Editar despesa
          </button>
        </td>
      </tr>
    );
  }
}

TableRow.propTypes = {
  expense: PropTypes.objectOf(),
  deleteExp: PropTypes.func,
  subExpensesToRedux: PropTypes.func,
  editExpense: PropTypes.func.isRequired,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  deleteExp: (id) => dispatch(deleteExpense(id)),
  subExpensesToRedux: (value) => dispatch(subtractExpenses(value)),
  editExpense: (expense) => dispatch(sendEdit(expense)),

});

export default connect(null, mapDispatchToProps)(TableRow);
