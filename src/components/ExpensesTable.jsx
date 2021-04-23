import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TableButtons from './TableButtons';
import Thead from './Thead';

class Table extends React.Component {
  render() {
    const { expenses } = this.props;
    const coin = 'Real';
    return (
      <table>
        <Thead />
        <tbody>
          {expenses.map((expense) => (
            <tr key={ expense.id }>
              <td>
                {expense.description}
              </td>
              <td>
                {expense.tag}
              </td>
              <td>
                {expense.method}
              </td>
              <td>
                {expense.value}
              </td>
              <td>
                {expense.exchangeRates[expense.currency].name}
              </td>
              <td>
                {parseFloat(expense.exchangeRates[expense.currency].ask).toFixed(2)}
              </td>
              <td>
                {
                  parseFloat(expense.value * expense.exchangeRates[expense.currency].ask)
                    .toFixed(2)
                }
              </td>
              <td>
                {coin}
              </td>
              <td>
                <TableButtons expense={ expense.id } />
              </td>
            </tr>))}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  // pegando informação do estado
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);

Table.propTypes = {
  expenses: PropTypes.array,
}.isRequired;
