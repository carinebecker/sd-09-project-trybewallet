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
    const { expenses, expense, delExpense } = this.props;
    const idFilter = expenses.filter((element) => element.id !== expense);
    delExpense(idFilter);
  }

  editExpanse() {
    const { expenses, expense, editExistingExpense } = this.props;
    const findId = expenses.find(({ id }) => expense === id);
    editExistingExpense(findId);
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
  delExpense: (expense) => dispatch(deleteExpense(expense)),
  editExistingExpense: (expense) => dispatch(editExpense(expense)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TableButtons);

TableButtons.propTypes = {
  expenses: PropTypes.array,
  expense: PropTypes.object,
  deleteExpense: PropTypes.func,
}.isRequired;
