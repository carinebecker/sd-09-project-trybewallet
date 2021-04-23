import React from 'react';
import { connect } from 'react-redux';
import { func } from 'prop-types';
import { deleteExpense, editExpense } from '../actions';

class EditExpenseItem extends React.Component {
  constructor(props) {
    super(props);

    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
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

  render() {
    return (
      <button
        type="button"
        className="edit-btn"
        data-testid="edit-btn"
        onClick={ (id) => this.handleEditClick(id) }
      >
        Editar
      </button>
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

EditExpenseItem.propTypes = {
  dipatachEditExpense: func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(EditExpenseItem);
