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
      array.map((e, i) => <td key={ i }>{ e }</td>)
    );
  }

  render() {
    const { expenses, deleteLine } = this.props;
    const map = expenses.map((item) => {
      const moneyInfo = item.exchangeRates[item.currency];
      const moneyName = moneyInfo.name.split('/');
      return (
        <tr key={ item.id }>
          {this.basicCells(item)}
          <td>
            {item.currency}
          </td>
          <td>
            {(Math.ceil(moneyInfo.ask * 100) / 100)}
          </td>
          <td>
            {(Math.ceil(moneyInfo.ask * item.value * 100) / 100)}
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
    return map;
  }
}

ExpenseList.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object),
  money: PropTypes.objectOf(PropTypes.object),
  deleteLine: PropTypes.func,
  editForm: PropTypes.func,
  edit: PropTypes.func,
}.isRequired;

// const mapStateToProps = (state) => ({
//   expenses: state.wallet.expenses,
// });

const mapDispatchToProps = (dispatch) => ({
  editForm: (item) => dispatch(editingExpense(item)),
  deleteLine: (expense) => dispatch(deleteExpense(expense)),
});

export default connect(null, mapDispatchToProps)(ExpenseList);
