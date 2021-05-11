import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class ExpensesTable extends Component {
  constructor() {
    super();
    this.renderTableHeader = this.renderTableHeader.bind(this);
    this.renderTableBody = this.renderTableBody.bind(this);
    this.renderEditButton = this.renderEditButton.bind(this);
    this.renderDeleteButton = this.renderDeleteButton.bind(this);
  }

  renderEditButton() {
    return (
      <button type="button">Editar</button>
    );
  }

  renderDeleteButton() {
    return (
      <button type="button">Excluir</button>
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
    const { expenses } = this.props;
    return expenses
      .map(({ id, currency, description, tag, method, value, exchangeRates }) => (
        <tr key={ id } className="body-row">
          <td>{ description }</td>
          <td>{ tag }</td>
          <td>{ method }</td>
          <td>{ Number(value).toFixed(2) }</td>
          <td>{ exchangeRates[currency].name.replace(/(.*)\/(.*)/g, '$1')}</td>
          <td>{ Number(exchangeRates[currency].ask).toFixed(2) }</td>
          <td>{ Number(exchangeRates[currency].ask * value).toFixed(2)}</td>
          <td>Real</td>
          <td>
            { this.renderEditButton() }
            { this.renderDeleteButton() }
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

export default connect(mapStateToProps)(ExpensesTable);
