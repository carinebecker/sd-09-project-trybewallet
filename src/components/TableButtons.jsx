import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteExpense, editExpense } from '../actions';

class TableButtons extends Component {
  constructor() {
    super();

    this.findId = this.findId.bind(this);
    this.editExpanse = this.editExpanse.bind(this);
  }

  findId() {
    const { expenses, expense, deleteExpense } = this.props;
    const idFilter = expenses.filter((element) => element.id !== expense);
    deleteExpense(idFilter);
  }

  editExpanse() {
    const { expenses, expense, editExpense } = this.props;
    const findId = expenses.find(({ id }) => expense === id);
    editExpense(findId);
    // Criar chave no estado global
    // conectar a chave(informações) com o formulario
  }

  render() {
    return (
      <>
        <button
          type="button"
          data-testid="delete-btn"
          onClick={ this.findId }
        >
          Del
        </button>
        <button
          type="button"
          data-testid="edit-btn"
          onClick={ this.editExpanse }
        >
          Edit
        </button>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteExpense: (expense) => dispatch(deleteExpense(expense)),
  editExpense: (expense) => dispatch(editExpense(expense)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TableButtons);

TableButtons.propTypes = {
  expenses: PropTypes.array,
  expense: PropTypes.object,
  deleteExpense: PropTypes.func,
}.isRequired;
