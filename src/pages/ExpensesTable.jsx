import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setExpenseAction, setId, editId, editingOldElement } from '../actions';

class ExpensesTable extends Component {
  handleClick(id) {
    const { expenses, setAction } = this.props;
    const filterItem = expenses.filter((expense) => expense.id !== id);
    setAction(filterItem);
  }

  handleEdit(id) {
    const { expenses, editIdAction, editingOldElementAction } = this.props;
    const filterItem = expenses.find((expense) => expense.id === id);
    // console.log(filterItem.id);
    editIdAction(filterItem.id);
    editingOldElementAction();
  }

  tableHead() {
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

  tableBody(expenses) {
    return (
      <tbody>
        { expenses
          .map(({ id, value, description, currency, method, tag, exchangeRates }) => (
            <tr key={ id }>
              <td>{ description }</td>
              <td>{ tag }</td>
              <td>{ method }</td>
              <td>{ value }</td>
              <td>{ (exchangeRates[currency].name).split('/')[0] }</td>
              <td>{ parseFloat(exchangeRates[currency].ask).toFixed(2) }</td>
              <td>{(value * exchangeRates[currency].ask).toFixed(2)}</td>
              <td>Real</td>
              <td>
                <button
                  data-testid="edit-btn"
                  type="button"
                  onClick={ () => this.handleEdit(id) }
                >
                  Editar
                </button>
                <button
                  data-testid="delete-btn"
                  type="button"
                  onClick={ () => this.handleClick(id) }
                >
                  Excluir
                </button>
              </td>
            </tr>
          )) }
      </tbody>
    );
  }

  render() {
    const { expenses } = this.props;
    return (
      <table>
        {this.tableHead()}
        {this.tableBody(expenses)}
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user.email,
  expenses: state.wallet.expenses,
  id: state.wallet.id,
});

const mapDispatchToProps = (dispatch) => ({
  setAction: (expenses) => dispatch(setExpenseAction(expenses)),
  editIdAction: (id) => dispatch(editId(id)),
  setIdEdit: () => dispatch(setId()),
  editingOldElementAction: () => dispatch(editingOldElement()),
});

ExpensesTable.propTypes = {
  expenses: PropTypes.arrayOf,
  setAction: PropTypes.func,
  editAction: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesTable);
