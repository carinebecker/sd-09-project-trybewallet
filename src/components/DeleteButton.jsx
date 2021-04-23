import React from 'react';
import { connect } from 'react-redux';
import { number, func } from 'prop-types';
import { deleteItemFromState } from '../actions';

class DeleteButton extends React.Component {
  constructor(props) {
    super(props);

    this.deleteItem = this.deleteItem.bind(this);
  }

  deleteItem(expensesArray) {
    const { expenseId, removeExpense, value, total } = this.props;
    let newTotal = 0;
    if (expensesArray.length !== 1) {
      newTotal = (parseFloat(total) - parseFloat(value)).toFixed(2);
    }
    removeExpense(expensesArray, expenseId, parseFloat(newTotal));
    console.log(newTotal);
  }

  render() {
    const { expensesArray } = this.props;
    return (
      <button
        type="button"
        data-testid="delete-btn"
        onClick={ () => this.deleteItem(expensesArray) }
      >
        Delete
      </button>
    );
  }
}

const mapStateToProps = (state) => ({
  expensesArray: state.wallet.expenses,
  total: state.wallet.total,
  value: state.expenseReducer.value,
});

const mapDispatchToProps = (dispach) => ({
  removeExpense: (newArray, id, newTotal) => (
    dispach(deleteItemFromState(newArray, id, newTotal))),
});

DeleteButton.propTypes = {
  expenseId: number,
  removeExpense: func,
  value: number,
  total: number,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(DeleteButton);
