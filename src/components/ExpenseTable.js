import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './ExpenseTable.css';
import TableContent from './TableContent';

class ExpenseTable extends React.Component {
  render() {
    const { expenses } = this.props;
    /* console.log('render');
    console.log(expenses); */
    const tableLine = expenses.map((expense) => (
      <TableContent key={ expense.currency } expense={ expense } />
    ));
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
          {tableLine}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

ExpenseTable.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps)(ExpenseTable);
