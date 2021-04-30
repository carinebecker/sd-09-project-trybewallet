import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteExpense, editID, toggleEditMode } from '../../actions';
import './styles.css';

import editIcon from '../../images/edit_white_24dp.svg';
import deleteIcon from '../../images/delete_white_24dp.svg';

class WalletExpenseTable extends Component {
  editExpense(setIdEdit, setEditMode, id) {
    setIdEdit(id);
    setEditMode();
  }

  renderExpenses(expenses) {
    const { deleteThisExpense, setIdEdit, setEditMode } = this.props;
    const expenseInfo = expenses.map(
      ({ id,
        description,
        tag,
        method,
        value,
        currency,
        exchangeRates,
        currencyName = exchangeRates[currency].name,
        exchange = (Math.round(exchangeRates[currency].ask * 100) / 100).toFixed(2),
        converted = (Math.round(value * exchangeRates[currency].ask * 100) / 100) },
      index) => (
        <tr key={ index }>
          <td>{ description }</td>
          <td>{ tag }</td>
          <td>{ method }</td>
          <td>{ value }</td>
          <td>{ currencyName }</td>
          <td>{ exchange }</td>
          <td>{ converted }</td>
          <td>Real</td>
          <td>
            <button
              className="edit-button"
              type="button"
              data-testid="edit-btn"
              onClick={ () => this.editExpense(setIdEdit, setEditMode, id) }
            >
              <img src={ editIcon } alt="Edit button" />
            </button>
            <button
              className="delete-button"
              type="button"
              data-testid="delete-btn"
              onClick={ () => {
                deleteThisExpense(id);
              } }
            >
              <img src={ deleteIcon } alt="Delete button" />
            </button>
          </td>
        </tr>
      ),
    );
    return expenseInfo;
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
          { this.renderExpenses(expenses) }
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteThisExpense: (id) => dispatch(deleteExpense(id)),
  setIdEdit: (id) => dispatch(editID(id)),
  setEditMode: () => dispatch(toggleEditMode()),
});

WalletExpenseTable.propTypes = {
  deleteThisExpense: PropTypes.func,
  editThisExpense: PropTypes.func,
  setEditMode: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(WalletExpenseTable);
