import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteExpense, editExpense } from '../actions';

class WalletTable extends Component {
  constructor(props) {
    super(props);
    this.renderTableHeader = this.renderTableHeader.bind(this);
    this.renderTableBody = this.renderTableBody.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
  }

  handleEditClick(id) {
    const { changeExpense, expenses } = this.props;
    const expenseToEdit = expenses.find((expense) => expense.id === id);

    changeExpense(expenseToEdit, true);
  }

  handleDeleteClick(id) {
    const { killExpense, expenses } = this.props;
    const filteredExpense = expenses.filter((expense) => expense.id !== id);
    killExpense(filteredExpense);
  }

  renderTableHeader() {
    const headerNames = [
      'Descrição',
      'Tag',
      'Método de pagamento',
      'Valor',
      'Moeda',
      'Câmbio utilizado',
      'Valor convertido',
      'Moeda de conversão',
      'Editar/Excluir'];
    return (
      <tr>
        {headerNames.map((name) => <th key={ name }>{name}</th>)}
      </tr>
    );
  }

  renderTableBody() {
    const { expenses } = this.props;
    return (
      <tbody>
        { expenses.map((expense) => (
          <tr key={ expense.id }>
            <td>{expense.description}</td>
            <td>{expense.tag}</td>
            <td>{expense.method}</td>
            <td>{expense.value}</td>
            <td>{expense.exchangeRates[expense.currency].name}</td>
            <td>{(+(expense.exchangeRates[expense.currency].ask)).toFixed(2)}</td>
            <td>
              {(
                +(expense.value)
                * +(expense.exchangeRates[expense.currency].ask)).toFixed(2)}
            </td>
            <td>Real</td>
            <td>
              <button
                type="button"
                data-testid="edit-btn"
                onClick={ () => this.handleEditClick(expense.id) }
              >
                Editar
              </button>
              <button
                type="button"
                data-testid="delete-btn"
                onClick={ () => this.handleDeleteClick(expense.id) }
              >
                Excluir
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    );
  }

  render() {
    const { expenses } = this.props;
    if (!expenses) {
      return <div>Loading</div>;
    }
    return (
      <table>
        <thead>
          { this.renderTableHeader() }
        </thead>
        { expenses && this.renderTableBody() }
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

WalletTable.propTypes = {
  expenses: PropTypes.objectOf(PropTypes.string.isRequired),
  killExpense: PropTypes.func,
  editExpense: PropTypes.func,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  killExpense: (expense) => dispatch(deleteExpense(expense)),
  changeExpense: (expense, status) => dispatch(editExpense(expense, status)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletTable);
