import React from 'react';
import { arrayOf, object } from 'prop-types';
import { connect } from 'react-redux';
import TableRow from './TableRow';

class Table extends React.Component {
  render() {
    const { expenses } = this.props;
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
          {expenses.map((expense) => (<TableRow
            key={ expense.id }
            expense={ expense }
          />))}
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  expenses: arrayOf(object),
}.isRequired;

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
