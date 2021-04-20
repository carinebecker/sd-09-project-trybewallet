import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../styles/components/ExpenseTable.css';
import { deleteExpense, editExpense } from '../actions';

class ExpenseTable extends React.Component {
  constructor() {
    super();
    this.renderThead = this.renderThead.bind(this);
    this.renderTbody = this.renderTbody.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
    this.renderButtons = this.renderButtons.bind(this);
  }

  handleDeleteClick(id) {
    const { expenses, dipatachDeletedExpense } = this.props;
    const updatedExpenses = expenses.filter((expense) => expense.id !== id);
    dipatachDeletedExpense(updatedExpenses);
  }

  handleEditClick(id) {
    const { dipatachEditExpense } = this.props;
    dipatachEditExpense(id, true);
  }

  renderButtons(id) {
    return (
      <>
        <button
          type="button"
          className="edit-btn"
          data-testid="edit-btn"
          onClick={ () => this.handleEditClick(id) }
        >
          Editar
        </button>
        <button
          type="button"
          className="delete-btn"
          data-testid="delete-btn"
          onClick={ () => this.handleDeleteClick(id) }
        >
          Excluir
        </button>
      </>
    );
  }

  renderThead() {
    return (
      <thead className="expense-table-header">
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

  renderTbody() {
    const { expenses } = this.props;
    return (
      <tbody className="expense-table-body">
        { expenses.map((expense) => (
          <tr key={ `expense-${expense.id}` }>
            <td>{ expense.description }</td>
            <td>{ expense.tag }</td>
            <td>{ expense.method }</td>
            <td>{ expense.value }</td>
            <td>{ expense.exchangeRates[expense.currency].name }</td>
            <td>
              { parseFloat(expense.exchangeRates[expense.currency].ask)
                .toFixed(2) }
            </td>
            <td>
              { (expense.value * expense.exchangeRates[expense.currency].ask)
                .toFixed(2) }
            </td>
            <td>Real</td>
            <td>
              { this.renderButtons(expense.id) }
            </td>
          </tr>
        )) }
      </tbody>
    );
  }

  render() {
    return (
      <div className="expense-table-container">
        <table className="expense-table">
          { this.renderThead() }
          { this.renderTbody() }
        </table>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  dipatachDeletedExpense: (expenses) => dispatch(deleteExpense(expenses)),
  dipatachEditExpense: (id, editor) => dispatch(editExpense(id, editor)),
});

ExpenseTable.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  dipatachDeletedExpense: PropTypes.func.isRequired,
  dipatachEditExpense: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseTable);
