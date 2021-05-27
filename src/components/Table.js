import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteRow, editBtn } from '../actions/index';

class Table extends Component {
  constructor() {
    super();
    this.createInfoTable = this.createInfoTable.bind(this);
  }

  createInfoTable() {
    const { expenses, deleteExpense, editButton } = this.props;
    if (expenses) {
      return (
        expenses.map((row, index) => (
          <tr key={ row.id }>
            <td>{ row.description }</td>
            <td>{ row.tag }</td>
            <td>{ row.method }</td>
            <td>{ row.value }</td>
            <td>{ row.exchangeRates[row.currency].name }</td>
            <td>{ Number(row.exchangeRates[row.currency].ask).toFixed(2) }</td>
            <td>
              { Number(row.exchangeRates[row.currency].ask * row.value).toFixed(2) }
            </td>
            <td>Real</td>
            <button
              data-testid="edit-btn"
              type="button"
              onClick={ () => editButton(true, index) }
            >
              edit
            </button>
            <button
              data-testid="delete-btn"
              type="button"
              onClick={ () => deleteExpense(row.id) }
            >
              delete
            </button>
          </tr>
        ))
      );
    }
  }

  render() {
    return (
      <div>
        <table>
          <tbody>
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
            { this.createInfoTable() }
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteExpense: (id) => dispatch(deleteRow(id)),
  editButton: (key, index) => dispatch(editBtn(key, index)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);

Table.propTypes = {
  expenses: PropTypes.arrayOf(Object).isRequired,
  deleteExpense: PropTypes.func.isRequired,
  editButton: PropTypes.func.isRequired,
};
