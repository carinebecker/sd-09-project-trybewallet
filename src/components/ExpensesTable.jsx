import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteExpense, isEditingExpense } from '../actions/index';

class ExpensesTable extends Component {
  constructor(props) {
    super(props);

    this.renderTableHeader = this.renderTableHeader.bind(this);
    this.renderTableBody = this.renderTableBody.bind(this);
    this.createButton = this.createButton.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  handleEdit(id) {
    const { getValues, isEditingDispatcher } = this.props;
    isEditingDispatcher(true);
    getValues(id);
  }

  createButton(text, testId, onClick) {
    return (
      <button type="button" data-testid={ testId } onClick={ onClick }>
        { text }
      </button>
    );
  }

  renderTableHeader() {
    return (
      <tr className="table-header">
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
    );
  }

  renderTableBody() {
    const { deleteDispatcher, expenses } = this.props;
    return expenses
      .map(({ id, currency, description, tag, method, value, exchangeRates }) => (
        <tr key={ id } className="body-row">
          <td>{ description }</td>
          <td>{ tag }</td>
          <td>{ method }</td>
          <td>{ value }</td>
          <td>{ exchangeRates[currency].name.replace(/(.*)\/(.*)/g, '$1')}</td>
          <td>{ Number(exchangeRates[currency].ask).toFixed(2) }</td>
          <td>{ Number(exchangeRates[currency].ask * value).toFixed(2)}</td>
          <td>Real</td>
          <td>
            { this.createButton('Editar', 'edit-btn', () => this.handleEdit(id)) }
            { this.createButton('Excluir', 'delete-btn', () => deleteDispatcher(id)) }
          </td>
        </tr>
      ));
  }

  render() {
    return (
      <table>
        <thead>
          { this.renderTableHeader() }
        </thead>
        <tbody>
          { this.renderTableBody() }
        </tbody>
      </table>
    );
  }
}

ExpensesTable.propTypes = {
  expenses: PropTypes.object,
}.isRequired;

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteDispatcher: (id) => dispatch(deleteExpense(id)),
  isEditingDispatcher: (payload) => dispatch(isEditingExpense(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesTable);
