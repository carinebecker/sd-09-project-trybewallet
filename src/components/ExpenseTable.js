import React from 'react';
import { connect } from 'react-redux';

import './ExpenseTable.css';
import TableContent from './TableContent';

class ExpenseTable extends React.Component {
  render() {
    const { expenses } = this.props;
    console.log('render');
    console.log(expenses);
    return (
      <table>
        <thead>
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
        <tbody>
          <TableContent />
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  // isFetching: state.wallet.isFetching,
});

export default connect(mapStateToProps)(ExpenseTable);
