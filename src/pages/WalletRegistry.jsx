import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteExpense, editingExpense } from '../actions/index';
import './Wallet.css';

class ExpenseList extends React.Component {
  constructor() {
    super();
    this.assignEdit = this.assignEdit.bind(this);
    this.basicCells = this.basicCells.bind(this);
  }

  assignEdit(item) {
    const { edit, editForm } = this.props;
    editForm(item);
    edit(item);
  }

  basicCells(item) {
    const { description, tag, method, value } = item;
    const array = [description, tag, method, value];
    return (
      array.map((e) => <td key={ Math.random() }>{ e }</td>)
    );
  }

  render() {
    const { expenses, deleteLine } = this.props;
    // updateTotal();
    console.log(expenses[0]);
    return expenses.map((item) => {
      const moneyInfo = item.exchangeRates[item.currency];
      console.log(item.description);
      return (
        <tr key={ Math.random() }>
          {this.basicCells(item)}
          <td>
            {moneyInfo.name.split('/')[0]}
          </td>
          <td>
            {parseFloat(moneyInfo.ask).toFixed(2)}
          </td>
          <td>
            {parseFloat(moneyInfo.ask * item.value).toFixed(2)}
          </td>
          <td>
            Real
          </td>
          <td>
            <button
              data-testid="edit-btn"
              onClick={ () => this.assignEdit(item) }
              type="button"
            >
              Editar
            </button>
            <button
              onClick={ () => deleteLine(item) }
              type="button"
              data-testid="delete-btn"
            >
              Excluir
            </button>
          </td>
        </tr>);
    });
  }
}

ExpenseList.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object),
  money: PropTypes.objectOf(PropTypes.object),
  deleteLine: PropTypes.func,
  editForm: PropTypes.func,
  edit: PropTypes.func,
}.isRequired;

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  editForm: (item) => dispatch(editingExpense(item)),
  deleteLine: (expense) => dispatch(deleteExpense(expense)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseList);
